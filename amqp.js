/**
@fileoverview
@module taskcluster-client/amqp
*/

var config = require('./config');
var amqplib = require('amqplib');
var request = require('superagent-promise');
var urlJoin = require('url-join');
var assert = require('assert');

/**
Path to amqp connection path.

@constant
*/
var CONNECTION_URL = '/v1/settings/amqp-connection-string';

/**
Fetch the amqp credentials from taskcluster queue and create an amqplib 
connection.

@see http://squaremo.github.io/amqp.node/doc/channel_api.html#toc_1
@param {Object} [credentials] - reserved for future taskcluster credentials.
@param {Object} [socketOptions] - socket options for the amqplib client.
@return {Promise<Connection>}
*/
function amqp(credentials, socketOptions) {
  credentials = config(credentials);

  var url = urlJoin(credentials.queueUrl, CONNECTION_URL);

  return request('GET', url).end().then(function(res) {
    // reject promise
    if (res.error) {
      throw res.error;
    }

    assert(
      res.body.url,
      'taskcluster queue should respond with url'
    );

    return amqplib.connect(res.body.url);
  });
}

amqp.CONNECTION_URL = CONNECTION_URL;

module.exports = amqp;
