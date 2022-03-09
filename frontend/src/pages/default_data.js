import faker from '@faker-js/faker';

export default {
  current_waiting_calls: 0,
  waiting_times: [],
  number_of_waiting_calls: [44, 55, 41, 67, 22, 43, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  calls_per_topic: {
    join: 23,
    leave: 43,
    complaint: 13,
    service: 135
  },
  calls_per_hour: [
    {
      name: 'הצטרפות',
      data: [44, 55, 41, 67, 22, 43, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    },
    {
      name: 'ניתוק',
      data: [13, 23, 20, 8, 13, 27, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    },
    {
      name: 'שירות',
      data: [11, 17, 15, 15, 21, 14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    },
    {
      name: 'תלונה',
      data: [21, 7, 25, 13, 22, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    }
  ],
  last_calls: [
    {
      title: 'אייל לוי',
      time: faker.date.past(),
      phone: faker.phone.phoneNumber('05########'),
      type: 'ניתוק'
    },
    {
      title: 'שרון כהן',
      time: faker.date.past(),
      phone: faker.phone.phoneNumber('05########'),
      type: 'שירות'
    },
    {
      title: 'חננאל לזר',
      time: faker.date.past(),
      phone: faker.phone.phoneNumber('05########'),
      type: 'שירות'
    },
    {
      title: 'יוני אסקו',
      time: faker.date.past(),
      phone: faker.phone.phoneNumber('05########'),
      type: 'הצטרפות'
    },
    {
      title: 'דן דוידוב',
      time: faker.date.past(),
      phone: faker.phone.phoneNumber('05########'),
      type: 'תלונה'
    }
  ],
  calls_per_city: {
    'פתח תקווה': 28,
    נתניה: 12,
    חיפה: 10,
    ירושלים: 76,
    'תל אביב': 7,
    נצרת: 37,
    אשקלון: 67,
    אריאל: 21
  }
};
