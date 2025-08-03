import express from 'express'
import tokenAuthentication from "../Middleware/tokenAuthentication.js";
import AddProduct from "../Controller/productController/AddProduct.js"
import getProduct from '../Controller/productController/getProduct.js';
import update from '../Controller/productController/updateProduct.js';
import getCategoryProduct from '../Controller/productController/getCategoryProduct.js';
import getCategoryWiseProducts from '../Controller/productController/getCategoryWiseProducts.js';
import getProductById from '../Controller/productController/getProductById.js';
import SearchProduct from '../Controller/productController/SearchProductController.js';
import filterProductController from '../Controller/productController/filterProduct.js';

const router = express.Router()
router.use(express.json())

router.post("/create",tokenAuthentication,AddProduct)
router.get("/get",getProduct)
router.post("/update",tokenAuthentication,update)
router.get("/getCategoryProduct",getCategoryProduct)
router.post("/getCategoryWiseProducts",getCategoryWiseProducts)
router.get("/productdetails/:id",getProductById)
router.get("/search",SearchProduct)
router.post("/filter",filterProductController)

export default router