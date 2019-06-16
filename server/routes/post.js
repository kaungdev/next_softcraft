const Post = require("../models/Post");
// const { getUserFromToken } = require("../middlewares/auth");

module.exports = app => {
  app.post(
    "/api/posts",
    // getUserFromToken,
    async (req, res, next) => {
      try {
        let savedPost = null;
        if (req.body._id) {
          const { _id, title, contents, headerImg } = req.body;
          let existingPost = await Post.findById(_id);

          existingPost.title = title;
          existingPost.contents = contents;
          existingPost.headerImg = headerImg;

          savedPost = await existingPost.save();
        } else {
          savedPost = await new Post({
            ...req.body
          }).save();
        }
        return res.json({ status: "success", data: { savedPost } });
      } catch (error) {
        next(error);
      }
    }
  );

  app.get("/api/posts", async (req, res, next) => {
    try {
      const { id } = req.query;
      if (id) {
        const post = await Post.findById(id);
        return res.json({ status: "success", data: { post } });
      } else {
        const posts = await Post.find({ isDeleted: false });
        return res.json({ status: "success", data: { posts } });
      }
    } catch (error) {
      next(error);
    }
  });
};
