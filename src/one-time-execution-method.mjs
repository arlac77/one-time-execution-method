
/**
 * For async functions the resulting Promise of the 1st. invocation
 * will be preserved and always delivered in the future.
 * ```js
 * class MyClass {
 *   async initialize() {
 *    // code here will be executed only once
 *   }
 * }
 * replaceWithOneTimeExecutionMethod(MyClass.prototype, "initialize");
 * 
 * const object = new MyClass();
 * object.initialize(); // body will/can be executed only once
 * ```
 * @param {Object} object prototype to bind method against 
 * @param {string} name of the method
 */
export function replaceWithOneTimeExecutionMethod(object, name) {

  /**
   * Object symbol slot holding the state of the method
   * * undefined -> call func and store Promise
   * * Promise   -> func currently running or fullfilled -> deliver this Promise
   */
  const transitionState = Symbol(`OneTimeExecutionState<${name}>`);
  const func = object[name];

  Object.defineProperty(object, name, {
    value: function(...args) {
      if (this[transitionState] === undefined) {
        this[transitionState] = func.apply(this, ...args);
      }

      return this[transitionState];
    }
  });
}
