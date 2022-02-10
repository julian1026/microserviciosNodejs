const express = require("express");
const store = require("../store/mysql");
const router = express.Router();
const response = require("../network/response");

router.get("/:table", list);
router.get("/:table/:id", get);
router.put("/:table", update);
router.post("/:table", insert);

async function list(req, res, nex) {
  data = await store.list(req.params.table);
  response.success(req, res, data, 201);
}
async function get(req, res, nex) {
  // console.log(req.params.table, req.body);
  data = await store.get(req.params.table, req.body);
  console.log(data);
  response.success(req, res, data, 201);
}

function insert(req, res, next) {
  store
    .insert(req.params.table, req.body)
    .then((data) => {
      response.success(req, res, data, 200);
    })
    .catch((err) => {
      response.error(req, res, err, 401);
    });
}

function update(req, res, next) {
  let key = Object.keys(req.body)[0];
  store
    .update(req.params.table, req.body, { [key]: req.body[key] })
    .then((data) => {
      response.success(req, res, data, 200);
    })
    .catch((err) => {
      response.error(req, res, err, 401);
    });
}

module.exports = router;
