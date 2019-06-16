const mongoose = require("mongoose");
const { Schema } = mongoose;
const imgSchema = require("./Schema/Img");

const postSchema = new Schema({
  title: { type: String, required: true },
  headerImg: imgSchema,
  contents: [
    {
      contentType: String,
      img: imgSchema,
      value: String
      // image || header || body
    }
  ],
  isDeleted: { type: Boolean, default: false },
  // createdBy: { type: Schema.Types.ObjectId, ref: "users" },
  createdAt: { type: Date, default: Date.now() }
});

module.exports = mongoose.model("posts", postSchema);
