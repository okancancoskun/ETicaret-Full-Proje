const axios = require('axios')

const account = require("./AccountController/accountController");
const admin = require("./AdminController/adminController");
const cart = require("./CartController/cartController");
const shop = require("./ShopController/shopController");
const supplier = require("./SupplierController/supplierController");
const supplierAuth = require("./AccountController/supplierAuthController");
const user = require("./UserController/userController");
const models = require('../models')

module.exports = {
  account,
  admin,
  cart,
  shop,
  supplier,
  supplierAuth,
  user,
};


/* (async () => {

  try {
    const order = await models.Order.findOne({ isDelivered: false })
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

    const mapped = await Promise.all(order.items.map(async (item) => {
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

    console.log(mapped)
  } catch (error) {
    console.log(error)
  }


})() */




