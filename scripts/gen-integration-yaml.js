// Node.js script to generate data/integrations.yaml
// Scans static/icons/integrations/*.svg and guesses name + category

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const inputDir = path.join(__dirname, '../static/icons/integrations');
const outputPath = path.join(__dirname, '../data/integrations.yaml');

const guessCategory = (filename) => {
  const f = filename.toLowerCase();
  if (f.includes('meraki') || f.includes('cisco') || f.includes('aruba')) return 'network';
  if (f.includes('zoom') || f.includes('teams') || f.includes('meet')) return 'conferencing';
  if (f.includes('okta') || f.includes('ad') || f.includes('auth')) return 'authentication';
  if (f.includes('calendar') || f.includes('exchange')) return 'calendar';
  if (f.includes('scim') || f.includes('ldap') || f.includes('directory')) return 'directory';
  return 'other';
};

const toTitleCase = (str) => {
  return str
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (l) => l.toUpperCase());
};

const files = fs.readdirSync(inputDir)
  .filter(file => file.endsWith('.svg'))
  .map(file => {
    const key = path.basename(file, '.svg');
    return {
      name: toTitleCase(key),
      key,
      category: guessCategory(key),
      icon: `/icons/integrations/${file}`
    };
  });

const yamlStr = yaml.dump(files, { lineWidth: -1 });
fs.writeFileSync(outputPath, yamlStr);

console.log(`✅ Generated ${files.length} integrations in data/integrations.yaml`);
