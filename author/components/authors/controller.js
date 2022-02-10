const TABLE = "author";
const author = (body) => {
  return {
    author_id: body.author_id || null,
    name: body.name,
    nationality: body.nationality,
  };
};
function authors(db) {
  function list() {
    return db.list(TABLE);
  }
  function get(id) {
    return db.get(TABLE, { author_id: id });
  }

  function insert(body) {
    if (!body.name) {
      throw new Error("fail name not recived,");
    }
    let data = author(body);
    return db.insert(TABLE, data);
  }
  function update(body) {
    if (!body.name || !body.author_id) {
      throw new Error("missing data, name or author_id");
    }
    let data = author(body);
    return db.update(TABLE, data, { author_id: data.author_id });
  }

  return {
    list,
    get,
    insert,
    update,
  };
}

module.exports = authors;
