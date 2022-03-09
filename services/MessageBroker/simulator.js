const {faker} = require("@faker-js/faker");
const _ = require("lodash");

const cities = [
  "Tel Aviv",
  "Haifa",
  "Beer Sheva",
  "Jerusalem",
  "Eilat",
  "Rishon Lezion",
  "Ashdod",
  "Petah Tikva",
  "Ashkelon",
  "Rehovot",
];

const topics = ["join", "leave", "complaint", "service"];

const products = ["אינטרנט", "טלפון", "טלפון נייד"];

const genders = ["זכר", "נקבה"];
const randomInt = (min, max) => {
  max = max - 1;
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const currentTime = () => {
  return (
    new Date().getHours() +
    ":" +
    new Date().getMinutes() +
    ":" +
    new Date().getSeconds()
  );
};

const generateCall = () => {
  return {
    start_time: currentTime(),
    end_time: currentTime(),
    name: faker.name.findName(),
    phone: faker.phone.phoneNumber("05#######"),
    age: randomInt(20, 85),
    gender: _.sample(genders),
    city: _.sample(cities),
    topic: _.sample(topics),
    product: _.sample(products),
    waiting_time: randomInt(5, 100),
    waiting_calls: randomInt(1, 100),
  };
};

module.exports = {
  generateCall,
};
