import uploadProductPermission from '../../helpers/Permission.js'
import ProductModel from '../../Model/ProductModel.js'
// import userSignupModel from '../../Model/userSignupModel.js'


async function update(req,res) {
    try {
        
        if(!uploadProductPermission(req.userId)){
            throw new Error("Permission Denied")
        }

        const { _id, ...resBody } = req.body

        const update = await ProductModel.findByIdAndUpdate(_id, resBody, { new:true })

        res.json({
            message: "Update Product Successfully...",
            error:false,
            success:true,
            data:update
        })

    } catch (err) {
        res.json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}

export default update