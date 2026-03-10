import { AgentConfig } from './types';
import { z } from 'zod';

export const AGENT_CONFIGS: AgentConfig[] = [
  {
    "id": "c00af298-c519-4ac1-8cea-b2ed6c6bbd04",
    "name": "Strategy-Advisor-Agent",
    "description": "Provides strategic sales advice tailored to the user's lead pipeline, delivering personalized recommendations and insights.",
    "triggerEvents": [
      {
        "name": "pipeline_updated",
        "description": "When the lead pipeline is updated, analyze changes and provide updated recommendations or next steps.",
        "type": "async"
      },
      {
        "name": "user_query",
        "description": "Respond with relevant advice or insights based on the user's query and the current state of the lead pipeline.",
        "type": "sync",
        "outputSchema": z.any()
      },
      {
        "name": "outreach_ready",
        "description": "Suggest personalized outreach strategies and provide templates when leads are ready for outreach.",
        "type": "async"
      },
      {
        "name": "pipeline_updated",
        "description": "When the lead pipeline is updated (new leads added, leads enriched, etc.), the agent should analyze the changes and provide updated recommendations or next steps.",
        "type": "async"
      },
      {
        "name": "user_query",
        "description": "When a user sends a message in the chat, the agent should respond with relevant advice or insights based on the user's query and the current state of the lead pipeline.",
        "type": "sync",
        "outputSchema": z.any()
      },
      {
        "name": "outreach_ready",
        "description": "When the pipeline indicates that leads are ready for outreach (enriched and prioritized), the agent should suggest personalized outreach strategies and provide templates or sequences for the user to utilize.",
        "type": "async"
      }
    ],
    "config": {
      "appId": "ec3b56c9-d66d-4fe8-b890-ddea024cdb10",
      "accountId": "33c475d2-c805-4063-9f9a-0550754da952",
      "widgetKey": "zo5LYNvHCwwZpJT9KuVylnEZKSxPX6ZUXs1no3zz"
    }
  }
];