const models = require("../../models");
const urlSlug = require("url-slug");

module.exports = class AdminController {
  static async getConfirmProducts(req, res) {
    try {
      const products = await models.Product.find({ isApproved: false });
      res.render("admin/urun-onay", {
        products: products,
      });
    } catch (error) {
      res.send(error);
    }
  };

  static async postConfirmProducts(req, res) {
    try {
      const id = req.body.productid;
      const inputValue = req.body.confirmation;
      const product = await models.Product.findById(id);
      if (inputValue == "Onayla") {
        product.isApproved = true;
        await product.save();
        res.redirect("/admin/urun-onay");
      }
      if (inputValue == "Reddet") {
        await product.deleteOne();
        res.redirect("/admin/urun-onay");
      }
    } catch (error) {
      res.send(error);
    }
  };

  static async getConfirmSupplier(req, res) {
    try {
      const suppliers = await models.Product.find({ isSupplier: false });
      res.render("admin/tedarikci-onay", {
        suppliers: suppliers,
      });
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  };

  static async postConfirmSupplier(req, res) {
    try {
      const id = req.body.supplierid;
      const inputValue = req.body.confirmation;
      const supplier = await models.Supplier.findById(id);
      if (inputValue == "Onayla") {
        supplier.isSupplier = true;
        await supplier.save();
        res.redirect("/admin/tedarikci-onay");
      }

      if (inputValue == "Reddet") {
        await supplier.deleteOne();
        res.redirect("admin/tedarikci-onay");
      }
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  };

  static async getAddCategory(req, res) {
    try {
      res.render("admin/kategori-ekle");
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  };

  static async postAddCategory(req, res) {
    try {
      const categoryname = req.body.categoryname;
      const description = req.body.description;
      const sluggedName = urlSlug(categoryname, urlSlug.transformers.titlecase);
      const category = new models.Category({
        name: categoryname.trim(),
        description: description.trim(),
        slug: sluggedName.trim(),
      });
      await category.save();
      res.redirect("/");
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  };
}
