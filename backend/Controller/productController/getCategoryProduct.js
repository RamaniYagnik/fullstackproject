import ProductModel from '../../Model/ProductModel.js'

const getCategoryProduct = async(req,res) => {
    try {
        
        const productCategory = await ProductModel.distinct('category')

        const productByCategory = []

        for(const category of productCategory){

            const product = await ProductModel.findOne({category})

            if(product){
                productByCategory.push(product)
            }

        }

        res.json({
            message: "Category-Products",
            data: productByCategory,
            success: true,
            error: false
        })
        
    } catch (err) {
        res.status().json({
            message: err.message || err, 
            error: true,
            success: false
        })
    }
}

export default getCategoryProduct