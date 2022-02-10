const books = require("../api/components/books/network");
const auth = require("../api/components/auth/network");
const clients = require("../api/components/clients/network");
const papers = require("../api/components/papers/network");

function expo(server) {
  server.use("/api/books/", books);
  server.use("/api/auth/", auth);
  server.use("/api/clients/", clients);
  server.use("/api/papers/", papers);
}

module.exports = expo;
