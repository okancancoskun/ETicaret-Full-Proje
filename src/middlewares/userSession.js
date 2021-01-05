const models = require("../models");

module.exports = (req, res, next) => {
  if (!req.session.user) {
    return next();
  }

  models.User.findById(req.session.user._id)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => {
      console.log(err);
    });
};
