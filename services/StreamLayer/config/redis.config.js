require("dotenv").config();

module.exports = {
    password: process.env.REDIS_PASSWORD,
    url: "redis://redis-17285.c246.us-east-1-4.ec2.cloud.redislabs.com:17285",
}