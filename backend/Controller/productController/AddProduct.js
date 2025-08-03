import ProductModel from "../../Model/ProductModel.js";
import uploadProductPermission from "../../helpers/Permission.js";

async function create(req, res) {
    try {

        const currentUser = req.userId

        if(!uploadProductPermission(currentUser)){
            throw new Error("Permission Denied")
        }

        const product = new ProductModel(req.body)
        await product.save()
        res.json({
            message: "Product Added Successfully",
            data: product,
            error: false,
            success: true
        })

    } catch (err) {
        res.json({
            message:err.message || err,
            error: true,
            success: false
        })
    }
}

export default create