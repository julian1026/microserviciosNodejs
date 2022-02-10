const express = require("express");
const response = require("../../../network/response");
const controller = require("./index");
const router = express.Router();

router.post("/", insert);
router.post("/log_in/", log_in);

function insert(req, res, next) {
  controller
    .insert(req.body)
    .then((data) => {
      response.success(req, res, data, 201);
    })
    .catch((error) => {
      response.error(req, res, error, 400);
    });
}

function log_in(req, res, next) {
  controller
    .auth_on(req.body)
    .then((data) => {
      response.success(req, res, data, 201);
    })
    .catch(next);
}

module.exports = router;
