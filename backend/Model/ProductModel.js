import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    productName: { type: String, required: true },
    brandName: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    productImage: { type: [String] },
    price: { type: Number},
    sellingPrice: { type: Number, required: true }
}, { timestamps:true })

export default mongoose.model('products',productSchema)
