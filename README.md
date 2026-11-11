# MM Builders & Infrastructure

React (Vite) + Tailwind CSS frontend and Node.js / Express / MongoDB backend (MVC).
Design, animation and behaviour are the same as `MM_Builders_v18.html`.

```
mm-builders/
├── backend/                 Express API (MVC)
│   ├── server.js            starts DB + server
│   └── src/
│       ├── app.js           middleware + routes
│       ├── config/          db.js
│       ├── models/          Service, Concept, Blueprint, SiteSetting, Enquiry   (M)
│       ├── controllers/     one file per resource                                (C)
│       ├── routes/          URL → controller                                     (the "V" is JSON)
│       ├── middleware/      validation, admin key, errors
│       ├── data/siteData.js content that is seeded into MongoDB
│       └── seed/seed.js     npm run seed
└── frontend/                React app
    ├── public/              images, videos, concept .mp4, 3D blueprint .html pages
    └── src/
        ├── pages/           Home.jsx, NotFound.jsx
        ├── components/
        │   ├── layout/      Header, Footer, ScrollProgress, PageCurtain, Spotlight
        │   ├── intro/       IntroSequence, LoaderScene, DeskScene, WelcomeScene
        │   ├── hero/ about/ services/ blueprints/ concepts/ approach/ contact/
        │   └── common/      Reveal, ImageSlot, ParticleLayer, Modal, Toast, Icons
        ├── context/         SiteContext (API data), UiContext/UiProvider (dialogs, toast)
        ├── hooks/           useInView, useTilt, useWindowScroll, useReducedMotion
        ├── effects/         heroShader (WebGL), particleModes/Engine, dreamBand
        ├── services/api.js  all fetch() calls
        ├── data/            fallbackSite.js, navLinks.js, approachContent.jsx
        └── styles/          original CSS, split by purpose (order matters, see index.css)
```

## Run it

Requirements: Node 18+ and MongoDB (local, or a free MongoDB Atlas URI).

```bash
npm run install:all          # installs backend + frontend (+ root helper)
# edit backend/.env  → set MONGODB_URI (and ADMIN_API_KEY)
npm run seed                 # copies services, concepts, blueprints, contact info into MongoDB
npm run dev                  # API on :5000, website on http://localhost:5173
```

Without `concurrently`: run `npm run dev` inside `backend/` and `frontend/` in two terminals.

If the API is offline the website still shows complete content from `frontend/src/data/fallbackSite.js`.

### Production
```bash
npm run build                # builds frontend/dist
npm start                    # Express serves the API *and* the built site on PORT
```

### Deploying separate services on Render
For a separate Render API Web Service and frontend Static Site, configure:

* **API Web Service** (Root Directory: `backend`): Build Command `npm install`; Start Command `npm start`.
  Set `NODE_ENV=production`, `MONGODB_URI`, and `CLIENT_ORIGIN` to the frontend's Render URL
  (for example, `https://your-site.onrender.com`). Use comma-separated origins if multiple frontends
  need access; trailing slashes are removed automatically.
* **Frontend Static Site** (Root Directory: `frontend`): Build Command `npm install && npm run build`;
  Publish Directory `dist`. Set `VITE_API_URL` to the API service's Render URL, without a trailing
  slash or `/api` (for example, `https://your-api.onrender.com`).

`CLIENT_ORIGIN` is checked against the browser's exact origin; it is not safe to use `*` for a
production frontend. Vite reads `VITE_API_URL` during the frontend build, so set it before building
or redeploy after changing it. Render supplies the API service's `PORT` automatically.

## API

| Method | URL | Purpose |
|---|---|---|
| GET | `/api/site` | everything the home page needs in one call |
| GET | `/api/services`, `/api/services/:slug` | services |
| GET | `/api/concepts?category=res` | concept designs (`res, com, int, 3d, plan`) |
| GET | `/api/blueprints` | 3D blueprints |
| GET | `/api/settings` | phones, address, WhatsApp text |
| POST | `/api/enquiries` | save an enquiry `{name, phone, message?, service?}` (rate-limited) |
| GET | `/api/enquiries?status=new` | list enquiries — header `x-api-key: <ADMIN_API_KEY>` |
| PATCH | `/api/enquiries/:id/status` | `new / contacted / closed` — needs the key |

Enquiry flow (same as the original): the dialog opens WhatsApp **and** now also saves the enquiry in MongoDB.

## Changing content
* Text, phone numbers, services, concepts, blueprints: edit `backend/src/data/siteData.js` → `npm run seed`
  → then `node frontend/scripts/generate-fallback.mjs` to refresh the offline copy.
* New concept video: put `name.mp4` in `frontend/public/concepts/`, poster in `public/images/concepts/`, add it to `siteData.js`.
* New 3D blueprint: put the `.html` in `frontend/public/blueprints/`, thumbnail in `public/images/blueprints/`.
* Instagram / LinkedIn buttons show "link not configured yet" (as in the original) — set real URLs in
  `Footer.jsx` and `Contact.jsx`.

## Notes
* Tailwind is installed and configured (brand colours/fonts in `tailwind.config.js`; used in `NotFound.jsx`).
  Its CSS reset (preflight) is switched **off**, and the original stylesheet is kept, so the design stays pixel-identical.
* The Google Fonts and the three.js library used inside the 3D blueprint pages load from the internet (as in the original).
#
