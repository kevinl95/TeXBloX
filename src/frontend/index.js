import { view } from '@forge/bridge';
import katex from 'katex';
import 'katex/dist/katex.min.css';

// Global flags to prevent multiple simultaneous renders and resizes
let isRendering = false;
let globalHasResized = false;

async function render() {
  if (isRendering) {
    console.log('Render already in progress, skipping');
    return;
  }
  
  isRendering = true;
  globalHasResized = false; // Reset for new render
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
  
  // Get formula and display mode from multiple possible sources
  let formula = 'E = mc^2';
  let displayMode = 'inline';
  let formulaSource = 'default';
  
  // Method 1: Direct macro parameters
  if (ctx?.extension?.macro?.parameters?.formula) {
    formula = ctx.extension.macro.parameters.formula;
    displayMode = ctx.extension.macro.parameters.displayMode || 'inline';
    formulaSource = 'macro.parameters';
  }
  // Method 2: Extension-level config
  else if (ctx?.extension?.config?.formula) {
    formula = ctx.extension.config.formula;
    displayMode = ctx.extension.config.displayMode || 'inline';
    formulaSource = 'config';
  }
  // Method 3: Look for any parameter-like data
  else if (ctx?.extension?.macro?.config?.formula) {
    formula = ctx.extension.macro.config.formula;
    displayMode = ctx.extension.macro.config.displayMode || 'inline';
    formulaSource = 'macro.config';
  }
  // Method 4: Check if we're in edit mode and should show config
  else if (ctx?.extension?.isEditing) {
    console.log('In editing mode - may need to configure macro');
    // For now, use default but indicate we're in edit mode
    formulaSource = 'editing-mode-default';
  }
  
  console.log(`Formula: "${formula}" (source: ${formulaSource})`);
  console.log(`Display mode: "${displayMode}"`);
  
  // Create container with inline styles (CSP-safe) - prevent squishing
  const mathContainer = document.createElement('div');
  
  if (displayMode === 'block') {
    // Block mode: centered, full width
    mathContainer.style.display = 'block';
    mathContainer.style.textAlign = 'center';
    mathContainer.style.margin = '10px 0';      // Vertical margin for spacing
    mathContainer.style.width = '100%';
  } else {
    // Inline mode: inline with text
    mathContainer.style.display = 'inline-block';
    mathContainer.style.margin = '0 4px';       // More side margin
    mathContainer.style.verticalAlign = 'middle';
  }
  
  mathContainer.style.fontSize = '1.1em';
  mathContainer.style.whiteSpace = 'nowrap';     // Prevent line wrapping
  mathContainer.style.minWidth = 'max-content';  // Allow natural width
  mathContainer.style.overflow = 'visible';      // Don't clip content
  mathContainer.style.boxSizing = 'border-box'; // Include padding in measurements
  
  // Debug: Show what we're trying to render
  console.log('Attempting to render with KaTeX...');
  
  // Convert display mode string to boolean
  const isDisplayMode = displayMode === 'block';
  
  try {
    katex.render(formula, mathContainer, {
      throwOnError: false,
      displayMode: isDisplayMode,
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
    
    // Try to wait for fonts if the browser supports it
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        console.log('Document fonts ready');
      }).catch(err => {
        console.log('Font loading detection failed:', err);
      });
    }
    
  } catch (err) {
    console.error('❌ KaTeX render error:', err);
    mathContainer.innerHTML = `<span style="color: #de350b; font-size: 14px; background: #fff2f0; padding: 2px 4px; border-radius: 3px;">LaTeX Error: ${err.message}</span>`;
  }


  
  // Remove the test prefix - just add the math directly
  root.appendChild(mathContainer);
  
  if (displayMode === 'block') {
    // Block mode: full width, block display
    root.style.display = 'block';
    root.style.width = '100%';
    root.style.margin = '0';
  } else {
    // Inline mode: inline with text
    root.style.display = 'inline-block';
    root.style.margin = '0';
    root.style.whiteSpace = 'nowrap';    // Prevent root from wrapping
  }
  
  root.style.overflow = 'visible';     // Allow content to extend beyond bounds
  root.style.boxSizing = 'border-box'; // Include padding in size calculations
  
  // Auto-resize with font loading detection and anti-feedback loop protection
  let resizeAttempt = 0;
  let hasResized = false;
  const maxRetries = 3;
  
  const tryResize = () => {
    // Prevent multiple resize operations globally
    if (hasResized || globalHasResized) {
      console.log('Already resized (local or global), skipping additional resize');
      return;
    }
    
    resizeAttempt++;
    
    // Get fresh measurements
    const actualWidth = mathContainer.scrollWidth;
    const actualHeight = mathContainer.scrollHeight;
    const boundingBox = mathContainer.getBoundingClientRect();
    
    // Check if fonts seem to be loaded by looking for reasonable dimensions
    const katexSpan = mathContainer.querySelector('.katex');
    const hasReasonableDimensions = actualWidth > 30 && actualHeight > 15;
    const fontsLoaded = katexSpan && window.getComputedStyle(katexSpan).fontFamily.includes('KaTeX');
    
    console.log(`Resize attempt ${resizeAttempt}:`, { 
      scrollWidth: actualWidth, 
      scrollHeight: actualHeight,
      boundingWidth: boundingBox.width,
      boundingHeight: boundingBox.height,
      hasReasonableDimensions,
      fontsLoaded,
      fontFamily: katexSpan ? window.getComputedStyle(katexSpan).fontFamily : 'none'
    });
    
    // If dimensions seem too small or fonts aren't loaded, retry (unless max attempts reached)
    if ((!hasReasonableDimensions || !fontsLoaded) && resizeAttempt < maxRetries) {
      console.log(`Fonts not ready, retrying in ${100 * resizeAttempt}ms...`);
      setTimeout(tryResize, 100 * resizeAttempt);
      return;
    }
    
    // Use the larger of scroll dimensions or bounding box, and be generous
    const maxWidth = Math.max(actualWidth, boundingBox.width);
    const maxHeight = Math.max(actualHeight, boundingBox.height);
    
    // Special handling for matrices and complex expressions (detect by height)
    const isComplexExpression = maxHeight > 40 || formula.includes('\\begin{') || formula.includes('\\matrix');
    const horizontalPadding = isComplexExpression ? 30 : 20; // More padding for complex expressions
    const verticalPadding = isComplexExpression ? 12 : 8;
    
    const minWidth = Math.max(maxWidth + horizontalPadding, 60);
    const minHeight = Math.max(maxHeight + verticalPadding, 25);
    
    console.log('Final container size:', { 
      width: minWidth, 
      height: minHeight, 
      isComplex: isComplexExpression,
      padding: { h: horizontalPadding, v: verticalPadding }
    });
    
    // Resize the root container
    root.style.width = `${minWidth}px`;
    root.style.height = `${minHeight}px`;
    root.style.minWidth = `${minWidth}px`;
    root.style.minHeight = `${minHeight}px`;
    
    // Since Forge Bridge doesn't have resize, use CSS to communicate size to Confluence
    document.body.style.width = `${minWidth}px`;
    document.body.style.height = `${minHeight}px`;
    document.body.style.minWidth = `${minWidth}px`;
    document.body.style.minHeight = `${minHeight}px`;
    document.body.style.overflow = 'visible';
    
    // Also set html element to ensure proper sizing
    document.documentElement.style.width = `${minWidth}px`;
    document.documentElement.style.height = `${minHeight}px`;
    
    console.log(`Set document size to: ${minWidth}x${minHeight}px`);
    hasResized = true;
    globalHasResized = true;
    
    // Gentler cleanup - only target obvious duplicates
    setTimeout(() => {
      gentleCleanup(formula);
    }, 50);
  };
  
  // Start the resize process
  setTimeout(tryResize, 50);
  
  console.log('=== TeXBloX Complete ===');
  isRendering = false; // Allow future renders
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