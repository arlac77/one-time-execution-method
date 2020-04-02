[![npm](https://img.shields.io/npm/v/one-time-execution-method.svg)](https://www.npmjs.com/package/one-time-execution-method)
[![License](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)
[![minified size](https://badgen.net/bundlephobia/min/one-time-execution-method)](https://bundlephobia.com/result?p=one-time-execution-method)
[![downloads](http://img.shields.io/npm/dm/one-time-execution-method.svg?style=flat-square)](https://npmjs.org/package/one-time-execution-method)
[![GitHub Issues](https://img.shields.io/github/issues/arlac77/one-time-execution-method.svg?style=flat-square)](https://github.com/arlac77/one-time-execution-method/issues)
[![Build Status](https://secure.travis-ci.org/arlac77/one-time-execution-method.png)](http://travis-ci.org/arlac77/one-time-execution-method)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/arlac77/one-time-execution-method)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![Known Vulnerabilities](https://snyk.io/test/github/arlac77/one-time-execution-method/badge.svg)](https://snyk.io/test/github/arlac77/one-time-execution-method)
[![codecov.io](http://codecov.io/github/arlac77/one-time-execution-method/coverage.svg?branch=master)](http://codecov.io/github/arlac77/one-time-execution-method?branch=master)
[![Coverage Status](https://coveralls.io/repos/arlac77/one-time-execution-method/badge.svg)](https://coveralls.io/r/arlac77/one-time-execution-method)

# one-time-execution-method

Define methods that will be executed only once.

For async functions the resulting Promise of the 1st. invocation will be preserved and always delivered in the future

# example

<!-- skip-example -->

```javascript
import { defineOneTimeExecutionMethod } from "one-time-execution-method";

class MyClass {
  constructor() {
    this.executions = 0;
  }
}

// add initialize() method to MyClass
defineOneTimeExecutionMethod(MyClass.prototype, "initialize", function() {
  this.executions++;
  return new Promise(resolve => setTimeout(resolve, 1000));
});

async doit() {
  const object = new MyClass();

  // start several initializations in parallel
  Promise.all([object.initialize(), object.initialize(), object.initialize()]);

  await object.initialize();

  // even after several parallel executions only one run is done
  console.log(this.executions); // -> 1
}

doit();
```

# API

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

### Table of Contents

-   [defineOneTimeExecutionMethod](#defineonetimeexecutionmethod)
    -   [Parameters](#parameters)
-   [transitionState](#transitionstate)

## defineOneTimeExecutionMethod

For async functions the resulting Promise of the 1st. invocation
will be preserved and always delivered in the future.

```js
class MyClass { ... }
defineOneTimeExecutionMethod(MyClass.prototype, "initialize", async function() {
 // code here will be executed only once
});

const object = new MyClass();
object.initialize(); // body will be executed only once
```

### Parameters

-   `object` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** prototype to bind method against
-   `name` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** of the method
-   `func` **[Function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function)** to be executed (once) must deliver a Promise

## transitionState

undefined -> call func and store Promise
Promise   -> func currently running or fullfilled -> deliver this Promise

# install

With [npm](http://npmjs.org) do:

```shell
npm install one-time-execution-method
```

# license

BSD-2-Clause
