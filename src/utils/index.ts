/**
 * Creates a function that is restricted to invoking func once. Repeat calls to the function return the value of the first invocation. The func is invoked with the this binding and arguments of the created function.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function once<T extends (...args: any[]) => any>(fn: T): T {
  let called = false
  let result: ReturnType<T>

  return function (this: unknown, ...args: Parameters<T>): ReturnType<T> {
    if (!called) {
      called = true
      result = fn.apply(this, args)
    }
    return result
  } as T
}
