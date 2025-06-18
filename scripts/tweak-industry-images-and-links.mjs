import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Resolve __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Paths to industry content and static images
const contentDir = path.resolve(__dirname, '../content/industry');
const imgBaseDir = path.resolve(__dirname, '../static/images/industry');

// 1) Rename image files: strip hex prefix, replace spaces with dashes, lowercase
fs.readdirSync(imgBaseDir, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .forEach(dirent => {
    const slug = dirent.name;
    const folder = path.join(imgBaseDir, slug);

    fs.readdirSync(folder).forEach(file => {
      // Match leading hex string and underscore
      const match = file.match(/^([0-9a-f]+)_+(.*)$/i);
      if (!match) return;
      const originalName = match[2];
      // Replace spaces with dashes, to lower case, collapse multiple dashes
      let cleanName = originalName
        .replace(/\s+/g, '-')
        .toLowerCase()
        .replace(/-+/g, '-');
      const oldPath = path.join(folder, file);
      const newPath = path.join(folder, cleanName);
      fs.renameSync(oldPath, newPath);
      console.log(`Renamed: ${file} → ${cleanName}`);
    });
  });

// 2) Update Markdown in industry pages: fix paths and add alt text
fs.readdirSync(contentDir)
  .filter(f => f.endsWith('.md'))
  .forEach(mdFile => {
    const mdPath = path.join(contentDir, mdFile);
    let text = fs.readFileSync(mdPath, 'utf-8');

    // Regex to find image links: ![alt](/images/industry/<slug>/<filename>)
    const imgLinkRegex = /!\[[^\]]*\]\(\/?images\/industry\/([\w-]+)\/([^)]+)\)/g;
    text = text.replace(imgLinkRegex, (_, slug, filename) => {
      // Derive alt text from filename (remove extension, replace dashes)
      const nameNoExt = path.basename(filename, path.extname(filename));
      const altText = nameNoExt.replace(/-/g, ' ');
      // Build cleaned path
      const cleanPath = `/images/industry/${slug}/${filename}`;
      return `![${altText}](${cleanPath})`;
    });

    fs.writeFileSync(mdPath, text, 'utf-8');
    console.log(`Updated markdown: ${mdFile}`);
  });
