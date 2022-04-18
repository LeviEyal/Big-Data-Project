const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_DB_URL);

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const PhoneCallSchema = new Schema({
  start_time: String,
  end_time: String,
  duration: Number,
  name: String,
  phone: Number,
  age: Number,
  gender: String,
  city: String,
  lang: String,
  product: String,
  topic: String,
});

const PhoneCallModel = mongoose.model('PhoneCall', PhoneCallSchema );

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected to MongoDB");
});

module.exports = PhoneCallModel;
