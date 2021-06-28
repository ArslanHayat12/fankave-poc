const express = require("express");
const path = require("path");
const app = express();
app.use(express.static(path.join(__dirname, "build", "static")));
app.use(
  "/testimonial-poc",
  express.static(path.join(__dirname, "build", "static"))
);

app.get("/ping", function (req, res) {
  return res.send("pong");
});

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.get("/testimonial-poc", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(process.env.PORT || 5000);
