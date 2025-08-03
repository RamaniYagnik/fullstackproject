// Controller/wishlistController.js
import wishlistModel from "../../Model/wishlistModel.js";

const wishlistController = {
    async addToWishlist(req, res) {
        try {
            const { productId } = req.body;

            let wishlist = await wishlistModel.findOne({ user: req.userId });

            if (wishlist) {
                if (wishlist.items.includes(productId)) {
                    return res.status(400).json({ message: "Product already in wishlist", success: false });
                }
                wishlist.items.push(productId);
                await wishlist.save();
            } else {
                wishlist = await wishlistModel.create({
                    user: req.userId,
                    items: [productId]
                });
            }

            res.json({ message: "Added to wishlist", success: true, data: wishlist });
        } catch (err) {
            res.status(500).json({ message: err.message, success: false });
        }
    },

    async getWishlist(req, res) {
        try {
            const wishlist = await wishlistModel.findOne({ user: req.userId }).populate("items");
            res.json({ data: wishlist?.items || [], success: true });
        } catch (err) {
            res.status(500).json({ message: err.message, success: false });
        }
    },

    async deleteProduct(req, res) {
        try {
            const updatedWishlist = await wishlistModel.findOneAndUpdate(
                { user: req.userId },
                { $pull: { items: req.params.productId } },
                { new: true }
            ).populate("items");

            res.json({
                message: "Product Deleted Successfully...",
                data: updatedWishlist,
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
    }
};

export default wishlistController;
