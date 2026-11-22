// Rebuilds site/catalogue.json from every site/tools/<slug>/meta.json.
// Client pages are deliberately left out of the public catalogue.
import { readdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
const dir = 'site/tools';
const tools = existsSync(dir) ? readdirSync(dir, { withFileTypes: true })
  .filter(d => d.isDirectory() && existsSync(`${dir}/${d.name}/meta.json`))
  .map(d => ({ slug: d.name, url: `/tools/${d.name}/`, ...JSON.parse(readFileSync(`${dir}/${d.name}/meta.json`, 'utf8')) }))
  .sort((a, b) => String(b.updated || '').localeCompare(String(a.updated || ''))) : [];
writeFileSync('site/catalogue.json', JSON.stringify({ generated: new Date().toISOString(), tools }, null, 2) + '\n');
console.log(`Catalogue: ${tools.length} tool(s)`);
