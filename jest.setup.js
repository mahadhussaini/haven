import '@testing-library/jest-dom'

// Mock Next.js router
jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '/',
      query: {},
      asPath: '/',
      push: jest.fn(),
      pop: jest.fn(),
      reload: jest.fn(),
      back: jest.fn(),
      prefetch: jest.fn().mockResolvedValue(undefined),
      beforePopState: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
        emit: jest.fn(),
      },
    }
  },
}))

// Mock next/link
jest.mock('next/link', () => {
  return ({ children, href }) => {
    return <a href={href}>{children}</a>
  }
})

// Mock leaflet for map components
jest.mock('react-leaflet', () => ({
  MapContainer: ({ children, ...props }) => <div {...props}>{children}</div>,
  TileLayer: (props) => <div {...props} />,
  Marker: ({ children, ...props }) => <div {...props}>{children}</div>,
  Popup: ({ children, ...props }) => <div {...props}>{children}</div>,
}))

// Mock dynamic imports
jest.mock('next/dynamic', () => {
  return (func) => {
    const Component = func()
    return Component.default || Component
  }
})

// Mock geolocation API
Object.defineProperty(navigator, 'geolocation', {
  value: {
    getCurrentPosition: jest.fn().mockImplementation((success) =>
      success({
        coords: {
          latitude: 40.7128,
          longitude: -74.0060,
          accuracy: 100,
        },
      })
    ),
    watchPosition: jest.fn(),
    clearWatch: jest.fn(),
  },
  writable: true,
})

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}
global.localStorage = localStorageMock

// Mock fetch
global.fetch = jest.fn()

// Mock ResizeObserver
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}))

// Mock IntersectionObserver
global.IntersectionObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}))

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

// Mock caches API for service workers
global.caches = {
  open: jest.fn().mockResolvedValue({
    match: jest.fn().mockResolvedValue(null),
    put: jest.fn().mockResolvedValue(undefined),
  }),
  match: jest.fn().mockResolvedValue(null),
  delete: jest.fn().mockResolvedValue(true),
  keys: jest.fn().mockResolvedValue([]),
}

// Suppress console errors during testing
const originalError = console.error
const originalWarn = console.warn

beforeAll(() => {
  console.error = (...args) => {
    if (
      typeof args[0] === 'string' &&
      (args[0].includes('Warning:') ||
       args[0].includes('ReactDOM.render is no longer supported') ||
       args[0].includes('act('))
    ) {
      return
    }
    originalError.call(console, ...args)
  }

  console.warn = (...args) => {
    if (
      typeof args[0] === 'string' &&
      args[0].includes('act(')
    ) {
      return
    }
    originalWarn.call(console, ...args)
  }
})

afterAll(() => {
  console.error = originalError
  console.warn = originalWarn
})
