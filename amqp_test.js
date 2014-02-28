suite('amqp', function() {
  var nock = require('nock');
  var amqplib = require('amqplib');
  var subject = require('./amqp');

  test('connect', function() {
    var config = require('./config');
    nock(config().queueUrl).
      get(subject.CONNECTION_URL).
      reply(200, { url: 'amqp://localhost:5672' });

    return subject().then(function(connection) {
      assert.ok(connection, 'provides connection');
      assert.ok(connection.createChannel, 'can create channels');
    });
  });
});
