suite('exchange', function() {
  var exchange = require('./exchange');

  suite('routingKey', function() {

    test('defaults', function() {
      assert.equal(
        exchange.routingKey(),
        '*.*.*.*.*.*.#'
      );
    });

    test('no defaults', function() {
      var expected = [];
      var object = {};
      var keys = [
       'taskId',
       'runId',
       'workerGroup',
       'workerId',
       'provisionerId',
       'workerType',
       'taskRouting'
      ];

      keys.forEach(function(name) {
        expected.push(name);
        object[name] = name;
      });

      assert.equal(
        exchange.routingKey(object),
        expected.join('.')
      );
    });
  });
});

