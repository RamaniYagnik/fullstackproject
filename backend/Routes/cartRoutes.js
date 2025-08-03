import express from "express";
import tokenAuthentication from "../Middleware/tokenAuthentication.js";
import cartController from "../Controller/userController/userCartController.js";
import CountCartProductController from "../Controller/userController/CountCartProduct.js";

const router = express.Router()

router.post("/create",tokenAuthentication,cartController.create)
router.get("/getCount",tokenAuthentication,CountCartProductController)
router.get("/getProductInCart",tokenAuthentication,cartController.getProduct)
router.put("/update/:itemid",tokenAuthentication,cartController.updateProduct)
router.delete("/delete/:itemid",tokenAuthentication,cartController.deleteProduct)

export default router