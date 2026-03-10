import { Hono } from 'hono';
import { z } from 'zod';
import { zValidator } from '@hono/zod-validator';
import { leadController } from '../controllers/leadController.ts';
import catchAsync from '../utils/catchAsync.ts';

const leadRoutes = new Hono();

const icpSchema = z.object({
  industry: z.string().optional(),
  companySize: z.string().optional(),
  revenueRange: z.string().optional(),
  geography: z.array(z.string()).optional(),
  targetJobTitles: z.array(z.string()).optional(),
  technologyKeywords: z.array(z.string()).optional()
});

leadRoutes.post('/find', zValidator('json', z.object({ icp: icpSchema })), catchAsync(leadController.findLeads));
leadRoutes.post('/enrich', zValidator('json', z.object({ leadId: z.number().optional(), lead: z.any() })), catchAsync(leadController.enrichLead));
leadRoutes.post('/outreach', zValidator('json', z.object({ leadId: z.number(), productContext: z.string() })), catchAsync(leadController.generateOutreach));
leadRoutes.get('/stats', catchAsync(leadController.getStats));

export default leadRoutes;
