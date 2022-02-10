const conf = require("../config");
const mysql = require("mysql");

// const rules = {
//   host: conf.mysql.host,
//   user: conf.mysql.user,
//   password: conf.mysql.password,
//   database: conf.mysql.database,
// };
const rules = {
  host: "localhost",
  user: "root",
  password: "root",
  database: "andres",
};

let connection;

function handleConnect() {
  connection = mysql.createConnection(rules);
  connection.connect((err) => {
    if (err) {
      console.log("[db_error]", err);
      setTimeout(handleConnect, 2000);
    } else {
      console.log("db connected");
    }
  });

  connection.on("error", (err) => {
    console.error("[db_error]", err);
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      handleConnect();
    } else {
      throw err;
    }
  });
}

function list(TABLE) {
  return new Promise((resolve, reject) => {
    let query = `SELECT * FROM ${TABLE};`;
    connection.query(query, (err, data) => {
      if (err) return reject(err);
      return resolve(data);
    });
  });
}

function get(TABLE, id) {
  return new Promise((resolve, reject) => {
    let sql = `SELECT * FROM ${TABLE} WHERE ?`;
    connection.query(sql, id, (err, data) => {
      if (err) return reject(err);
      resolve(data);
    });
  });
}

function insert(TABLE, data) {
  // console.log(data);
  return new Promise((resolve, reject) => {
    let sql = `INSERT INTO ${TABLE} SET ?`;
    connection.query(sql, data, (err, data) => {
      if (err) return reject(err);
      return resolve(data);
    });
  });
}
function update(TABLE, data, id) {
  return new Promise((resolve, reject) => {
    let sql = `UPDATE ${TABLE} SET ? WHERE ?`;
    connection.query(sql, [data, id], (err, data) => {
      if (err) return reject(err);
      return resolve(data);
    });
  });
}
handleConnect();
module.exports = { list, insert, update, get };
