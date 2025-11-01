# TeXBloX

[![Forge Validation & Runs on Atlassian Compliance](https://github.com/kevinl95/TeXBloX/actions/workflows/forge-validation.yml/badge.svg)](https://github.com/kevinl95/TeXBloX/actions/workflows/forge-validation.yml)

Beautiful LaTeX math blocks for Confluence.

## Goals

- Render LaTeX formulas using a locally bundled KaTeX
- No external CDNs or outbound egress — target Runs on Atlassian eligibility

## Local Development

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Build the UI:
   ```bash
   npm run build
   ```
   This builds the UI into the `static/` directory
4. Deploy to Forge:
   ```bash
   forge deploy
   ```
5. Install the app:
   ```bash
   forge install --product confluence --user <your-user>
   ```
6. Use the TeXBloX macro in Confluence and provide the formula parameter

## Notes on Runs on Atlassian

- **manifest.yml** intentionally does not request external fetch permissions
- KaTeX is bundled in the frontend so the app will not touch a CDN during rendering
- All font assets are bundled locally for offline operation
- No external network requests are made during LaTeX rendering