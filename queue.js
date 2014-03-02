/**
@module taskcluster-client/queue
*/

var util = require('util');
var urlJoin = require('url-join');
var config = require('./config');
var request = require('superagent-promise');

var API_VERSION = 'v1';

function handleResponse(promise) {
  return promise.then(function(res) {
    if (res.error) throw res.error;
    return res.body;
  });
}

/**
HTTP api for the taskcluster queue.

@param {Object} options for the queue.
@param {String} [options.queueUrl].
@see http://docs.taskcluster.net/queue/api-docs.html
*/
function Queue(options) {
  this.options = config(options);
}

Queue.API_VERSION = API_VERSION;

Queue.prototype = {

  /**
  Issue a request to the taskcluster queue.

  @param {String} method to issue.
  @param {String} url for the queue.
  @return {Promise<Object>}
  */
  request: function(method, url) {
    // XXX: Add authentication here...
    return request(method, url);
  },

  /**
  Fetch the amqp credentials from taskcluster queue and create an amqplib
  connection.
  @return {Promise<Object>}
  */
  amqpConnectionString: function() {
    var url = this.url('/settings/amqp-connection-string');
    console.log(url);
    return handleResponse(this.request(
      'GET',
      url
    ).end());
  },

  /**
  Build a url for the queue (with the appropriate version). Runs string through
  util.format so placeholders can be used...

  @param {String} path to use (can use placeholders in string)
  @param {Array} [placeholders]
  */
  url: function() {
    var format = Array.prototype.slice.call(arguments);

    return urlJoin(
      this.options.queueUrl,
      API_VERSION,
      util.format.apply(util, format)
    );
  }
};

module.exports = Queue;
