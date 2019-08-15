const express = require("express");
const app = express();
const fs = require("fs"); // node original module
const path = require("path");
const dotenv = require('dotenv');

dotenv.config();

// const filepath = path.join(__dirname, 'test.txt');
// == './test.txt'

// fs.readFile(filepath, 'utf8', (err, data) => {
//   console.log(data);
// });

// app.use = *
// app.get = get
// app.post = post...

const port = process.env.PORT;

const isUserAllowed = true;

app.use(express.json());

const shield = (req, res, next) => {
  console.log(req);
  console.log("connected");
  if (isUserAllowed) next();
};

const shield2 = (req, res, next) => {
  console.log("connected second");
  next();
};

app.get("/pageA", (req, res, next) => {
  const filepath = path.join(__dirname, "test.html");
  fs.readFile(filepath, "utf8", (err, data) => {
    res.send(data);
  });
});

app.get("/pageB", (req, res, next) => {
  const filepath = path.join(__dirname, "test2.html");
  fs.readFile(filepath, "utf8", (err, data) => {
    res.send(data);
  });
});

app.get("/list", (req, res, next) => {
  res.json({
    success: true
  });
});

app.post("/sendtext", (req, res, next) => {
  // console.log("user posted", req.body);
  console.log('user said: ',req.body.message);
  res.status(200).json({ success: true });
  // res.redirect("/pageB");
});

app.listen(port, () => {
  console.log("listening at port -> ", port);
});
