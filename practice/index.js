const { json } = require("body-parser");
const fs = require("fs");
const http = require("http");
// console.log(__dirname);
// console.log(__filename);

// ============method readFile===============//
/* as its name indicates it, the method readFile allow to read file of system  */

function leer(ruta, cb) {
  fs.readFile(ruta, (err, data) => {
    cb(JSON.parse(data));
    // cb(data.toString());
  });
}

// leer(__dirname + "/citys.txt", console.log);

//====================================//

//=============method write =====================//
/* the method writeFile allow to create or update file from the system  */
function escribirArchivo(ruta, data) {
  fs.writeFile(ruta, data, (err) => {
    if (err) throw "error al guardar";
    console.log("save :)");
  });
}

// escribirArchivo(
//   __dirname + "/citys.txt",
//   '{ "citys": [{ "name": "Colombia" }, { "name": "amsterdam" }] }'
// );
//===================

//==============method unlink===========//
/* this method allows to remove file from the systems */

function borrar(ruta) {
  /* */
  fs.unlink(ruta, (err) => {
    if (err) throw "operation faild";
    console.log("file unlink");
  });
}

// borrar(__dirname + "/hola.txt");

//==========method appendFile==============//
/* este metodo permite crear archivo de escritura, si el nombre del archivo tiene una existencia previa,
 su contenido seria actualizado por un nuevo valor */
function createFile(ruta, message, cb) {
  fs.appendFile(ruta, message, (err) => {
    if (err) throw "faild create file";

    cb("every well");
  });
}

// createFile(
//   __dirname + "/goals.txt",
//   "never top learning, I can all my goals ;)",
//   console.log
// );

//====================================//

// ================method open=============//
/* crea un archivo para escritura si se especifica como segundo
parametro la letra w (write) */

function openFile(ruta, arg, cb) {
  fs.open(ruta, arg, (err) => {
    if (err) throw "fail at file open";
    cb("saved ;_)");
  });
}

openFile(__dirname + "/daniel.txt", "w", console.log);
