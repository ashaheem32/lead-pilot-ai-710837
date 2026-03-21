# LeadPilot AI

## 📖 Project Overview & Problem Statement
Finding and engaging with B2B leads is often a slow, manual process requiring multiple disjointed tools for searching, enriching, and outreach. LeadPilot AI solves this by providing a unified, AI-powered platform designed to seamlessly find, enrich, and engage ideal customers. It acts as an intelligent B2B Lead Finder, Enrichment engine, and AI SDR (Sales Development Representative), accelerating the pipeline from discovery to conversion.

## 🏗️ System Design & Technical Approach
LeadPilot AI operates through a modular architecture where specialised AI agents collaborate seamlessly:
- **Lead Finder Agent**: Autonomously generates lead lists based on Ideal Customer Profiles (ICP).
- **Enrichment Agent**: Researches and aggregates deep intelligence for target leads to enhance personalization.
- **Outreach Agent**: Crafts highly personalized multi-channel messaging sequences using **RAG (Retrieval-Augmented Generation)** to reference relevant lead and product context.
- **Strategy Advisor Agent**: An interactive chat interface that maintains context of the entire pipeline to provide strategic sales advice.

### **Tech Stack**
- **Frontend**: Built with React, Vite, and TypeScript. Styled using Tailwind CSS v4 and Lucide Icons, featuring a mobile-responsive, modern application interface. State management uses React Context with local storage persistence.
- **Backend**: Scalable Node.js API built using **Hono**, integrated with **Prisma ORM** over a **Supabase PostgreSQL** database.
- **AI Integration**: Multi-model support configuring Anthropic (Claude), OpenAI (GPT-4o), and Google (Gemini). Features comprehensive **RAG (Retrieval-Augmented Generation)** implementation for context-aware AI interactions and advanced lead insights.

## 🏃‍♂️ Setup & Execution Instructions

### Prerequisites
- Node.js (v18 or higher)
- pnpm (Recommended package manager)
- Supabase Project (PostgreSQL & Vector support)

### 1. Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Configure environment variables:
   - Copy `.env.example` to `.env`
   - Fill in your `DATABASE_URL`, LLM API keys (OpenAI/Anthropic/Gemini), and other required secrets.
4. Database Setup:
   ```bash
   pnpm run db:push
   # or
   pnpm run db:migrate
   ```
5. Start the backend development server:
   ```bash
   pnpm run dev
   ```

### 2. Frontend Setup
1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Configure environment variables:
   - Copy `.env.example` to `.env` (ensure it points to your local backend API).
4. Start the frontend development server:
   ```bash
   pnpm run dev
   ```

### 3. Usage
Navigate to `http://localhost:5173` (or the port specified by Vite) to access the LeadPilot AI dashboard. Follow the onboarding steps to set up your ICP and start finding leads!
