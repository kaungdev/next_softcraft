const { generateCloudinary } = require("../utils/cloudinary");

module.exports = app => {
  app.get("/api/general/cloudinary_signature", (req, res) => {
    res.json({
      status: "success",
      message: "successfully generated token",
      data: { ...generateCloudinary() }
    });
  });
};
