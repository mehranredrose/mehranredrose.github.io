# mehranredrose.github.io — 8-bit Portfolio

Personal portfolio site with a strict retro pixel-art aesthetic.

## Structure

```
mehranredrose-portfolio/
├── index.html          ← single-page app entry point
├── css/
│   └── style.css       ← all styles (light/dark themes, responsive)
├── js/
│   └── main.js         ← nav routing, GitHub API, typewriter, docs
└── README.md
```

## Features

- **Dark / Light mode** toggle, persisted in localStorage
- **Hash routing** — URL hash updates on nav click (`#home`, `#projects`, etc.)
- **Typewriter effect** on home page
- **GitHub API** — projects grid auto-populated from `api.github.com/users/mehranredrose/repos`
- **GitHub stats** — public repos / followers / following fetched live
- **Docs section** — sidebar category tree with client-side content switching
- **Responsive** — mobile nav hamburger, single-column grid on small screens
- **No build step** — pure vanilla HTML / CSS / JS

## Deploying to GitHub Pages

1. Push this folder to a repo named `mehranredrose.github.io`
2. Enable GitHub Pages from the repo Settings → Pages → branch: `main`, folder: `/`
3. Done — the site is live at `https://mehranredrose.github.io`

## Customisation checklist

- [ ] Drop `resume_mehran.pdf` in project root and update the download button in `js/main.js`
- [ ] Add real project descriptions to `FALLBACK_PROJECTS` array in `js/main.js`
- [ ] Expand `docData` in `js/main.js` to add real doc pages
- [ ] Link doc paths to real Hugo-generated pages under `/Docs/`

## Stack

- **Fonts**: [Press Start 2P](https://fonts.google.com/specimen/Press+Start+2P) via Google Fonts
- **Icons**: [Font Awesome 6](https://fontawesome.com/)
- **APIs**: GitHub REST API (no auth — public endpoints only)
