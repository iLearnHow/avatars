// Jest test setup file
// Configure global test environment

// Mock browser APIs for Node.js environment
global.window = {
  performance: {
    now: () => Date.now(),
    mark: () => {},
    measure: () => {},
    getEntriesByName: () => []
  },
  localStorage: {
    getItem: () => null,
    setItem: () => {},
    removeItem: () => {},
    clear: () => {}
  },
  sessionStorage: {
    getItem: () => null,
    setItem: () => {},
    removeItem: () => {},
    clear: () => {}
  },
  addEventListener: () => {},
  removeEventListener: () => {},
  dispatchEvent: () => {},
  document: {
    createElement: () => ({
      addEventListener: () => {},
      removeEventListener: () => {},
      setAttribute: () => {},
      getAttribute: () => null,
      appendChild: () => {},
      removeChild: () => {},
      querySelector: () => null,
      querySelectorAll: () => []
    }),
    getElementById: () => null,
    querySelector: () => null,
    querySelectorAll: () => [],
    addEventListener: () => {},
    removeEventListener: () => {}
  }
};

global.document = global.window.document;
global.navigator = {
  userAgent: 'node.js',
  language: 'en-US'
};

// Mock console methods to reduce noise in tests
global.console = {
  ...console,
  log: jest.fn(),
  warn: jest.fn(),
  error: jest.fn()
};

// Mock fetch for API tests
global.fetch = jest.fn();

// Mock Audio API
global.Audio = jest.fn().mockImplementation(() => ({
  play: jest.fn(),
  pause: jest.fn(),
  load: jest.fn(),
  addEventListener: jest.fn(),
  removeEventListener: jest.fn()
}));

// Set up test timeout
jest.setTimeout(10000); 