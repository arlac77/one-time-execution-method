import test from "ava";
import { replaceWithOneTimeExecutionMethod } from "../src/one-time-execution-method.mjs";

class MyClass {
  constructor() {
    this.executions = 0;
  }

  initialize() {
    this.executions++;
    return new Promise(resolve => setTimeout(resolve, 200));
  }

  async reentrantInitialize() {
    this.executions++;
    await this.reentrantInitialize();
    return new Promise(resolve => setTimeout(resolve, 200));
  }
}

replaceWithOneTimeExecutionMethod(MyClass.prototype, "initialize");

test("replaceWithOneTimeExecutionMethod once", async t => {
  const object = new MyClass();
  t.is(object.executions, 0);
  await object.initialize();
  t.is(object.executions, 1);
});

test("replaceWithOneTimeExecutionMethod parallel", async t => {
  const object = new MyClass();

  t.is(object.executions, 0);
  const x = Promise.all([
    object.initialize(),
    object.initialize(),
    object.initialize()
  ]);

  await object.initialize();
  await x;
  t.is(object.executions, 1);
});

replaceWithOneTimeExecutionMethod(MyClass.prototype, "reentrantInitialize");

test("replaceWithOneTimeExecutionMethod reentrant", async t => {
  const object = new MyClass();

  t.is(object.executions, 0);

  await object.reentrantInitialize();

  t.is(object.executions, 1);
});
