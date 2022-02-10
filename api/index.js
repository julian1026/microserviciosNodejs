const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const routers = require("../network/routers");
const errors = require("../network/errors");
const conf = require("../config");

const app = express();

app.use(bodyParser.json());
app.use(cors());
routers(app);
app.use("/api", express.static("public"));
app.use(errors);
app.listen(conf.port, () => {
  console.log("listening in the port: ", conf.port);
});
