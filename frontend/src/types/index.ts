export interface Contact {
  id: string;
  name: string;
  title: string;
  roleRelevance: 'High' | 'Medium' | 'Low';
  email: string;
  linkedinUrl: string;
}

export interface TriggerEvent {
  id: string;
  description: string;
  date: string;
  impact: 'High' | 'Medium' | 'Low';
}

export interface Competitor {
  name: string;
  positioning: string;
  differentiation: string;
}

export interface EmailOutreach {
  subject: string;
  body: string;
  day: number;
}

export interface LinkedInOutreach {
  connectionRequest: string;
  followUpInMail: string;
}

export interface ColdCallOutreach {
  openingHook: string;
  quickPitch: string;
  qualifyingQuestions: string[];
  objectionHandling: { objection: string; response: string }[];
  closeCTA: string;
}

export interface OutreachData {
  emails: {
    initial: EmailOutreach;
    followUp: EmailOutreach;
    breakup: EmailOutreach;
  };
  linkedin: LinkedInOutreach;
  coldCall: ColdCallOutreach;
}

export interface ProductContext {
  companyName: string;
  whatYouSell: string;
  keyValueProp: string;
  targetPainPoints: string;
  preferredTone: 'Professional' | 'Conversational' | 'Bold' | 'Friendly';
}

export interface Lead {
  id: string;
  name: string;
  company: string;
  websiteUrl?: string;
  title: string;
  industry: string;
  employeeCount?: string;
  revenue: string;
  hqLocation?: string;
  foundedYear?: number;
  description?: string;
  fitScore: number;
  status: 'new' | 'enriched' | 'contacted';
  email?: string;
  linkedinUrl?: string;
  
  // Deep Enrichment Fields
  enrichmentScore?: 'High' | 'Medium' | 'Low';
  contacts?: Contact[];
  techStack?: string[];
  estimatedToolSpend?: string;
  growthStage?: 'Startup' | 'Growth' | 'Scale-up' | 'Enterprise';
  triggers?: TriggerEvent[];
  painPoints?: string[];
  buyingIntentSignals?: string[];
  budgetTiming?: string;
  competitors?: Competitor[];

  outreachSequences?: OutreachData;
}

export interface ICP {
  industry: string;
  companySize: string;
  revenueRange: string;
  geography: string[];
  targetJobTitles: string[];
  technologyKeywords: string[];
}

export interface DashboardStats {
  totalLeads: number;
  enrichedLeads: number;
  contactedLeads: number;
  avgFitScore: number;
  leadsByIndustry: { name: string; value: number }[];
  leadsBySize: { name: string; value: number }[];
  funnelData: { name: string; value: number }[];
}
