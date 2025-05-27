import fs from 'fs';
import path from 'path';
import { chromium } from 'playwright';
import TurndownService from 'turndown';

const links = JSON.parse(fs.readFileSync('./output/links.json', 'utf-8'));
const turndown = new TurndownService();

// Output directories
const outputMap = {
  'blog': 'content/posts',
  'webinar': 'content/posts',
  'product-update': 'content/posts',
  'project': 'content/projects'
};

for (const dir of Object.values(outputMap)) {
  fs.mkdirSync(dir, { recursive: true });
}

const slugify = str =>
  str.toLowerCase().replace(/[^\w]+/g, '-').replace(/(^-|-$)+/g, '');

const scrapePost = async (url, category, browser) => {
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });

  const title = await page.title() || 'Untitled';
  const h1 = await page.locator('h1').first().textContent();
  const cleanTitle = h1 || title;

  const summary = await page.locator('p').first().textContent() || '';

  let articleHTML = '';

try {
  // Exact match for Webflow blog content
  articleHTML = await page.locator('div.rich-text.w-richtext').first().innerHTML();
} catch {
  articleHTML = '';
}

  const mainContent = articleHTML ? turndown.turndown(articleHTML) : '';

  let date = new Date().toISOString().split('T')[0]; // fallback = today
try {
  const rawDate = await page.locator('div.blog-post-date').innerText();
  const parsed = new Date(rawDate);
  if (!isNaN(parsed)) {
    date = parsed.toISOString().split('T')[0];
  }
} catch {
  // leave default
}
let image = '';

try {
  if (url.includes('/projects/')) {
    // Use hero image from case study
    image = await page.locator('div.case-study-image-wrapper img').first().getAttribute('src');
  } else {
    // Use blog post image
    image = await page.locator('#scraper').getAttribute('src');
  }

  if (image) {
    image = new URL(image, url).href;
  }
} catch {
  image = '';
}


  let author = '';
try {
  author = await page.locator('div.blog-post-author-name').innerText();
} catch {
  author = '';
}

  await page.close();

  return {
    title: cleanTitle,
    slug: slugify(cleanTitle),
    date,
    summary: summary.trim(),
    content: mainContent.trim(),
    category,
    author,
    image: image ? new URL(image, url).href : ''
  };
};

const writePost = (post, folder) => {
  const md = `---
title: "${post.title}"
date: ${post.date}
categories: ["${post.category}"]
summary: "${post.summary}"
tags: []
author: "${post.author}"
image: "${post.image}"
---

${post.content}
`;

  const filepath = path.join(folder, `${post.slug}.md`);
  fs.writeFileSync(filepath, md);
  console.log(`✅ Wrote ${filepath}`);
};

const main = async () => {
  const browser = await chromium.launch({ headless: true });

  for (const { url, category } of links) {
    const folder = outputMap[category];
    try {
      const post = await scrapePost(url, category, browser);
      writePost(post, folder);
    } catch (err) {
      console.warn(`⚠️  Failed to scrape ${url}:`, err.message);
    }
  }

  await browser.close();
};

main();
