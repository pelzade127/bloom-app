# Bloom — debt-freedom co-pilot

A calm, pastel, month-by-month plan for paying off debt while growing savings.
Built with React + Vite + Tailwind, and set up as an installable PWA so it can live
on a phone home screen and open full-screen like a native app.

---

## Run it on your computer

You need [Node.js](https://nodejs.org) (LTS version) installed. Then, inside this folder:

```bash
npm install      # one time — downloads dependencies
npm run dev      # start the local dev server
```

Open the URL it prints (usually http://localhost:5173). Edits save live.

```bash
npm run build    # build the production site into the dist/ folder
npm run preview  # preview that production build locally
```

> The "Add to Home Screen" / install behavior only works on the **built** site
> (the deployed site, or `npm run preview`) — not in `npm run dev`. That's normal.

---

## Put it online (free) with GitHub + Vercel

### Step 1 — Push the code to GitHub

Run these once, inside this folder:

```bash
git init
git add .
git commit -m "Initial commit: Bloom"
```

Then create a new **empty** repository on github.com (don't add a README or
.gitignore — this project already has them). Copy its URL and run:

```bash
git remote add origin https://github.com/YOUR-USERNAME/bloom-app.git
git branch -M main
git push -u origin main
```

### Step 2 — Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub (the free "Hobby" plan is plenty).
2. Click **Add New → Project** and import your `bloom-app` repo.
3. Vercel auto-detects Vite — build command `npm run build`, output `dist`. Leave the defaults and click **Deploy**.
4. In about a minute you get a live URL like `https://bloom-app.vercel.app`.

That's it. From now on, **every push to GitHub auto-deploys the new version.**

### Every time you make a change after that

This is the rhythm to remember — three commands, in order:

```bash
git add .
git commit -m "what you changed"
git push
```

Or as a single line you can reuse:

```bash
git add . && git commit -m "what you changed" && git push
```

Vercel picks it up and updates the live site automatically.

---

## Install it on a phone (or laptop)

Open the live Vercel URL, then:

- **iPhone (Safari):** tap the Share button → **Add to Home Screen**.
- **Android (Chrome):** tap the ⋮ menu → **Install app** (or accept the install prompt).
- **Desktop (Chrome/Edge):** click the install icon in the address bar.

It opens full-screen with the Bloom heart icon — no browser bars.

---

## Connect the backend (free, with Supabase)

The app saves each person's income, debts, expenses, and plan to a free Supabase
database, behind email/password sign-in. Do this once:

1. **Create a project.** Go to [supabase.com](https://supabase.com), sign up (free, no card),
   and create a new project. Pick any database password and region. Wait ~2 minutes for it to spin up.
   *(Free projects pause after 7 days of no use; if that happens, one click in the dashboard wakes it — your data is safe.)*

2. **Turn off email confirmation** (so sign-up logs your friend in immediately, no inbox step):
   **Authentication → Sign In / Providers → Email**, and switch off **Confirm email**. Save.

3. **Create the tables.** Open **SQL Editor → New query**, paste the entire contents of
   `supabase-schema.sql` (in this folder), and click **Run**. You should see "Success."

4. **Get your two keys.** Go to **Project Settings → API** and copy the **Project URL**
   and the **anon / public** key. (The anon key is meant to live in the browser — row-level
   security is what actually protects the data.)

5. **Tell the app about them, in two places:**
   - **Locally:** copy `.env.example` to a new file named `.env` and paste your two values in.
   - **On Vercel:** Project → **Settings → Environment Variables**, add `VITE_SUPABASE_URL`
     and `VITE_SUPABASE_ANON_KEY` with the same values, then **redeploy** (Deployments → ⋯ → Redeploy).

6. **Run it:** `npm install` then `npm run dev`. Create an account on the welcome screen and
   you're in. Everything you enter now saves automatically and is there when you come back —
   on any device.

That's the whole backend. No server to host, nothing to keep running, $0.

