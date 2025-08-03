import ProductModel from "../../Model/ProductModel.js";

const getProduct = async(req,res) => {
    try {
        
        const product = await ProductModel.find().sort({ createdAt: -1 })
        res.status(200).json({
            message: "Product Found Successfully",
            error: false,
            success: true,
            data: product
        })

    } catch (err) {
        res.status(500).json({
            message: err.message || err,
            error: true,
            success: false,
        })
    }
}

export default getProduct