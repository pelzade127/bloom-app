import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!url || !key) {
  console.error(
    "Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY. " +
    "Add them to a .env file locally and to your Vercel project's Environment Variables."
  );
}

export const supabase = createClient(url, key, {
  auth: {
    persistSession: true,   // keep the session in localStorage across closes/reopens
    autoRefreshToken: true, // silently renew it so it doesn't expire while the app is closed
    storage: window.localStorage,
  },
});
