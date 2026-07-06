const express = require("express");

const router = express.Router();

const {
    checkout,
    getAllOrders,
    getOrderById,
    updateOrderStatus
} = require("../controllers/order.controller");

router.post("/", checkout);

router.get("/", getAllOrders);

router.get("/:id", getOrderById);

router.put("/:id", updateOrderStatus);

module.exports = router;