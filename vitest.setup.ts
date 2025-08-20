import { afterEach, vi } from "vitest"
import { cleanup } from "@testing-library/react"

import "@testing-library/jest-dom"

declare module "vitest" {
  export interface Assertion<T = any> extends jest.Matchers<void, T> {}
}

afterEach(() => {
  cleanup()
})

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

class PointerEventMock extends MouseEvent {
  constructor(type: string, props?: PointerEventInit) {
    super(type, props)
  }
}

Object.defineProperty(window, "PointerEvent", {
  value: PointerEventMock,
  writable: true,
})

window.HTMLElement.prototype.scrollTo = vi.fn()
window.HTMLElement.prototype.scrollIntoView = vi.fn()

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

global.ResizeObserver = ResizeObserver
