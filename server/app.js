require("./config/db");
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(bodyParser.json());

const urlRoutes = require("./routes/url.routes");
app.use("/url", urlRoutes);

module.exports = app;
