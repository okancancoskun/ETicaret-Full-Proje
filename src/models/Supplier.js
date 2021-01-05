const mongoose = require('mongoose');
const Order = require('./Order');
const Product = require('./Product');
const supplierSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isSupplier:{
        type:Boolean,
        default:false
    },
});
module.exports = mongoose.model('Supplier',supplierSchema);