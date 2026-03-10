import { Llm, LlmProvider } from '@uptiqai/integrations-sdk';
import prisma from '../client.ts';
import ApiError from '../utils/ApiError.ts';

const llm = new Llm({ 
  provider: (process.env.LLM_PROVIDER as LlmProvider) || LlmProvider.Google 
});

export const leadService = {
  findLeads: async (icp: any) => {
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
      
      For each lead, provide:
      - company (string)
      - websiteUrl (string)
      - industry (string)
      - employeeCount (string)
      - revenue (string)
      - hqLocation (string)
      - foundedYear (number)
      - description (1-2 sentences)
      - fitScore (number between 1-100)
      
      Return ONLY a JSON array of 15 objects.
    `;

    try {
      const response = await llm.generateText({
        messages: [{ role: 'user', content: prompt }],
        model: process.env.LLM_MODEL
      }) as any;

      // Extract JSON from response (handling potential markdown)
      const content = response.data.trim();
      const jsonStr = content.startsWith('```json') 
        ? content.replace(/```json|```/g, '').trim() 
        : content;
      
      const leadsData = JSON.parse(jsonStr);

      // Save leads to database (soft delete only)
      const leads = await Promise.all(leadsData.map((data: any) => 
        prisma.lead.create({
          data: {
            ...data,
            status: 'new',
            isDeleted: false
          }
        })
      ));

      return leads;
    } catch (error) {
      console.error('Lead generation error:', error);
      throw new ApiError(500, 'Failed to generate leads with AI');
    }
  },

  enrichLead: async (leadId: number | undefined, lead: any) => {
    const prompt = `
      Enrich the following lead with deep business intelligence:
      Lead: ${JSON.stringify(lead)}
      
      Provide the following details in a JSON object:
      - contacts: array of 2-3 realistic decision maker objects, each with:
        - name (string)
        - title (string, e.g., CEO, CTO, VP Sales)
        - roleRelevance (string: 'High', 'Medium', or 'Low')
        - email (string: realistic pattern like firstname.lastname@company.com)
        - linkedinUrl (string: linkedin.com/in/firstname-lastname pattern)
      - techStack: array of 5-8 technology badges (e.g., "AWS", "React", "Stripe", "Salesforce", "Slack")
      - estimatedToolSpend: string (range estimate like "$10k-$50k/year")
      - growthStage: string (one of: 'Startup', 'Growth', 'Scale-up', 'Enterprise')
      - triggers: array of 2-3 recent trigger events, each with:
        - description (string, e.g., "Raised $15M Series B from Sequoia", "Expanded sales team by 40%")
        - date (string, e.g., "Oct 2023")
        - impact (string: 'High', 'Medium', or 'Low')
      - painPoints: array of 3-4 specific pain points based on industry + company size
      - buyingIntentSignals: array of 2-3 indicators
      - budgetTiming: string (Fiscal Year / Budget Timing insight)
      - competitors: array of 2-3 likely competitors, each with:
        - name (string)
        - positioning (string: brief positioning notes)
        - differentiation (string: how user's product wins vs each competitor)
      - enrichmentScore: string ('High', 'Medium', or 'Low')
      
      Return ONLY a JSON object.
    `;

    try {
      const response = await llm.generateText({
        messages: [{ role: 'user', content: prompt }],
        model: process.env.LLM_MODEL
      }) as any;

      const content = response.data.trim();
      const jsonStr = content.startsWith('```json') 
        ? content.replace(/```json|```/g, '').trim() 
        : content;
      
      const enrichedData = JSON.parse(jsonStr);

      if (leadId) {
        await prisma.lead.update({
          where: { id: Number(leadId) },
          data: {
            ...enrichedData,
            status: 'enriched'
          }
        });
      }

      return enrichedData;
    } catch (error) {
      console.error('Lead enrichment error:', error);
      throw new ApiError(500, 'Failed to enrich lead with AI');
    }
  },

  generateOutreach: async (leadId: number, productContext: string) => {
    const lead = await prisma.lead.findUnique({
      where: { id: leadId, isDeleted: false }
    });

    if (!lead) throw new ApiError(404, 'Lead not found');

    const prompt = `
      Generate a personalized multi-channel outreach sequence for this lead.
      Product/Service Context: ${productContext}
      Lead Info: ${JSON.stringify(lead)}
      
      Provide:
      - email sequence:
        - initial (3-step cold email sequence)
        - followUp
        - breakup
      - linkedin:
        - connectionRequest
        - inMail
      - coldCall:
        - script (60-second script)
        - objectionHandling
        
      Return ONLY a JSON object with this structure:
      {
        "email": { "initial": "...", "followUp": "...", "breakup": "..." },
        "linkedin": { "connectionRequest": "...", "inMail": "..." },
        "coldCall": { "script": "...", "objectionHandling": "..." }
      }
    `;

    try {
      const response = await llm.generateText({
        messages: [{ role: 'user', content: prompt }],
        model: process.env.LLM_MODEL
      }) as any;

      const content = response.data.trim();
      const jsonStr = content.startsWith('```json') 
        ? content.replace(/```json|```/g, '').trim() 
        : content;
      
      const outreachData = JSON.parse(jsonStr);

      await prisma.lead.update({
        where: { id: leadId },
        data: {
          outreachSequences: outreachData as any,
          status: 'contacted'
        }
      });

      return outreachData;
    } catch (error) {
      console.error('Outreach generation error:', error);
      throw new ApiError(500, 'Failed to generate outreach with AI');
    }
  },

  getStats: async () => {
    const totalLeads = await prisma.lead.count({ where: { isDeleted: false } });
    const enrichedLeads = await prisma.lead.count({ where: { status: 'enriched', isDeleted: false } });
    const contactedLeads = await prisma.lead.count({ where: { status: 'contacted', isDeleted: false } });
    
    const leads = await prisma.lead.findMany({ where: { isDeleted: false } });
    const avgFitScore = leads.length > 0 
      ? leads.reduce((acc: number, l: any) => acc + (l.fitScore || 0), 0) / leads.length 
      : 0;

    // Simple industry grouping
    const industries: Record<string, number> = {};
    leads.forEach((l: any) => {
      if (l.industry) {
        industries[l.industry] = (industries[l.industry] || 0) + 1;
      }
    });

    return {
      totalLeads,
      enrichedLeads,
      contactedLeads,
      avgFitScore: Math.round(avgFitScore),
      leadsByIndustry: Object.entries(industries).map(([name, value]) => ({ name, value })),
      funnelData: [
        { name: 'Total Leads', value: totalLeads },
        { name: 'Enriched', value: enrichedLeads },
        { name: 'Contacted', value: contactedLeads }
      ]
    };
  }
};