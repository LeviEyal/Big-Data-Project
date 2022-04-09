const {faker} = require("@faker-js/faker");
const _ = require("lodash");

const cities = [
  "תל אביב",
  "ירושלים",
  "חיפה",
  "נתניה",
  "אריאל",
  "ראשון לציון",
  "רחובות",
  "גבעתיים",
  "אילת",
  "חדרה",
  "קריית שמונה",
  "באר שבע",
  "קריית ביאליק",
  "קריית אונו",
  "עפולה",
  "דימונה",
  "ירוחם",
  "כרמיאל",
  "כפר סבא",
  "נס ציונה",
  "נצרת",
  "פתח תקווה",
  "עכו",
  "עפולה",
  "ערד",
  "צפת"
];

const topics = ["הצטרפות", "ניתוק", "תלונה", "שירות"];
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
