/**
@fileoverview

Exchange constants and utilities for binding to queues...

@module taskcluster-client/exchange
*/

var util = require('util');

exports.QUEUE_TASK_PENDING = 'v1/queue:task-pending';
exports.QUEUE_TASK_RUNNING = 'v1/queue:task-running';
exports.QUEUE_TASK_COMPLETED = 'v1/queue:task-completed';
exports.QUEUE_TASK_FAILED = 'v1/queue:task-failed';

/**
Rollup of all task related exchanges

@type Array
@constant
*/
exports.QUEUE_TASKS = [
  exports.QUEUE_TASK_PENDING,
  exports.QUEUE_TASK_RUNNING,
  exports.QUEUE_TASK_COMPLETED,
  exports.QUEUE_TASK_FAILED
];

/**
@param {Object} options for the routing key.
@param {String} [options.taskId=*]
@param {String} [options.runId=*]
@param {String} [options.workerGroup=*]
@param {String} [options.provisionerId=*]
@param {String} [options.workerType=*]
@param {String} [options.taskRouting=#]
  defaults to # to allow additional dots (.)
@see http://docs.taskcluster.net/queue/events.html#toc_1
@return {String} routing key based on the object params.

@example

var routingKey = exchange.routingKey({
  provisionerId: 'aws-provisioner',
  workerType: 'ami-xfoo'
});

// routingKey => '*.*.*.aws-provisoiner.ami-xfoo.#'

*/
exports.routingKey = function routingKey(options) {
  options = options || {};

  return [
   'taskId',
   'runId',
   'workerGroup',
   'workerId',
   'provisionerId',
   'workerType',
   'taskRouting'
  ].map(function(param) {
    return options[param] || (param == 'taskRouting' ? '#' : '*');
  }).join('.');
};
