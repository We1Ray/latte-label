const express = require("express");
const cors = require("cors");

require("dotenv").config();

const app = express();

app.use(cors());
// app.use(express.json());

app.use(express.json({limit: '500mb'}));
app.use(express.urlencoded({limit: '500mb'}));

const publicRouter = require("./routes/public");
const label_projectRouter = require("./routes/label_project");

app.use("/public", publicRouter);
app.use("/label_project", label_projectRouter);

module.exports = app;
