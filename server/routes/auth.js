const passport = require("passport");
const helpers = require("../utils/helpers");
require("../utils/passport")();

module.exports = app => {
  app.post(
    "/api/auth",
    passport.authenticate("facebook-token", { session: false }),
    (req, res) => {
      if (!req.user)
        return res.json({ status: "failed auth", message: "no user" });
      const token = helpers.createToken(req.user._id);
      return res.json({ status: "success", data: { token } });
    }
  );
};
