import { view } from '@forge/bridge';
import katex from 'katex';
import 'katex/dist/katex.min.css';

async function render() {
  console.log('=== TeXBloX Starting ===');
  
  const ctx = await view.getContext();
  console.log('TeXBloX Context:', JSON.stringify(ctx, null, 2));
  
  const root = document.getElementById('root');
  if (!root) {
    console.error('Root element not found!');
    return;
  }
  
  root.innerHTML = '';
  
  // Debug: Look at all possible places for parameters
  console.log('Extension object:', JSON.stringify(ctx?.extension, null, 2));
  console.log('Macro object:', JSON.stringify(ctx?.extension?.macro, null, 2));
  
  // Check all possible places parameters might be stored
  console.log('Macro object exists:', !!ctx?.extension?.macro);
  console.log('Macro parameters exists:', !!ctx?.extension?.macro?.parameters);
  console.log('Macro parameters content:', ctx?.extension?.macro?.parameters);
  console.log('Macro config exists:', !!ctx?.extension?.macro?.config);
  console.log('Macro config content:', ctx?.extension?.macro?.config);
  console.log('Extension config exists:', !!ctx?.extension?.config);
  console.log('Extension config content:', ctx?.extension?.config);
  console.log('Is editing:', ctx?.extension?.isEditing);
  
  // Get formula from multiple possible sources
  let formula = 'E = mc^2';
  let formulaSource = 'default';
  
  // Method 1: Direct macro parameters
  if (ctx?.extension?.macro?.parameters?.formula) {
    formula = ctx.extension.macro.parameters.formula;
    formulaSource = 'macro.parameters';
  }
  // Method 2: Config object
  else if (ctx?.extension?.config?.formula) {
    formula = ctx.extension.config.formula;
    formulaSource = 'config';
  }
  // Method 3: Look for any parameter-like data
  else if (ctx?.extension?.macro?.config?.formula) {
    formula = ctx.extension.macro.config.formula;
    formulaSource = 'macro.config';
  }
  // Method 4: Check if we're in edit mode and should show config
  else if (ctx?.extension?.isEditing) {
    console.log('In editing mode - may need to configure macro');
    // For now, use default but indicate we're in edit mode
    formulaSource = 'editing-mode-default';
  }
  
  console.log(`Formula: "${formula}" (source: ${formulaSource})`);
  
  // Create container with inline styles (CSP-safe) - prevent squishing
  const mathContainer = document.createElement('span');
  mathContainer.style.display = 'inline-block';
  mathContainer.style.margin = '0 2px';
  mathContainer.style.verticalAlign = 'middle';
  mathContainer.style.fontSize = '1.1em';
  mathContainer.style.whiteSpace = 'nowrap';     // Prevent line wrapping
  mathContainer.style.minWidth = 'max-content';  // Allow natural width
  
  // Debug: Show what we're trying to render
  console.log('Attempting to render with KaTeX...');
  
  try {
    katex.render(formula, mathContainer, {
      throwOnError: false,
      displayMode: false,
      output: 'html',
      strict: false,
      trust: true,
      // Ensure fonts are loaded properly
      macros: {},
      fleqn: false
    });
    
    console.log('✅ KaTeX rendered successfully');
    console.log('Rendered HTML:', mathContainer.innerHTML);
    
    // Check if fonts are loading
    const katexSpan = mathContainer.querySelector('.katex');
    if (katexSpan) {
      const computedStyle = window.getComputedStyle(katexSpan);
      console.log('KaTeX font-family:', computedStyle.fontFamily);
      console.log('KaTeX font-size:', computedStyle.fontSize);
    }
    
  } catch (err) {
    console.error('❌ KaTeX render error:', err);
    mathContainer.innerHTML = `<span style="color: #de350b; font-size: 14px; background: #fff2f0; padding: 2px 4px; border-radius: 3px;">LaTeX Error: ${err.message}</span>`;
  }


  
  // Remove the test prefix - just add the math directly
  root.appendChild(mathContainer);
  root.style.display = 'inline-block';
  root.style.margin = '0';
  root.style.whiteSpace = 'nowrap';    // Prevent root from wrapping
  root.style.overflow = 'visible';     // Allow content to extend beyond bounds
  
  // Debug: Check if content is actually in DOM and visible
  console.log('Root element:', root);
  console.log('Root innerHTML after append:', root.innerHTML);
  console.log('Root styles:', {
    display: root.style.display,
    visibility: root.style.visibility,
    opacity: root.style.opacity,
    width: root.offsetWidth,
    height: root.offsetHeight
  });
  console.log('Math container styles:', {
    display: mathContainer.style.display,
    visibility: mathContainer.style.visibility,
    opacity: mathContainer.style.opacity,
    width: mathContainer.offsetWidth,
    height: mathContainer.offsetHeight
  });

  // Gentler cleanup - only target obvious duplicates
  setTimeout(() => {
    gentleCleanup(formula);
  }, 200);
  
  console.log('=== TeXBloX Complete ===');
}

function gentleCleanup(formula) {
  console.log('Running gentle cleanup for:', formula);
  
  // Only look for obvious parameter display containers
  const suspiciousElements = document.querySelectorAll('p, div, span');
  
  suspiciousElements.forEach(el => {
    // Skip our own content and KaTeX content
    if (el.classList.contains('texblox-content') || 
        el.classList.contains('katex') ||
        el.querySelector('.texblox-content') ||
        el.querySelector('.katex')) {
      return;
    }
    
    // If it's just plain text that matches our formula exactly
    if (el.textContent.trim() === formula && 
        el.children.length === 0 &&
        !el.innerHTML.includes('katex')) {
      console.log('🧹 Hiding duplicate parameter text:', el.textContent);
      el.style.opacity = '0';
      el.style.fontSize = '0px';
      el.style.height = '0px';
      el.style.overflow = 'hidden';
    }
  });
}

// Start the app
render().catch(err => {
  console.error('TeXBloX error:', err);
  const root = document.getElementById('root');
  if (root) {
    root.innerHTML = `<div class="texblox-content" style="color: red; padding: 16px;">Error: ${err.message}</div>`;
  }
});