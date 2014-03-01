Its fairly easy to bind everything yourself with amqp but there is quite
a bit of boilerplate and hardcoded strings... Here is an example of
using the `amqp` and `exchange` module together to listen on the task
running exchange.

```js
// schema.js
var AmqpSchema = require('amqpworkers/schema');

var exchange = require('taskcluster-client/exchange');
var route = exchange.routingKey();

module.exports = new AmqpSchema({
  queues: [
    ['taskcluster-thing', { durable: true }]
  ],

  binds: [
    ['taskcluster-thing', exchanges.QUEUE_TASK_RUNNING, route]
  ]
});
```

```js
// app.js
var amqp = require('taskcluster-client/amqp');
var schema = require('./schema');

// declare your apps amqp schema (this is idempotent so you can run this
safely on app startup).

amqp().then(function(connection) {
  return schema.define(connection);
});
```

Also see the [docs for schema](https://github.com/lightsofapollo/amqpworkers#schema)

