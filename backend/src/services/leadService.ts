import OpenAI from 'openai';
import ApiError from '../utils/ApiError.ts';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const MODEL = process.env.OPENAI_MODEL || 'gpt-4o';
const PDL_API_KEY = process.env.PDL_API_KEY;
const PDL_BASE = 'https://api.peopledatalabs.com/v5';

// ── Helpers ────────────────────────────────────────────────────────────────

async function callLLM(prompt: string): Promise<string> {
  const completion = await openai.chat.completions.create({
    model: MODEL,
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.7,
  });
  return completion.choices[0]?.message?.content?.trim() || '';
}

function parseJSON(content: string): any {
  let cleaned = content;
  if (cleaned.startsWith('```json')) {
    cleaned = cleaned.replace(/^```json\s*/, '').replace(/```\s*$/, '');
  } else if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```\s*/, '').replace(/```\s*$/, '');
  }
  return JSON.parse(cleaned.trim());
}

async function pdlPost(path: string, body: object): Promise<any> {
  const res = await fetch(`${PDL_BASE}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Api-Key': PDL_API_KEY!,
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) return null;
  return res.json();
}

async function pdlGet(path: string, params: Record<string, string>): Promise<any> {
  const qs = new URLSearchParams(params).toString();
  const res = await fetch(`${PDL_BASE}${path}?${qs}`, {
    headers: { 'X-Api-Key': PDL_API_KEY! },
  });
  if (!res.ok) return null;
  return res.json();
}

function sizeToRange(size: string): { gte?: number; lte?: number } | null {
  const map: Record<string, { gte?: number; lte?: number }> = {
    '1-10':     { gte: 1,   lte: 10   },
    '11-50':    { gte: 11,  lte: 50   },
    '51-200':   { gte: 51,  lte: 200  },
    '201-500':  { gte: 201, lte: 500  },
    '501-1000': { gte: 501, lte: 1000 },
    '1000+':    { gte: 1000           },
  };
  return map[size] ?? null;
}

function geoToCountries(geos: string[]): string[] {
  const map: Record<string, string[]> = {
    'North America':      ['united states', 'canada', 'mexico'],
    'Europe':             ['united kingdom', 'germany', 'france', 'netherlands', 'sweden', 'spain', 'italy'],
    'Asia':               ['india', 'china', 'japan', 'singapore', 'south korea', 'indonesia'],
    'Australia / Oceania':['australia', 'new zealand'],
    'South America':      ['brazil', 'argentina', 'colombia', 'chile'],
    'Middle East':        ['united arab emirates', 'saudi arabia', 'israel', 'qatar'],
    'Africa':             ['south africa', 'nigeria', 'kenya', 'egypt'],
    'Global':             [],
  };
  const countries: string[] = [];
  for (const geo of geos) {
    const c = map[geo];
    if (c && c.length > 0) countries.push(...c);
  }
  return countries;
}

// ── PDL data → Lead shape ──────────────────────────────────────────────────

function pdlCompanyToLead(c: any, index: number): any {
  return {
    id: c.id || `pdl-${index}-${Date.now()}`,
    company: c.name || 'Unknown',
    websiteUrl: c.website ? `https://${c.website}` : null,
    industry: c.industry || null,
    employeeCount: c.employee_count ? String(c.employee_count) : null,
    revenue: c.annual_revenue ? `$${(c.annual_revenue / 1_000_000).toFixed(0)}M` : null,
    hqLocation: [c.location?.locality, c.location?.country].filter(Boolean).join(', ') || null,
    foundedYear: c.founded || null,
    description: c.summary || null,
    fitScore: Math.min(100, Math.max(30, 60 + Math.floor(Math.random() * 30))),
    status: 'new',
    source: 'pdl',
  };
}

function pdlPersonToContact(p: any): any {
  return {
    id: p.id || crypto.randomUUID(),
    name: p.full_name || `${p.first_name || ''} ${p.last_name || ''}`.trim(),
    title: p.job_title || null,
    roleRelevance: 'High',
    email: p.work_email || p.emails?.[0]?.address || null,
    linkedinUrl: p.linkedin_url || null,
  };
}

// ── PDL: find leads ────────────────────────────────────────────────────────

async function pdlFindLeads(icp: any): Promise<any[] | null> {
  if (!PDL_API_KEY) return null;

  try {
    const must: any[] = [];

    if (icp.industry) {
      must.push({ term: { industry: icp.industry.toLowerCase() } });
    }

    const sizeRange = sizeToRange(icp.companySize);
    if (sizeRange) {
      must.push({ range: { employee_count: sizeRange } });
    }

    const countries = geoToCountries(icp.geography || []);
    if (countries.length > 0) {
      must.push({ terms: { 'location.country': countries } });
    }

    if (icp.technologyKeywords?.length > 0) {
      must.push({ terms: { tech: icp.technologyKeywords.map((t: string) => t.toLowerCase()) } });
    }

    const query = must.length > 0 ? { bool: { must } } : { match_all: {} };

    const result = await pdlPost('/company/search', { query, size: 15, pretty: false });
    const companies: any[] = result?.data ?? [];
    if (companies.length === 0) return null;

    return companies.map((c: any, i: number) => pdlCompanyToLead(c, i));
  } catch {
    return null;
  }
}

// ── PDL: enrich lead ───────────────────────────────────────────────────────

async function pdlEnrichLead(lead: any): Promise<any | null> {
  if (!PDL_API_KEY) return null;

  try {
    const domain = lead.websiteUrl?.replace(/^https?:\/\//, '').replace(/\/$/, '');
    if (!domain) return null;

    const company = await pdlGet('/company/enrich', { website: domain });

    const peopleResult = await pdlPost('/person/search', {
      query: {
        bool: {
          must: [
            { term: { job_company_website: domain } },
            { terms: { job_title_role: ['ceo', 'cto', 'vp', 'director', 'head', 'founder'] } },
          ],
        },
      },
      size: 3,
    });

    const people: any[] = peopleResult?.data ?? [];
    const contacts = people.length > 0 ? people.map(pdlPersonToContact) : null;
    const techStack: string[] = company?.tech?.slice(0, 8).map((t: any) =>
      typeof t === 'string' ? t : t.name
    ) ?? [];

    const result: any = { techStack: techStack.length > 0 ? techStack : undefined, enrichmentScore: 'High', source: 'pdl' };
    if (contacts) result.contacts = contacts;
    if (company?.employee_count) result.employeeCount = String(company.employee_count);
    if (company?.summary) result.description = company.summary;

    const hasData = contacts || techStack.length > 0;
    return hasData ? result : null;
  } catch {
    return null;
  }
}

// ── OpenAI fallbacks ───────────────────────────────────────────────────────

async function oaiFindLeads(icp: any): Promise<any[]> {
  const prompt = `
    You are an expert B2B lead generation assistant.
    Based on the following Ideal Customer Profile (ICP), generate 15 highly realistic B2B leads.

    ICP:
    - Industry: ${icp.industry}
    - Company Size: ${icp.companySize}
    - Annual Revenue: ${icp.revenueRange}
    - Geography: ${icp.geography?.join(', ')}
    - Target Job Titles: ${icp.targetJobTitles?.join(', ')}
    - Keywords/Technologies: ${icp.technologyKeywords?.join(', ')}

    For each lead provide:
    - id (string uuid)
    - company (string)
    - websiteUrl (string)
    - industry (string)
    - employeeCount (string like "51-200")
    - revenue (string like "$1M-$10M")
    - hqLocation (string)
    - foundedYear (number)
    - description (1-2 sentences)
    - fitScore (number between 1-100)
    - name (string)
    - title (string)
    - status (always "new")
    - source (always "ai")

    Return ONLY a valid JSON array of 15 objects. No markdown, no explanation.
  `;
  const content = await callLLM(prompt);
  return parseJSON(content);
}

async function oaiEnrichLead(lead: any): Promise<any> {
  const prompt = `
    Enrich the following lead with deep business intelligence:
    Lead: ${JSON.stringify(lead)}

    Provide a JSON object with:
    - contacts: array of 2-3 decision makers, each with: id (uuid), name, title, roleRelevance ("High"/"Medium"/"Low"), email, linkedinUrl
    - techStack: array of 5-8 technology names
    - estimatedToolSpend: string like "$10k-$50k/year"
    - growthStage: "Startup" | "Growth" | "Scale-up" | "Enterprise"
    - triggers: array of 2-3 objects with: id (uuid), description, date, impact ("High"/"Medium"/"Low")
    - painPoints: array of 3-4 strings
    - buyingIntentSignals: array of 2-3 strings
    - budgetTiming: string
    - competitors: array of 2-3 objects with: name, positioning, differentiation
    - enrichmentScore: "High" | "Medium" | "Low"
    - source: always "ai"

    Return ONLY a valid JSON object. No markdown, no explanation.
  `;
  const content = await callLLM(prompt);
  return parseJSON(content);
}

// ── Public service ─────────────────────────────────────────────────────────

export const leadService = {
  findLeads: async (icp: any) => {
    try {
      const pdlResults = await pdlFindLeads(icp);
      if (pdlResults && pdlResults.length > 0) return pdlResults;
    } catch {
      // fall through
    }
    try {
      return await oaiFindLeads(icp);
    } catch (error) {
      console.error('Lead generation error:', error);
      throw new ApiError(500, 'Failed to generate leads');
    }
  },

  enrichLead: async (_leadId: number | undefined, lead: any) => {
    try {
      const pdlData = await pdlEnrichLead(lead);
      if (pdlData) {
        try {
          const aiData = await oaiEnrichLead({ ...lead, ...pdlData });
          return {
            ...aiData,
            ...(pdlData.contacts?.length   ? { contacts:   pdlData.contacts   } : {}),
            ...(pdlData.techStack?.length  ? { techStack:  pdlData.techStack  } : {}),
            enrichmentScore: pdlData.enrichmentScore,
            source: 'pdl+ai',
          };
        } catch {
          return pdlData;
        }
      }
    } catch {
      // fall through
    }
    try {
      return await oaiEnrichLead(lead);
    } catch (error) {
      console.error('Lead enrichment error:', error);
      throw new ApiError(500, 'Failed to enrich lead');
    }
  },

  generateOutreach: async (lead: any, productContext: string) => {
    const prompt = `
      Generate a personalized multi-channel outreach sequence for this lead.
      Product/Service Context: ${productContext}
      Lead Info: ${JSON.stringify(lead)}

      Return a JSON object with this exact structure:
      {
        "emails": {
          "initial": { "subject": "...", "body": "...", "day": 1 },
          "followUp": { "subject": "...", "body": "...", "day": 4 },
          "breakup": { "subject": "...", "body": "...", "day": 8 }
        },
        "linkedin": { "connectionRequest": "...", "followUpInMail": "..." },
        "coldCall": {
          "openingHook": "...",
          "quickPitch": "...",
          "qualifyingQuestions": ["...", "...", "..."],
          "objectionHandling": [
            { "objection": "...", "response": "..." },
            { "objection": "...", "response": "..." }
          ],
          "closeCTA": "..."
        }
      }

      Return ONLY a valid JSON object. No markdown, no explanation.
    `;
    try {
      const content = await callLLM(prompt);
      return parseJSON(content);
    } catch (error) {
      console.error('Outreach generation error:', error);
      throw new ApiError(500, 'Failed to generate outreach');
    }
  },

  getChatResponse: async (query: string, leads: any[], productContext?: any) => {
    const prompt = `
      You are an expert B2B sales strategy advisor.
      Product Context: ${JSON.stringify(productContext || {})}
      Current Leads (top 5): ${JSON.stringify(leads.slice(0, 5))}
      User Question: ${query}

      Provide a helpful strategic response using markdown. Be specific about leads when relevant.
      Keep it concise and actionable (2-4 paragraphs max).
    `;
    try {
      return await callLLM(prompt);
    } catch (error) {
      console.error('Chat response error:', error);
      throw new ApiError(500, 'Failed to generate chat response');
    }
  },
};
