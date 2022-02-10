const e = require("express");
const jwt = require("jsonwebtoken");

function sign(data) {
  return jwt.sign(data, "love", { expiresIn: "15m" });
}

let check = {
  own: function (req, owner) {
    let decoded = decodeHeader(req);
    //comprobar si viene token
    console.log(decoded[0].auth_id);
    console.log(owner);
    if (decoded[0].auth_id !== owner) {
      throw new Error("no puedes hacer esto", 401);
    }
    console.log(decoded);
  },
  validar: function (req) {
    let decoded = decodeHeader(req);
    req.body = decoded;
    return decoded;
  },
};

function verify(token) {
  return jwt.verify(token, "love");
}

function getToken(auth) {
  if (!auth) {
    throw new Error("No viene token ;(");
  }
  if (auth.indexOf("Bearer ") === -1) {
    throw new Error("formato Invalido");
  }

  let token = auth.replace("Bearer ", "");
  return token;
}

function decodeHeader(req) {
  const authorization = req.headers.authorization || "";
  const token = getToken(authorization);
  const decode = verify(token);
  // req.user = decode;
  return decode;
}

module.exports = { sign, check };
