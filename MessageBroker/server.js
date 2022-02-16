const app = require("express")();

const kafka = require("./publish");
const port = process.env.PORT || 3001;

app.get("/", (req, res) =>
  res.send("<a href='/send'>Send</a>")
);

app.get("/send", (req, res) => {
  kafka.publishMessage(req.body);
  res.send("message was sent");
});

app.listen(port, () =>
  console.log(`Ariel app listening at http://localhost:${port}`)
);
