const csrf = require("./csrf");
const isAdmin = require("./isAdmin");
const isSupplier = require("./isSupplier");
const locals = require("./locals");
const supplierSession = require("./supplierSession");
const userSession = require("./userSession");
const isAuth = require("./authentication");

module.exports = {
  csrf,
  isAdmin,
  isSupplier,
  locals,
  supplierSession,
  userSession,
  isAuth,
};
