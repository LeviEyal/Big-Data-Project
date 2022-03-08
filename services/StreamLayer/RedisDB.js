const Redis = require("redis");

require("dotenv").config();

const redis = Redis.createClient({
  password: process.env.REDIS_PASSWORD,
  url: "redis://redis-17285.c246.us-east-1-4.ec2.cloud.redislabs.com:17285",
});

redis
  .on("connect", function () {
    console.log("Reciever connected to Redis at: " + process.env.REDIS_URL);
  })
  .on("error", function (err) {
    console.log("Error " + err);
  });

(async () => {
  await redis.connect();
  await redis.exists("calls_data").then(async (exists) => {
    if (exists) {
      console.log("exist:", await redis.json.GET("calls_data"));
    } else {
      redis.json.SET("calls_data", "$", {
        current_waiting_calls: 0,
        waiting_times: [],
        number_of_waiting_calls: [],
        calls_per_topic: {
          join: 0,
          leave: 0,
          complaint: 0,
        },
      });
      console.log("NOT exist:", await redis.json.GET("calls_data"));
    }
  });
})();

module.exports.redis = redis;
