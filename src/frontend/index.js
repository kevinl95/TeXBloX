import { view } from '@forge/bridge';
import katex from 'katex';
import 'katex/dist/katex.min.css';

async function render() {
  const ctx = await view.getContext();
  
  // Get formula from the backend resolver
  let formula = 'E = mc^2';
  try {
    const response = await view.invoke('getFormula');
    formula = response.formula || 'E = mc^2';
  } catch (err) {
    console.error('Failed to get formula from resolver:', err);
    // Fallback to context if resolver fails
    formula = ctx?.extension?.macro?.parameters?.formula || 'E = mc^2';
  }

  const root = document.getElementById('root');
  const pre = document.createElement('div');
  pre.style.padding = '8px';
  
  try {
    // displayMode true treats it as block math; consumers can decide inline vs block
    katex.render(formula, pre, { 
      throwOnError: false, 
      displayMode: true 
    });
  } catch (err) {
    pre.textContent = 'Error rendering LaTeX: ' + err.message;
  }
  
  root.appendChild(pre);
}

render();