import { faker } from '@faker-js/faker';
import { sample } from 'lodash';
// ----------------------------------------------------------------------

const currentTime = () => (
    `${new Date().getHours() 
    }:${ 
    new Date().getMinutes() 
    }:${ 
    new Date().getSeconds()}`
  );

const topics = ["הצטרפות", "ניתוק", "תלונה"];
const products = ["אינטרנט", "טלפון", "טלפון נייד"];
const genders = ["זכר", "נקבה"];
const cities = [
  "תל אביב",
  "ירושלים",
  "חיפה",
  "באר שבע",
  "אילת",
  "אשקלון",
  "עפולה",
  "טבריה",
  "קריית שמונה",
  "אריאל",
  "נתניה",
];
const langs = [
  "עברית",
  "אנגלית",
  "ערבית",
  "צרפתית",
  "רוסית",
  "אמהרית"
];

const users = [...Array(24)].map(() => ({
  id: faker.datatype.uuid(),
  name: faker.name.findName(),
  start_time: currentTime(),
  end_time: currentTime(),
  phone: faker.phone.phoneNumber("05#######"),
  age: faker.random.number({ min: 18, max: 60 }),
  gender: sample(genders),
  city: sample(cities),
  topic: sample(topics),
  product: sample(products),
  lang: sample(langs)
}));

export default users;
