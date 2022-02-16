import express, { json } from "express";
import cors from "cors";

import carsRouter from "./routes/Cars.js";

const PORT = process.env.PORT || 3002;
const app = express();

/* Middleware */
app.use(json());
app.use(cors());

/* Routes */
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use('/cars', carsRouter);

/* Start server */
app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
