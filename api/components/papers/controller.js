let TABLE = "papers";

const newPapers = (data) => {
  return {
    paper_url: data.paper_url,
    message: data.message,
    key_paper: data.key_paper,
  };
};

function filePapers(db) {
  function insert(body) {
    let data = newPapers(body);
    return db.insert(TABLE, data);
  }
  function update(body) {
    let data = newPapers(body);
    return db.update(TABLE, data, { key_paper: data.key_paper });
  }

  function list() {
    return db.list(TABLE);
  }

  return {
    insert,
    list,
    update,
  };
}

module.exports = filePapers;
