const amqp = require('amqplib');
const rabbitmqConnections = require('./rabbitmqConnections');

const QUEUE_NAME = 'emailQueue';

module.exports = async (email) => {
  try {
    const connection = await rabbitmqConnections();
    console.log('Connected to RabbitMQ successfully');
    const channel = await connection.createChannel();
    await channel.assertQueue(QUEUE_NAME);
    channel.sendToQueue(QUEUE_NAME, Buffer.from(JSON.stringify(email)));
    return connection;
  } catch (error) {
    console.error('Error connecting to RabbitMQ:', error);
  }
};
