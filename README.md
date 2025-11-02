# TeXBloX

[![Forge Validation & Runs on Atlassian Compliance](https://github.com/kevinl95/TeXBloX/actions/workflows/forge-validation.yml/badge.svg)](https://github.com/kevinl95/TeXBloX/actions/workflows/forge-validation.yml)

Beautiful LaTeX math blocks for Confluence.

## Goals

- Render LaTeX formulas using a locally bundled KaTeX library
- No external CDNs or outbound network requests — fully Runs on Atlassian compliant
- Simple, reliable configuration interface focused on core functionality
- Professional mathematical typography for Confluence pages

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

## Using TeXBloX in Confluence

### Adding a Formula

1. **Add the macro**: Click the `+` button and search for "TeXBloX"
2. **Configure the macro**: Click on the TeXBloX block and select the configure/edit button (gear icon)
3. **Enter your LaTeX**: In the formula field, enter your LaTeX code (without `$$` delimiters)
4. **Choose display mode**: Select either "Inline" (flows with text) or "Block" (centered, separate line)
5. **Use quick examples**: Click example buttons to insert common formulas like quadratic, integral, sum, or matrix
6. **Save**: Click "Save Formula" to render the equation on your page

### Example Formulas

- **Quadratic formula**: `\frac{-b \pm \sqrt{b^2-4ac}}{2a}`
- **Einstein's equation**: `E = mc^2`
- **Summation**: `\sum_{i=1}^{n} x_i`
- **Integral**: `\int_{0}^{\infty} e^{-x} dx = 1`
- **Matrix**: `\begin{pmatrix} a & b \\ c & d \end{pmatrix}`

### Configuration Interface

The TeXBloX configuration dialog provides:
- **Formula input**: Large text area for entering LaTeX formulas
- **Display mode selection**: Choose between inline and block display modes
- **Quick examples**: Pre-built buttons for common mathematical expressions
- **Clean interface**: Simple, focused design without preview complications

### Troubleshooting

- **Can't type in the macro**: You need to configure the macro parameters, not type directly in the block
- **No formula shown**: Check that you entered the formula in the macro configuration dialog
- **Render errors**: Ensure your LaTeX syntax is correct (TeXBloX uses KaTeX syntax)
- **Configuration won't open**: Try refreshing the page and clicking the configure button again

## Technical Implementation

### Architecture
- **Main macro**: Renders LaTeX formulas on published Confluence pages using KaTeX
- **Configuration interface**: Simple form for entering formulas and selecting display modes
- **Build system**: Custom UI build process that creates separate bundles for main and config resources

### Display Modes
- **Inline mode**: Formulas flow within text, suitable for mathematical expressions in sentences
- **Block mode**: Formulas are centered on separate lines, suitable for equations and larger expressions

## Notes on Runs on Atlassian

- **manifest.yml** intentionally does not request external fetch permissions
- KaTeX is bundled in the frontend so the app will not touch a CDN during rendering
- All font assets are bundled locally for offline operation
- No external network requests are made during LaTeX rendering
- Clean, production-ready code without debug logging or unnecessary dependencies