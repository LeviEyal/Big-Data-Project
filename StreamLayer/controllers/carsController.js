import { createClient } from "redis";
import dotenv from "dotenv";
dotenv.config();

const redisClient = createClient({
  url: process.env.REDIS_URL,
  password: process.env.REDIS_PASSWORD,
});

redisClient.connect();

redisClient.on("connect", function () {
  console.log("Reciever connected to Redis");
});

redisClient.on("error", function (err) {
  console.log("Error " + err);
});

const insertToRedis = (req, res) => {
  const {key, val} = req.body;
  redisClient.set(key, JSON.stringify(val)).then(() => {
    redisClient.get(key).then((value) => {
      res.json({ value });
    });
  });
}

const getFromRedis = (req, res) => {
  redisClient.get(req.body.key).then((value) => {
    res.json(JSON.parse(value));
  });
}

const getAllKeys = (req, res) => {
  redisClient.keys("*").then((keys) => {
    res.json({ keys });
  });
}

const getAllValues = (req, res) => {
  redisClient.keys("*").then((keys) => {
    redisClient.mGet(keys).then((values) => {
      res.json({ values });
    });
  });
}

const getAllPairs = (req, res) => {
  redisClient.keys("*").then((keys) => {
    redisClient.mGet(keys).then((values) => {
      res.json(keys.map((key, index) => ({ key, value: values[index] })));
    });
  });
}

export default{
  insertToRedis,
  getFromRedis,
  getAllKeys,
  getAllValues,
  getAllPairs,
};