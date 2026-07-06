const Product = require("../models/Product");
const Category = require("../models/Category");
const asyncHandler = require("../middlewares/asyncHandler");
const AppError = require("../middlewares/AppError");

// GET ALL PRODUCTS (Filtering + Sorting + Pagination)
exports.getAllProducts = asyncHandler(async (req, res) => {

    let query = {};

    // Search by product name
    if (req.query.search) {
        query.name = {
            $regex: req.query.search,
            $options: "i"
        };
    }

    // Filter by category
    if (req.query.category) {
        query.category = req.query.category;
    }

    // Filter by price
    if (req.query.minPrice || req.query.maxPrice) {

        query.price = {};

        if (req.query.minPrice) {
            query.price.$gte = Number(req.query.minPrice);
        }

        if (req.query.maxPrice) {
            query.price.$lte = Number(req.query.maxPrice);
        }
    }

    // Pagination
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    // Sorting
    let sort = {};

    if (req.query.sort) {

        if (req.query.sort.startsWith("-")) {
            sort[req.query.sort.substring(1)] = -1;
        } else {
            sort[req.query.sort] = 1;
        }

    } else {
        sort.createdAt = -1;
    }

    const products = await Product.find(query)
        .sort(sort)
        .skip(skip)
        .limit(limit);

    const total = await Product.countDocuments(query);

    res.status(200).json({
        success: true,
        total,
        page,
        count: products.length,
        data: products
    });

});

// GET PRODUCT BY ID + Populate Category
exports.getProductById = asyncHandler(async (req, res, next) => {

    const product = await Product.findById(req.params.id)
        .populate("category");

    if (!product) {
        return next(new AppError("Product not found", 404));
    }

    res.status(200).json({
        success: true,
        data: product
    });

});

// CREATE PRODUCT
exports.createProduct = asyncHandler(async (req, res, next) => {

    const { category } = req.body;

    const categoryExists = await Category.findById(category);

    if (!categoryExists) {
        return next(new AppError("Category not found", 404));
    }

    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        data: product
    });

});

// UPDATE PRODUCT
exports.updateProduct = asyncHandler(async (req, res, next) => {

    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new AppError("Product not found", 404));
    }

    if (req.body.category) {

        const categoryExists = await Category.findById(req.body.category);

        if (!categoryExists) {
            return next(new AppError("Category not found", 404));
        }
    }

    const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
            runValidators: true
        }
    );

    res.status(200).json({
        success: true,
        data: updatedProduct
    });

});

// DELETE PRODUCT
exports.deleteProduct = asyncHandler(async (req, res, next) => {

    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new AppError("Product not found", 404));
    }

    await product.deleteOne();

    res.status(200).json({
        success: true,
        message: "Product deleted successfully"
    });

});