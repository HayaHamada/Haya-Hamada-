const express = require("express");

const router = express.Router();

const {
    createCategory,
    getCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
} = require("../controllers/category.controller");

// GET All + POST
router.route("/")
    .get(getCategories)
    .post(createCategory);

// GET One + PUT + DELETE
router.route("/:id")
    .get(getCategoryById)
    .put(updateCategory)
    .delete(deleteCategory);

module.exports = router;