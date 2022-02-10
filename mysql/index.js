const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const conf = require("../config");
const router = require("./network");

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use("/", router);

app.listen(conf.mysqlService.port, () => {
  console.log("escuchando en el puerto:", conf.mysqlService.port);
});
