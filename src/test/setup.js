import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'

// Vitest globals are off, so React Testing Library's automatic DOM cleanup
// doesn't register itself — do it explicitly.
afterEach(cleanup)

// useFadeIn relies on IntersectionObserver, which jsdom doesn't implement.
class MockIntersectionObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
globalThis.IntersectionObserver = MockIntersectionObserver
