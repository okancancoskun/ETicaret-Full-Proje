const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    slug: {
        type: String,
        required: true,
        unique: true
    }
});

module.exports = mongoose.model('Category', categorySchema);