const Redis = require("redis");

const redis = Redis.createClient(require("../config/redis.config"));

redis
    .on("connect", function () {
        console.log("Reciever connected to Redis at: " + process.env.REDIS_URL);
    })
    .on("error", function (err) {
        console.log("Error " + err);
    });

(async () => {
    await redis.connect();
    const exist1 = await redis.exists("calls_data");
    const exist2 = await redis.exists("All_calls");
    if (exist1 && exist2) {
        console.log("exist:", await redis.json.GET("calls_data"));
    } else {
        redis.json.SET("calls_data", "$", require("./init_data"));
        redis.json.SET("All_calls", "$", []);
        const todayEnd = new Date().setHours(23, 59, 59, 999);
        redis.EXPIREAT("calls_data", parseInt(todayEnd / 1000));
        redis.EXPIREAT("All_calls", parseInt(todayEnd / 1000));
        console.log("Creating:", await redis.json.GET("calls_data"));
        console.log("Creating:", await redis.json.GET("All_calls"));
    }
})();

module.exports.redis = redis;
