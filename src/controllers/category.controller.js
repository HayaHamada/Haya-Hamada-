const Category = require("../models/Category");
const asyncHandler = require("../middlewares/asyncHandler");
const AppError = require("../utils/AppError");

// Create Category
exports.createCategory = asyncHandler(async (req, res) => {
    const { name, description } = req.body;

    const category = await Category.create({
        name,
        description
    });

    res.status(201).json({
        success: true,
        message: "Category created successfully",
        data: category
    });
});

// Get All Categories
exports.getCategories = asyncHandler(async (req, res) => {
    const categories = await Category.find();

    res.status(200).json({
        success: true,
        count: categories.length,
        data: categories
    });
});

// Get Category By ID
exports.getCategoryById = asyncHandler(async (req, res, next) => {
    const category = await Category.findById(req.params.id);

    if (!category) {
        return next(new AppError("Category not found", 404));
    }

    res.status(200).json({
        success: true,
        data: category
    });
});

// Update Category
exports.updateCategory = asyncHandler(async (req, res, next) => {
    const category = await Category.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
            runValidators: true
        }
    );

    if (!category) {
        return next(new AppError("Category not found", 404));
    }

    res.status(200).json({
        success: true,
        message: "Category updated successfully",
        data: category
    });
});

// Delete Category
exports.deleteCategory = asyncHandler(async (req, res, next) => {
    const category = await Category.findById(req.params.id);

    if (!category) {
        return next(new AppError("Category not found", 404));
    }

    await category.deleteOne();

    res.status(200).json({
        success: true,
        message: "Category deleted successfully"
    });
});