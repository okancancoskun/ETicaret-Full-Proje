const models = require("../../models");
const nodemailler = require("nodemailer");
const axios = require("axios");
const escapeRegex = require('../../helper/escapeRegex');
const transporter = nodemailler.createTransport({
  service: "hotmail",
  auth: {
    user: "EMAİL",
    pass: "PASSWORD",
  },
});

module.exports = class ShopController {

  static async getIndex(req, res) {
    try {
      const products = await models.Product.find({ isApproved: true }).populate("category");
      res.render("customer/index", {
        products: products,
      });
    } catch (error) {
      res.send(error);
    }
  }

  static async getProductDetail(req, res) {
    try {
      const product = await models.Product.findOne({
        slug: req.query.name,
        city: req.query.city
      }).populate("category");
      req.params.categoryname == product.category.name;

      res.render("customer/urun-detay", {
        product: product,
      });

    } catch (error) {
      res.send(error);
    }
  };

  static async getProductsByCategory(req, res) {
    try {
      const page = +req.query.page || 1;
      const perPage = 2;

      const category = await models.Category.findOne({ slug: req.params.slug }).select({ id: 1 });

      const productsByIdTotalCount = await models.Product.count({ category: category.id });
      const productsById = await models.Product.find({ category: category.id })
        .populate("category")
        .skip((page - 1) * perPage)
        .limit(perPage);

      res.render("customer/categorized", {
        products: productsById,
        totalProducts: productsByIdTotalCount,
        currentPage: page,
        hasNextPage: perPage * page < productsByIdTotalCount,
        hasPreviousPage: page > 1,
        nextPage: page + 1,
        previousPage: page - 1,
        lastPage: Math.ceil(productsByIdTotalCount / perPage),
      });

    } catch (error) {
      console.log(error);
      res.send(error);
    }
  };

  static async getOrders(req, res) {
    try {
      const orders = await models.Order.find({ "user.userId": req.user._id });
      res.render("customer/orders.ejs", { orders: orders });
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  };

  static async postOrders(req, res) {
    try {
      const user = await req.user.populate("cart.items.productId").execPopulate();
      const order = new models.Order({
        user: {
          userId: req.user._id,
          name: req.user.name,
          email: req.user.email,
        },
        items: user.cart.items.map((p) => {
          return {
            product: {
              _id: p.productId._id,
              name: p.productId.name,
              isApproved: p.productId.isApproved,
              supplierId: p.productId.supplierId,
              category: p.productId.category,
              description: p.productId.description,
            },
            shipmentId: "",
          };
        }),
      });
      const message = {
        from: "EMAİL",
        to: `${order.user.email}`,
        subject: "Deneme",
        text: "Deneme",
      };
      await transporter.sendMail(message);
      await order.save();
      await req.user.clearCart();
      res.redirect("/orders");
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  };

  static async getOrderDetail(req, res) {


    try {
      const orderId = req.params.orderId;
      const order = await models.Order.findOne({ $and: [{ "user.userId": req.user._id }, { _id: orderId }] });
      const defaultShipmentCompany = await models.Shipment.findOne({ isDefault: true });

      const tokenRes = await axios({
        method: "post",
        url: "https://testapi.mngkargo.com.tr/mngapi/api/refresh/d5aeb81f-a379-44a5-a8b6-d91e0d6bb928",
        headers: {
          "x-ibm-client-secret": `${defaultShipmentCompany.clientKey}`,
          "x-ibm-client-id": `${defaultShipmentCompany.clientId}`,
        },
        data: {
          username: defaultShipmentCompany.memberId,
          password: defaultShipmentCompany.memberPass,
          identityType: 1,
        },
      });
      const jwtToken = tokenRes.data.jwt;

      const tracks = await Promise.all(order.items.map(async (item) => {
        try {
          const shipment = await axios({
            method: "get",
            url: `https://testapi.mngkargo.com.tr/mngapi/api/standardqueryapi/trackshipmentByShipmentId/${item.shipmentId}`,
            headers: {
              "x-ibm-client-secret": `${defaultShipmentCompany.clientKey}`,
              "x-ibm-client-id": `${defaultShipmentCompany.clientId}`,
              "authorization": `Bearer ${jwtToken}`
            }
          })
          return shipment.data;
        } catch (error) {
          console.log(error)
        }
      }))

      res.render("customer/siparis-detay", { order: order, tracks });


    } catch (error) {
      console.log(error);
      res.send(error);
    }
  };

  static async postComment(req, res) {
    try {
      const product = await models.Product.findById(req.body.productID).populate("category");
      const commenttext = req.body.comment;
      const comment = await models.Comment.create({
        commentDetail: commenttext,
        userId: req.user._id,
      });

      await product.updateOne({
        $push: { comments: comment },
      });
      res.redirect(`/urun-detay/${product.category.name}/${product.city}-${product.slug}`);
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  };


  static async searchData(req, res) {
    try {
      if (req.query.look) {
        const regex = new RegExp(escapeRegex(req.query.look), "gi");
        const findProducts = await models.Product.find({ name: regex }).sort({ $natural: -1 });
        res.render("customer/index", { products: findProducts });
      }
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  };

}
