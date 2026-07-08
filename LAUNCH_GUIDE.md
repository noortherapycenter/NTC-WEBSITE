# Noor Therapy Center — Launch Guide

## Quickest path: Netlify drag-and-drop (5 minutes)

1. Go to **https://app.netlify.com/drop**
2. Sign in (free account)
3. Drag this **entire folder** onto the drop zone
4. Netlify gives you a temporary URL like `name-123.netlify.app` — your site is live!

## Connect your domain (noortherapycenter.com)

Once the site is live on Netlify:

1. **Site settings → Domain management → Add custom domain** → enter `noortherapycenter.com`
2. Netlify will show you DNS records to add. Typically:
   - **A record:** `@` → `75.2.60.5` (Netlify's load balancer)
   - **CNAME record:** `www` → `<your-site-name>.netlify.app`
3. Log into your domain registrar (wherever you bought the domain) → find DNS settings → add those two records
4. Wait 1–24 hours for DNS to propagate
5. Netlify will auto-provision a free SSL certificate. Your site goes live at `https://noortherapycenter.com` 🎉

## Files in this package

- `index.html` — main site file (loads all pages)
- `src/` — React components for each page
- `assets/` — logo and images
- `robots.txt` — tells search engines they can index
- `sitemap.xml` — lists all pages for Google to crawl
- `_redirects` — redirects www.noortherapycenter.com to noortherapycenter.com

## After launch — SEO checklist

- [ ] Claim **Google Business Profile** at business.google.com
- [ ] Submit sitemap to **Google Search Console** (search.google.com/search-console)
- [ ] Submit sitemap to **Bing Webmaster Tools**
- [ ] List on **Psychology Today** provider directory
- [ ] List on **Autism Speaks Resource Guide**
- [ ] Claim listings on Yelp, Healthgrades, Nextdoor
- [ ] Ask first 10 families for Google reviews
- [ ] Reach out to local pediatricians for backlinks

## Questions?

The site uses CDN-loaded React (no build step required). Any static host works:
Netlify · Vercel · Cloudflare Pages · GitHub Pages · AWS S3.
