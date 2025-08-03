import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "signupusers", required: true },
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: "products" }]
}, { timestamps: true });

export default mongoose.model("wishlists", wishlistSchema);
