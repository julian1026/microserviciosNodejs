const auth = require("../../../auth/index");
module.exports = function (action) {
  function middleware(req, res, next) {
    let data = {
      update: function () {
        let owner = parseInt(req.params.id);
        auth.check.own(req, owner);
        next();
      },
    };

    data[action] ? data[action]() : next();
  }

  return middleware;
};
