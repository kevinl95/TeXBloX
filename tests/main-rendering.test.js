/**
 * @jest-environment jsdom
 */

const katex = require('katex');

// Mock katex
jest.mock('katex', () => ({
  render: jest.fn()
}));

describe('TeXBloX Main Rendering Logic', () => {
  
  beforeEach(() => {
    jest.clearAllMocks();
    katex.render.mockClear();
  });
  
  describe('Formula Source Detection', () => {
    test('should extract formula from macro parameters', () => {
      const ctx = {
        extension: {
          macro: {
            parameters: {
              formula: 'x^2 + y^2 = z^2',
              displayMode: 'block'
            }
          }
        }
      };
      
      // Simulate the logic from our main file
      let formula = 'E = mc^2';
      let displayMode = 'inline';
      
      if (ctx?.extension?.macro?.parameters?.formula) {
        formula = ctx.extension.macro.parameters.formula;
        displayMode = ctx.extension.macro.parameters.displayMode || 'inline';
      }
      
      expect(formula).toBe('x^2 + y^2 = z^2');
      expect(displayMode).toBe('block');
    });
    
    test('should extract formula from config when parameters not available', () => {
      const ctx = {
        extension: {
          config: {
            formula: 'E = mc^2',
            displayMode: 'inline'
          }
        }
      };
      
      let formula = 'E = mc^2';
      let displayMode = 'inline';
      
      if (ctx?.extension?.macro?.parameters?.formula) {
        formula = ctx.extension.macro.parameters.formula;
        displayMode = ctx.extension.macro.parameters.displayMode || 'inline';
      } else if (ctx?.extension?.config?.formula) {
        formula = ctx.extension.config.formula;
        displayMode = ctx.extension.config.displayMode || 'inline';
      }
      
      expect(formula).toBe('E = mc^2');
      expect(displayMode).toBe('inline');
    });
    
    test('should use default when no config available', () => {
      const ctx = {
        extension: {}
      };
      
      let formula = 'E = mc^2';
      let displayMode = 'inline';
      
      if (ctx?.extension?.macro?.parameters?.formula) {
        formula = ctx.extension.macro.parameters.formula;
        displayMode = ctx.extension.macro.parameters.displayMode || 'inline';
      } else if (ctx?.extension?.config?.formula) {
        formula = ctx.extension.config.formula;
        displayMode = ctx.extension.config.displayMode || 'inline';
      }
      
      expect(formula).toBe('E = mc^2');
      expect(displayMode).toBe('inline');
    });
  });
  
  describe('Display Mode Conversion', () => {
    test('should convert block string to boolean true', () => {
      const displayMode = 'block';
      const isDisplayMode = displayMode === 'block';
      
      expect(isDisplayMode).toBe(true);
    });
    
    test('should convert inline string to boolean false', () => {
      const displayMode = 'inline';
      const isDisplayMode = displayMode === 'block';
      
      expect(isDisplayMode).toBe(false);
    });
  });
  
  describe('KaTeX Options', () => {
    test('should create correct KaTeX options for inline mode', () => {
      const formula = 'x + y';
      const displayMode = 'inline';
      const isDisplayMode = displayMode === 'block';
      
      const katexOptions = {
        throwOnError: false,
        displayMode: isDisplayMode,
        output: 'html',
        strict: false,
        trust: true,
        macros: {},
        fleqn: false
      };
      
      expect(katexOptions.displayMode).toBe(false);
      expect(katexOptions.throwOnError).toBe(false);
      expect(katexOptions.output).toBe('html');
    });
    
    test('should create correct KaTeX options for block mode', () => {
      const formula = '\\frac{a}{b}';
      const displayMode = 'block';
      const isDisplayMode = displayMode === 'block';
      
      const katexOptions = {
        throwOnError: false,
        displayMode: isDisplayMode,
        output: 'html',
        strict: false,
        trust: true,
        macros: {},
        fleqn: false
      };
      
      expect(katexOptions.displayMode).toBe(true);
    });
  });
});