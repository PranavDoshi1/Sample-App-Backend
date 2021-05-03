let mongoose = require("mongoose");

let commentSchema = new mongoose.Schema({
  photoId: String,
  cordX: Number,
  cordY: Number,
  comments: []
});

module.exports = mongoose.model("Comment", commentSchema);