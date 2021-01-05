const express = require("express");
const expressLayouts = require("express-layouts");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const mongoDbStore = require("connect-mongodb-session")(session);
const cookieParser = require("cookie-parser");

require("./config/passport");

const config = require("./config.json");

const setupRoutes = require("./routes");
const middlewares = require("./middlewares");
const passport = require("passport");

mongoose
  .connect(config.dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    let app = express();

    const store = new mongoDbStore({
      uri: config.dbUrl,
      collection: "sessions",
    });

    app.set("view engine", "ejs");
    app.set("views", __dirname + "/views");
    app.set("layout", "layouts/layout");
    app.use(expressLayouts);

    app.use(express.static("public"));

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    app.use(cookieParser());

    app.use(
      session({
        secret: config.session.secretKey,
        store: store,
        resave: false,
        saveUninitialized: true,
        cookie: { maxAge: 36000 },
      })
    );
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(middlewares.userSession);
    app.use(middlewares.supplierSession);

    app = setupRoutes(app);

    app.listen(3000, () => console.log("app started..."));
  })
  .catch((err) => {
    console.log(err);
  });
