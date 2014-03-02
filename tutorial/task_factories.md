The task factory is provided to ease constructing all the parameters
required for posting a task.

## Usage

```js
var Task = require('taskcluster-client/factory/task');

var task = Task.create({
  payload: {
    command: ['echo "woot"']
  }
});

/*
task =>

{ version: '0.2.0',
  provisionerId: 'dont-spawn-machines-without-real-value',
  retries: 1,
  priority: 5,
  payload: 
   { image: 'ubuntu',
     features: {},
     command: [ '/bin/bash -c', 'ls -lah' ] },
  metadata:
   { name: '',
     description: '',
     owner: '',
     source: 'http://localhost' },
  tags: {},
  created: Sun Mar 02 2014 14:31:13 GMT-0800 (PST),
  deadline: Mon Mar 03 2014 14:31:13 GMT-0800 (PST) }
*/
```
