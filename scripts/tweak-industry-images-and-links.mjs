import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Resolve __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Paths to industry content and static images
const contentDir = path.resolve(__dirname, '../content/industry');
const imgBaseDir = path.resolve(__dirname, '../static/images/industry');

// 1) Rename image files: strip hex prefix, replace spaces with dashes, lowercase, collapse dashes
fs.readdirSync(imgBaseDir, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .forEach(dirent => {
    const slug = dirent.name;
    const folder = path.join(imgBaseDir, slug);

    fs.readdirSync(folder).forEach(file => {
      // Match leading hex string and optional separator
      const match = file.match(/^([0-9a-f]+)[-_]?(.*)$/i);
      if (!match) return;
      const original = match[2];
      let clean = original
        .replace(/\s+/g, '-')     // spaces → dashes
        .toLowerCase()             // lowercase
        .replace(/-+/g, '-');      // collapse multi-dashes
      const oldPath = path.join(folder, file);
      const newPath = path.join(folder, clean);
      fs.renameSync(oldPath, newPath);
      console.log(`Renamed file: ${file} → ${clean}`);
    });
  });

// 2) Update Markdown: fix image links and add alt text
fs.readdirSync(contentDir)
  .filter(f => f.endsWith('.md'))
  .forEach(mdFile => {
    const mdPath = path.join(contentDir, mdFile);
    let text = fs.readFileSync(mdPath, 'utf-8');

    // Regex to match image links: ![alt](/images/industry/<slug>/<filename>)
    const imgLinkRegex = /!\[[^\]]*\]\(\/?images\/industry\/([\w-]+)\/([^)]+)\)/g;
    const updated = text.replace(imgLinkRegex, (match, slug, filename) => {
      // Clean filename: remove hex prefix and normalize
      const ext = path.extname(filename);
      const nameOnly = filename.replace(/^[0-9a-f]+[-_]*/i, '');
      const cleanName = nameOnly
        .replace(/\s+/g, '-')
        .toLowerCase()
        .replace(/-+/g, '-');
      // Derive alt text from cleanName
      const base = path.basename(cleanName, ext);
      const altText = base.replace(/-/g, ' ');
      // Build new path
      const cleanPath = `/images/industry/${slug}/${cleanName}`;
      return `![${altText}](${cleanPath})`;
    });

    if (updated !== text) {
      fs.writeFileSync(mdPath, updated, 'utf-8');
      console.log(`Updated markdown: ${mdFile}`);
    }
  });
