# eMigrate 2.0 Modernization Portal (Prototype)

Front-end prototype of a Digital Public Infrastructure portal for emigration clearance (MEA, Government of India): emigrant / employer / recruiting-agent / project-exporter forms, officer dashboards (POE, PGE, Mission), MRW wage lookup, QR contract passes, and the rule-based "eMigrate Mitra" help assistant.

> Prototype only. All data is sample data kept in the browser's `localStorage`; there is no backend, no real AI/API calls and no API keys. Demo logins (POE / PGE / MISSION) are client-side only and **must not** be used in production.

## Run locally
```
npm install
npm run dev      # http://localhost:3000
npm run build    # production build -> dist/
npm run lint     # type-check
```

## Deploy on Vercel
1. Push this folder to a Git repo (or run `vercel` from this folder).
2. Framework preset: **Vite** (auto-detected). Build command `npm run build`, output directory `dist`.
3. No environment variables are needed.
