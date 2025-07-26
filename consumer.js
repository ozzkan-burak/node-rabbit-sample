const amqp = require('amqplib');
const rabbitmqConnections = require('./rabbitmqConnections');
const { connect } = require('http2');

const QUEUE_NAME = 'emailQueue';

async function emailConsumer() {
  const connectection = await rabbitmqConnections();
  const channel = await connectection.createChannel();
  await channel.assertQueue(QUEUE_NAME);

  channel.consume(QUEUE_NAME, (email) => {
    if (email) {
      console.log('Email received:', email);
      channel.ack(email);
    }
  });
}
