import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';

const contentDirs = [
  { dir: 'content/posts', imgDir: 'static/images/posts' },
  { dir: 'content/projects', imgDir: 'static/images/projects' }
];

const cdnHost = 'cdn.prod.website-files.com';

const slugify = (str) =>
  str.toLowerCase().replace(/[\s%]+/g, '-').replace(/[^\w.-]+/g, '-').replace(/--+/g, '-').replace(/^-+|-+$/g, '');

const extractImageUrls = (text) => {
  const frontMatterMatch = text.match(/image:\s*["']?(https?:\/\/[^\s"']+)["']?/i);
  const inlineMatches = [...text.matchAll(/!\[[^\]]*\]\((https:\/\/[^\)]+)\)/g)];
  const inlineUrls = inlineMatches.map(m => m[1]);

  const urls = [];
  if (frontMatterMatch) urls.push(frontMatterMatch[1]);
  return [...new Set([...urls, ...inlineUrls])].filter(url => url.includes(cdnHost));
};

const downloadImage = async (url, outPath) => {
  try {
    if (fs.existsSync(outPath)) {
      console.log(`↪️  Skipped (already exists): ${outPath}`);
      return;
    }
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to download ${url}`);
    const buffer = await res.buffer();
    fs.writeFileSync(outPath, buffer);
    console.log(`✅ Downloaded: ${url} → ${outPath}`);
  } catch (err) {
    console.warn(`⚠️ ${err.message}`);
  }
};

const processFile = async (filePath, imgOutputDir, section) => {
  const content = fs.readFileSync(filePath, 'utf-8');
  const imageUrls = extractImageUrls(content);
  let updatedContent = content;

  // Extract date from front matter
  const dateMatch = content.match(/date:\s*(\d{4})-(\d{2})-\d{2}/);
  const year = dateMatch ? dateMatch[1] : 'unknown';
  const month = dateMatch ? dateMatch[2] : '00';
  const nestedDir = path.join(imgOutputDir, year, month);
  fs.mkdirSync(nestedDir, { recursive: true });

  for (const url of imageUrls) {
    const rawFilename = path.basename(new URL(url).pathname);
    const parts = rawFilename.split('_');
    const filenameWithExt = parts.length > 1 ? parts.slice(1).join('_') : rawFilename;

    let decoded = decodeURIComponent(filenameWithExt);
    decoded = decoded
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w.-]+/g, '-')
      .replace(/--+/g, '-')
      .replace(/^-+|-+$/g, '');

    let ext = path.extname(decoded);
    let base = decoded.replace(ext, '');
    if (ext === '.jpeg') ext = '.jpg';

    const localFileName = `${base}${ext}`;
    const localPath = `/images/${section}/${year}/${month}/${localFileName}`;
    const outputPath = path.join(nestedDir, localFileName);

    await downloadImage(url, outputPath);
    updatedContent = updatedContent.replaceAll(url, localPath);

    // Generate alt text (inline images only)
    const altText = base.replace(/[-_]/g, ' ').replace(/\.[^/.]+$/, '').trim();
    updatedContent = updatedContent.replace(
      new RegExp(`!\[[^\]]*\]\(${localPath}\)`, 'g'),
      `![${altText}](${localPath})`
    );
  }

  fs.writeFileSync(filePath, updatedContent);
};

const main = async () => {
  for (const { dir, imgDir } of contentDirs) {
    const section = path.basename(imgDir);
    fs.mkdirSync(imgDir, { recursive: true });

    const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));
    for (const file of files) {
      const filePath = path.join(dir, file);
      await processFile(filePath, imgDir, section);
    }
  }
};

main();
