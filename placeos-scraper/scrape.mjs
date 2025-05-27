import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const BASE_URL = 'https://www.placeos.com';
const SECTIONS = [
  { url: '/apps', category: 'products' },
  { url: '/suites', category: 'products' }
];

const outputDir = './output';
fs.mkdirSync(outputDir, { recursive: true });

const getLinksFromPage = async (page, category) => {
  // grab any anchor whose href starts with /apps/ or /suites/
  const anchors = await page.$$eval(
    'a[href^="/app/"], a[href^="/suite/"]',
    els => els.map(el => ({
      href: el.getAttribute('href'),
      text: el.textContent.trim()
    }))
  );

  // filter out the listing pages themselves and dedupe
  const seen = new Set();
  return anchors
    .map(({ href, text }) => {
      const url = new URL(href, BASE_URL).href;
      const path = new URL(url).pathname;
      return { url, text, category };
    })
    .filter(item => {
      // drop the listing index pages (/apps, /suites)
      if (['/apps', '/suites'].includes(new URL(item.url).pathname))
        return false;
      if (seen.has(item.url)) return false;
      seen.add(item.url);
      return true;
    });
};

const scrapeIndexPages = async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  let allLinks = [];

  for (const section of SECTIONS) {
    const fullUrl = `${BASE_URL}${section.url}`;
    console.log(`Loading: ${fullUrl}`);
    await page.goto(fullUrl, { waitUntil: 'networkidle' });

    const links = await getLinksFromPage(page, section.category);
    allLinks = [...allLinks, ...links];
  }

  await browser.close();

  // De-dupe links
  const uniqueLinks = Array.from(new Map(allLinks.map(link => [link.url, link])).values());

  fs.writeFileSync(path.join(outputDir, 'links.json'), JSON.stringify(uniqueLinks, null, 2));
  console.log(`Extracted ${uniqueLinks.length} links. Saved to links.json.`);
};

scrapeIndexPages();
