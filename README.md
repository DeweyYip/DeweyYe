# DeweyYe — Personal Website

This is the hand-crafted kraft-paper collage version of DeweyYe, built from the original artwork supplied by the owner.

## Layout & interaction
- Fixed original composition: black title bar, kraft-paper banner, corrugated strips, left navigation, three-column collage wall, floating transparent tape, blue diamond.
- Hover or keyboard-focus **typewriter**, **robot**, or **ice cream** cards to display their alternate artworks.
- Click to open the matching dedicated writing page (placeholder until article copy is supplied).
- Navigation stays in the top-left as you scroll, follows the pointer slightly, and changes from white on brown to black on white.
- Writing and Projects indexes intentionally display **COMING SOON**.
- All image files are in `assets/images/` with meaningful names.

## Preview locally

Run `python3 -m http.server 8000` at the repo root, then open `http://localhost:8000/`.

## Publish

**Settings → Pages → Build and deployment → Source → GitHub Actions**. The workflow deploys the static site directly (no build step, framework, or package installation required).

All links use relative paths, so the site works both under `deweyyip.github.io/DeweyYe/` and at a future custom domain. The domain's DNS and the GitHub Pages custom domain setting must be configured after purchase.

## Writing routes

- `writing/not-lost-in-ai/` — How do we not get lost in the age of AI
- `writing/second-glance/` — 第二眼
- `writing/reflections-at-23/` — 23 岁感悟

Article content must be provided before these pages are considered published.
