
# one-time-execution-method

Define methods that will be executed only once.


# example

<!-- skip-example -->

```javascript
import { defineOneTimeExecutionMethod } from "one-time-execution-method";

class MyClass {
  constructor() {
    this.executions = 0;
  }
}

defineOneTimeExecutionMethod(MyClass.prototype, "initialize", async function() {
  this.executions++;
  return new Promise(resolve => setTimeout(resolve, 1000));
});


async doit() {
  const object = new MyClass();

  Promise.all([object.initialize(), object.initialize(), object.initialize()]);

  await object.initialize();

  // even after several parallel executions only one run is done
  console.log(this.executions); // -> 1
}

doit();

```

# API

# install

With [npm](http://npmjs.org) do:

```shell
npm install one-time-execution-method
```

# license

BSD-2-Clause
