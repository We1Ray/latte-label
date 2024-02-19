const DataBaseInfo = require("../DataBaseInfo.json");
const router = require("express").Router();
const fs = require("fs");
const path = require("path");
const lib = require("../library");

router.route("/hello").get(async (req, res) => {
  res.send("hello!");
});

router.route("/login").post(async (req, res) => {
  let DBConfig = DataBaseInfo["DS"];
  let parameter = {
    email: req.body["email"] ? req.body["email"] : null,
    password: req.body["password"] ? req.body["password"].toString() : null,
  };
  let sql = fs
    .readFileSync(path.resolve(__dirname, "../sql/public/login.sql"))
    .toString();
  await lib.executeSQL(
    "/login",
    DBConfig,
    sql,
    parameter,
    (response) => {
      res.send(response.rows);
    },
    (error) => {
      res.status(400).json({ error: error });
    }
  );
});

module.exports = router;
