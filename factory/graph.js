/**
@module taskcluster-client/factory/graph
*/
var Factory = require('object-factory');
var Task = require('./task');


var GraphTask = new Factory({
  properties: {
    // required: []
    reruns: 0,
    task: Task
  }
});

var Graph = new Factory({
  onbuild: function(props) {
    props.tasks = props.tasks || [];
    props.tasks = props.tasks.map(function(task) {
      // it is safe to specify it multiple times
      return GraphTask.create(task);
    });
  },

  properties: {
    version: '0.2.0',
    // routing: ''
    // tasks: [GraphTask]
  }
});

module.exports = Graph;
