const csurf = require("csurf");

const account = require("./account");
const admin = require("./admin");
const cart = require("./cart");
const shop = require("./shop");
const supplier = require("./supplier");
const supplierAccount = require("./supplierAccount");
const user = require("./user");
const googleAuth = require("./googleAuth");

module.exports = function (app) {
  app.use(csurf(), account);
  app.use(csurf(), shop);
  app.use("/sepetim", csurf(), cart);
  app.use("/tedarikci", csurf(), supplier);
  app.use("/admin", csurf(), admin);
  app.use("/tedarikci-ol", csurf(), supplierAccount);
  app.use("/profil", csurf(), user);
  app.use(csurf(), googleAuth);

  return app;
};
