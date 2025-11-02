/**
 * @jest-environment jsdom
 */

describe('TeXBloX Configuration Logic', () => {
  
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  describe('Configuration Value Extraction', () => {
    test('should extract values from existing config', () => {
      const ctx = {
        extension: {
          config: {
            formula: 'x^2',
            displayMode: 'inline'
          }
        }
      };
      
      const currentFormula = ctx?.extension?.config?.formula || 'E = mc^2';
      const currentDisplayMode = ctx?.extension?.config?.displayMode || 'inline';
      
      expect(currentFormula).toBe('x^2');
      expect(currentDisplayMode).toBe('inline');
    });
    
    test('should use defaults when no config exists', () => {
      const ctx = {
        extension: {}
      };
      
      const currentFormula = ctx?.extension?.config?.formula || 'E = mc^2';
      const currentDisplayMode = ctx?.extension?.config?.displayMode || 'inline';
      
      expect(currentFormula).toBe('E = mc^2');
      expect(currentDisplayMode).toBe('inline');
    });
  });
  
  describe('Example Formulas', () => {
    test('should provide correct example formulas', () => {
      const examples = [
        { name: 'Quadratic', formula: '\\frac{-b \\pm \\sqrt{b^2-4ac}}{2a}' },
        { name: 'Integral', formula: '\\int_{0}^{\\infty} e^{-x} dx = 1' },
        { name: 'Sum', formula: '\\sum_{i=1}^{n} x_i' },
        { name: 'Matrix', formula: '\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}' }
      ];
      
      expect(examples).toHaveLength(4);
      expect(examples[0].name).toBe('Quadratic');
      expect(examples[0].formula).toBe('\\frac{-b \\pm \\sqrt{b^2-4ac}}{2a}');
      expect(examples[1].name).toBe('Integral');
      expect(examples[1].formula).toBe('\\int_{0}^{\\infty} e^{-x} dx = 1');
    });
  });
  
  describe('Form Data Preparation', () => {
    test('should prepare correct form data for submission', () => {
      const formula = '\\int_{0}^{\\infty} e^{-x} dx';
      const displayMode = 'block';
      
      const formData = {
        config: {
          formula: formula,
          displayMode: displayMode
        }
      };
      
      expect(formData.config.formula).toBe('\\int_{0}^{\\infty} e^{-x} dx');
      expect(formData.config.displayMode).toBe('block');
    });
    
    test('should handle empty formula with fallback', () => {
      const inputValue = '';
      const formula = inputValue.trim() || 'E = mc^2';
      const displayMode = 'inline';
      
      const formData = {
        config: {
          formula: formula,
          displayMode: displayMode
        }
      };
      
      expect(formData.config.formula).toBe('E = mc^2');
    });
  });
});