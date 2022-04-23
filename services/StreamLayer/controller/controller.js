const db = require("../database/RedisDB");

const insertCall = (req, res) => {
    db.redis
        .hset(
            "All_calls",
            new Date().getTime().toString(),
            JSON.stringify(req.body.value)
        )
        .then((result) => {
            res.json(result);
        });
};

const getCall = (req, res) => {
    const answer = db.getFromDB(req.params.key);
    console.log(answer);
    res.json(answer);
};

const getAllCalls = async (req, res) => {
    try {
        const calls = await db.redis.json.GET("All_calls");
        res.json(calls);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    insertCall,
    getCall,
    getAllCalls,
};
