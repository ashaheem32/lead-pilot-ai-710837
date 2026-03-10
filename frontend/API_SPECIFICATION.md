# LeadPilot AI API Specification

## Base URL
`import.meta.env.VITE_API_BASE_URL`

### Lead Interface
```json
{
  "id": "number",
  "company": "string",
  "websiteUrl": "string?",
  "industry": "string?",
  "employeeCount": "string?",
  "revenue": "string?",
  "hqLocation": "string?",
  "foundedYear": "number?",
  "description": "string?",
  "fitScore": "number?",
  "status": "string", // 'new', 'enriched', 'contacted'
  "enrichmentScore": "string?", // 'High', 'Medium', 'Low'
  "contacts": [
    {
      "name": "string",
      "title": "string",
      "roleRelevance": "string",
      "email": "string",
      "linkedinUrl": "string"
    }
  ],
  "techStack": ["string"],
  "estimatedToolSpend": "string?",
  "growthStage": "string?",
  "triggers": [
    {
      "description": "string",
      "date": "string",
      "impact": "string"
    }
  ],
  "painPoints": ["string"],
  "buyingIntentSignals": ["string"],
  "budgetTiming": "string?",
  "competitors": [
    {
      "name": "string",
      "positioning": "string",
      "differentiation": "string"
    }
  ],
  "outreachSequences": "object?"
}
```

## Endpoints

### Lead Finder
- **POST /leads/find**
  - Description: Generates leads based on ICP.
  - Request Body:
    ```json
    {
      "icp": {
        "industry": "string",
        "companySize": "string",
        "revenueRange": "string",
        "geography": ["string"],
        "targetJobTitles": ["string"],
        "technologyKeywords": ["string"]
      }
    }
    ```
  - Response: `Lead[]`

### Lead Enrichment
- **POST /leads/enrich**
  - Description: Enriches a specific lead with deep intelligence.
  - Request Body:
    ```json
    {
      "leadId": "number?",
      "lead": "Lead"
    }
    ```
  - Response: `Partial<Lead>`

### AI SDR Outreach
- **POST /leads/outreach**
  - Description: Generates personalized outreach for a lead.
  - Request Body:
    ```json
    {
      "leadId": "number",
      "productContext": "string"
    }
    ```
  - Response: `Partial<Lead>`

### AI Strategy Advisor
- **POST /ai/chat**
  - Description: Chat with AI advisor about leads and strategy.
  - Request Body:
    ```json
    {
      "messages": [
        { "role": "user", "content": "string" }
      ],
      "context": {
        "leads": "Lead[]"
      }
    }
    ```
  - Response: `Streaming Response`

### Dashboard Stats
- **GET /dashboard/stats**
  - Description: Get overall pipeline and lead statistics.
  - Response: `DashboardStats`