const uuid = require("uuid");
const Kafka = require("node-rdkafka");

require("dotenv").config();

const kafkaConf = {
  "group.id": "cloudkarafka",
  "metadata.broker.list": process.env.CLOUDKARAFKA_BROKERS.split(","),
  "socket.keepalive.enable": true,
  "security.protocol": "SASL_SSL",
  "sasl.mechanisms": "SCRAM-SHA-256",
  "sasl.username": process.env.CLOUDKARAFKA_USERNAME,
  "sasl.password": process.env.CLOUDKARAFKA_PASSWORD,
  debug: "generic,broker,security",
};
const topic = process.env.CLOUDKARAFKA_TOPIC;

const consumer = new Kafka.KafkaConsumer(kafkaConf);

consumer
  .on("ready", (arg) => {
    consumer.subscribe([topic]);
    console.log(`Consumer ${arg.name} ready. topics: ${topic}`);
    consumer.consume();
  })
  .on("disconnected", (arg) =>
    console.log(`Consumer ${arg.name} disconnected.`)
  )
  .on("event.error", (err) => console.error(err));

consumer.connect();

module.exports.consumer = consumer;
