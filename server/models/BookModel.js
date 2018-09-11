const mongoose = require("mongoose");
const schema = mongoose.Schema;

const BookSchema = new schema({
  title: String,
  genre: String,
  authorId: String
});

module.exports = mongoose.model("Book", BookSchema);
