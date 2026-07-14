# ainterface.org

Public site for **AInterface** — one interface for a fleet of AI agents. A project of [AI for Canadians](https://aiforcanadians.org).

## What's here

- `index.html` — the current holding page (static, inline CSS, no build step)
- `vercel.json` — clean URLs + basic security headers

## Relationship to the product

The AInterface product itself — the command deck with specialist executors, guardrails, human approval gates, and the tamper-evident audit trail — is developed in the
[`ai-for-canadians/ChiefofAgentsAInterface`](https://github.com/ai-for-canadians/ChiefofAgentsAInterface) repo (working title: Chief of Agents).

This repo is the marketing/entry surface at `ainterface.org`. The app is planned to surface at `app.ainterface.org`, deployed from the product repo. As the product matures, this page graduates from holding page to full product site.

Note: this is separate from `aiforcanadians.org` (the AI for Canadians brand/marketing site), which lives in `ai-for-canadians/aifc-hq` under `aiforcanadians-site/`.

## Deploy (Vercel)

Import this repo into Vercel: Framework = **Other**, Root Directory = `/` (default), no build command, default output directory. Then add the `ainterface.org` domain in project settings.
