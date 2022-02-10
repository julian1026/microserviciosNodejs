const fs = require("fs");
const { nanoid } = require("nanoid");
const conf = require("../config");

//esta funcion crea un archivo;

function escribirArchivo(ruta, data) {
  fs.writeFile(ruta, data, (err) => {
    if (err) throw "error al guardar";
    console.log("save :)");
  });
}

function fileExists(path) {
  try {
    return fs.statSync(path).isFile();
  } catch (e) {
    return false;
  }
}

let path_papers =
  conf.papers.protocol + conf.host + ":" + conf.port + conf.papers.public;

function filesServidor(accion) {
  function soveFiles(req, res, next) {
    let data = {
      insert: function () {
        if (!req.body.message) {
          throw new Error("faild to create file, message cann't come empty");
        }
        let aux = nanoid() + ".txt";
        let crear = conf.papers.router + aux;
        escribirArchivo(crear, req.body.message);
        let paper_url = path_papers + aux;
        req.body["paper_url"] = paper_url;
        req.body["key_paper"] = aux.split(".")[0];
        next();
      },
      update: function () {
        let paper_url = conf.papers.router + req.body.key_paper + ".txt";
        let validar = fileExists(paper_url);
        console.log(validar);
        if (!validar) {
          throw new Error("archivo no existe");
        }
        if (!req.body.message) {
          throw new Error("faild to create file, message cann't come empty");
        }
        req.body.paper_url = path_papers + req.body.key_paper + ".txt";
        escribirArchivo(paper_url, req.body.message);
        next();
      },
    };
    data[accion] ? data[accion]() : next();
  }

  return soveFiles;
}

module.exports = filesServidor;
