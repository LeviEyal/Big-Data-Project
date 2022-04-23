const uuid = require("uuid");
const Kafka = require("node-rdkafka");
const kafkaConf = require("../config/kafka.config");
const Customer = require("./Customer");
require("dotenv").config();


const topic = process.env.CLOUDKARAFKA_TOPIC;
const producer = new Kafka.Producer(kafkaConf);

producer
    .on("ready", (arg) =>
        console.log(`producer ${arg.name} ready. topic: ${topic}`)
    )
    .on("event", (err) => console.log(err))
    .connect();

const publishMessage = async (call) => {
    const id = call.id;
    const customer = await Customer.findOne({
        where: {
            id: id,
        },
    });
    if (customer) {
        customer.update({
            prevCalls: customer.prevCalls + 1,
        });
    } else {
        Customer.create({
            ...call,
            prevCalls: 1,
        });
    }
            
    const m = Buffer.from(JSON.stringify(call));
    producer.produce(topic, null, m, uuid.v4());
};

module.exports = {
    publishMessage,
};
