suite('queue', function() {
  var nock = require('nock');
  var urlJoin = require('url-join');
  var Queue = require('./queue');

  var subject;
  setup(function() {
    subject = new Queue();
  });

  test('initialize with queueUrl', function() {
    var url = 'http://xfoo.com';
    var subject = new Queue({
      queueUrl: url
    });

    assert.equal(subject.options.queueUrl, url);
  });

  test('#url', function() {
    var expected = urlJoin(
      subject.options.queueUrl,
      Queue.API_VERSION,
      'task/1/status'
    );

    var url = subject.url('task/%d/status', 1);

    assert.equal(expected, url);
  });

  test('#amqpConnectionString', function() {
    var config = require('./config');
    var url = 'amqp://localhost:5672';

    nock(subject.options.queueUrl).
      get('/v1/settings/amqp-connection-string').
      reply(200, { url: url });

    return subject.amqpConnectionString().then(function(body) {
      assert.equal(body.url, url);
    });
  });
});
