import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { registerSW } from 'virtual:pwa-register'

// One-time cleanup: wipe any leftover service worker registration from before
// this update logic existed, so it can't linger and fight with the current one.
// Guarded by a flag so this only ever runs once per browser.
async function cleanupStaleServiceWorkers() {
  if (!('serviceWorker' in navigator)) return;
  const FLAG = 'bloom-sw-cleanup-v1';
  if (localStorage.getItem(FLAG)) return;
  try {
    const regs = await navigator.serviceWorker.getRegistrations();
    await Promise.all(regs.map((r) => r.unregister()));
  } catch { /* ignore */ }
  localStorage.setItem(FLAG, '1');
}

// Register the service worker WITHOUT forcing a reload. Because skipWaiting +
// clientsClaim are on, the next time this app is opened fresh (which is how
// it's normally used — fully closed, then reopened) it just gets the latest
// version automatically. No mid-session interruption, no repeated refreshing.
cleanupStaleServiceWorkers().finally(() => {
  registerSW({ immediate: true });
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
