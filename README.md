# MN Resource & Recovery Hub

A single static Minnesota support website combining three uploaded tools:

- **Housing & Treatment Navigator** — 309 records across housing, residential treatment, IOP/outpatient, recovery housing, reentry, and access points.
- **Minnesota Benefits Navigator** — 19 benefit/support programs, matcher, saved programs, and document checklist.
- **Recovery Meeting Finder** — 37 fellowships/pathways with filters, saved options, and official meeting-finder links.

## Open locally

Open `index.html` in a browser. No build step is required.

## Deploy

Upload this entire folder to Cloudflare Pages, Netlify, GitHub Pages, or Vercel. The included `netlify.toml` publishes the project root.

## Main files

- `index.html` — unified hub homepage with whole-site search
- `resources.html` — housing/treatment navigator
- `benefits.html` — benefits navigator
- `meetings.html` — recovery meeting finder
- `portal-nav.css` — shared cross-site navigation
- `portal.css`, `portal.js`, `portal-search-data.js` — hub homepage
- `resource-*` — housing/treatment assets
- `meeting-*` — meeting finder assets

## Notes

The site is static. Existing browser-storage features remain local to the device. Availability, schedules, eligibility, funding, insurance, costs, and referral rules can change; verify directly with official sources before relying on a listing.
