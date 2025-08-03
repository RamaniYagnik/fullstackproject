import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    user : {type: mongoose.Schema.Types.ObjectId, ref:"signupusers"},
    items: [
        {
            product: {type: mongoose.Schema.Types.ObjectId, ref:"products"},
            quantity: {type: Number, required:true}
        }
    ]
})

export default mongoose.model('carts', cartSchema)