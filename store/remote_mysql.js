const remote = require("./remote");
const conf = require("../config");

module.exports = remote(conf.mysqlService.host, conf.mysqlService.port);
