const express = require("express");
const controller = require("./index");
const response = require("../../../network/response");
const router = express.Router();
const createPaper = require("../../../utils/createFile");

router.get("/", list);
router.post("/", createPaper("insert"), insert);
router.put("/", createPaper("update"), update);

function list(req, res, next) {
  controller
    .list()
    .then((data) => {
      response.success(req, res, data, 201);
    })
    .catch(next);
}

function insert(req, res, next) {
  controller
    .insert(req.body)
    .then((data) => {
      response.success(req, res, data, 201);
    })
    .catch(next);
}
function update(req, res, next) {
  controller
    .update(req.body)
    .then((data) => {
      response.success(req, res, data, 201);
    })
    .catch(next);
}
module.exports = router;
