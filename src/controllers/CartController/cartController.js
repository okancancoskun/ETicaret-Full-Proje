const models = require("../../models");

module.exports = class CartController {
  static async getCart(req, res) {
    try {
      const user = await req.user.populate("cart.items.productId").execPopulate();
      res.render("customer/cart", {
        products: user.cart.items,
      });
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  };

  static async postCart(req, res) {
    try {
      const productId = req.body.productId;
      const product = await models.Product.findById(productId);
      await req.user.addToCart(product);

      res.redirect("/sepetim");
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  };

  static async postCartItemDelete(req, res) {
    try {
      const productid = req.body.productid;
      await req.user.deleteCartItem(productid);
      res.redirect("/sepetim")
    } catch (error) {
      res.send(error)
    }
    ;
  };
  static async getPayment(req, res) {
    try {
      const user = await req.user.populate("cart.items.productId").execPopulate();
      res.render("customer/payment", {
        products: user.cart.items,
        user: user,
      });
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  };
}


