const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Product name is required"]
    },

    price: {
        type: Number,
        required: [true, "Product price is required"],
        min: [1, "Price must be greater than zero"]
    },

    quantity: {
        type: Number,
        required: [true, "Quantity is required"],
        min: [0, "Quantity can't be negative"]
    },

    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: [true, "Category is required"]
    }

}, {
    timestamps: true
});

module.exports = mongoose.model("Product", productSchema);