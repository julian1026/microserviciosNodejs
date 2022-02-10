const AUTH = require("../../../auth/index");
const bcrypt = require("bcrypt");
let TABLE = "auth";

let newAuth = async (body) => {
  return {
    auth_id: body.auth_id || null,
    username: body.username,
    password: body.password ? await bcrypt.hash(body.password, 5) : null,
    email: body.email,
    rol_id: body.rol_id,
  };
};

function auth(db) {
  const insert = async (body) => {
    let data = await newAuth(body);
    return db.insert(TABLE, data);
  };

  const auth_on = async (body) => {
    if (!body.username || !body.password) {
      return Promise.reject("data not found");
    }
    let data = await db.get(TABLE, { username: body.username });
    if (data.length !== 0) {
      return bcrypt
        .compare(body.password, data[0].password)
        .then((sonIguales) => {
          if (sonIguales === true) {
            return AUTH.sign({ ...data });
          } else {
            throw new Error("informacion erronea :] ");
          }
        });
    } else {
      throw new Error("informacion erronea !");
    }
  };

  return {
    insert,
    auth_on,
  };
}

module.exports = auth;
