const express = require("express");
const { resolve } = require("path/posix");
const router = express.Router();
const controller = require("./index");
const response = require("../../../network/response");

router.get("/", list);
router.get("/:id", getClient);
router.post("/", insert);
router.put("/", update);

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
      response.success(req, res, data, 200);
    })
    .catch(next);
}
function update(req, res, next) {
  controller
    .update(req.body)
    .then((data) => {
      response.success(req, res, data, 200);
    })
    .catch(next);
}
function getClient(req, res, next) {
  controller
    .get(req.params.id)
    .then((data) => {
      response.success(req, res, data, 200);
    })
    .catch(next);
}

module.exports = router;
