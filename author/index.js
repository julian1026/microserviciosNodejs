const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const conf = require("../config");
const errors = require("../network/errors");
const authors = require("../author/components/authors/network");

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use("/api/author/", authors);
app.use(errors);

app.listen(3009, () => {
  console.log("listening in the port : 3009");
});
