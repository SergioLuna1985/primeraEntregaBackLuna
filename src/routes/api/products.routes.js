import { Router } from "express";
import { getProducts, getProductById, saveProducts } from "../../services/products/productService.js";
import {uploader} from "../../utils/multer.js";

const productsRoutes = Router()

const verifyProduct = (req, res, next) =>{
    const product = req.body

    if (!product.title || !product.description || !product.code || !product.price || !product.stock || !product.category) {
        return res.status(400).send({status: 'error', message: 'Product incomplete'})
    }
    next()
}


productsRoutes.get('/', async (req, res)=>{

    const products = await getProducts();
    const limit = +req.query.limit
    if (isNaN(limit) || !limit) {
        return res.send({products})
    }

    const productsLimited = products.slice(0, limit)

    res.send({products: productsLimited})
})


productsRoutes.get('/:pid', async (req, res)=>{

    const pId = +req.params.pid;
    const product = await getProductById(pId)

    if (!product) {
        return res.status(404).send({status: 'Error', message: 'Product not found'})
    }

    res.send({product})
})


productsRoutes.delete('/:pid', async (req, res)=>{

    const pId = +req.params.pid;
    const products = await getProducts()
    const product = await getProductById(pId)

    if (!product) {
        return res.status(404).send({status: 'Error', message: 'Product not found'})
    }

    const filteredProdcts = products.filter( p => p.id !== pId)
    const isOk = await saveProducts(filteredProdcts)

    if (!isOk) {
        return res.status(404).send({status: 'Error', message: 'something when wrong'})
    }
    res.send({status: 'ok', message: 'Product delete'})
})


productsRoutes.post('/',uploader.array('file'), verifyProduct, async (req, res)=>{


    const product = req.body
    const path = req.files.map(f=>f.path)
    const products = await getProducts()
    product.id = Math.floor(Math.random() * 10000)
    product.status = true

    product.price = parseInt(product.price)
    product.stock = parseInt(product.stock)

    products.push({...product, thumbnails: path})

    const isOk = await saveProducts(products)

    if (!isOk) {
        return res.send({status: 'Error', message: 'Product could not add'})
    }

    res.send({status: 'ok', message: 'Product added'})
})


productsRoutes.put('/:pid', verifyProduct, async (req, res)=>{

    const pId = +req.params.pid;
    const product = getProductById(pId)
    const productToUpdate = req.body
    const products = await getProducts()

    if (!product) {
        return res.status(404).send({status: 'Error', message: 'Product not found'})
    }

    const updateProducts = products.map(p=>{
        if (p.id===pId) {
            return {
                ...productToUpdate,
                id: pId
            }
        }
        return p;
    })

    const isOk = await saveProducts(updateProducts)
    if (!isOk) {
        return res.status(400).send({status: 'Error', message: 'something went wrong'})
    }
    res.send({status: 'ok', message: 'Product updated'})
})

export default productsRoutes