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
}

jest.setTimeout(30000)
