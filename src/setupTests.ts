import '@testing-library/jest-dom';

// Suppress Node.js deprecation warnings
const originalEmitWarning = process.emitWarning;
process.emitWarning = function(warning, type, code, ctor) {
  if (code === 'DEP0040') {
    // Suppress punycode deprecation warning
    return;
  }
  return originalEmitWarning.call(process, warning, type, code, ctor);
};

// Mock IntersectionObserver
const mockIntersectionObserver = jest.fn();
mockIntersectionObserver.mockReturnValue({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
});
global.IntersectionObserver = mockIntersectionObserver;

// Mock ResizeObserver
const mockResizeObserver = jest.fn();
mockResizeObserver.mockReturnValue({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
});
global.ResizeObserver = mockResizeObserver;

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});
