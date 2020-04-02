
/**
 * For async functions the resulting Promise of the 1st. invocation
 * will be preserved and always delivered in the future.
 * ```js
 * class MyClass { ... }
 * defineOneTimeExecutionMethod(MyClass.prototype, "initialize", async function() {
 *  // code here will be executed only once
 * });
 * 
 * const object = new MyClass();
 * object.initialize(); // body will be executed only once
 * ```
 * @param {Object} object prototype to bind method against 
 * @param {string} name of the method  
 * @param {Function} func to be executed (once) must deliver a Promise 
 */
export function defineOneTimeExecutionMethod(object, name, func) {
  /**
   * undefined -> call func and store Promise
   * Promise   -> func currently running or fullfilled -> deliver this Promise
   */
  const transitionState = Symbol(`OneTimeExecutionState<${name}>`);

  Object.defineProperty(object, name, {
    value: async function(...args) {
      if (!this[transitionState]) {
        this[transitionState] = func.apply(this, ...args);
      }

      return this[transitionState];
    }
  });
}
