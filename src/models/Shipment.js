const mongoose = require("mongoose");

const shipmentSchema = mongoose.Schema({
  companyName: {
    type: String,
    required: true,
  },
  memberId: {
    type: String,
    required: true,
  },
  memberPass: {
    type: String,
    required: true,
  },
  clientId: {
    type: String,
    required: true,
  },
  clientKey: {
    type: String,
    required: true,
  },
  shipmentCompany: {
    type: String,
    default: "MNG",
  },
  isDefault: {
    type: Boolean,
    default: false,
  },
});

// Sadece bir tane isDefault açmana yarar
shipmentSchema.index({ isDefault: 1 }, { unique: true, partialFilterExpression: { isDefault: true } });

module.exports = mongoose.model("Shipment", shipmentSchema);
