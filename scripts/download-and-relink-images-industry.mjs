import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';
import { fileURLToPath } from 'url';

// Resolve __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Directories
const contentDir = path.resolve(__dirname, '../content/industry');
const imgBaseDir = path.resolve(__dirname, '../static/images/industry');

// Ensure base directories exist
fs.mkdirSync(imgBaseDir, { recursive: true });

// Utility to sanitize filenames
const sanitize = name => name.replace(/%20/g, ' ').trim();

// Extract image URLs from markdown text
function extractImageUrls(text) {
  const urls = new Set();
  const mdImg = /!\[[^\]]*\]\((https?:\/\/[^\)]+?\.(?:png|jpe?g|webp|gif))\)/gi;
  const fmImg = /image:\s*['"]?(https?:\/\/[^\s'\"]+?\.(?:png|jpe?g|webp|gif))['"]?/gi;
  let m;
  while ((m = mdImg.exec(text))) urls.add(m[1]);
  while ((m = fmImg.exec(text))) urls.add(m[1]);
  return Array.from(urls);
}

// Download one image
async function downloadImage(url, dest) {
  if (fs.existsSync(dest)) return;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = await res.buffer();
    fs.writeFileSync(dest, buf);
    console.log(`Downloaded: ${dest}`);
  } catch (e) {
    console.warn(`Failed to download ${url}: ${e.message}`);
  }
}

// Main
(async () => {
  const mdFiles = fs.readdirSync(contentDir).filter(f => f.endsWith('.md'));
  for (const mdFile of mdFiles) {
    const mdPath = path.join(contentDir, mdFile);
    let text = fs.readFileSync(mdPath, 'utf-8');
    const urls = extractImageUrls(text);
    if (!urls.length) continue;

    const slug = path.basename(mdFile, '.md');
    const folder = path.join(imgBaseDir, slug);
    fs.mkdirSync(folder, { recursive: true });

    // Download images
    for (const url of urls) {
      const fname = decodeURIComponent(path.basename(new URL(url).pathname));
      const cleanName = fname.replace(/^([0-9a-f]+-)?/, '').replace(/20/g, '');
      const outPath = path.join(folder, cleanName);
      await downloadImage(url, outPath);

      // Update markdown link
      const rel = `/images/industry/${slug}/${cleanName}`;
      const escaped = url.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(`!\\[[^\\]]*\\]\\(${escaped}\\)`, 'g');
      text = text.replace(regex, `![](${rel})`);
      // also replace bare urls
      text = text.replace(new RegExp(escaped, 'g'), rel);
    }

    // Write updated markdown
    fs.writeFileSync(mdPath, text, 'utf-8');
    console.log(`Updated: ${mdFile}`);
  }
})();
