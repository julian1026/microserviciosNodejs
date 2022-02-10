const db = require("../../../store/mysql");
const ctrol = require("./controller");
module.exports = ctrol(db);
