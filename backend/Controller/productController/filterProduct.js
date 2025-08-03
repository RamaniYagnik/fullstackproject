import ProductModel from '../../Model/ProductModel.js'

const filterProductController = async (req,res) => {
    try {
        
        const categoryList = req?.body?.category || []

        const product = await ProductModel.find({
            category : {
                "$in" : categoryList 
            }
        })

        res.json({
            data : product,
            message : "Product found successfully",
            error : false,
            success : true
        })

    } catch (err) {
        res.json({
            message: err.message || err,
            success: false,
            error: true
        })
    }
}

export default filterProductController