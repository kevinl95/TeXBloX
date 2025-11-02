import { view } from '@forge/bridge';
import katex from 'katex';
import 'katex/dist/katex.min.css';

async function renderConfig() {
  const ctx = await view.getContext();
  console.log('TeXBloX Config Context:', ctx);
  
  const root = document.getElementById('config-root');
  if (!root) {
    console.error('Config root element not found!');
    return;
  }
  
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
  
  // Get current formula from config
  const currentFormula = ctx?.extension?.config?.formula || 'E = mc^2';
  
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
  
  // Preview
  const previewLabel = document.createElement('label');
  previewLabel.textContent = 'Preview:';
  previewLabel.style.display = 'block';
  previewLabel.style.marginTop = '16px';
  previewLabel.style.marginBottom = '8px';
  previewLabel.style.fontWeight = '600';
  
  const previewArea = document.createElement('div');
  previewArea.style.minHeight = '60px';
  previewArea.style.padding = '12px';
  previewArea.style.backgroundColor = '#f4f5f7';
  previewArea.style.border = '1px solid #dfe1e6';
  previewArea.style.borderRadius = '4px';
  previewArea.style.textAlign = 'center';
  previewArea.style.display = 'flex';
  previewArea.style.alignItems = 'center';
  previewArea.style.justifyContent = 'center';
  
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
      updatePreview();
    });
    
    examplesContainer.appendChild(button);
  });
  
  function updatePreview() {
    const formula = input.value.trim();
    previewArea.innerHTML = '';
    
    if (!formula) {
      previewArea.innerHTML = '<span style="color: #6b778c; font-style: italic;">Enter a formula to see preview</span>';
      return;
    }
    
    try {
      katex.render(formula, previewArea, { 
        throwOnError: false, 
        displayMode: true 
      });
    } catch (err) {
      previewArea.innerHTML = `<span style="color: #de350b;">Error: ${err.message}</span>`;
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
  
  // Event listeners
  input.addEventListener('input', updatePreview);
  
  saveButton.addEventListener('click', async () => {
    const formula = input.value.trim() || 'E = mc^2';
    
    try {
      await view.submit({
        config: {
          formula: formula
        }
      });
    } catch (err) {
      console.error('Error saving config:', err);
      alert('Error saving formula: ' + err.message);
    }
  });
  
  // Initial preview
  updatePreview();
  
  // Assemble UI
  container.appendChild(title);
  container.appendChild(label);
  container.appendChild(input);
  container.appendChild(previewLabel);
  container.appendChild(previewArea);
  container.appendChild(examplesLabel);
  container.appendChild(examplesContainer);
  container.appendChild(saveButton);
  
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