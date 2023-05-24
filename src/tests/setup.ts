// Yeeted from https://github.com/adazzle/react-data-grid/blob/main/test/setup.ts
if (typeof window !== "undefined") {
  window.ResizeObserver ??= class {
    callback: ResizeObserverCallback

    constructor(callback: ResizeObserverCallback) {
      this.callback = callback
    }

    observe() {
      this.callback([], this)
    }

    unobserve() {}
    disconnect() {}
  }

  // patch clientWidth/clientHeight to pretend we're rendering DataGrid at 1080p
  Object.defineProperties(HTMLDivElement.prototype, {
    clientWidth: {
      get(this: HTMLDivElement) {
        return this.classList.contains("rdg") ? 1920 : 0
      },
    },
    clientHeight: {
      get(this: HTMLDivElement) {
        return this.classList.contains("rdg") ? 1080 : 0
      },
    },
  })

  Element.prototype.setPointerCapture ??= () => {}

  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // Deprecated
      removeListener: jest.fn(), // Deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  })

  Object.defineProperty(global, "ResizeObserver", {
    writable: true,
    value: jest.fn().mockImplementation(() => ({
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn(),
    })),
  })

  Object.defineProperty(window.HTMLElement.prototype, "scrollIntoView", {
    writable: true,
    value: jest.fn(),
  })
}

jest.setTimeout(30000)
