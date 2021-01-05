const models = require("../../models");
const bcrypt = require("bcrypt");

module.exports = class AccountController {
  static async getRegister(req, res) {
    try {
      res.render("account/register.ejs");
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  };

  static async postRegister(req, res) {
    try {
      const name = req.body.name;
      const email = req.body.email;
      const password = req.body.password;

      const user = await models.User.findOne({ email: email });
      if (user) {
        return res.redirect("/login");
      } else {
        const hashedPassword = await bcrypt.hash(password, 4);
        const newUser = new models.User({
          name: name,
          email: email,
          password: hashedPassword,
          cart: { items: [] },
        });
        await newUser.save();
        return res.redirect("/login");
      }
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  };

  static async getLogin(req, res) {
    try {
      res.render("account/login");
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  };

  static async postLogin(req, res) {
    try {
      const email = req.body.email;
      const password = req.body.password;
      const user = await models.User.findOne({ email: email });

      if (!user) {
        res.redirect("/login");
      } else {
        const isSuccess = await bcrypt.compare(password, user.password);
        if (isSuccess) {
          req.session.user = user;
          req.session.isAuthenticated = true;
          res.redirect("/orders");
        } else {
          res.redirect("/login");
        }
      }
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  };

}

