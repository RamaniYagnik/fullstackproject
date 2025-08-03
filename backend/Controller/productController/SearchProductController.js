import ProductModel from "../../Model/ProductModel.js"

const SearchProduct = async (req, res) => {
    try {

        const query = req.query.q

        const regexp = new RegExp(query, 'i', 'g')

        const product = await ProductModel.find({
            "$or": [
                { productName: regexp },
                { brandName: regexp },
                { category: regexp }
            ]
        })

        res.json({
            message: "Success",
            data: product,
            error: false,
            success: true
        })

    } catch (err) {
        res.json({
            message: err?.message || err,
            error: true,
            success: false
        })
    }
}

export default SearchProduct