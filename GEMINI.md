# Gemini Project Configuration: placeos

This file provides context and instructions for the Gemini AI assistant to work effectively on this project.

## Project Overview

This is a static website built with [Hugo](https://gohugo.io/). The content is managed in Markdown files and the final site is generated into the `public/` directory.

## Development

### Prerequisites

- [Hugo](https://gohugo.io/getting-started/installing/)
- [Node.js](https://nodejs.org/) (for package scripts)

### Running Locally

To run the local development server:

```bash
hugo server -D
```

### Installing Dependencies

To install JavaScript dependencies defined in `package.json`:

```bash
npm install
```

## Project Structure

- **`hugo.toml`**: Main Hugo configuration file.
- **`content/`**: Contains all Markdown content for the site.
    - **`content/posts/`**: Location for blog posts.
- **`static/`**: Static assets (images, CSS, JS) are served from here.
- **`assets/`**: Assets that require processing by Hugo Pipes (e.g., Sass, JS bundling).
- **`layouts/`**: Contains Hugo templates for rendering content. These templates override the theme's default layouts.
    - The home page and product pages have their own custom layouts in this directory.
- **`themes/til/`**: The base theme for the site. Note that many theme files are overridden by local files in the root `layouts/`, `assets/`, and `static/` directories.
- **`scripts/` & `placeos-scraper/`**: Contain various Node.js and Python scripts for scraping data, processing content, and other automation tasks related to the site's content.

## Content Conventions

- Blog post frontmatter should include `title`, `date`, and other relevant metadata.
- New content should follow the structure of existing files in the `content/` directory.
- Images are typically stored in `static/images/`.
