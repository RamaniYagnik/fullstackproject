import crypto from "crypto";
import razorpay from "../../config/Razorpay.js";
import cartModel from "../../Model/cartModel.js";
import orderModel from "../../Model/orderModel.js";

export const createOrder = async (req, res) => {
  const { amount } = req.body;

  try {
    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: `receipt_order_${Date.now()}`,
    };

    const razorpayOrder = await razorpay.orders.create(options);

    return res.json({
      success: true,
      order: razorpayOrder,
    });

  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    return res.status(500).json({ success: false, message: "Payment initiation failed" });
  }
};


// razorpaycontroller.js

export const verifyPayment = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, deliveryDetails } = req.body;

  const sign = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");

  if (sign !== razorpay_signature) {
    return res.status(400).json({ success: false, message: "Invalid signature" });
  }

  try {
    const cart = await cartModel.findOne({ user: req.userId }).populate("items.product");

    if (!cart || cart.items.length === 0) {
      return res.status(404).json({ success: false, message: "Cart is empty" });
    }

    // Create a new order with delivery details
    const newOrder = new orderModel({
      user: req.userId,
      items: cart.items,
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
      signature: razorpay_signature,
      status: "Paid",
      deliveryInfo: deliveryDetails // ✅ This matches your schema
    });


    await newOrder.save();

    cart.items = [];
    await cart.save();

    return res.json({ success: true, message: "Payment verified and order saved" });

  } catch (error) {
    console.error("Order saving error:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

