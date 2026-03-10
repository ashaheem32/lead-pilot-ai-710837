import { Lead, ICP, ProductContext } from '../types';
import { generateSampleLeads, generateEnrichmentData, generateOutreachData } from '../lib/sampleDataGenerator';
import { emitter } from '@/agentSdk';

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const leadService = {
  findLeads: async (icp: ICP): Promise<Lead[]> => {
    // Simulate network delay
    await sleep(4000);
    return generateSampleLeads(icp);
  },

  enrichLead: async (lead: Lead): Promise<Partial<Lead>> => {
    // Simulate network delay
    await sleep(2000);
    return generateEnrichmentData(lead);
  },

  generateOutreach: async (lead: Lead, productContext: ProductContext): Promise<Partial<Lead>> => {
    // Simulate network delay
    await sleep(2500);
    const outreach = generateOutreachData(lead, productContext);
    return {
      outreachSequences: outreach,
      status: 'contacted'
    };
  },
  
  getChatResponse: async (query: string, leads: Lead[], productContext?: ProductContext): Promise<string> => {
    try {
      // First try to use the agent
      const result = await emitter.emit({
        agentId: 'c00af298-c519-4ac1-8cea-b2ed6c6bbd04', // Strategy-Advisor-Agent
        event: 'user_query',
        payload: { query, leads, productContext },
        uid: crypto.randomUUID()
      });

      if (result) {
        return result.toString();
      }
    } catch (error) {
      console.warn('Agent failed or not available, falling back to mock response', error);
    }

    // No agent sync event or it failed, check mock mode
    if (import.meta.env.VITE_MOCK_DATA === "true" || true) { // Defaulting to true for demo
      await sleep(1500);
      const topLead = leads.length > 0 ? [...leads].sort((a, b) => b.fitScore - a.fitScore)[0] : null;
      
      if (!topLead) {
        return "I don't see any leads in your pipeline yet. **Start by defining your ICP in the Lead Finder module** to generate your first batch of high-fit prospects!";
      }

      const responses = [
        `Based on your current pipeline, **${topLead.company}** is your highest-fit prospect (Score: **${topLead.fitScore}**). They've recently shown signals in the **${topLead.industry}** sector that align perfectly with your value proposition. 
        
        **Strategic Recommendations:**
        1. **Prioritize outreach** to ${topLead.contacts?.[0]?.name || 'their CTO'} this week.
        2. **Focus on their key pain point**: ${topLead.painPoints?.[0] || 'scaling outbound efficiently'}.
        3. **Leverage the latest trigger**: ${topLead.triggers?.[0]?.description || 'Recent expansion into new markets'}.
        
        Would you like me to rewrite your outreach sequence for them to be more casual?`,

        `Looking at your top 3 leads (**${topLead.company}**, **${leads[1]?.company || 'NexusFlow'}**, and **${leads[2]?.company || 'CloudBridge'}**), there's a strong cluster in the **${topLead.industry}** space. 
        
        **Tactical Insights:**
        - **Common Pain Point**: ${topLead.painPoints?.[1] || 'Low cold email reply rates'}.
        - **Best Channel**: LinkedIn InMail seems more effective for this persona.
        - **Subject Line Suggestion**: "Question about ${topLead.company}'s growth strategy"
        
        I suggest we focus our efforts on **${topLead.company}** first as they have the highest Enrichment Confidence score.`,

        `To improve your ICP targeting, I noticed that companies in the **${topLead.industry}** industry with **${topLead.employeeCount}** employees have the highest fit scores. 
        
        **Suggestions:**
        - Add **"Salesforce"** and **"AWS"** to your technology keywords.
        - Target **"VP of Sales"** or **"Head of Growth"** roles specifically.
        - Mention the **${topLead.triggers?.[1]?.description || 'recent Series B funding'}** in your hooks to create relevance.
        
        Shall I analyze your latest campaign performance?`
      ];

      // Randomly pick a response or pick one based on query keywords
      if (query.toLowerCase().includes('prioritize') || query.toLowerCase().includes('which lead')) {
        return responses[0];
      } else if (query.toLowerCase().includes('analyze') || query.toLowerCase().includes('icp')) {
        return responses[2];
      } else if (query.toLowerCase().includes('compare') || query.toLowerCase().includes('top 3')) {
        return responses[1];
      }
      
      return responses[Math.floor(Math.random() * responses.length)];
    }

    return "I'm sorry, I'm having trouble connecting to my knowledge base right now. Please try again in a moment.";
  }
};
