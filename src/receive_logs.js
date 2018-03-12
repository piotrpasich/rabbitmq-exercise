#!/usr/bin/env node

var amqp = require('amqplib/callback_api');

amqp.connect('amqp://bytebay:bytebay123@localhost', function(err, conn) {
  conn.createChannel(function(err, ch) {
    var ex = 'logs';

    ch.assertExchange(ex, 'fanout', {durable: false});

    ch.assertQueue('fanout_test1', {}, function(err, q) {
      console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q.queue);
      ch.bindQueue(q.queue, ex, '');

      ch.consume(q.queue, function(msg) {
        console.log(" [%s] %s", q.queue, msg.content.toString());
      }, {noAck: true});
    });
  });
});
