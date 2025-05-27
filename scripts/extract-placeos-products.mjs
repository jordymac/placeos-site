import axios from 'axios';
import cheerio from 'cheerio';
import fs from 'fs/promises';
import path from 'path';

// Base URL and listing pages
const baseUrl = 'https://www.placeos.com';
const listings = [
  { path: '/apps', type: 'products' },
  { path: '/suites', type: 'products' }
];

async function fetchHtml(url) {
  const { data } = await axios.get(url);
  return data;
}

(async () => {
  const links = [];

  for (const { path: listingPath, type } of listings) {
    const url = `${baseUrl}${listingPath}`;
    console.log(`Fetching index: ${url}`);
    const html = await fetchHtml(url);
    const $ = cheerio.load(html);

    $(`a[href^="/apps/"], a[href^="/suites/"]`).each((_, el) => {
      const href = $(el).attr('href');
      if (href) {
        const fullUrl = new URL(href, baseUrl).href;
        links.push({ url: fullUrl, type });
      }
    });
  }

  // Dedupe
  const unique = Array.from(new Map(links.map(l => [l.url, l])).values());

  // Ensure output folder
  const outDir = path.join('.', 'output');
  await fs.mkdir(outDir, { recursive: true });
  await fs.writeFile(path.join(outDir, 'product-links.json'), JSON.stringify(unique, null, 2));

  console.log(`Wrote ${unique.length} product links to output/product-links.json`);
})();
