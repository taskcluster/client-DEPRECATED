var nock = require('nock');

module.exports = function() {
  nock('http://scheduler.taskcluster.net:80')
    .get('/v1/table-access/')
    .reply(200, "{\n  \"accountName\": \"taskclusterlog\",\n  \"sharedSignature\": {\n    \"sv\": \"2013-08-15\",\n    \"tn\": \"TaskGraphs\",\n    \"se\": \"2014-03-25T08:24:17Z\",\n    \"sp\": \"r\",\n    \"sig\": \"CElSU9PogTKU=\"\n  },\n  \"taskGraphTable\": \"TaskGraphs\"\n}", { 'access-control-allow-headers': 'X-Requested-With,Content-Type',
    'access-control-allow-origin': '*',
    'content-type': 'application/json; charset=utf-8',
    date: 'Tue, 25 Mar 2014 07:24:17 GMT',
    etag: '"1086568413"',
    'x-powered-by': 'Express',
    'content-length': '254',
    connection: 'Close' });
};
