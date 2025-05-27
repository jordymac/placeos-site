import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Resolve __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Directories
const contentDir = path.resolve(__dirname, '../content/products');
const imgBaseDir = path.resolve(__dirname, '../static/images/products');

// Ensure base image directory exists
if (!fs.existsSync(imgBaseDir)) {
  console.error(`Image directory not found: ${imgBaseDir}`);
  process.exit(1);
}

// Rename image files: remove all '20' substrings
fs.readdirSync(imgBaseDir, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .forEach(dirent => {
    const slug = dirent.name;
    const folder = path.join(imgBaseDir, slug);

    fs.readdirSync(folder)
      .filter(file => file.includes('20'))
      .forEach(file => {
        const newName = file.replace(/20/g, '');
        const oldPath = path.join(folder, file);
        const newPath = path.join(folder, newName);
        fs.renameSync(oldPath, newPath);
        console.log(`Renamed file: ${file} → ${newName}`);
      });
  });

// Update Markdown links: remove '20' in image paths in .md files
const mdFiles = fs.readdirSync(contentDir).filter(f => f.endsWith('.md'));
mdFiles.forEach(mdFile => {
  const mdPath = path.join(contentDir, mdFile);
  let text = fs.readFileSync(mdPath, 'utf-8');

  // Regex matches '/static/images/products/<slug>/<filename>' or without leading slash
  const updated = text.replace(
    /(\/?static\/images\/products\/[^\/]+\/)([^)\s]+)/g,
    (_, prefix, filename) => {
      const cleanFile = filename.replace(/20/g, '');
      return `${prefix}${cleanFile}`;
    }
  );

  if (updated !== text) {
    fs.writeFileSync(mdPath, updated, 'utf-8');
    console.log(`Updated image links in ${mdFile}`);
  }
});