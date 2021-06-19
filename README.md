# PG Streams

This is a simple little example of replicating data across different
databases quickly and with little memory overhead. We make use of the
streaming functionality that postgres offers and some node stream trickery.

Check out `index.js` for the example.

## How it works
We create two streams:
 * the first executes a COPY statement in database A and directs to STDOUT
 * the second executes a COPY statement in database B and directs from STDIN

We then wrap these streams in node constructs and pipe one to another. This
leaves us with some RAPID data replication.

We sacrifice robustness for speed.
See more at [pg-copy-streams](https://www.npmjs.com/package/pg-copy-streams)

