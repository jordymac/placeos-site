// Node.js script to generate integration_categories.yaml from existing integrations.yaml

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const integrationsPath = path.join(__dirname, '../data/integrations.yaml');
const outputCategories = path.join(__dirname, '../data/integration_categories.yaml');

const toTitleCase = (str) => {
  return str
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (l) => l.toUpperCase());
};

const integrations = yaml.load(fs.readFileSync(integrationsPath, 'utf8'));

const categorySet = new Set(integrations.map(item => item.category));
const categories = {};
categorySet.forEach(category => {
  categories[category] = {
    label: toTitleCase(category),
    icon: `/icons/categories/${category}.svg`
  };
});

const catYaml = yaml.dump(categories, { lineWidth: -1 });
fs.writeFileSync(outputCategories, catYaml);

console.log(`✅ Generated ${categorySet.size} categories in data/integration_categories.yaml`);
