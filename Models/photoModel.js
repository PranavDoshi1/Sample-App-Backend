let mongoose = require("mongoose");

let photoSchema = new mongoose.Schema({
  name : String,
  url: String
});

module.exports = mongoose.model("Photo", photoSchema);
