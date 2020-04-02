
/**
 * @typedef {Function} AsyncFunction
 * @async
 * @return {Promise} 
 */

/**
 * For async functions the resulting Promise of the 1st. invocation
 * will be preserved and always delivered in the future.
 * ```js
 * class MyClass { }
 * defineOneTimeExecutionMethod(MyClass.prototype, async function initialize() {
 *  // code here will be executed only once
 * });
 * 
 * const object = new MyClass();
 * object.initialize(); // body will be executed only once
 * ```
 * @param {Object} object prototype to bind method against 
 * @param {AsyncFunction} func to be executed (once) must deliver a Promise
 * @param {string} name of the method
 */
export function defineOneTimeExecutionMethod(object, func, name=func.name) {

  /**
   * Object symbol slot holding the state of the method
   * * undefined -> call func and store Promise
   * * Promise   -> func currently running or fullfilled -> deliver this Promise
   */
  const transitionState = Symbol(`OneTimeExecutionState<${name}>`);

  Object.defineProperty(object, name, {
    value: function(...args) {
      if (this[transitionState] === undefined) {
        this[transitionState] = func.apply(this, ...args);
      }

      return this[transitionState];
    }
  });
}
