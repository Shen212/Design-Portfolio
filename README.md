# Design Portfolio

Nathan Shen's design portfolio — a React + Vite single-page site deployed to GitHub Pages.

## Running locally

```
npm install
npm run dev
```

Build for production with `npm run build` (outputs to `dist/`). Pushing to `main` triggers the GitHub Pages deploy workflow in `.github/workflows/deploy.yml` automatically.

## Editing content

All portfolio content lives in plain JSON files under `content/`, separate from the component code:

- `content/projects.json` — one entry per project. `summary` is the one-sentence blurb shown on the project card; `fullDescription` is the longer paragraph shown when the card is clicked. `objective`, `role`, `skills`, and `notes` are the original raw fields the summary/description were written from — keep them around for reference when a project gets updated. `category` and `skills` double as the tag pills, `order` controls display order, and `images` lists filenames.
- `content/experience.json` — one entry per work/research experience, each with a one-sentence `description`.

To add or update a project:

1. Add or edit its entry in `content/projects.json`. Give it a unique `id` (used as its image folder name), a one-sentence `summary`, a longer `fullDescription`, and an `order` (controls display order).
2. Create a folder `public/images/projects/<id>/` and drop its images in there, named `1.jpg`, `2.jpg`, `3.jpg`, etc. The first image is used as the project's thumbnail.
3. List those filenames in that project's `images` array in `projects.json`.

No code changes are needed for either file — `src/pages/Home.jsx` reads both JSON files directly and renders from them.

## Project structure

```
content/                        content data (edit these to update the site)
  projects.json
  experience.json
public/
  images/projects/<id>/         project images, referenced from projects.json
src/
  pages/Home.jsx                 the single page that renders everything
  Components/ui/                 shadcn/ui component library
```
