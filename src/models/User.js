const mongoose = require("mongoose");
const Product = require("./Product");
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: () => typeof this.isSocialAuth !== "undefined" && this.isSocialAuth === false,
  },
  password: {
    type: String,
    required: () => typeof this.isSocialAuth !== "undefined" && this.isSocialAuth === false,
  },
  cart: {
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
      },
    ],
  },
  isSocialAuth: {
    type: Boolean,
    required: true,
    default: false,
  },
  google: {
    type: mongoose.Schema.Types.Mixed,
    required: () => this.isSocialAuth,
  },
});

userSchema.methods.addToCart = function (product) {
  const index = this.cart.items.findIndex((carts) => {
    return carts.productId.toString() === product._id.toString();
  });
  const updatedCartItems = [...this.cart.items];
  let cartQuantity = 1;
  if (index >= 0) {
    cartQuantity = this.cart.items[index].quantity + 1;
    updatedCartItems[index].quantity = cartQuantity;
  } else {
    updatedCartItems.push({
      productId: product._id,
      quantity: cartQuantity,
    });
  }
  this.cart = {
    items: updatedCartItems,
  };
  return this.save();
};

userSchema.methods.getCart = function (product) {
  const ids = this.cart.items.map((itm) => {
    return itm.productId;
  });
  return Product.find({
    _id: {
      $in: ids,
    },
  })
    .select("name")
    .then((products) => {
      products.map((p) => {
        return { name: p.name };
      });
    });
};
userSchema.methods.clearCart = function () {
  this.cart = { items: [] };
  return this.save();
};
userSchema.methods.deleteItem = function (productid) {
  const cartItems = this.cart.items.filter((item) => {
    return item.productId.toString() !== productid.toString();
  });
  this.cart.items = cartItems;
  return this.save();
};
module.exports = mongoose.model("User", userSchema);
