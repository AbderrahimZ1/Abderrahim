# azermane.com

Professional research portfolio for **Dr Abderrahim Zermane**.

## What is included

- Search-focused homepage with `Person`, `ProfilePage` and `ScholarlyArticle` structured data
- Dedicated biography, publication, project and flagship-paper pages
- Research insight articles on fatal falls, explainable machine learning and urban fire modelling
- Authentic conference photography and author-provided research figures
- Topic-filtered publication record and accessible enlarged research-figure viewing
- Tomorrow's Cities, City-scale Fire Spread Model, Open Urban Fire Framework, SEED EIA, Design Safety MY, OSHKKP Malaysia and Amane QHSE project coverage
- Responsive navigation, reduced-motion support, keyboard focus, print styling, sitemap, crawler rules and custom 404 page
- Google Scholar, ORCID and GitHub identity links

## Zero-Actions deployment

This is a static GitHub Pages website. It has:

- no custom GitHub Actions workflows;
- no npm, framework or build pipeline;
- no Actions artifacts or Actions-based image processing;
- no paid server, database or analytics dependency.

Production files are committed directly to the `main` branch. The repository includes `.nojekyll`, allowing GitHub Pages to publish the files from the repository root.

## GitHub Pages settings

1. Keep the repository **public**.
2. Open **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select **main** and **/(root)**.
5. Keep the custom domain set to `azermane.com`.
6. Keep **Enforce HTTPS** enabled.

The repository already contains the `CNAME` file.

## Main files

- Homepage: `index.html`
- Biography: `about.html`
- Publication record: `publications.html`
- Project portfolio: `projects.html`
- Flagship papers: `paper-random-forest.html`, `paper-fault-tree.html`, `paper-hydrogen-fire-safety.html`
- Research articles: `insights/`
- Shared design, navigation and accessibility: `shared.css`
- Homepage design: `styles.css`, importing `styles-1.css` through `styles-6.css`
- Content-page design: `content.css`, importing `content-pages.css`
- Final responsive, no-script and print safeguards: `final.css`
- Interactions: `script.js`
- Search and machine-readable files: `robots.txt`, `sitemap.xml`, `llms.txt`

## Images

The live pages use individually named files from `assets/`, including:

- `logo.png`
- `logo_writing.png`
- `hero-loss-prevention-2025.jpg`
- `ucl-research-meeting.jpg`
- `phd-thesis.jpg`
- `paper-random-forest.png`
- `paper-fault-tree.png`
- `paper-hydrogen.png`
- supporting publication figures

Old compressed sprite and atlas files were removed after the individual high-resolution images were integrated.

## Updating the website

Normal edits require only:

1. edit the relevant HTML, CSS or JavaScript file;
2. commit directly to `main`;
3. wait for GitHub Pages to refresh;
4. hard-refresh the browser if an older cached version appears.

No workflow run or build command is required.
