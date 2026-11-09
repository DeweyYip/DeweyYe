# DeweyYe — Personal Website

This is the hand-crafted kraft-paper collage version of DeweyYe, built from the original artwork supplied by the owner.

## Layout & interaction
- Homepage follows the November 10 reference: featured typewriter, tape, original handwritten notes, oversized opinion statement, staggered robot/ice-cream cards and black wordmark footer.
- Hover or keyboard-focus **typewriter**, **robot**, or **ice cream** cards to display their alternate artworks.
- Click to open the matching dedicated writing page (placeholder until article copy is supplied).
- Navigation stays in the top-left, changes from white to black, fades out while the opinion statement crosses the menu, and returns afterwards. Hidden navigation is inert and removed from the accessibility tree. Cards and selected paper objects move slightly with the pointer; reduced-motion preferences disable movement.
- Writing and Projects indexes intentionally display **COMING SOON**.
- Homepage assets are cropped and WebP-optimized in `assets/images/home/`; shared interior-page artwork remains unchanged. The title collage is cropped from the supplied design screenshot.

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
