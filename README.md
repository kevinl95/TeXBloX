<div align="center">
  <img src="assets/logo.png" alt="TeXBloX Logo" width="200" height="200">
  
  # TeXBloX
  
  [![Forge Validation & Runs on Atlassian Compliance](https://github.com/kevinl95/TeXBloX/actions/workflows/forge-validation.yml/badge.svg)](https://github.com/kevinl95/TeXBloX/actions/workflows/forge-validation.yml)
  [![Unit Tests](https://github.com/kevinl95/TeXBloX/actions/workflows/test.yml/badge.svg)](https://github.com/kevinl95/TeXBloX/actions/workflows/test.yml)
  
   **Beautiful LaTeX math blocks for Confluence.**

   **Macro name in Confluence:** **"LaTeX Formula"**
  
  <div style="background: #0052CC; color: white; padding: 12px 24px; border-radius: 4px; display: inline-block; margin: 10px 0; text-decoration: none; font-weight: 600;">
    <a href="https://developer.atlassian.com/console/install/446c2bb7-9a68-48a6-83f6-38fc41031264?signature=AYABeOm4TjCa5aWrYxIQNbUAKRoAAAADAAdhd3Mta21zAEthcm46YXdzOmttczp1cy13ZXN0LTI6NzA5NTg3ODM1MjQzOmtleS83MDVlZDY3MC1mNTdjLTQxYjUtOWY5Yi1lM2YyZGNjMTQ2ZTcAuAECAQB4IOp8r3eKNYw8z2v%2FEq3%2FfvrZguoGsXpNSaDveR%2FF%2Fo0Bhg3IJVYl3j053HncO1YRzgAAAH4wfAYJKoZIhvcNAQcGoG8wbQIBADBoBgkqhkiG9w0BBwEwHgYJYIZIAWUDBAEuMBEEDOmXXgfEDy%2B%2BrxY7SgIBEIA793sBN%2BBvrXLyVJTSxsfuuPhgkNpQ%2FKf2HgxP7BOqhCtbq4Bo2tfEBIK2Z%2BDvEXJVjoPsfeTVdVwDExgAB2F3cy1rbXMAS2Fybjphd3M6a21zOmV1LXdlc3QtMTo3MDk1ODc4MzUyNDM6a2V5LzQ2MzBjZTZiLTAwYzMtNGRlMi04NzdiLTYyN2UyMDYwZTVjYwC4AQICAHijmwVTMt6Oj3F%2B0%2B0cVrojrS8yZ9ktpdfDxqPMSIkvHAEV7Rr8sKtVd8%2BAghZQ97r3AAAAfjB8BgkqhkiG9w0BBwagbzBtAgEAMGgGCSqGSIb3DQEHATAeBglghkgBZQMEAS4wEQQM5IBYM%2FDHt1MdHjrWAgEQgDukm5VEPbnXvaySwaTaQBL8djlnbMg5HMrtrGnb692A8X%2Fk8u%2FZxDcigN675rDKAWC4qGgPdYhzkZuE9gAHYXdzLWttcwBLYXJuOmF3czprbXM6dXMtZWFzdC0xOjcwOTU4NzgzNTI0MzprZXkvNmMxMjBiYTAtNGNkNS00OTg1LWI4MmUtNDBhMDQ5NTJjYzU3ALgBAgIAeLKa7Dfn9BgbXaQmJGrkKztjV4vrreTkqr7wGwhqIYs5ATfDlfHnk11mYtjsZ%2Fnil9kAAAB%2BMHwGCSqGSIb3DQEHBqBvMG0CAQAwaAYJKoZIhvcNAQcBMB4GCWCGSAFlAwQBLjARBAyLYapP85LjCpZzX%2BQCARCAO2tAf%2BbiLqftpbfkXnuWcZpIGTIW%2BSsO5W%2B%2FbpzIRVj5OS%2BWNJ3Xy7soWPcxRsGMyM2XtJzzANWnxN0PAgAAAAAMAAAQAAAAAAAAAAAAAAAAAKvsCUhtZw56iGkM4L7jRkH%2F%2F%2F%2F%2FAAAAAQAAAAAAAAAAAAAAAQAAADKfNrV%2Fb6sUwPL9OVhkJKVcJ6WQ2sdUUtl0fuIHvlbJaBz5GThYhW6AvpC7y%2Bjk31N5E2dFS5IA7PTU1TXkBbekAfg%3D&product=confluence" style="color: white; text-decoration: none;">
      🚀 Install TeXBloX for Confluence
    </a>
  </div>
</div>

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

1. **Add the macro**: Click the `+` button and search for "LaTeX Formula" (this is the macro name shown in the Confluence editor)
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

## Technical Implementation

### Architecture
- **Main macro**: Renders LaTeX formulas on published Confluence pages using KaTeX
- **Configuration interface**: Simple form for entering formulas and selecting display modes
- **Build system**: Custom UI build process that creates separate bundles for main and config resources

### Display Modes
- **Inline mode**: Formulas flow within text, suitable for mathematical expressions in sentences
- **Block mode**: Formulas are centered on separate lines, suitable for equations and larger expressions

## Testing

The project includes comprehensive unit tests covering:
- Formula source detection and extraction logic
- Display mode handling and conversion
- Configuration value processing
- Example formula validation
- Form data preparation
- KaTeX options configuration

### Running Tests

```bash
npm test
```

### Test Structure
- `tests/main-rendering.test.js` - Tests for LaTeX rendering logic
- `tests/config-interface.test.js` - Tests for configuration interface logic  
- `tests/utilities.test.js` - Tests for utility functions and data handling

## Privacy & Security

- **No data collection**: TeXBloX does not collect, store, or transmit any personal data
- **Privacy Policy**: See [PRIVACY.md](PRIVACY.md) for complete details
- **Runs on Atlassian compliant**: No external permissions or network requests
- **Local operation**: All processing happens within your Confluence environment

## Notes on Runs on Atlassian

- **manifest.yml** intentionally does not request external fetch permissions
- KaTeX is bundled in the frontend so the app will not touch a CDN during rendering
- All font assets are bundled locally for offline operation
- No external network requests are made during LaTeX rendering