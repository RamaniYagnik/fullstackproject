import cartModel from "../../Model/cartModel.js";

const cartController = {
    async create(req, res) {
        try {
            const { productId, quantity = 1 } = req.body
            const product = productId

            let cart = await cartModel.findOne({ user: req.userId }).populate('items.product')

            if (cart) {
                const productExists = cart.items.some(item => item.product._id.toString() === productId)
                if (productExists) {
                    return res.status(400).json({
                        message: "Product already in cart",
                        error: true,
                        success: false
                    })
                }
                cart.items.push({ product, quantity })
                cart = await cart.save()
            } else {
                cart = await cartModel.create({
                    user: req.userId,
                    items: [{ product, quantity }]
                })
            }

            res.json({
                message: "Product Added To Cart...",
                data: cart,
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
    },
    async getProduct(req, res) {
        try {

            const cart = await cartModel.findOne({ user: req.userId }).populate('items.product')
            res.json({
                data: cart,
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
    },
    async updateProduct(req, res) {
        try {
            const { quantity } = req.body;
    
            const cart = await cartModel.findOneAndUpdate(
                { user: req.userId, "items._id": req.params.itemid },
                { $set: { "items.$.quantity": quantity } },
                { new: true }
            ).populate('items.product');
    
            if (!cart) {
                return res.status(404).json({
                    message: "Cart or item not found",
                    error: true,
                    success: false
                });
            }
    
            res.json({
                message: "Product Updated Successfully...",
                data: cart,
                error: false,
                success: true
            });
    
        } catch (err) {
            res.json({
                message: err.message || err,
                error: true,
                success: false
            });
        }
    },
    async deleteProduct(req,res) {
        try {
            
            const deleteProduct = await cartModel.findOneAndUpdate(
                { user: req.userId },
                { $pull: { items: { _id:req.params.itemid } } },
                { new: true }
            ).populate('items.product')

            res.json({
                message: "Product Deleted Successfully...",
                data: deleteProduct,
                error: false,
                success: true
            })

        } catch (err) {
            res.json({
                message: err.message || err,
                error: true,
                success: false
            });
        }
    }
    
}

export default cartController