# PRS Group, Inc. — Blueprint WebStudio Concept

Independent, non-official redesign concept for http://www.prsplant.net/ (PRS Group, Inc., Port of Tacoma, WA).
Preview: https://prs.blueprintwebstudio.com (noindex; the demo code lives in the Neon `demos` table).

Custom one-page build: content in `src/App.jsx`, styles in `src/styles.css`, concept widget in `src/concept.jsx`.

## Local setup
```bash
npm install
cp .env.example .env.local
npm run dev
```

## Deployment
Vercel project `prs-group` (framework Vite, team mrwerner-s-projects); pushes to `main` deploy automatically. Domain `prs.blueprintwebstudio.com` is a CNAME at Porkbun (use the target Vercel shows).
Optional env vars: `VITE_CONCEPT_END_DATE` (defaults to 2026-12-07 23:59 Pacific), `RESEND_API_KEY` / `CONTACT_TO_EMAIL` / `CONTACT_FROM_EMAIL` for the waste acceptance form (`api/contact.js`; demo mode without them).
Add `prs.blueprintwebstudio.com` to `allowedOrigins` in blueprint-digital `api/demo-interest.js`.

## Design
- Logo: their original flame-drum-and-drop mark inside red chasing arrows, on a white rounded plate in the navy header (the only file on the site is 48 × 60px). Favicon is the same mark.
- Palette from the original: the Homestead header navy #164C78 and charcoal panels #48484E, the logo's red #E8513F (deepened to #D9412F for buttons and contrast), and the recycling green from their "Going Green Washington" badge, on a cool off-white.
- Fonts: Archivo (wide, heavy headings), Public Sans (body), IBM Plex Mono (labels, hours, permit numbers).
- Motif: the logo's three-arrow cycle (slowly turning behind the hours card), drum-label material cards (NON-HAZ · 01–04), a "plant status" ticket that shows today's hours in Pacific time and whether the plant is open or on call, a numbered 4-step load process with arrow joints, and a permit board set in mono.
- Section order: emergency topline → header with phone → hero over their Mount Rainier / Port of Tacoma photo with the hours ticket → intake strip (barrels, totes, trucks, RR cars) → what we accept → how a load is handled (profile, deliver, analyze, treat & test) with the lab partner → hours, contacts, request form and document downloads → regulatory compliance and permits → federal & state (codes, past performance, clients, partners, associations and badges) → about and plant photos → footer.

## What changed from the current site
- Ten separate Homestead pages (several with one paragraph each) folded into one page with working anchors and a mobile menu; the old fixed-width 980px layout had no mobile view.
- The "Alaska" menu item links to a page that now returns "The resource you are looking for has been removed". The concept drops it and uses the capability statement's wording instead (materials received from throughout Washington and Alaska).
- Hours, the 24/7 emergency number and the office phone were on three different pages; now they're in the topline, the hero and the contact section.
- The services page was a single run-on list joined with asterisks; materials are grouped into four labeled categories.
- Permits, licenses and insurance numbers (Regulatory Compliance page) and the government codes from the capability statement PDF (DUNS, CAGE, NAICS) are now readable lists.
- Added a request form for waste acceptance (the old site had none) and kept the three PDF downloads.
- Removed the "Website Designed at Homestead" ads, the broken Weather Underground image (kept as a text link) and the generic stock photos of military vehicles, an aircraft carrier and agency logos on the Federal & State page.
- Checked at 1280px and 390px with no sideways scrolling.

## Photos
All photos are the company's own files from prsplant.net: the Mount Rainier / Port of Tacoma hero (719px, cropped out of its grey frame), the plant tanks, offloading trucks, totes, tanker trailers and vactor trucks, the Port of Tacoma crane photo and the drums photo (some may be stock; see below). Most are under 800px wide, so replace them with original high-resolution files before launch. A larger or vector logo file is needed (the site only has a 48 × 60px JPEG).
Badges shown: NORA (Association of Responsible Recyclers) and Going Green Washington, plus the Spectra Laboratories logo from the Regulatory Compliance page. The PDF links point to the files on prsplant.net.

## Owner should confirm
- Contact roles: the Contact page lists Josh Simmons as both Plant Manager and General Manager. The concept shows "General Manager · Plant Manager".
- Billing contact name: the page says "Jillan Smith" but the email is Jillian@prsplant.net. The concept uses "Jillian".
- The capability statement PDF is from 2018 and lists Tom Smith as the contact and "Waste Disposal: 2149" / "TAC-026-2015", while the website lists Waste Disposal Authorization # 2826 and TAC 026-2025. The page uses the website's numbers; the PDF probably needs updating.
- Whether the Alaska service is still offered, and what the Alaska page should say (it is gone).
- The "2 to 3 days" profile response time comes from the waste profile PDF; confirm it still holds.
- Which photos are their own: the drums, totes and vactor photos may be stock images.
- Use of the NORA, Going Green Washington and Spectra Laboratories logos, and whether the NORA, PSCWA and Propeller Club memberships are current.
- Whether the "Past performance" references (US Coast Guard, City of Tacoma, WSDOT, NRC Environmental, Safety-Kleen) and listed clients and partners can be shown publicly.
- Saturday and Sunday are listed only as "ON CALL"; confirm the plant takes drop-offs then only by arrangement.
- No reviews are shown (none on the current site).
