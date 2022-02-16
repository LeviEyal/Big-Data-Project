const uuid = require("uuid");
const Kafka = require("node-rdkafka");

require("dotenv").config();

const kafkaConf = {
  "group.id": "cloudkarafka-example",
  "metadata.broker.list": process.env.CLOUDKARAFKA_BROKERS.split(","),
  "socket.keepalive.enable": true,
  "security.protocol": "SASL_SSL",
  "sasl.mechanisms": "SCRAM-SHA-256",
  "sasl.username": process.env.CLOUDKARAFKA_USERNAME,
  "sasl.password": process.env.CLOUDKARAFKA_PASSWORD,
  debug: "generic,broker,security",
};

const topic = process.env.CLOUDKARAFKA_TOPIC;
const producer = new Kafka.Producer(kafkaConf);

const genMessage = (m) => new Buffer.alloc(m.length, m);

producer.on("ready", (arg) => console.log(`producer ${arg.name} ready.`));

producer.connect();

const publishMessage = (msg) => {
  const msgString = JSON.stringify(msg);
  const m = new Buffer.alloc(m.length, m);
  producer.produce(topic, -1, m, uuid.v4());
};

module.exports.publishMessage = publishMessage;
