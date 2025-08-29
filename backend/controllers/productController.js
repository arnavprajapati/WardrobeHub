import uploadOnCloudinary from "../config/cloudinary.js"
import Product from "../models/productsModel.js"


const addProduct = async (req, res) => {
    try {
        let { name, description, subDescription, price, stock, category, subCategory, sizes, bestseller } = req.body

        let image1 = await uploadOnCloudinary(req.files.image1[0].path)
        let image2 = await uploadOnCloudinary(req.files.image2[0].path)
        let image3 = await uploadOnCloudinary(req.files.image3[0].path)
        let image4 = await uploadOnCloudinary(req.files.image4[0].path)

        let productData = {
            name,
            description,
            subDescription,
            price: Number(price),
            stock: Number(stock),
            category,
            subCategory,
            sizes: JSON.parse(sizes),
            bestseller: bestseller === "true" ? true : false,
            date: Date.now(),
            image1,
            image2,
            image3,
            image4

        }

        const product = await Product.create(productData)

        return res.status(201).json(product)

    } catch (error) {
        console.log("AddProduct error")
        return res.status(500).json({ message: `AddProduct error ${error}` })
    }

}

const getProducts = async (req, res) => {
    try {
        const products = await Product.find()
        return res.status(200).json(products)
    } catch (error) {
        console.log("getProducts error")
        return res.status(500).json({ message: `getProducts error ${error}` })
    }
}

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params
        const product = await Product.findByIdAndDelete(id)
        return res.status(200).json(product)
    } catch (error) {
        console.log("deleteProduct error")
        return res.status(500).json({ message: `deleteProduct error ${error}` })
    }
}

export {addProduct, getProducts, deleteProduct}