// Mock @forge/bridge for testing
global.mockView = {
  getContext: jest.fn(),
  submit: jest.fn(),
  close: jest.fn()
};

// Mock the forge bridge
jest.mock('@forge/bridge', () => ({
  view: global.mockView
}));

// Mock KaTeX CSS import
jest.mock('katex/dist/katex.min.css', () => ({}));

// Mock DOM APIs that might not be available in test environment
Object.defineProperty(window, 'getComputedStyle', {
  value: () => ({
    fontFamily: 'KaTeX_Main, Times, serif',
    fontSize: '16px',
    display: 'inline-block'
  })
});

// Setup document.fonts mock
Object.defineProperty(document, 'fonts', {
  value: {
    ready: Promise.resolve()
  }
});

// Clear all mocks before each test
beforeEach(() => {
  jest.clearAllMocks();
  
  // Reset DOM
  document.body.innerHTML = '';
  
  // Add root elements that our components expect
  const root = document.createElement('div');
  root.id = 'root';
  document.body.appendChild(root);
  
  const configRoot = document.createElement('div');
  configRoot.id = 'config-root';
  document.body.appendChild(configRoot);
});