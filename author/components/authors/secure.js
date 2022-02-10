const auth = require("../../../auth/index");
// module.exports = function (option) {
//   function middleware(req, res, next) {
//     let options = {
//       validar: function () {
//         let credential = auth.check.validar(req);
//         console.log(credential);
//         if (credential[0]["rol_id"] === 1) {
//           next();
//         } else {
//           throw new Error("no tienes permiso para esta consulta");
//         }
//       },
//       ensayo: function () {
//         console.log("campeon==========");
//         console.log(req.body);
//         next();
//       },
//     };
//     options[option] ? options[option]() : next();
//   }
//   return middleware;
// };

let middleware = (option) => (req, res, next) => {
  let options = {
    validar: function () {
      let credential = auth.check.validar(req);
      console.log(credential);
      if (credential[0]["rol_id"] === 1) {
        next();
      } else {
        throw new Error("no tienes permiso para esta consulta");
      }
    },
    ensayo: function () {
      console.log("campeon==========");
      console.log(req.body);
      next();
    },
  };
  options[option] ? options[option]() : next();
};

module.exports = middleware;
