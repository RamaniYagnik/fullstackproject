import OrderModel from "../../Model/orderModel.js";

export const getLatestOrder = async (req, res) => {
  try {
    const latestOrder = await OrderModel.find({ user: req.userId })
      .sort({ createdAt: -1 })
      .populate("items.product");

    if (!latestOrder) {
      return res.status(404).json({ success: false, message: "No recent order found." });
    }

    res.status(200).json({ success: true, data: latestOrder });
  } catch (err) {
    console.error("Get latest order error:", err);
    res.status(500).json({ success: false, message: "Server error." });
  }
};

export const cancelOrder = async (req, res) => {
  const { id } = req.params;

  try {
    const order = await OrderModel.findById(id);

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    if (order.status === "Delivered") {
      return res.status(400).json({ success: false, message: "Cannot cancel a delivered order" });
    }

    order.status = "Cancelled";
    await order.save();

    res.status(200).json({ success: true, message: "Order cancelled", data: order });
  } catch (err) {
    console.error("Cancel order error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get all orders for admin
export const getAllOrders = async (req, res) => {
  try {
    const allOrders = await OrderModel.find()
      .populate('user', 'name email')
      .populate('items.product', 'productName price productImage')
      .sort({ createdAt: -1 });

    const enrichedOrders = allOrders.map(order => {
      const totalAmount = order.items.reduce((sum, item) => {
        return sum + item.quantity * (item.product?.price || 0);
      }, 0);

      return {
        ...order.toObject(),
        totalAmount
      };
    });

    res.status(200).json({ success: true, data: enrichedOrders });
  } catch (error) {
    console.error("Error fetching all orders:", error);
    res.status(500).json({ success: false, message: "Failed to fetch all orders" });
  }
};

export const updateOrder = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const updated = await OrderModel.findByIdAndUpdate(id, { status }, { new: true });
    if (!updated) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    res.status(200).json({ success: true, message: "Order updated", data: updated });
  } catch (err) {
    console.error("Update order error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const deleteOrder = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await OrderModel.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    res.status(200).json({ success: true, message: "Order deleted" });
  } catch (err) {
    console.error("Delete order error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};