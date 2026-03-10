import { Lead, ICP, Contact, TriggerEvent, Competitor, ProductContext, OutreachData } from '../types';

const ADJECTIVES = ['Global', 'NextGen', 'Cloud', 'Data', 'Smart', 'Secure', 'Agile', 'Bright', 'Elite', 'Sync', 'Nexus', 'Flow', 'Pulse', 'Bridge', 'Core'];
const NOUNS = ['Systems', 'AI', 'Solutions', 'Technologies', 'Analytics', 'Partners', 'Dynamics', 'Cyber', 'Logics', 'Networks', 'Labs', 'Hub', 'Platform', 'Stack', 'Vista'];

const generateCompanyName = () => {
  const adj = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];
  const noun = NOUNS[Math.floor(Math.random() * NOUNS.length)];
  return adj + noun + (Math.random() > 0.7 ? ' Inc.' : Math.random() > 0.5 ? ' Group' : '');
};

const getFitScore = () => {
  const r = Math.random();
  if (r > 0.6) return Math.floor(Math.random() * (98 - 80 + 1)) + 80;
  if (r > 0.3) return Math.floor(Math.random() * (79 - 50 + 1)) + 50;
  return Math.floor(Math.random() * (49 - 35 + 1)) + 35;
};

export const generateSampleLeads = (icp: ICP): Lead[] => {
  const leads: Lead[] = [];
  const locations = icp.geography.length > 0 ? icp.geography : ['North America', 'Europe'];
  
  for (let i = 0; i < 15; i++) {
    const companyName = generateCompanyName();
    const industry = icp.industry || 'SaaS';
    const location = locations[Math.floor(Math.random() * locations.length)];
    const fitScore = getFitScore();
    
    leads.push({
      id: crypto.randomUUID(),
      name: 'Person ' + (i + 1),
      company: companyName,
      websiteUrl: 'https://www.' + companyName.toLowerCase().replace(/[^a-z0-9]/g, '') + '.com',
      industry: industry,
      employeeCount: icp.companySize || '51-200',
      revenue: icp.revenueRange || '$1M-$10M',
      hqLocation: location,
      foundedYear: 2010 + Math.floor(Math.random() * 14),
      description: companyName + ' is a leading ' + industry + ' company specializing in AI-driven ' + (icp.technologyKeywords[0] || 'efficiency') + ' solutions for ' + (icp.targetJobTitles[0] || 'enterprises') + '.',
      fitScore: fitScore,
      status: 'new',
      title: icp.targetJobTitles[0] || 'Executive'
    });
  }
  
  return leads;
};

export const generateEnrichmentData = (lead: Lead): Partial<Lead> => {
  const firstNames = ['James', 'Mary', 'Robert', 'Patricia', 'John', 'Jennifer', 'Michael', 'Linda', 'William', 'Elizabeth'];
  const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez'];
  
  const contacts: Contact[] = [
    {
      id: crypto.randomUUID(),
      name: firstNames[Math.floor(Math.random() * 10)] + ' ' + lastNames[Math.floor(Math.random() * 10)],
      title: lead.title || 'Director',
      roleRelevance: 'High',
      email: lead.company.toLowerCase().split(' ')[0] + '@example.com',
      linkedinUrl: 'linkedin.com/in/' + lead.company.toLowerCase().replace(/[^a-z0-9]/g, '') + '-exec'
    },
    {
      id: crypto.randomUUID(),
      name: firstNames[Math.floor(Math.random() * 10)] + ' ' + lastNames[Math.floor(Math.random() * 10)],
      title: 'Head of Growth',
      roleRelevance: 'Medium',
      email: lead.company.toLowerCase().split(' ')[0] + '.growth@example.com',
      linkedinUrl: 'linkedin.com/in/' + lead.company.toLowerCase().replace(/[^a-z0-9]/g, '') + '-growth'
    }
  ];

  const techStacks: Record<string, string[]> = {
    'SaaS': ['AWS', 'React', 'Node.js', 'Salesforce', 'Slack', 'Stripe', 'HubSpot'],
    'FinTech': ['Azure', 'Java', 'Spring Boot', 'PostgreSQL', 'Datadog', 'Plaid'],
    'Cybersecurity': ['GCP', 'Python', 'Kubernetes', 'Splunk', 'CrowdStrike', 'Okta'],
    'HealthTech': ['AWS', 'HIPAA-Cloud', 'Tableau', 'Oracle', 'EPIC-API'],
    'E-commerce': ['Shopify Plus', 'Magento', 'Algolia', 'Klaviyo', 'Recharge']
  };

  const triggers: TriggerEvent[] = [
    {
      id: crypto.randomUUID(),
      description: 'Raised $' + (Math.floor(Math.random() * 50) + 5) + 'M Series ' + (['A', 'B', 'C'][Math.floor(Math.random() * 3)]) + ' funding',
      date: '3 weeks ago',
      impact: 'High'
    },
    {
      id: crypto.randomUUID(),
      description: 'Hiring 15+ new roles in ' + lead.industry + ' development team',
      date: '10 days ago',
      impact: 'Medium'
    }
  ];

  const genericPainPoints = [
    'Difficulty scaling outbound without increasing headcount',
    'Low conversion rates from existing marketing channels',
    'High customer acquisition costs (CAC)',
    'Manual data entry and lack of CRM automation',
    'Legacy systems slowing down product innovation'
  ];

  return {
    enrichmentScore: Math.random() > 0.4 ? 'High' : 'Medium',
    contacts,
    techStack: techStacks[lead.industry] || ['AWS', 'Salesforce', 'Slack', 'React'],
    estimatedToolSpend: '$' + (Math.floor(Math.random() * 500) + 50) + 'k/year',
    growthStage: lead.employeeCount && lead.employeeCount.includes('500') ? 'Scale-up' : 'Growth',
    triggers,
    painPoints: genericPainPoints.sort(() => 0.5 - Math.random()).slice(0, 3),
    buyingIntentSignals: ['Recent funding round', 'Expansion into new markets', 'Increased LinkedIn activity'],
    budgetTiming: 'Fiscal year ends in December',
    competitors: [
      { name: 'Incumbent Corp', positioning: 'Traditional market leader', differentiation: 'More expensive, slower innovation' },
      { name: 'FastMover AI', positioning: 'Nimble startup', differentiation: 'Lacks enterprise-grade security features' }
    ]
  };
};

export const generateOutreachData = (lead: Lead, productContext: ProductContext): OutreachData => {
  const company = lead.company;
  const contactName = lead.contacts?.[0]?.name || 'there';
  const firstName = contactName.split(' ')[0];
  const industry = lead.industry;
  const painPoint = lead.painPoints?.[0] || 'scaling efficiently';
  const myCompany = productContext.companyName || 'LeadPilot AI';
  const valueProp = productContext.keyValueProp || 'AI-driven outreach that converts';
  const tone = productContext.preferredTone;

  const getToneAdjustment = (text: string) => {
    if (tone === 'Conversational') return text.replace('Dear', 'Hi').replace('Sincerely', 'Best');
    if (tone === 'Bold') return text + " Let's make this happen.";
    if (tone === 'Friendly') return "Hope you're having a great week! " + text;
    return text;
  };

  return {
    emails: {
      initial: {
        subject: `Quick question for ${company} / ${firstName}`,
        day: 1,
        body: getToneAdjustment(`Hi ${firstName},\n\nI was researching ${company} and noticed your work in ${industry}. Given your focus on growth, I imagine ${painPoint} is a top priority right now.\n\nAt ${myCompany}, we help companies like yours with ${valueProp}. We've seen similar teams increase efficiency by 40%.\n\nDo you have 10 minutes next Tuesday to chat?\n\nBest,\n[Your Name]`) 
      },
      followUp: {
        subject: `Re: Quick question for ${company}`,
        day: 4,
        body: getToneAdjustment(`Hi ${firstName},\n\nJust following up on my previous note. I also saw that you're using ${lead.techStack?.[0] || 'modern stack'}, which works perfectly with our solution.\n\nI thought this case study on how we solved ${painPoint} for a similar ${industry} firm might be relevant.\n\nWorth a quick conversation?\n\nBest,\n[Your Name]`) 
      },
      breakup: {
        subject: `Moving on for now`,
        day: 8,
        body: getToneAdjustment(`Hi ${firstName},\n\nI haven't heard back, so I assume now isn't the right time. I'll take you off my list for now.\n\nIf ${painPoint} ever becomes a bigger focus, feel free to reach out. One final thought: our latest update specifically addresses ${lead.techStack?.[1] || 'automated workflows'}.\n\nBest of luck,\n[Your Name]`) 
      }
    },
    linkedin: {
      connectionRequest: `Hi ${firstName}, I've been following ${company}'s growth in ${industry}. Your role as ${lead.title} seems pivotal to their current expansion. Would love to connect and keep in touch!`,
      followUpInMail: `Thanks for connecting, ${firstName}! I noticed ${company} is scaling fast. We help teams like yours with ${valueProp}. Would you be open to a brief chat sometime?`
    },
    coldCall: {
      openingHook: `Hi ${firstName}, this is [Your Name] from ${myCompany}. I'm calling because I saw ${company} is expanding their ${industry} footprint. Did I catch you at a bad time?`,
      quickPitch: `We help ${industry} companies like ${company} achieve ${valueProp} by automating the heavy lifting in your sales process.`,
      qualifyingQuestions: [
        `How are you currently handling ${painPoint}?`,
        `Is ${lead.techStack?.[0] || 'your current stack'} meeting all your scaling needs?`,
        `What's your biggest priority for the next quarter?`
      ],
      objectionHandling: [
        {
          objection: "We don't have budget", 
          response: "I completely understand. Most of our clients actually save 20% on operational costs by implementing this, which helps free up budget for other initiatives. Worth a look for next quarter?" 
        },
        {
          objection: "We already use a competitor", 
          response: `That's great, they're a solid choice. Many of our customers switched because they needed deeper integration with ${lead.techStack?.[1] || 'their CRM'}. Would you be open to a 5-min comparison?` 
        },
        {
          objection: "Just send me an email", 
          response: "Happy to. What's the best address? While I have you, does your team currently face issues with manual data entry?" 
        }
      ],
      closeCTA: "How about a 15-minute call next Wednesday at 10am to show you exactly how this would work for your team?"
    }
  };
};