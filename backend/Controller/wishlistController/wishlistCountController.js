import wishlistModel from "../../Model/wishlistModel.js";

const WishlistCount = async (req, res) => {
    try {
        const userId = req.userId;

        const wish = await wishlistModel.findOne({ user: userId });

        let totalCount = 0;

        if (wish && Array.isArray(wish.items)) {
            totalCount = wish.items.length;
        }

        res.json({
            message: "Wishlist count retrieved successfully",
            error: false,
            success: true,
            data: {
                count: totalCount
            }
        });

    } catch (err) {
        res.json({
            message: err?.message || err,
            error: true,
            success: false
        });
    }
}

export default WishlistCount;
