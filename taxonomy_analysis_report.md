# PlaceOS Content Taxonomy Analysis Report

## Executive Summary

This report provides a comprehensive analysis of the taxonomy structure across all PlaceOS content types by extracting frontmatter fields from 100 markdown files in the `/content/` directory.

### Files Analyzed
- **Products**: 10 files (from `/content/products/`)
- **Projects**: 5 files (from `/content/projects/`)
- **Posts/Blog**: 85 files (from `/content/posts/`)
- **Total**: 100 markdown files

## Taxonomy Fields Analysis

### 1. hasTopic (Semantic Topics)
**Usage**: Only found in Products (39 unique values)

**Distribution by Content Type**:
- Products: 39 unique values
- Projects: 0 values  
- Posts: 0 values

**All Unique Values** (39 total):
- AI Event Triggering
- AV Automation
- AV Control
- AV Device Monitoring
- AV Over IP
- BMS Automation
- Boardroom AV Support
- Browser-Based AV Control System
- Building Energy Management
- Camera Feed Automation
- Campus AV Infrastructure
- Classroom AV Control
- Commercial HVAC Efficiency
- Computer Vision
- Demand Control Ventilation
- Desk Booking
- Digital Signage Management
- Edge AI for Buildings
- Energy Management Software
- Energy Optimization
- Hybrid Work
- Lecture Theatre AV Control
- Meeting Room AV Control
- No-Code AI Tools
- Occupancy-Based HVAC Control
- People Counting
- Real-Time Object Detection
- Remote AV Reboot
- Remote AV Troubleshooting
- Room Booking
- Sensorless Occupancy Monitoring
- Smart Building Automation
- Space Utilization
- Surveillance Automation
- Video Analytics
- Visitor Management
- Workplace Experience
- Workplace Management System
- Workplace Occupancy Monitoring

### 2. isMainTopicOf (Primary Topic Definition)
**Usage**: Only found in Products (5 unique values)

**Distribution by Content Type**:
- Products: 5 unique values
- Projects: 0 values
- Posts: 0 values

**All Unique Values** (5 total):
- HVAC Automation
- LensPath – No-Code Computer Vision AI for Real-Time Actions
- StageHand – Browser-Based AV Control System
- WorkMate - Workplace Management Platform
- desk booking

### 3. categories (Content Classification)
**Usage**: Found across all content types (66 unique values total)

**Distribution by Content Type**:
- Products: 39 unique values
- Projects: 38 unique values
- Posts: 59 unique values

**All Unique Categories** (66 total):
- AI
- APIs (Posts only)
- AV
- Analytics
- Article (Posts only)
- Automation
- Campus
- Collaboration
- Commercial Real Estate
- Computer Vision
- Configuration
- Coworking
- Dashboards (Products only)
- Desk Booking
- Digital Signage (Posts only)
- Downsizing (Posts only)
- Drivers
- Education (Products only)
- Employee Experience (Posts only)
- Energy
- Enterprise (Products only)
- Event
- Event Management (Posts only)
- Government
- HVAC
- Healthcare (Products only)
- Hybrid Work
- Interface
- Location Status (Posts only)
- Locker Booking (Posts only)
- Marketplace (Posts only)
- Meeting Rooms
- Modules
- Neighborhoods (Products only)
- Occupancy
- Office Space
- Parking
- Partner
- Platform
- Podcast (Posts only)
- Product
- ROI (Products only)
- Retrofit
- Room Booking
- Safety (Posts only)
- Sales (Posts only)
- Scalability
- Smart Building
- Stagehand (Products only)
- Surveys
- Sustainability
- Systems
- Tender (Posts only)
- UX
- Utilization
- Visitor Management
- Wayfinding
- WorkMate
- Workplace
- Workplace Management
- Zones (Posts only)
- blog (Posts only)
- product (lowercase - appears in both Products and Posts)
- project (Projects only)
- product-update (Posts only)
- webinar (Posts only)

### 4. tags (Keywords/Labels)
**Usage**: Not actively used

**Distribution by Content Type**:
- Products: 0 values
- Projects: 0 values
- Posts: 0 values

**Note**: All files contain `tags: []` (empty arrays), indicating this field is prepared for use but not currently populated.

## Key Insights

### Semantic Structure Patterns

1. **Product-Focused Taxonomy**: The `hasTopic` and `isMainTopicOf` fields are exclusively used for products, indicating a structured approach to product semantic markup.

2. **Categories as Primary Taxonomy**: The `categories` field is the most comprehensively used across all content types, serving as the primary classification system.

3. **Content Type Specialization**: Different content types use different category sets:
   - **Products**: Focus on technical capabilities and business features
   - **Projects**: Emphasize implementation aspects and outcomes
   - **Posts**: Broadest range, including content types (blog, webinar, product-update)

### Taxonomy Consistency Issues

1. **Case Inconsistency**: Some categories appear in both uppercase and lowercase variations (e.g., "Product" vs "product", "project")

2. **Semantic Overlap**: Some categories overlap between different fields:
   - "Room Booking" appears in both `hasTopic` and `categories`
   - "Workplace Management" vs "Workplace Management System"

3. **Unused Tags Field**: The `tags` field is consistently empty across all content, representing an untapped taxonomical dimension.

## Recommendations

1. **Standardize Case**: Implement consistent capitalization rules across all taxonomy fields
2. **Activate Tags**: Consider populating the `tags` field for more granular content classification
3. **Semantic Consistency**: Review overlapping terms between `hasTopic` and `categories` for better semantic clarity
4. **Expand Semantic Markup**: Consider extending `hasTopic` and `isMainTopicOf` to Projects and Posts for better content discoverability

## Content Distribution Summary

- **Most Diverse Content**: Posts (85 files, 59 categories)
- **Most Semantic Structure**: Products (39 hasTopic values, 5 isMainTopicOf values)
- **Most Consistent Structure**: Projects (5 files, 38 categories, consistent project-focused classification)

---

*Analysis completed on 2025-07-02*
*Total files processed: 100 markdown files*
*Fields analyzed: hasTopic, isMainTopicOf, categories, tags*