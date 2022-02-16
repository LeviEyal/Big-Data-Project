import express from "express";
const router = express.Router();

import carsController from "../controllers/carsController.js";

router.get("/", (req, res) => {
  res.send("Hello World!");
});

router
  .post("/", carsController.insertToRedis)
  .get("/getFromRedis", carsController.getFromRedis)
  .get("/getAllKeys", carsController.getAllKeys)
  .get("/getAllValues", carsController.getAllValues)
  .get("/getAllPairs", carsController.getAllPairs);

export default router;
