const error = require("../../../utils/error");

const TABLE = "clients";

const newClient = (data) => ({
  client_id: data.client_id || null,
  name: data.name || null,
  email: data.email,
  birthdate: data.birthdate || null,
  gender: data.gender || undefined,
  active: data.active || 1,
});

function client_clontroller(db) {
  const list = () => {
    return db.list(TABLE);
  };
  const get = (id) => {
    return db.get(TABLE, { client_id: id });
  };

  const insert = (body) => {
    let data = newClient(body);
    return db.insert(TABLE, data);
  };

  const update = async (body) => {
    if (!body.client_id) {
      throw new Error("data no fount, client_id");
    }
    let data = newClient(body);
    console.log(data.client_id);
    return db.update(TABLE, data, { client_id: data.client_id });
  };

  return {
    list,
    insert,
    update,
    get,
  };
}

module.exports = client_clontroller;
