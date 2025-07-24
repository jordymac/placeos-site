# PlaceOS Website

This repository contains the website for PlaceOS - an integration platform for commercial building systems.

## Project Structure

This appears to be a Hugo static site with the following key directories:

- `content/` - Markdown content files for pages
- `layouts/` - Hugo template files
- `data/` - YAML data files for site configuration
- `public/` - Generated static site files

## Getting Started

### Prerequisites

- Hugo static site generator
- Git

### Local Development

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd placeos
   ```

2. Install Hugo (if not already installed):
   ```bash
   # macOS
   brew install hugo
   
   # Or download from https://gohugo.io/installation/
   ```

3. Run the development server:
   ```bash
   hugo server
   ```

4. Open your browser to `http://localhost:1313`

### Building for Production

```bash
hugo
```

This generates the static site in the `public/` directory.

## Content Management

### Content Structure

- `content/_index.md` - Homepage content with platform overview and feature list
- `content/integrations/_index.md` - Integrations page listing supported systems
- `content/usecases/_index.md` - Use cases and real-world applications
- `content/products/` - Product pages for PlaceOS applications (WorkMate, StageHand, etc.)
- `content/industry/` - Industry-specific content (energy, smart-campus, workplace)
- `content/projects/` - Case studies and project examples
- `content/posts/` - Blog posts and announcements (extensive collection of articles)
- `content/topics/` - Topic-based content organization
- `content/contact.md` - Contact information
- `content/licensing.md` - Licensing information
- `content/privacy-policy.md` - Privacy policy
- `content/security.md` - Security information
- `content/terms-of-use.md` - Terms of use

#### How Content is Built

Each content folder serves a specific purpose in the Hugo site structure:

- **List pages** (`_index.md`) create landing pages that can list child content
- **Single pages** (individual `.md` files) create standalone pages
- **Front matter** in YAML (`---`) or TOML (`+++`) format defines page metadata
- **Content body** is written in Markdown with Hugo shortcodes (e.g., `{{< wistia id="..." >}}`)
- **Taxonomies** use categories and tags for content organization

### Data Files (Critical for Site Content)

The site heavily relies on YAML data files to populate dynamic content:

#### Core Data Files
- `data/usecases.yaml` - Defines all use cases with descriptions, required integrations, industries, and products
- `data/feature_list.yaml` - Complete feature definitions used across integration pages
- `data/integration_categories.yaml` - Categories for organizing integrations
- `data/categories.yaml` - General site categories
- `data/all_topics.yml` - Topic organization for content

#### Integration Data
- `data/integrations/` - Individual YAML files for each integration (100+ files)
  - Each file defines: integration name, vendor, category, description, available data, and tags
  - Examples: `cisco_meraki_net.yaml`, `microsoft_teams.yaml`, `occupancy_sensor.yaml`
  - Used to populate the integrations page and generate integration listings

#### Product-Specific Data
- `data/products/[product-name]/` - Each product has its own data folder
  - `features.yaml` - Product-specific features and capabilities
  - `faqs.yaml` - Frequently asked questions organized by category
  - Products include: workmate, backoffice, room-booking, desk-booking-app, etc.

#### How Data Populates the Site
- **Use Cases page** (`/usecases/`) pulls from `usecases.yaml` to dynamically generate use case cards
- **Integrations page** (`/integrations/`) reads all files in `integrations/` folder to create the integration library
- **Product pages** use their respective `features.yaml` and `faqs.yaml` files to populate feature lists and FAQ sections
- **Hugo templates** in `layouts/` folder process this data using Hugo's data templating system

#### Adding New Content
- **New integration**: Create a new YAML file in `data/integrations/` following the existing format
- **New use case**: Add entry to `data/usecases.yaml`
- **Product features/FAQs**: Edit the respective files in `data/products/[product-name]/`

## Theme and Styling Architecture

This site uses a multi-layered approach to styling and layouts with theme overrides:

### Theme Foundation
- **Base theme**: `themes/til/` - A Hugo theme called "TIL" (Today I Learned)
  - Uses Tailwind CSS as the base styling framework
  - Contains default layouts in `themes/til/layouts/`
  - Base styles in `themes/til/assets/css/main.css`
  - Theme-specific partials and components

### Layout Override System
Hugo follows a lookup order where **root layouts override theme layouts**:

- **Root layouts** (`layouts/`) override theme layouts with the same name
  - `layouts/integrations/list.html` - Custom integration page layout
  - `layouts/usecases/list.html` - Custom use cases page layout
  - `layouts/products/single.html` - Custom product page layout
  - `layouts/_default/home.html` - Custom homepage layout
  - These files take precedence over theme files with the same path

### Styling Hierarchy
1. **Theme base styles**: `themes/til/assets/css/main.css`
   - Imports Tailwind CSS base, components, utilities
   - Font definitions (Lato Latin Web)
   - **Importantly**: Imports custom overrides with `@import '../../static/css/custom.css'`

2. **Custom overrides**: `static/css/custom.css`
   - Site-specific styling that overrides theme defaults
   - PlaceOS brand colors, spacing, component styles
   - Gets copied to `public/css/custom.css` during build

3. **Build process** combines:
   - Theme's Tailwind CSS
   - Custom CSS overrides
   - Outputs to `public/css/index.min.[hash].css`

### Key Files for Styling
- `themes/til/tailwind.config.js` - Tailwind configuration
- `static/css/custom.css` - All PlaceOS-specific styling
- `layouts/` folder - Custom page layouts that override theme defaults
- `themes/til/layouts/partials/` - Reusable components (header, footer, etc.)

### Making Style Changes
- **Theme updates**: Modify files in `themes/til/`
- **Site-specific styles**: Edit `static/css/custom.css`
- **Layout changes**: Create/edit files in root `layouts/` folder
- **Component changes**: Override theme partials by creating same-named files in `layouts/partials/`

### JavaScript and Assets
- Custom JavaScript in `static/js/` (integrations filter, theme toggle, etc.)
- Gets processed and combined during Hugo build
- Images and icons in `static/` folder

## Deployment

The built site in `public/` can be deployed to any static hosting service like:

- Netlify
- GitHub Pages

## Support

For questions about the PlaceOS platform itself, visit:
- Documentation: https://docs.placeos.com/
- GitHub: https://github.com/PlaceOS

For website-specific issues, refer to Hugo documentation: https://gohugo.io/documentation/