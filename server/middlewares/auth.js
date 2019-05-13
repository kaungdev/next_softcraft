const jwt = require("jsonwebtoken");
const User = require("../models/User");

const createToken = auth => {
  return jwt.sign(
    {
      id: auth.id
    },
    "!$#",
    {
      expiresIn: "10y"
    }
  );
};

module.exports = {
  generateToken: (req, res, next) => {
    req.token = createToken(req.auth);
    next();
  },

  getUserFromToken: async (req, res, next) => {
    const token = req.headers["x-access-token"];
    if (!token) return res.json({ status: "failed", message: "no token" });
    const { id } = jwt.verify(token, "!$#");
    if (!id)
      return res.json({ status: "failed", message: "token validation failed" });
    const user = await User.findById(id);
    if (!user) return res.json({ status: "failed", message: "user not found" });
    req.user = user;
    next();
  }
};
