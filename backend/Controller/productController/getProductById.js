import ProductModel from "../../Model/ProductModel.js";

const getProductDetails = async (req, res) => {
    try {
        const product = await ProductModel.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving product' });
    }
}

export default getProductDetails