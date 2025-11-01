# TeXBloX

TeXBloX — Beautiful LaTeX math blocks for Confluence.

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

## Continuous Integration

This project includes a GitHub Actions workflow that validates:

- ✅ **Build integrity**: Ensures the UI builds successfully
- ✅ **Runs on Atlassian compliance**: Validates no external dependencies
- ✅ **Security audit**: Checks for vulnerabilities in dependencies
- ✅ **Manifest validation**: Ensures proper Forge app structure

The workflow runs automatically on pushes and pull requests to `main` and `develop` branches.

## Notes on Runs on Atlassian

- **manifest.yml** intentionally does not request external fetch permissions
- KaTeX is bundled in the frontend so the app will not touch a CDN during rendering
- All font assets are bundled locally for offline operation
- No external network requests are made during LaTeX rendering