const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  bookName: String,
  author: String,
  genre: String,
});

const BooksReducer = mongoose.model("BooksReducer", bookSchema);

module.exports = { BooksReducer };
