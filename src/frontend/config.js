import { view } from '@forge/bridge';

async function renderConfig() {
  const ctx = await view.getContext();
  
  const root = document.getElementById('config-root');
  if (!root) return;
  
  root.innerHTML = '';
  
  const container = document.createElement('div');
  container.style.fontFamily = 'system-ui, -apple-system, sans-serif';
  container.style.padding = '20px';
  container.style.maxWidth = '500px';
  
  // Title
  const title = document.createElement('h3');
  title.textContent = 'LaTeX Formula Configuration';
  title.style.marginTop = '0';
  title.style.color = '#172b4d';
  
  // Input label
  const label = document.createElement('label');
  label.textContent = 'LaTeX Formula (without $$ delimiters):';
  label.style.display = 'block';
  label.style.marginBottom = '8px';
  label.style.fontWeight = '600';
  
  // Get current formula and display mode from config
  const currentFormula = ctx?.extension?.config?.formula || 'E = mc^2';
  const currentDisplayMode = ctx?.extension?.config?.displayMode || 'inline';
  
  // Input field
  const input = document.createElement('textarea');
  input.value = currentFormula;
  input.style.width = '100%';
  input.style.height = '80px';
  input.style.padding = '12px';
  input.style.border = '2px solid #dfe1e6';
  input.style.borderRadius = '4px';
  input.style.fontSize = '14px';
  input.style.fontFamily = 'monospace';
  input.style.boxSizing = 'border-box';
  input.style.resize = 'vertical';
  
  // Display mode section
  const displayModeLabel = document.createElement('label');
  displayModeLabel.textContent = 'Display Mode:';
  displayModeLabel.style.display = 'block';
  displayModeLabel.style.marginTop = '16px';
  displayModeLabel.style.marginBottom = '8px';
  displayModeLabel.style.fontWeight = '600';
  
  const displayModeContainer = document.createElement('div');
  displayModeContainer.style.display = 'flex';
  displayModeContainer.style.gap = '16px';
  displayModeContainer.style.marginBottom = '8px';
  
  // Inline radio button
  const inlineContainer = document.createElement('label');
  inlineContainer.style.display = 'flex';
  inlineContainer.style.alignItems = 'center';
  inlineContainer.style.cursor = 'pointer';
  
  const inlineRadio = document.createElement('input');
  inlineRadio.type = 'radio';
  inlineRadio.name = 'displayMode';
  inlineRadio.value = 'inline';
  inlineRadio.checked = currentDisplayMode === 'inline';
  inlineRadio.style.marginRight = '8px';
  
  const inlineLabel = document.createElement('span');
  inlineLabel.textContent = 'Inline (flows with text)';
  
  inlineContainer.appendChild(inlineRadio);
  inlineContainer.appendChild(inlineLabel);
  
  // Block radio button
  const blockContainer = document.createElement('label');
  blockContainer.style.display = 'flex';
  blockContainer.style.alignItems = 'center';
  blockContainer.style.cursor = 'pointer';
  
  const blockRadio = document.createElement('input');
  blockRadio.type = 'radio';
  blockRadio.name = 'displayMode';
  blockRadio.value = 'block';
  blockRadio.checked = currentDisplayMode === 'block';
  blockRadio.style.marginRight = '8px';
  
  const blockLabel = document.createElement('span');
  blockLabel.textContent = 'Block (centered, separate line)';
  
  blockContainer.appendChild(blockRadio);
  blockContainer.appendChild(blockLabel);
  
  displayModeContainer.appendChild(inlineContainer);
  displayModeContainer.appendChild(blockContainer);
  
  // Example buttons
  const examplesLabel = document.createElement('label');
  examplesLabel.textContent = 'Quick Examples:';
  examplesLabel.style.display = 'block';
  examplesLabel.style.marginTop = '16px';
  examplesLabel.style.marginBottom = '8px';
  examplesLabel.style.fontWeight = '600';
  
  const examples = [
    { name: 'Quadratic', formula: '\\frac{-b \\pm \\sqrt{b^2-4ac}}{2a}' },
    { name: 'Integral', formula: '\\int_{0}^{\\infty} e^{-x} dx = 1' },
    { name: 'Sum', formula: '\\sum_{i=1}^{n} x_i' },
    { name: 'Matrix', formula: '\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}' }
  ];
  
  const examplesContainer = document.createElement('div');
  examplesContainer.style.display = 'flex';
  examplesContainer.style.flexWrap = 'wrap';
  examplesContainer.style.gap = '8px';
  examplesContainer.style.marginBottom = '16px';
  
  examples.forEach(example => {
    const button = document.createElement('button');
    button.textContent = example.name;
    button.style.padding = '4px 8px';
    button.style.backgroundColor = '#e4e6ea';
    button.style.border = '1px solid #c1c7d0';
    button.style.borderRadius = '3px';
    button.style.cursor = 'pointer';
    button.style.fontSize = '12px';
    
    button.addEventListener('click', () => {
      input.value = example.formula;
    });
    
    examplesContainer.appendChild(button);
  });
  
  // Load any existing configuration values
  if (ctx?.extension?.config) {
    const config = ctx.extension.config;
    if (config.formula) input.value = config.formula;
    if (config.displayMode) {
      const radio = document.querySelector(`input[value="${config.displayMode}"]`);
      if (radio) radio.checked = true;
    }
  }
  
  // Save button
  const saveButton = document.createElement('button');
  saveButton.textContent = 'Save Formula';
  saveButton.style.padding = '10px 20px';
  saveButton.style.backgroundColor = '#0052cc';
  saveButton.style.color = 'white';
  saveButton.style.border = 'none';
  saveButton.style.borderRadius = '4px';
  saveButton.style.cursor = 'pointer';
  saveButton.style.fontWeight = '600';
  
  saveButton.addEventListener('click', async () => {
    const formula = input.value.trim() || 'E = mc^2';
    const selectedDisplayMode = document.querySelector('input[name="displayMode"]:checked')?.value || 'inline';
    
    try {
      await view.submit({
        config: {
          formula: formula,
          displayMode: selectedDisplayMode
        }
      });
    } catch (err) {
      console.error('Error saving config:', err);
      alert('Error saving formula: ' + err.message);
    }
  });
  
  // Cancel button
  const cancelButton = document.createElement('button');
  cancelButton.textContent = 'Cancel';
  cancelButton.style.padding = '10px 20px';
  cancelButton.style.backgroundColor = '#f4f5f7';
  cancelButton.style.color = '#172b4d';
  cancelButton.style.border = '1px solid #dfe1e6';
  cancelButton.style.borderRadius = '4px';
  cancelButton.style.cursor = 'pointer';
  cancelButton.style.fontWeight = '600';
  cancelButton.style.marginLeft = '10px';
  
  cancelButton.addEventListener('click', () => {
    try {
      view.close();
    } catch (err) {
      console.error('Error closing config:', err);
      // Fallback: try to navigate away or refresh
      window.history.back();
    }
  });
  
  // Button container
  const buttonContainer = document.createElement('div');
  buttonContainer.style.display = 'flex';
  buttonContainer.style.alignItems = 'center';
  buttonContainer.style.marginTop = '20px';
  buttonContainer.appendChild(saveButton);
  buttonContainer.appendChild(cancelButton);
  
  // Assemble UI
  container.appendChild(title);
  container.appendChild(label);
  container.appendChild(input);
  container.appendChild(displayModeLabel);
  container.appendChild(displayModeContainer);
  container.appendChild(examplesLabel);
  container.appendChild(examplesContainer);
  container.appendChild(buttonContainer);
  
  root.appendChild(container);
}

// Start the config UI
renderConfig().catch(err => {
  console.error('TeXBloX config render error:', err);
  const root = document.getElementById('config-root');
  if (root) {
    root.innerHTML = `<div style="color: red; padding: 16px;">Config Error: ${err.message}</div>`;
  }
});