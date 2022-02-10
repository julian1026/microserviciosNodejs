const fs = require("fs");

//esta funcion renombra el path del archivo
module.exports = function () {
  function uploads(req, res, next) {
    console.log(req.file);
    console.log("oeooeoe juanes");
    fs.renameSync(
      req.file.path,
      req.file.path + "." + req.file.mimetype.split("/")[1]
    );
    next();
  }

  return uploads;
};
