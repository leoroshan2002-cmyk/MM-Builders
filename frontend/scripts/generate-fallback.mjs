// Regenerates src/data/fallbackSite.js from the backend seed data so the two never drift apart.
//   usage (from the frontend folder):  node scripts/generate-fallback.mjs
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { settings, services, concepts, conceptFilters, blueprints } from '../../backend/src/data/siteData.js';

const target = fileURLToPath(new URL('../src/data/fallbackSite.js', import.meta.url));

const body = `// Used only when the API cannot be reached (backend offline / first run before seeding).
// It mirrors backend/src/data/siteData.js so the website still looks complete.
// To regenerate after editing the backend data run:  node scripts/generate-fallback.mjs

const fallbackSite = ${JSON.stringify({ settings, services, concepts, conceptFilters, blueprints }, null, 2)};

export default fallbackSite;
`;

fs.writeFileSync(target, body);
console.log('✔ fallbackSite.js regenerated');
