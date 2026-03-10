# LeadPilot AI - Implementation Plan

## Project Overview
LeadPilot AI is a professional B2B Lead Finder, Enrichment, and AI SDR application designed to find, enrich, and engage ideal customers.

## 1. Data Model & State Management
- **Lead**: id, name, company, title, industry, size, revenue, location, fitScore, status (new, enriched, contacted), techStack, news, painPoints, competitiveLandscape.
- **ICP**: industry, companySize, revenueRange, geography, targetJobTitles, technologyKeywords.
- **Outreach**: leadId, type (email, linkedin, call), content, status.
- **State Management**: React Context (LeadContext) to share data across Lead Finder, Enrichment, Outreach, and Dashboard modules. Persistence using LocalStorage.

## 2. Page Structure & Navigation
- **Layout**: Sidebar navigation with top bar.
- **Modules**:
    - `Lead Finder`: Search form + Results table.
    - `Lead Enrichment`: Detailed cards/accordions for selected leads.
    - `AI SDR Outreach`: Generation of personalized sequences.
    - `Campaign Dashboard`: Visual analytics and funnel.
    - `AI Strategy Advisor`: Chat interface with pipeline context.

## 3. Agents & Flows
- **Agents**:
    - `LeadFinderAgent`: Generates lead lists based on ICP.
    - `EnrichmentAgent`: Researches deep intelligence for specific leads.
    - `OutreachAgent`: Crafts personalized messaging.
    - `StrategyAgent`: Advisor with context of the entire pipeline.
- **Flows**:
    - `Finder -> Enrichment -> Outreach`: Core user journey.

## 4. Implementation Sequence
1. **Core Setup**: Layout, Sidebar, Context, Types.
2. **Lead Finder**: ICP form and results table with mock AI generation.
3. **Lead Enrichment**: Detailed views for leads.
4. **AI SDR Outreach**: Content generation for sequences.
5. **Campaign Dashboard**: Analytics and charts.
6. **AI Strategy Advisor**: Chat implementation.
7. **Final Polish**: Exports, responsiveness, and styles.

## 5. Visual Design
- **Theme**: Professional SaaS (Navy, White, Blue).
- **Colors**:
    - Primary: #1e3a8a (Navy)
    - Secondary: #3b82f6 (Blue)
    - Background: #f8fafc (Light Gray/White)
