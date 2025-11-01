import { view } from '@forge/bridge';
import katex from 'katex';
import 'katex/dist/katex.min.css';

async function render() {
  const ctx = await view.getContext();
  
  // Forge provides extension parameters on the context when used as a macro preview/renderer
  const formula = ctx?.extension?.formula || ctx?.view || 'E = mc^2';

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