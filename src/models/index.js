const Category = require("./Category");
const Comment = require("./Comment");
const Order = require("./Order");
const Product = require("./Product");
const Supplier = require("./Supplier");
const User = require("./User");
const Shipment = require("./Shipment");

module.exports = {
  Category,
  Comment,
  Order,
  Product,
  Supplier,
  User,
  Shipment,
};

/* (async () => {
  new Shipment({
    isDefault: true,
    companyName: "MeyveYe",
    memberId: "312947702",
    memberPass: "ABCD1234",
    clientId: "d27f9684-2fc3-4004-8cee-4df0dab27856",
    clientKey: "yQ0kV6wK2sW1eI8kQ5wB7pP5mY8aS3pR2kN4wS7yP0gA2vY5sK",
  })
    .save()
    .catch((err) => console.error(err));
})(); */
