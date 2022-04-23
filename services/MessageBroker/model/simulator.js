const _ = require("lodash");
const names = require("random-names-hebrew")

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
const langs = [
  "עברית",
  "אנגלית",
  "ערבית",
  "צרפתית",
  "ספרדית",
  "אמהרית",
  "רוסית"
];

const ONE_MINUTE = 60 * 1000;

/**
 * This function generates a random call
*/
const generateCall = () => {
  const start_time = Date.now();
  const end_time = Date.now() + _.random(ONE_MINUTE * 0.5, ONE_MINUTE * 20, false);
  return {
    id: _.random(100000000, 999999999, false),
    start_time: start_time,
    end_time: end_time,
    duration: (end_time - start_time) / 1000 / 60,
    name: names.create().fullName,
    phone: "05" + _.random(10000000, 99999999, false),
    age: _.random(20, 85, false),
    gender: _.sample(genders),
    city: _.sample(cities),
    lang: _.sample(langs),
    product: _.sample(products),
    waiting_time: _.random(5, 10, false),
    waiting_calls: _.random(5, 10, false),
    topic: _.sample(topics)
  };
};

module.exports = {
  generateCall,
};
