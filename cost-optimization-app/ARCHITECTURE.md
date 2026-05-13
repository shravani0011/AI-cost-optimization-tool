# Architecture

Frontend:
- Next.js App Router
- Zustand for client state

Backend:
- Supabase database
- Supabase REST APIs

Database Tables:
- audits
- leads

Flow:
1. User enters AI tooling data
2. Audit engine calculates recommendations
3. Audit stored in Supabase
4. Dynamic result page generated
5. Lead captured for future outreach