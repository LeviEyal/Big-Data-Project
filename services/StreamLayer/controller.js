const db = require("./RedisDB");

const insertCall = (req, res) => {
  db.redis.hset("myhash", new Date().getTime().toString(), JSON.stringify(req.body.value)).then(
    (result) => {
      res.json(result);
    });
};

const getCall = (req, res) => {
  const answer = db.getFromDB(req.params.key);
  console.log(answer);
  res.json(answer);
};

const getAllCalls = (req, res) => {
  db.redis.hgetall("myhash").then((calls) => res.json(calls));
};

module.exports = {
  insertCall,
  getCall,
  getAllCalls,
};
