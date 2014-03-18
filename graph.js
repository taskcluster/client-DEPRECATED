/**
@module taskcluster-client/queue
*/

var config = require('./config');
var request = require('superagent-promise');
var formatUrl = require('./url');

var HttpError = require('./httperror');

var API_VERSION = '/v1/';

/**
HTTP api for the taskcluster queue.

@param {Object} options for the queue.
@param {String} [options.queueUrl].
@constructor
@see http://docs.taskcluster.net/queue/api-docs.html
@alias module:taskcluster-client/queue
*/
function Graph(options) {
  this.options = config(options);
}

Graph.API_VERSION = API_VERSION;

Graph.prototype = {
  /**
  @see taskcluster-client/factory/graph
  @param {Object} graph object to insert into.
    See the graph factory for helpers to generate this.
  @return {Promise<Object>} promise for the result of the insertion.
  */
  create: function(graph) {
    var url = formatUrl(
      this.options.graphUrl,
      API_VERSION,
      '/task-graph/create',
      []
    );

    return request
      .post(url)
      .send(graph)
      .end()
      .then(HttpError.responseHandler);
  }
};

module.exports = Graph;

