const Order = require("../models/Order");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const asyncHandler = require("../middlewares/asyncHandler");
const AppError = require("../middlewares/AppError");

// Checkout
exports.checkout = asyncHandler(async (req, res, next) => {

    const cart = await Cart.findOne().populate("items.product");

    if (!cart || cart.items.length === 0) {
        return next(new AppError("Cart is empty", 400));
    }

    let totalPrice = 0;
    let orderItems = [];

    for (const item of cart.items) {

        const product = await Product.findById(item.product._id);

        if (!product) {
            return next(new AppError("Product not found", 404));
        }

        // Stock Verification
        if (product.quantity < item.quantity) {
            return next(
                new AppError(`${product.name} is out of stock`, 400)
            );
        }

        // Update Stock
        product.quantity -= item.quantity;
        await product.save();

        orderItems.push({
            product: product._id,
            quantity: item.quantity,
            price: product.price
        });

        totalPrice += product.price * item.quantity;
    }

    // Create Order
    const order = await Order.create({
        items: orderItems,
        totalPrice
    });

    // Clear Cart
    cart.items = [];
    await cart.save();

    res.status(201).json({
        success: true,
        message: "Order placed successfully",
        data: order
    });

});


// Get All Orders
exports.getAllOrders = asyncHandler(async (req, res) => {

    const orders = await Order.find()
        .populate("items.product");

    res.status(200).json({
        success: true,
        count: orders.length,
        data: orders
    });

});


// Get Order By Id
exports.getOrderById = asyncHandler(async (req, res, next) => {

    const order = await Order.findById(req.params.id)
        .populate("items.product");

    if (!order) {
        return next(new AppError("Order not found", 404));
    }

    res.status(200).json({
        success: true,
        data: order
    });

});


// Update Status
exports.updateOrderStatus = asyncHandler(async (req, res, next) => {

    const order = await Order.findById(req.params.id);

    if (!order) {
        return next(new AppError("Order not found", 404));
    }

    order.status = req.body.status;

    await order.save();

    res.status(200).json({
        success: true,
        data: order
    });

});