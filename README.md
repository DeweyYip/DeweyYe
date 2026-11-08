# DeweyYe — Personal Website

A personal home for projects, research interests and writing. Built with Astro and published using GitHub Pages.

## Run locally

Requires Node.js 24+.

```sh
npm install
npm run dev
```

## Publish

Go to **Settings → Pages → Build and deployment → Source → GitHub Actions**.
The workflow in `.github/workflows/deploy.yml` deploys on commits to `main`.
Your temporary site URL will be: https://deweyyip.github.io/DeweyYe/

## Add a blog post

Create another Markdown file in `src/pages/writing/` with this frontmatter:

```yaml
---
layout: ../../layouts/ArticleLayout.astro
title: "My new note"
description: "Brief summary"
pubDate: "2026-11-09"
---
```

## Connect your domain

After you purchase your domain, add it under GitHub **Settings → Pages → Custom domain**, update your registrar's DNS, then change `site` in `astro.config.mjs` and remove its `base` property. The site links use Astro's BASE_URL and will adjust automatically.

Customize the content in `src/pages/`, the layout in `src/layouts/`, and styles in `src/styles/global.css`.

The current blog entry is a starter note: edit or remove it before sharing the site widely.
