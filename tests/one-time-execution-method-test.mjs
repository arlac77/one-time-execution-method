import test from "ava";
import {
  defineOneTimeExecutionMethod
} from "../src/one-time-execution-method.mjs";

class MyClass {
  constructor() {
    this.executions = 0;
  }
}

defineOneTimeExecutionMethod(MyClass.prototype, function initialize () {
  this.executions++;
  return new Promise(resolve => setTimeout(resolve, 200));
});

test("defineOneTimeExecutionMethod once", async t => {
  const object = new MyClass();
  t.is(object.executions, 0);
  await object.initialize()
  t.is(object.executions, 1);
});

test("defineOneTimeExecutionMethod parallel", async t => {
  const object = new MyClass();

  t.is(object.executions, 0);
  Promise.all([object.initialize(), object.initialize(), object.initialize()]);

  await object.initialize();

  t.is(object.executions, 1);
});



defineOneTimeExecutionMethod(MyClass.prototype, async function reentrantInitialize() {
  this.executions++;

  await this.reentrantInitialize();
  return new Promise(resolve => setTimeout(resolve, 200));
});

test.skip("defineOneTimeExecutionMethod reentrant", async t => {
  const object = new MyClass();

  t.is(object.executions, 0);

  await object.reentrantInitialize();

  t.is(object.executions, 1);
});
