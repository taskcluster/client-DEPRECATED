# taskcluster-client

Various utilities for interacting with various taskcluster components
(mostly the queue and amqp). The intent is for the "client" to be a set
of small modules which can be used selectively.

## Environment configuration

  `TASKCLUSTER_QUEUE` - taskcluster queue location (defaults to queue.taskcluster.net)
