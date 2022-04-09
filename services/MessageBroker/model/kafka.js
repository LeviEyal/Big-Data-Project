const uuid = require("uuid");
const Kafka = require("node-rdkafka");
const { kafkaConf } = require("../config/kafka.config");
require("dotenv").config();

const topic = process.env.CLOUDKARAFKA_TOPIC;
const producer = new Kafka.Producer(kafkaConf);

producer
    .on("ready", (arg) =>
        console.log(`producer ${arg.name} ready. topic: ${topic}`)
    )
    .connect();

const publishMessage = (msg) => {
    const m = Buffer.from(JSON.stringify(msg));
    producer.produce(topic, null, m, uuid.v4());
};

module.exports = {
  publishMessage
};
