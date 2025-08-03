import express from "express";
import wishlistController from "../Controller/wishlistController/wishlistController.js";
import verifyToken from "../Middleware/tokenAuthentication.js"; // your JWT middleware
import WishlistCount from "../Controller/wishlistController/wishlistCountController.js";

const router = express.Router();

router.post("/add", verifyToken, wishlistController.addToWishlist);
router.get("/get", verifyToken, wishlistController.getWishlist);
router.get("/getCount", verifyToken, WishlistCount)
router.delete("/delete/:productId", verifyToken, wishlistController.deleteProduct);

export default router;
