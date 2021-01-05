const models = require("../../models");
const bcrypt = require("bcrypt");

module.exports = class SupplierAuthController {

  static async postSupplierRegister(req, res) {
    try {
      const name = req.body.supname;
      const email = req.body.supemail;
      const password = req.body.suppassword;
      const supp = await models.Supplier.findOne({ email: email });
      if (supp) {
        return res.redirect("/tedarikci-ol/tedarikci-kayit");
      } else {
        const hashedPassword = await bcrypt.hash(password, 4);
        const newSupplier = new models.Supplier({
          name: name,
          email: email,
          password: hashedPassword,
        });
        await newSupplier.save();
        return res.redirect("/tedarikci-ol/tedarikci-giris");
      }
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  };

  static async getSupplierRegister(req, res) {
    try {
      res.render("supplierAuth/tedarikci-kayit");
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  };

  static async getSupplierLogin(req, res) {
    try {
      res.render("supplierAuth/tedarikci-giris");
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  };

  static async postSupplierLogin(req, res) {
    try {
      const email = req.body.supemail;
      const password = req.body.suppassword;
      const supp = await models.Supplier.findOne({ email: email, isSupplier: true });

      if (!supp) {
        res.redirect("/tedarikci-ol/tedarikci-giris");
      }
      if (supp) {
        const isSuccess = await bcrypt.compare(password, supp.password);
        if (isSuccess) {
          req.session.supplier = supp;
          req.session.isAuthenticated = true;
          res.redirect("/tedarikci/siparisler");
        } else {
          res.redirect("/tedarikci-ol/tedarikci-giris");
        }
      }
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  };
}

