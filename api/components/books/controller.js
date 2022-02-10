let TABLE = "book";

const new_book = (body) => {
  return {
    book_id: body.book_id,
    author_id: body.author_id || null,
    title: body.title,
    year: body.year,
    language: body.language,
    cover_url: body.cover_url || null,
    price: body.price || null,
    sellable: body.sellable,
    copies: body.copies,
    description: body.description,
  };
};

function books(db) {
  const get = (id) => {
    let valoresAceptados = /^[0-9]+$/;
    if (!id.match(valoresAceptados)) {
      console.log("no es numérico");
      return Promise.reject("data no valided");
    }
    return db.get(TABLE, { book_id: id });
  };

  const list = async () => {
    return db.list(TABLE);
  };

  const insert = async (body, file) => {
    let fileURL = "";
    if (file) {
      fileURL =
        "http://localhost:3007/api/files/" +
        file.filename +
        "." +
        file.mimetype.split("/")[1];
    }
    body.cover_url = fileURL;
    let book = new_book(body);
    return db.insert(TABLE, book);
  };

  const update = (body) => {
    if (!body.book_id) {
      return Promise.reject("key data not found");
    }
    let book = new_book(body);
    return db.update(TABLE, book, { book_id: book.book_id });
  };

  return {
    list,
    get,
    insert,
    update,
  };
}
module.exports = books;
