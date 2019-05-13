const mongoose = require("mongoose");
const { Schema } = mongoose;

const imageSchema = new Schema({
  imgId: String,
  description: String
});

module.exports = imageSchema;
