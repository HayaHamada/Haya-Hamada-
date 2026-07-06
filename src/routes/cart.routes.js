const express = require("express");

const router = express.Router();

const {
    addToCart,
    getCart,
    updateCartItem,
    removeCartItem,
    clearCart
} = require("../controllers/cart.controller");

router.post("/", addToCart);

router.get("/", getCart);

router.put("/:itemId", updateCartItem);

router.delete("/:itemId", removeCartItem);

router.delete("/", clearCart);

module.exports = router;