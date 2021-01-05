const models = require("../../models");

module.exports = class UserController {
  static async getUserProfile(req, res) {
    try {
      const user = await models.User.findById(req.user._id);
      res.render("customer/profile.ejs", {
        user: user,
        username: username,
      });
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }

  static async updateUserProfile(req, res) {
    try {
      const username = req.body.username;
      const useremail = req.body.useremail;
      await models.User.updateOne(
        { _id: req.user._id },
        {
          $set: {
            name: username,
            email: useremail,
          },
        }
      );
      res.redirect("/profil");
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }
};

/* const UserController = new userController();
module.exports = UserController; */
