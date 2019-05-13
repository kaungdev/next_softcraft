const jwt = require("jsonwebtoken");

const createToken = id => {
  return jwt.sign(
    {
      id
    },
    "!$#",
    {
      expiresIn: "10y"
    }
  );
};

const returnNotFound = res => {
  res.status(404).json({ status: "failed", message: "404 not found" });
};

const handleError = ({ res, error }) => {
  res.json({
    status: "failed",
    data: error.message
  });
};

module.exports = {
  createToken,
  returnNotFound,
  handleError
};
