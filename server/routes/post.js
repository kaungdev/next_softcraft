const Post = require("../models/Post");
const { getUserFromToken } = require("../middlewares/auth");

module.exports = app => {
  app.post("/api/posts", getUserFromToken, async (req, res) => {
    console.log(req.body);
    const savedPost = await new Post({
      ...req.body,
      createdBy: req.user
    }).save();
    console.log("TCL: savedPost", savedPost);
    return res.json({ status: "success", data: { savedPost } });
  });
};
