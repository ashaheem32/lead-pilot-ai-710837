import { Context } from 'hono';
import { leadService } from '../services/leadService.ts';

export const leadController = {
  findLeads: async (c: Context) => {
    const { icp } = await c.req.json();
    const leads = await leadService.findLeads(icp);
    return c.json(leads);
  },

  enrichLead: async (c: Context) => {
    const { leadId, lead } = await c.req.json();
    const enrichedData = await leadService.enrichLead(leadId, lead);
    return c.json(enrichedData);
  },

  generateOutreach: async (c: Context) => {
    const { leadId, productContext } = await c.req.json();
    const outreachData = await leadService.generateOutreach(leadId, productContext);
    return c.json(outreachData);
  },

  getStats: async (c: Context) => {
    const stats = await leadService.getStats();
    return c.json(stats);
  }
};
