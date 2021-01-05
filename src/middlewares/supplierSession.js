const models = require("../models");

module.exports = (req, res, next) => {
  if (!req.session.supplier) {
    return next();
  }
  models.Supplier.findById(req.session.supplier._id).then((supplier) => {
    req.supplier = supplier;
    next();
  });
};
