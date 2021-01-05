const urlSlug = require("url-slug");
const models = require("../../models");

module.exports = class SupplierController {

  static async getAddProduct(req, res) {
    try {
      const categories = await models.Category.find();
      res.render("supplier/add-product.ejs", { categories: categories });
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  };

  static async postAddProduct(req, res) {
    try {
      const name = req.body.name;
      const sluggedName = urlSlug(name, urlSlug.transformers.titlecase);
      const description = req.body.description;
      const category = req.body.category;
      const city = req.body.city;
      const product = new models.Product({
        name: name.trim(),
        description: description.trim(),
        supplierId: req.supplier._id,
        category: category,
        city: city.trim(),
        slug: sluggedName,
      });
      await product.save();
      res.redirect("/tedarikci/add-product");
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  };

  static async getSupplierOrders(req, res) {
    try {
      const orders = await models.Order.find({ "items.product.supplierId": { $in: [req.supplier._id] } })
        .lean()
        .exec();
      const filteredOrders = orders.map((order) => {
        const items = order.items.filter((item) => item.product.supplierId.toString() === req.supplier._id.toString());
        return {
          ...order,
          items,
        };
      });
      res.render("supplier/siparisler.ejs", { orders: filteredOrders });
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  };

  static async getOrderDetail(req, res) {
    try {
      const orderId = req.params.orderId;
      const order = await models.Order.findOne({ $and: [{ "items.product.supplierId": { $in: [req.supplier._id] } }, { _id: orderId }] })
        .lean()
        .exec();
      const filteredItems = order.items.filter((item) => {
        if (item.product.supplierId.toString() == req.supplier._id.toString()) {
          return item;
        }
      });

      res.render("supplier/siparis-detay", { order: order, items: filteredItems });
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  };

  static async postShipmentID(req, res) {
    try {
      const shipmentId = req.body.shipmentId;
      const orderId = req.body.orderId;
      const order = await models.Order.findById(orderId);
      await order.items.filter((item) => {
        if (item.product.supplierId.toString() == req.supplier._id.toString()) {
          item.shipmentId = shipmentId;
        }
      });

      await order.save();

      res.redirect("/tedarikci/siparisler");
    } catch (error) {
      res.send(error);
      console.log(error);
    }
  };

}