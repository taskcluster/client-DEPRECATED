/**
shared configuration generation for various modules.

@module taskcluster-client/config
*/

/**
XXX: this should be https and in the mozilla subdomain.

@constant
*/
var DEFAULT_TASKCLUSTER_QUEUE = 'http://queue.taskcluster.net';

/**
@param {Object} [options] configuration details for TC.
@return {Object} full configuration for taskcluster
*/
function config(options) {
  options = options || {};

  return {
    queueUrl: options.queueUrl || DEFAULT_TASKCLUSTER_QUEUE
  };
}

module.exports = config;
