# FUAD Care — Hostinger Deployment Guide

## Zaroori baat
Ye Next.js app + Supabase admin hai, isko **Node.js** chahiye.
Hostinger par ye **Business Web Hosting / Cloud** plan ke "Node.js Web App" se chalta hai
(basic Single/Premium shared plan par Node.js nahi chalta — wahan sirf static HTML chalta hai).
VPS ho to bhi chalega.

## Pehle kya galat tha (fix ho chuka)
1. `generateStaticParams()` ke andar `cookies()` use ho raha tha → Supabase keys ke sath **build fail**. Fix: cookie-free public client.
2. Zip me Windows ka `node_modules` + `.next` tha → Linux server par crash (lightningcss / swc / oxide). Ab zip me ye hain hi nahi.
3. `@vercel/analytics` Hostinger par bekaar tha → hata diya.
4. `/contact` aur `/privacy` links 404 de rahe the → pages bana diye.
5. `sitemap.xml` / `robots.txt` the hi nahi → add (dynamic, admin se add hui services/counsellors khud aa jayengi).

## Steps (Hostinger hPanel)
1. **Websites → Add website → Node.js Apps** (ya GitHub se import).
2. Zip upload karein (`fuad-care-hostinger.zip`) ya GitHub repo connect karein.
3. Settings:
   - Framework: **Next.js**
   - Node version: **22.x** (minimum 20.9)
   - Install: `npm install`
   - Build: `npm run build`
   - Start: `npm start`
4. **Environment variables** (build se pehle):
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_SITE_URL` = `https://fuad.care`
5. Deploy / Redeploy.
6. Domain connect karein, **SSL (Force HTTPS)** on karein.

## Supabase side
Supabase → Authentication → URL Configuration:
- Site URL: `https://fuad.care`
- Redirect URLs: `https://fuad.care/**`

## SEO checklist
- Check: `https://fuad.care/robots.txt` aur `https://fuad.care/sitemap.xml`
- Google Search Console me domain add karein → Sitemaps → `sitemap.xml` submit.
- www → non-www redirect `next.config.mjs` me hai (domain `fuad.care` ke liye). Domain badle to wahan `www.fuad.care` / `https://fuad.care` badal dein.
- `/admin` noindex hai aur robots me blocked.

## Agar build/start fail ho
- Node version 20.9+ hai? (22 recommended)
- 3 env variables set hain?
- `node_modules` / `.next` upload to nahi kiye? (nahi karne)
- Hostinger Build log me jo error aaye wo bhej dein.
