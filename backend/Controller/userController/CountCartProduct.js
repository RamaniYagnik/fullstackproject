import cartModel from "../../Model/cartModel.js";

const CountCartProductController = async (req, res) => {
    try {
        const userId = req.userId;

        const cart = await cartModel.findOne({ user: userId });

        let totalCount = 0;

        if (cart && cart.items.length > 0) {
            totalCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);
        }

        res.json({
            message: "Cart count retrieved successfully",
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

export default CountCartProductController;
