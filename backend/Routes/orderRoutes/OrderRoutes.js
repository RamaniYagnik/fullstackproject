import express from "express";
import { createOrder,verifyPayment } from "../../Controller/Ordercontroller/Razorpaypayment.js";
import tokenAuthentication from "../../Middleware/tokenAuthentication.js";
import { cancelOrder, deleteOrder, getAllOrders, getLatestOrder, updateOrder } from "../../Controller/Ordercontroller/orderController.js";

const router = express.Router();

router.post("/createOrder",tokenAuthentication, createOrder);
router.post("/verifyPayment",tokenAuthentication, verifyPayment);
router.get("/getOrder",tokenAuthentication, getLatestOrder);
router.put("/cancelOrder/:id",tokenAuthentication, cancelOrder);
router.get("/getAllOrders",tokenAuthentication, getAllOrders);
router.put("/updateOrder/:id",tokenAuthentication, updateOrder);
router.delete("/deleteOrder/:id",tokenAuthentication, deleteOrder)

export default router;