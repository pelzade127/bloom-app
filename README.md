<div align="center">

# 🌸 Bloom

### A calm, pastel debt-payoff & savings co-pilot

Bloom turns a pile of debts, bills, and goals into one clear, month-by-month plan — with a real debt-free date that moves as life happens. Built to feel supportive and non-shaming: a financial co-pilot, not a budgeting punishment tool.

[**Live app →**](https://bloom-app-topaz.vercel.app)

![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat-square&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-Postgres_+_Auth-3FCF8E?style=flat-square&logo=supabase&logoColor=white)
![PWA](https://img.shields.io/badge/PWA-installable-5A0FC8?style=flat-square&logo=pwa&logoColor=white)
![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?style=flat-square&logo=vercel&logoColor=white)

</div>

---

## About

Most budgeting apps tell you what you did wrong. Bloom is built around the one thing that actually keeps people going: a visible finish line. Enter your income, bills, debts, and savings goals once, and Bloom computes an exact plan — what to pay, when, which debt gets the extra money, how much interest you'll save, and your projected debt-free date. Savings grow on the same timeline, so paying down debt and building a cushion stop feeling like a tradeoff you have to guess at.

It's built to bend with real life: switch strategies anytime, blend two strategies together, reorder priorities, or check in each month on what actually happened versus what was planned — no spreadsheets, no shame.

<!-- Add a screenshot to make the repo shine:
1. Take a screenshot of the dashboard
2. Save it as docs/screenshot.png
3. Uncomment the line below
-->
<!-- ![Bloom dashboard](docs/screenshot.png) -->

## Features

**Payoff engine**
- Six strategies on one shared simulation engine — debt snowball, avalanche, cash-flow (highest minimum first), interest-cost (most expensive debt first), a tunable snowball↔avalanche **blend**, and a fully custom order.
- Month-by-month schedule — exactly what to pay on each debt, every month, with running balances and payoff milestones.
- Side-by-side strategy comparison with clear "least interest" and "fastest" markers.
- One slider splits your monthly surplus between extra debt payments and savings, with debt and savings plotted on the same timeline.

**Staying accurate over time**
- **Monthly check-in** — the first time you open the app in a new month, Bloom asks "did this go as planned?" One tap applies the plan, or you can enter what actually happened (per debt, plus savings) and it updates from there.
- Fell behind by a few months? It walks through each one in order, with a shortcut to fast-forward through months that went exactly as planned.
- A gentle "no room right now, and that's okay" state instead of an error when the numbers are tight.

**Built to actually hold up**
- Accounts with email/password sign-in; every edit auto-saves and syncs across devices.
- Installable as a PWA — add it to a phone home screen and it opens full-screen, no browser chrome.
- Self-updating in the background with no disruptive reloads, and an on-screen fallback if a page ever fails to render, so nothing fails silently.

## Tech stack

| Layer | Choice |
| --- | --- |
| Frontend | React 18 + Vite |
| Styling | Tailwind CSS, custom pastel design system |
| Charts | Recharts |
| Icons | Lucide |
| Backend | Supabase (PostgreSQL + Auth) |
| Security | Postgres Row Level Security |
| Hosting | Vercel (frontend), Supabase (database) |
| Offline / install | vite-plugin-pwa (Workbox service worker) |

## How it works

**The payoff math** lives in a single pure, deterministic engine: a monthly simulation that accrues interest, pays minimums, then routes the remaining budget to one target debt according to the chosen strategy — rolling each cleared debt's freed-up payment into the next (the "snowball" effect). Because it's a pure function of its inputs, the UI can re-run it on every keystroke for instant what-if feedback.

**Persistence is frontend-direct to Supabase** — no separate API server to host. Each user's income, debts, expenses, and plan settings live in Postgres behind Row Level Security, so a signed-in user can only ever read or write their own rows. Debts and expenses save via `upsert` (never a destructive delete-and-replace), so overlapping saves can't wipe data; removing an item is its own explicit action.

```
React app ──► Supabase Auth (email/password)
          └─► Supabase Postgres (RLS-protected)  ◄── one row-set per user
   │
   └─ payoff engine (pure function, runs in the browser)
```

## Getting started

**Prerequisites:** [Node.js](https://nodejs.org) (LTS).

```bash
git clone https://github.com/pelzade127/bloom-app.git
cd bloom-app
npm install
```

**Connect a free Supabase project:**

1. Create a project at [supabase.com](https://supabase.com) — no card required.
2. In **SQL Editor**, run [`supabase-schema.sql`](supabase-schema.sql) to create the tables and security policies.
   *(Upgrading an existing database? Also run [`supabase-migration-add-plan-month.sql`](supabase-migration-add-plan-month.sql).)*
3. *(Optional, for frictionless sign-up)* Under **Authentication → Sign In / Providers → Email**, turn off **Confirm email**.
4. Grab your **Project URL** and **anon/publishable key** from the project's **Connect** dialog (or **Settings → API Keys**).
5. Copy `.env.example` to `.env` and fill in:

```env
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-or-publishable-key
```

**Run it:**

```bash
npm run dev      # local dev server
npm run build    # production build
npm run preview  # preview the production build (PWA install works here)
```

## Deployment

Deployed on Vercel from GitHub: import the repo, add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` under **Settings → Environment Variables**, and deploy. Every push to `main` redeploys automatically.

## Roadmap

- Payment reminders near due dates
- Promo / intro-APR handling
- Multiple savings goals with target dates
- Biweekly-paycheck calendar accuracy
- Saved "what-if" scenarios

## A note

Bloom shows projections based on the numbers you enter. It's a planning companion, not financial advice — real interest and dates may vary.

## License

Released under the MIT License.
