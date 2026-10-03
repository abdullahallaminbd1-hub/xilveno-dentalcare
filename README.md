# BrightSmile DentalCare - Cloudflare-native demo

Standalone Cloudflare Worker conversion of the approved local BrightSmile concept. The production runtime is Worker JavaScript, Static Assets, dedicated D1 for appointment-request/rate-limit/image-slot records, and dedicated R2 for optional replacement photographs. The WordPress installation and its SQLite database are used only as a local migration reference and are never read by the deployed Worker.

## Development and deployment

Requirements: Node.js, npm, and Wrangler 4.

```powershell
npm install
npm run dev
npm run build
```

Apply the dedicated D1 migration after creating the database:

```powershell
npx wrangler d1 migrations apply xilveno-dentalcare-db --remote
```

Deploy with `npm run deploy`. The Worker configuration binds only `xilveno-dentalcare-db` and `xilveno-dentalcare-media`. Production metadata uses `https://dental.xilveno.shop` as its canonical base. No portfolio resources or hostnames are referenced.

To refresh the initial static content from the approved local fixture, run:

```powershell
python scripts/import-reference.py
```

The import is offline-only and allowlists published page content, service/team descriptions, and theme settings. It excludes WordPress core, users, comments, generic starter pages, WordPress's generated privacy-policy boilerplate, and private appointment requests. `src/content/reference.json` is the production content snapshot.

## Pages

`/`, `/about/`, `/services/`, `/services/<slug>/` (treatments and team profiles), `/team/`, `/patient-info/`, `/contact/`, `/book/`, `/privacy-policy/`, plus the Worker-rendered 404. SEO routes include `/robots.txt` and `/sitemap.xml`.

## Forms and privacy

Appointment requests are validated in the browser and Worker, protected by a hidden honeypot, minimum form-completion time, and a D1-backed per-IP-hash rate limit. Accepted requests are stored in the dedicated D1 database and removed after 30 days by a daily scheduled cleanup. The demo has no configured mail provider, so it explicitly reports that a request was saved and does not claim that a clinic received it or that an appointment was booked. The site and forms identify the practice as fictional and tell visitors not to submit real medical or personal information.

## Media

No final photographs are included in the approved reference. Its original generated artwork remains the image fallback. See [IMAGE-MANIFEST.md](./IMAGE-MANIFEST.md) for all approved slots, intended use, and recommended dimensions. Production image management is through the single central Admin at `https://xilveno.shop/admin/` → **BrightSmile Dental** → **Images** or **Media Library**. This updates only BrightSmile's dedicated D1/R2. The `npm run image` helper is for local development only.

## Source of truth

The original design tokens, responsive CSS, generated fallback artwork, navigation behavior, accordion behavior, and reveal animations were carried forward from the approved BrightSmile theme. The Worker renders semantic HTML using those exact classes. No WordPress/PHP/database runtime or package framework is required.
