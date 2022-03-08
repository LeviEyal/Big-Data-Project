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

const topics = ["join", "leave", "complaint"];

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
    name: "אייל לוי",
    phone: "0502140955",
    age: randomInt(20, 85),
    gender: genders[randomInt(0, genders.length)],
    city: cities[randomInt(0, cities.length)],
    topic: topics[randomInt(0, topics.length)],
    product: products[randomInt(0, products.length)],
    waiting_time: randomInt(5, 100),
    waiting_calls: randomInt(1, 100),
  };
};

module.exports = {
  generateCall,
};
