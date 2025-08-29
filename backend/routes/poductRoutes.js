import express from 'express'
import { addProduct, getProducts, deleteProduct } from '../controllers/productController.js'
import upload from '../middleware/multer.js'


const router = express.Router()

router.post("/addproduct", upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 }]), addProduct)

router.get("/getproducts", getProducts)
router.delete("/deleteproduct/:id", deleteProduct)

export default router