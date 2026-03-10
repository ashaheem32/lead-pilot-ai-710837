# Welcome to your project

## Project Development Guidelines

**⚠️ IMPORTANT: DO NOT MODIFY THESE FILES AND ROUTES**

This document outlines the critical files, routes, and configurations that **must not be changed**. The platform relies on these specific structures to safely sync, build, and deploy your application. Modifying them will break the automated pipelines and platform integrations.

## Strict "Do Not Touch" List

Modifying any of the following files will break the platform's ability to manage your project:

- `pnpm-lock.yaml`: (Never edit manually. Always use `pnpm add <package>`)
- `package.json`: (Do not remove any dependencies)
- `vite.config.ts`: (Contains critical build pipeline configs)
- `eslint.config.js`: (Overrides will break deployment checks)
- `backend/prisma/migrations/*`: (Never modify existing migrations)
- `frontend/src/agentSdk/emitter.ts`: (Critical for AI agent connections)

### Critical Backend Routes

The platform uses the following routes for health checks and synchronization. **NEVER alter or remove these route paths** in `backend/src/app.ts`:

- `GET /`: Root heartbeat check.
- `GET /health`: Health status for deployment providers.
- `GET /version.json`: Used by the platform to track your project version.

## Database & Prisma (Backend)

The database is a shared resource with live data. To ensure service continuity, you must adhere to the following:

- **Soft Delete Only**: NEVER use hard deletes (`prisma.model.delete()`). The platform expects an `isDeleted` flag on all models to preserve data history while hiding it from the UI.
- **Prisma Schema Stability**:
  - **Additive Changes**: You can add new models or _optional_ fields (`field Type?`).
  - **Avoid Breaking Changes**: Renaming columns, changing types, or making optional fields required will break existing records because the sync pipeline does not run destructive data migrations.
  - **No Manual Migrations**: Please don't edit the `prisma/migrations/` folder. The platform manages migrations automatically based on your `schema.prisma`.

## Authentication & Integration Routes

The authentication and integration systems are tightly connected to the platform. While you can modify the internal logic, **NEVER change these fixed route paths**:

#### Authentication (`backend/src/routes/auth.routes.ts`)

- **Public Access**:
  - `POST /auth/register` & `POST /auth/login`
  - `POST /auth/refresh`: Token management.
  - `GET /auth/google` & `GET /auth/google/callback`: OAuth flow.
  - `POST /auth/phone/send-otp` & `POST /auth/phone/verify-otp`: WhatsApp/Phone login.
- **Protected (User Data)**:
  - `GET /auth/me`: Fetch current user.
  - `GET /auth/identities`: List linked providers.
  - `DELETE /auth/identities/:provider`: Unlink provider.

#### Platform Integrations

Unified access to external services via the pre-configured `@uptiqai/integrations-sdk`. **Do not change these endpoints:**

- **Payments (Stripe)**:
  - `POST /payment/create-checkout-session`: Initiates a secure Stripe Checkout flow.
  - `POST /payment/stripe/webhook`: Handles asynchronous payment events (**CRITICAL**: Path must be exactly this for Stripe signature verification).

## Frontend & AI SDK

- **Tailwind CSS v4**: In `frontend/src/index.css`, the `@import 'tailwindcss';` directive is essential for the styling engine.
- **Agent SDK (frontend/src/agentSdk/emitter.ts)**:
  - **⚠️ DO NOT TOUCH**: This file is critical for connection to AI agents. Modifying it will break AI features.
  - It relies on **specific agent execution routes** that must not be changed in the code:
    - `GET /agent-executor/agents/:agentId`
    - `POST /agent-executor/.../trigger`

By following these patterns, you ensure that your local development and the platform remain in perfect harmony! Happy coding!
