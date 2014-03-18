/**
@module taskcluster-client/factory/graph
*/
var Factory = require('object-factory');
var Task = require('./task');


var GraphTask = new Factory({
  onbuild: function(props) {
    props.requires = props.requires || [];
  },

  properties: {
    // requires: []
    reruns: 0,
    task: Task
  }
});

var Graph = new Factory({
  onbuild: function(props) {
    props.tasks = props.tasks || {};

    props.tasks = Object.keys(props.tasks).reduce(function(result, name) {
      var task = props.tasks[name];
      result[name] = GraphTask.create(task);

      return result;
    }, {});
  },

  properties: {
    version: '0.2.0',
    // routing: ''
    // tasks: { 'name': Graph }
  }
});

module.exports = Graph;
