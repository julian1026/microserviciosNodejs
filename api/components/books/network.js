const express = require("express");
const multer = require("multer");
const fs = require("fs");
const router = express.Router();
const response = require("../../../network/response");
const controller = require("./index");
const up = require("../../../utils/upload");
const secure = require("./secure");

//

const upload = multer({
  dest: "public/files",
});
//

router.get("/", gets);
router.get("/:id", get);
router.post("/", upload.single("cover_url"), up(), insert);
router.put("/:id", secure("update"), update);
// router.post("/:id", del);

function gets(req, res, next) {
  controller
    .list()
    .then((data) => {
      response.success(req, res, data, 200);
    })
    .catch((error) => {
      response.error(res, req, error, 400);
    });
}
function get(req, res, next) {
  controller
    .get(req.params.id)
    .then((data) => {
      response.success(req, res, data, 200);
    })
    .catch((error) => {
      response.error(req, res, error, 400);
    });
}

function insert(req, res, next) {
  controller
    .insert(req.body, req.file)
    .then((data) => {
      response.success(req, res, data, 201);
    })
    .catch((error) => {
      response.error(req, res, null, error);
    });
}
function update(req, res, next) {
  controller
    .update(req.body)
    .then((data) => {
      response.success(req, res, data, 201);
    })
    .catch(next);
}
// function del(req, res, next) {
//   controller
//     .del(req.params.id)
//     .then((data) => {
//       response.success(req, res, data, 201);
//     })
//     .catch((error) => {
//       response.error(req, res, error, 400);
//     });

module.exports = router;
