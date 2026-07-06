const Cart = require("../models/Cart");
const Product = require("../models/Product");
const asyncHandler = require("../middlewares/asyncHandler");
const AppError = require("../middlewares/AppError");

// Add Product To Cart
exports.addToCart = asyncHandler(async (req, res, next) => {

    const { product, quantity } = req.body;

    const productExists = await Product.findById(product);

    if (!productExists) {
        return next(new AppError("Product not found", 404));
    }

    let cart = await Cart.findOne();

    if (!cart) {
        cart = await Cart.create({
            items: []
        });
    }

    const itemIndex = cart.items.findIndex(
        item => item.product.toString() === product
    );

    if (itemIndex > -1) {

        cart.items[itemIndex].quantity += quantity || 1;

    } else {

        cart.items.push({
            product,
            quantity: quantity || 1
        });

    }

    await cart.save();

    res.status(200).json({
        success: true,
        message: "Product added to cart",
        data: cart
    });

});


// Get Cart
exports.getCart = asyncHandler(async (req, res) => {

    const cart = await Cart.findOne()
        .populate("items.product");

    if (!cart) {

        return res.status(200).json({
            success: true,
            data: {
                items: [],
                totalPrice: 0
            }
        });

    }

    let totalPrice = 0;

    cart.items.forEach(item => {
        totalPrice += item.product.price * item.quantity;
    });

    res.status(200).json({
        success: true,
        totalPrice,
        data: cart
    });

});


// Update Quantity
exports.updateCartItem = asyncHandler(async (req, res, next) => {

    const cart = await Cart.findOne();

    if (!cart) {
        return next(new AppError("Cart not found", 404));
    }

    const item = cart.items.id(req.params.itemId);

    if (!item) {
        return next(new AppError("Item not found", 404));
    }

    item.quantity = req.body.quantity;

    await cart.save();

    res.status(200).json({
        success: true,
        data: cart
    });

});


// Remove Item
exports.removeCartItem = asyncHandler(async (req, res, next) => {

    const cart = await Cart.findOne();

    if (!cart) {
        return next(new AppError("Cart not found", 404));
    }

    cart.items = cart.items.filter(
        item => item._id.toString() !== req.params.itemId
    );

    await cart.save();

    res.status(200).json({
        success: true,
        message: "Item removed"
    });

});


// Clear Cart
exports.clearCart = asyncHandler(async (req, res) => {

    const cart = await Cart.findOne();

    if (cart) {
        cart.items = [];
        await cart.save();
    }

    res.status(200).json({
        success: true,
        message: "Cart cleared"
    });

});