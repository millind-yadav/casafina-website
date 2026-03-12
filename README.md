# Casafina Website

## Development

```bash
npm install
npm run dev
```

## Production Build

```bash
npm run build
npm run preview
```

## GitHub Pages

This project is configured for GitHub Pages with:

- Vite `base` set to `./` for project-site asset loading
- `HashRouter` enabled to avoid route refresh 404s on GitHub Pages
- `gh-pages` deployment script publishing the `dist` folder
- unused oversized GLB files removed from `dist/scene` before publish so GitHub's 100 MB per-file limit is not exceeded

Deploy with:

```bash
npm run deploy
```

Expected project URL for the current remote:

```text
https://millind-yadav.github.io/MULTI_MODAL_LOCAL_LLM/
```

If the site does not appear immediately, make sure GitHub Pages is enabled in the repository settings and set to serve from the `gh-pages` branch.
