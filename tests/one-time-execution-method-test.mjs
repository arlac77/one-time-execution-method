import test from "ava";
import {
  defineOneTimeExecutionMethod
} from "../src/one-time-execution-method.mjs";

class MyClass {
  constructor() {
    this.executions = 0;
  }
}

defineOneTimeExecutionMethod(MyClass.prototype, "initialize", async function() {
  this.executions++;
  return new Promise(resolve => setTimeout(resolve, 200));
});

test("defineOneTimeExecutionMethod once", async t => {
  const object = new MyClass();
  await object.initialize()
  t.is(object.executions, 1);
});

test("defineOneTimeExecutionMethod parallel", async t => {
  const object = new MyClass();

  Promise.all([object.initialize(), object.initialize(), object.initialize()]);

  await object.initialize();

  t.is(object.executions, 1);
});
