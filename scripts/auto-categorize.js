// Node.js script to auto-categorize Hugo content files based on keyword-topic mapping

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const contentDir = path.join(__dirname, '../content/products');
const topics = [
  "AI", "Analytics", "APIs", "Article", "Automation", "AV", "Campus", "Change Management", "Collaboration",
  "Commercial Real Estate", "Computer Vision", "Configuration", "Coworking", "Desk Booking", "Digital Signage",
  "Downsizing", "Employee Experience", "Energy", "Enterprise", "Event", "Event Management", "Flexible Leasing",
  "Government", "HVAC", "Hybrid Work", "Interface", "Location Status", "Locker Booking", "Marketplace",
  "Meeting Rooms", "Modular Spaces", "Neighborhoods", "Occupancy", "Office Space", "Parking", "Partner",
  "Platform", "Podcast", "Product", "Retrofit", "Room Booking", "RTO", "Safety", "Sales", "Scalability",
  "Smart Building", "Space Planning", "Stagehand", "Surveys", "Sustainability", "Tender", "Utilization",
  "UX", "Visitor Management", "Wayfinding", "WorkMate", "Workplace", "Workplace Flexibility",
  "Workplace Management", "Modules", "Zones", "Systems", "Drivers", "Middleware", "Edge Computing", "Event-Driven Architecture", "Webhooks",
  "Healthcare", "Education", "Hospitality", "Facilities Management", "Property Management",
  "SSO", "Directory Sync", "IoT", "Cost Reduction", "ROI", "Compliance", "Dashboards", "Mobile App", "Self-Service", "Voice Control",
  "How-To", "FAQs", "Case Study"
];

const keywordMap = topics.reduce((acc, topic) => {
  const key = topic.toLowerCase();
  acc[key] = topic;
  return acc;
}, {});

const walkSync = (dir, filelist = []) => {
  fs.readdirSync(dir).forEach(file => {
    const filepath = path.join(dir, file);
    if (fs.statSync(filepath).isDirectory()) {
      walkSync(filepath, filelist);
    } else if (file.endsWith('.md')) {
      filelist.push(filepath);
    }
  });
  return filelist;
};

const getCategoriesFromContent = (content) => {
  const lowerContent = content.toLowerCase();
  const matched = Object.keys(keywordMap).filter(keyword => lowerContent.includes(keyword));
  return [...new Set(matched.map(k => keywordMap[k]))];
};

const processFile = (filepath) => {
  const raw = fs.readFileSync(filepath, 'utf8');
  const frontmatterMatch = raw.match(/^---\n([\s\S]*?)\n---/);
  if (!frontmatterMatch) return;

  const fm = yaml.load(frontmatterMatch[1]);
  const body = raw.replace(frontmatterMatch[0], '');
  const categories = new Set(fm.categories || []);

  getCategoriesFromContent(raw).forEach(c => categories.add(c));

  fm.categories = Array.from(categories).sort();
  const newFrontmatter = `---\n${yaml.dump(fm).trim()}\n---`;
  const newContent = `${newFrontmatter}\n${body.trimStart()}`;
  fs.writeFileSync(filepath, newContent);
  console.log(`✅ Updated categories in: ${path.relative(contentDir, filepath)}`);
};

walkSync(contentDir).forEach(processFile);
console.log('✅ All content files processed.');
