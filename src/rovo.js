// Common LaTeX formulas mapping for quick responses
const commonFormulas = {
  // Basic algebra
  'quadratic formula': '\\frac{-b \\pm \\sqrt{b^2-4ac}}{2a}',
  'quadratic equation': '\\frac{-b \\pm \\sqrt{b^2-4ac}}{2a}',
  'pythagorean theorem': 'a^2 + b^2 = c^2',
  'distance formula': '\\sqrt{(x_2-x_1)^2 + (y_2-y_1)^2}',
  
  // Physics
  'einstein equation': 'E = mc^2',
  'mass energy equivalence': 'E = mc^2',
  'kinetic energy': 'KE = \\frac{1}{2}mv^2',
  'potential energy': 'PE = mgh',
  'ohms law': 'V = IR',
  'force equation': 'F = ma',
  
  // Calculus
  'derivative of x squared': '\\frac{d}{dx}x^2 = 2x',
  'integral of x': '\\int x \\, dx = \\frac{x^2}{2} + C',
  'integral of sine x': '\\int \\sin(x) \\, dx = -\\cos(x) + C',
  'integral of cosine x': '\\int \\cos(x) \\, dx = \\sin(x) + C',
  'integral of e to the x': '\\int e^x \\, dx = e^x + C',
  'fundamental theorem of calculus': '\\int_a^b f\'(x) \\, dx = f(b) - f(a)',
  
  // Statistics
  'normal distribution': '\\frac{1}{\\sqrt{2\\pi\\sigma^2}} e^{-\\frac{(x-\\mu)^2}{2\\sigma^2}}',
  'standard deviation': '\\sigma = \\sqrt{\\frac{\\sum(x_i - \\mu)^2}{N}}',
  'mean': '\\mu = \\frac{\\sum x_i}{n}',
  'variance': '\\sigma^2 = \\frac{\\sum(x_i - \\mu)^2}{N}',
  
  // Geometry
  'area of circle': 'A = \\pi r^2',
  'circumference': 'C = 2\\pi r',
  'area of triangle': 'A = \\frac{1}{2}bh',
  'volume of sphere': 'V = \\frac{4}{3}\\pi r^3',
  
  // Linear algebra
  '2x2 matrix': '\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}',
  '3x3 matrix': '\\begin{pmatrix} a & b & c \\\\ d & e & f \\\\ g & h & i \\end{pmatrix}',
  'identity matrix': '\\begin{pmatrix} 1 & 0 \\\\ 0 & 1 \\end{pmatrix}',
  'determinant 2x2': '\\det(A) = ad - bc',
  
  // Summations and series
  'sum from 1 to n': '\\sum_{i=1}^{n} x_i',
  'infinite sum': '\\sum_{i=1}^{\\infty} x_i',
  'arithmetic series': '\\sum_{i=1}^{n} i = \\frac{n(n+1)}{2}',
  'geometric series': '\\sum_{i=0}^{n} ar^i = a\\frac{1-r^{n+1}}{1-r}',
  
  // Common mathematical expressions
  'square root': '\\sqrt{x}',
  'cube root': '\\sqrt[3]{x}',
  'nth root': '\\sqrt[n]{x}',
  'fraction': '\\frac{a}{b}',
  'exponent': 'x^n',
  'logarithm': '\\log(x)',
  'natural log': '\\ln(x)',
  'sine': '\\sin(x)',
  'cosine': '\\cos(x)',
  'tangent': '\\tan(x)',
  'limit': '\\lim_{x \\to a} f(x)',
  'infinity': '\\infty',
  'partial derivative': '\\frac{\\partial f}{\\partial x}',
  'greek alpha': '\\alpha',
  'greek beta': '\\beta',
  'greek gamma': '\\gamma',
  'greek delta': '\\delta',
  'greek pi': '\\pi',
  'greek sigma': '\\sigma',
  'greek theta': '\\theta',
  'greek lambda': '\\lambda',
  'greek mu': '\\mu'
};

// Enhanced pattern matching for more complex expressions
function generateLatexFromDescription(description) {
  const desc = description.toLowerCase().trim();
  
  // Check for exact matches first
  if (commonFormulas[desc]) {
    return commonFormulas[desc];
  }
  
  // Pattern matching for more complex expressions
  
  // Fractions: "a over b", "x divided by y"
  let match = desc.match(/(?:(\w+)\s+(?:over|divided\s+by)\s+(\w+))|(?:fraction\s+(\w+)\s+over\s+(\w+))/);
  if (match) {
    const numerator = match[1] || match[3];
    const denominator = match[2] || match[4];
    return `\\frac{${numerator}}{${denominator}}`;
  }
  
  // Square roots: "square root of x"
  match = desc.match(/square\s+root\s+of\s+(\w+)/);
  if (match) {
    return `\\sqrt{${match[1]}}`;
  }
  
  // Exponents: "x to the power of n", "x raised to n"
  match = desc.match(/(\w+)\s+(?:to\s+the\s+power\s+of|raised\s+to|to\s+the)\s+(\w+)/);
  if (match) {
    return `${match[1]}^{${match[2]}}`;
  }
  
  // Summations: "sum of x from 1 to n"
  match = desc.match(/sum\s+of\s+(\w+)\s+from\s+(\w+)\s+to\s+(\w+)/);
  if (match) {
    return `\\sum_{i=${match[2]}}^{${match[3]}} ${match[1]}_i`;
  }
  
  // Integrals: "integral of x"
  match = desc.match(/integral\s+of\s+(\w+(?:\s+\w+)*)/);
  if (match) {
    let expr = match[1];
    if (expr.includes('e to the x')) expr = 'e^x';
    if (expr.includes('x squared')) expr = 'x^2';
    if (expr.includes('sine')) expr = '\\sin(x)';
    if (expr.includes('cosine')) expr = '\\cos(x)';
    return `\\int ${expr} \\, dx`;
  }
  
  // Derivatives: "derivative of x squared"
  match = desc.match(/derivative\s+of\s+(\w+(?:\s+\w+)*)/);
  if (match) {
    let expr = match[1];
    if (expr.includes('x squared')) expr = 'x^2';
    if (expr.includes('sine')) expr = '\\sin(x)';
    if (expr.includes('cosine')) expr = '\\cos(x)';
    return `\\frac{d}{dx}${expr}`;
  }
  
  // Matrices: "2 by 3 matrix", "3x3 matrix"
  match = desc.match(/(?:(\d+)\s*(?:by|x)\s*(\d+)\s*matrix)|(?:(\d+)x(\d+)\s*matrix)/);
  if (match) {
    const rows = parseInt(match[1] || match[3]);
    const cols = parseInt(match[2] || match[4]);
    
    if (rows <= 4 && cols <= 4) { // Limit size for readability
      let matrixContent = '';
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          matrixContent += `a_{${i+1}${j+1}}`;
          if (j < cols - 1) matrixContent += ' & ';
        }
        if (i < rows - 1) matrixContent += ' \\\\ ';
      }
      return `\\begin{pmatrix} ${matrixContent} \\end{pmatrix}`;
    }
  }
  
  // Binomial coefficients: "n choose k"
  match = desc.match(/(\w+)\s+choose\s+(\w+)/);
  if (match) {
    return `\\binom{${match[1]}}{${match[2]}}`;
  }
  
  // Greek letters
  const greekLetters = {
    'alpha': '\\alpha', 'beta': '\\beta', 'gamma': '\\gamma', 'delta': '\\delta',
    'epsilon': '\\epsilon', 'zeta': '\\zeta', 'eta': '\\eta', 'theta': '\\theta',
    'iota': '\\iota', 'kappa': '\\kappa', 'lambda': '\\lambda', 'mu': '\\mu',
    'nu': '\\nu', 'xi': '\\xi', 'omicron': '\\omicron', 'pi': '\\pi',
    'rho': '\\rho', 'sigma': '\\sigma', 'tau': '\\tau', 'upsilon': '\\upsilon',
    'phi': '\\phi', 'chi': '\\chi', 'psi': '\\psi', 'omega': '\\omega'
  };
  
  for (const [name, latex] of Object.entries(greekLetters)) {
    if (desc.includes(name)) {
      return latex;
    }
  }
  
  // If no pattern matches, provide a helpful suggestion
  return `% Could not generate LaTeX for: "${description}"\\n% Try being more specific, e.g.:\\n% - "quadratic formula"\\n% - "integral of x squared"\\n% - "2x2 matrix"\\n% - "sum from 1 to n"`;
}

export function handler(payload) {
  console.log('Rovo LaTeX generator called with:', payload);
  
  const { description } = payload;
  
  if (!description || typeof description !== 'string') {
    console.error('Description is required and must be a string');
    return {
      success: false,
      error: 'Description is required and must be a string'
    };
  }
  
  try {
    const latex = generateLatexFromDescription(description);
    
    console.log(`Generated LaTeX for "${description}": ${latex}`);
    
    return {
      success: true,
      latex: latex,
      description: description,
      // Provide usage instructions
      instructions: 'Copy the LaTeX code above and paste it into the TeXBloX macro formula field. Choose inline or block display mode as needed.'
    };
  } catch (error) {
    console.error('Error generating LaTeX:', error);
    return {
      success: false,
      error: 'Failed to generate LaTeX formula',
      details: error.message
    };
  }
}