import fs from 'fs';
import path from 'path';
import { chromium } from 'playwright';
import TurndownService from 'turndown';

// Read scraped product links
const links = JSON.parse(fs.readFileSync('./output/links.json', 'utf-8'));

// Initialize Turndown with rules to handle divs and line breaks
const turndown = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced'
});
turndown.addRule('divParagraph', {
  filter: ['div'],
  replacement: content => content.trim() ? `\n\n${content.trim()}\n\n` : ''
});
turndown.addRule('lineBreak', {
  filter: 'br',
  replacement: () => '  \n'
});

// Ensure output directory for products
const outputDir = path.join('content', 'products');
fs.mkdirSync(outputDir, { recursive: true });

// Scrape a single product page for targeted content, images, and Wistia embeds
async function scrapeProduct(url, browser) {
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });

  // Derive slug from URL
  const segments = new URL(url).pathname.split('/').filter(Boolean);
  const slug = segments.pop() || 'product';

  // Extract summary from heading classes
  let summary = '';
  const summaryEl = await page.$('h1 span.heading, h2.uui-heading-medium');
  if (summaryEl) {
    summary = (await summaryEl.textContent()).trim();
  }

  // Title is the slug
  const title = slug;

  // Extract targeted content HTML
  let html = '';
  const contentHtml = await page.$$eval(
    'h1 span.heading, h2.uui-heading-medium, div.paragraph-large, div.paragraph',
    els => els.map(el => el.outerHTML).join('')
  );
  if (contentHtml && contentHtml.trim()) {
    html = contentHtml;
    console.log(`Captured targeted content for ${slug}`);
  } else {
    console.warn(`No targeted selectors matched for ${url}, capturing full body content.`);
    html = await page.$eval('body', el => el.innerHTML);
  }

  // Convert HTML to Markdown
  const content = turndown.turndown(html);

  // Extract relevant images
  const images = await page.$$eval(
    'img.uui-layout04_image-wrapper, img.image, img.image.outline',
    els => els.map(img => img.src).filter(src => src && src.startsWith('http'))
  );

  // Extract Wistia embeds
  const embeds = await page.$$eval(
    'iframe[src*="wistia"], script[src*="wistia"], script[src*="fast.wistia"]',
    els => els.map(el => el.outerHTML)
  );

  await page.close();
  return { title, slug, summary, content, images, embeds };
}

// Write out Markdown file for a product
function writeProduct({ title, slug, summary, content, images, embeds }) {
  const fm = `---
title: "${title}"
slug: "${slug}"
summary: "${summary}"
categories: ["product"]
---\n\n`;
  let md = fm + content + '\n\n';
  images.forEach(src => md += `![Image](${src})\n\n`);
  embeds.forEach(embed => md += embed + '\n\n');
  fs.writeFileSync(path.join(outputDir, `${slug}.md`), md);
  console.log(`✅ Wrote ${slug}.md`);
}

// Main flow
(async () => {
  const browser = await chromium.launch({ headless: true });
  for (const { url } of links) {
    try {
      const product = await scrapeProduct(url, browser);
      writeProduct(product);
    } catch (err) {
      console.warn(`⚠️ Failed to scrape ${url}: ${err.message}`);
    }
  }
  await browser.close();
})();
