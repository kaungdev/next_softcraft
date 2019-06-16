process.on("uncaughtException", function(exception) {
  console.log(exception);
});

const express = require("express");
const next = require("next");
const morgan = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const favicon = require("serve-favicon");
const enforce = require("express-sslify");
const path = require("path");

const port = process.env.PORT || 3030;
const dev = process.env.NODE_ENV !== "production";
const next_app = next({ dev });
const handle = next_app.getRequestHandler();

const helpers = require("./utils/helpers");

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true
});

const runExpress = () => {
  const app = express();

  if (process.env.NODE_ENV === "production") {
    app.use(enforce.HTTPS({ trustProtoHeader: true }));
  } else {
    app.use(morgan("tiny"));
  }
  app.use(bodyParser.json());
  app.use(favicon(path.join(__dirname, "public", "images", "favicon.ico")));

  // require("./utils/passport")();
  // require("./routes/auth")(app);
  require("./routes/general")(app);
  require("./routes/post")(app);

  app.use((error, req, res, next) => {
    console.log("TCL: runExpress -> error", error);
    if (error) {
      return helpers.handleError({ res, error });
    }
    next();
  });

  app.get("*", (req, res) => {
    if (process.env.DEVELOPMENT_TYPE === "BACK") {
      return helpers.returnNotFound(res);
    } else return handle(req, res);
  });

  app.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
};

if (process.env.DEVELOPMENT_TYPE === "BACK") {
  runExpress();
} else {
  next_app.prepare().then(() => {
    runExpress();
  });
}
