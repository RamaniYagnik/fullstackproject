import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "signupusers" },
  items: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "products" },
      quantity: { type: Number },
    }
  ],
  paymentId: { type: String },
  orderId: { type: String },
  signature: { type: String },
  status: { type: String, default: "Pending" },
  deliveryInfo: {
    fullName: { type: String, required: true },
    mobile: { type: Number, required: true },
    pincode: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    houseAddress: { type: String, required: true },
    landmark: { type: String }
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("orders", orderSchema);
