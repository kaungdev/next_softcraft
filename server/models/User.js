const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  fullName: String,
  email: String,
  fbId: String,
  posts: [{ type: Schema.Types.ObjectId, ref: "posts" }],
  isAdmin: { type: Boolean, default: false },
  isDeleted: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now() }
});

userSchema.statics.upsertFbUser = function(accessToken, refreshToken, profile) {
  return new Promise(async (resolve, reject) => {
    const that = this;
    const foundUser = await this.findOne({ fbId: profile.id });
    if (!foundUser) {
      const newUser = new that({
        fullName: profile.displayName,
        email: profile.emails[0].value,
        fbId: profile.id
      });
      try {
        const savedUser = await newUser.save();
        resolve(savedUser);
      } catch (error) {
        reject(error);
      }
    } else {
      resolve(foundUser);
    }
  });
};

module.exports = mongoose.model("users", userSchema);
