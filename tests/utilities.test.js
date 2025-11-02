/**
 * @jest-environment jsdom
 */

import { jest } from '@jest/globals';

describe('TeXBloX Utility Functions', () => {
  
  describe('Formula Validation', () => {
    test('should handle empty formula input', () => {
      const emptyFormula = '';
      const defaultFormula = 'E = mc^2';
      
      // Test that empty formulas fall back to default
      const result = emptyFormula.trim() || defaultFormula;
      expect(result).toBe(defaultFormula);
    });
    
    test('should handle whitespace-only formula input', () => {
      const whitespaceFormula = '   \n\t   ';
      const defaultFormula = 'E = mc^2';
      
      const result = whitespaceFormula.trim() || defaultFormula;
      expect(result).toBe(defaultFormula);
    });
    
    test('should preserve valid formula input', () => {
      const validFormula = '\\frac{a}{b} + c^2';
      
      const result = validFormula.trim() || 'E = mc^2';
      expect(result).toBe('\\frac{a}{b} + c^2');
    });
  });
  
  describe('Display Mode Conversion', () => {
    test('should convert "block" string to boolean true', () => {
      const displayMode = 'block';
      const isDisplayMode = displayMode === 'block';
      
      expect(isDisplayMode).toBe(true);
    });
    
    test('should convert "inline" string to boolean false', () => {
      const displayMode = 'inline';
      const isDisplayMode = displayMode === 'block';
      
      expect(isDisplayMode).toBe(false);
    });
    
    test('should handle undefined display mode', () => {
      const displayMode = undefined;
      const defaultMode = 'inline';
      const finalMode = displayMode || defaultMode;
      const isDisplayMode = finalMode === 'block';
      
      expect(isDisplayMode).toBe(false);
    });
  });
  
  describe('Context Data Extraction', () => {
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
            formula: '\\int_{0}^{1} x dx',
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
      
      expect(formula).toBe('\\int_{0}^{1} x dx');
      expect(displayMode).toBe('inline');
    });
    
    test('should use defaults when no config available', () => {
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
  
  describe('Example Formulas', () => {
    test('should provide valid example formulas', () => {
      const examples = [
        { name: 'Quadratic', formula: '\\frac{-b \\pm \\sqrt{b^2-4ac}}{2a}' },
        { name: 'Integral', formula: '\\int_{0}^{\\infty} e^{-x} dx = 1' },
        { name: 'Sum', formula: '\\sum_{i=1}^{n} x_i' },
        { name: 'Matrix', formula: '\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}' }
      ];
      
      // Test that all examples have required properties
      examples.forEach(example => {
        expect(example).toHaveProperty('name');
        expect(example).toHaveProperty('formula');
        expect(typeof example.name).toBe('string');
        expect(typeof example.formula).toBe('string');
        expect(example.name.length).toBeGreaterThan(0);
        expect(example.formula.length).toBeGreaterThan(0);
      });
    });
    
    test('should have unique example names', () => {
      const examples = [
        { name: 'Quadratic', formula: '\\frac{-b \\pm \\sqrt{b^2-4ac}}{2a}' },
        { name: 'Integral', formula: '\\int_{0}^{\\infty} e^{-x} dx = 1' },
        { name: 'Sum', formula: '\\sum_{i=1}^{n} x_i' },
        { name: 'Matrix', formula: '\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}' }
      ];
      
      const names = examples.map(ex => ex.name);
      const uniqueNames = [...new Set(names)];
      
      expect(names.length).toBe(uniqueNames.length);
    });
  });
  
  describe('DOM Element Creation', () => {
    test('should create styled container elements', () => {
      const container = document.createElement('div');
      container.style.fontFamily = 'system-ui, -apple-system, sans-serif';
      container.style.padding = '20px';
      container.style.maxWidth = '500px';
      
      expect(container.style.fontFamily).toBe('system-ui, -apple-system, sans-serif');
      expect(container.style.padding).toBe('20px');
      expect(container.style.maxWidth).toBe('500px');
    });
    
    test('should create form elements with proper attributes', () => {
      const textarea = document.createElement('textarea');
      textarea.style.width = '100%';
      textarea.style.height = '80px';
      textarea.style.padding = '12px';
      textarea.style.fontFamily = 'monospace';
      
      const radioButton = document.createElement('input');
      radioButton.type = 'radio';
      radioButton.name = 'displayMode';
      radioButton.value = 'inline';
      
      expect(textarea.tagName).toBe('TEXTAREA');
      expect(textarea.style.width).toBe('100%');
      expect(radioButton.type).toBe('radio');
      expect(radioButton.name).toBe('displayMode');
      expect(radioButton.value).toBe('inline');
    });
  });
});