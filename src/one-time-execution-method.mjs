
/**
 * 
 * @param {Object} object prototype to bind method against 
 * @param {string} name of the method  
 * @param {Function} func to be executed (once) 
 */
export function defineOneTimeExecutionMethod(object, name, func) {
  /**
   * undefined -> call func and store Promise
   * Promise   -> func currently running or fullfilled -> deliver this Promise
   */
  const transitionState = Symbol(`OneTimeExecutionState:${name}`);

  Object.defineProperty(object, name, {
    value: async function(...args) {
      if (!this[transitionState]) {
        this[transitionState] = func.apply(this, ...args);
      }

      return this[transitionState];
    }
  });
}
