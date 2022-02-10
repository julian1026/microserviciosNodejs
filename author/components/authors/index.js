// const db = require("../../../store/mysql");
const dbRemote = require("../../../store/remote_mysql");
const ctrol = require("./controller");
module.exports = ctrol(dbRemote);
