const request = require("request");

function remote(host, port) {
  let URL = "http://" + host + ":" + port;
  function list(table) {
    console.log("bd remota");
    return req("GET", table);
  }

  function get(table, id) {
    return req("GET", table, id, true);
  }

  function update(table, data, id) {
    // console.log(table);
    return req("PUT", table, data, false);
  }

  function insert(table, data) {
    return req("POST", table, data, false);
  }

  function req(method, table, data, flag) {
    let url;
    if (flag) {
      url = URL + "/" + table + "/" + "id";
    } else {
      url = URL + "/" + table;
    }
    let body = JSON.stringify(data) || "";
    return new Promise((resolve, reject) => {
      request(
        {
          method,
          headers: { "content-type": "application/json" },
          url,
          body,
        },
        (err, req, body) => {
          if (err) {
            console.error("error en la base de datos remota", err);
            return reject(err.message);
          }
          const resp = JSON.parse(body);
          resolve(resp);
        }
      );
    });
  }

  return {
    list,
    get,
    update,
    insert,
  };
}

module.exports = remote;
