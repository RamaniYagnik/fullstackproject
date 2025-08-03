import ProductModel from '../../Model/ProductModel.js'

const getCategoryWiseProducts = async (req, res) => {
    try {

        const { category } = req?.body || req.params

        const product = await ProductModel.find({category})

        res.json({
            message:"Product get Successfully...",
            data: product,
            error: false,
            success: true
        })

    } catch (err) {
        res.json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}
export default getCategoryWiseProducts