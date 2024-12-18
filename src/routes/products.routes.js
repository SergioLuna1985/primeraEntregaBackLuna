import { Router } from "express";
import fs from 'fs';

const productsRoutes = Router()

const getProducts = async () => {

    try {
        const products = await fs.promises.readFile('src/db/products.json', 'utf-8')
        const productsConverted = JSON.parse(products)
        return productsConverted
    } catch (error) {
        return [];
    }
}

const getProductById = async (pId) => {
    const products = await getProducts();
    const product = products.find( p => p.id === pId)
    return product
}

const saveProducts = async (products) => {

    try {
        const productsConverted = JSON.stringify(products)
        await fs.promises.writeFile('src/db/products.json', productsConverted, 'utf-8')
        return true
    } catch (error) {
        return false;
    }
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



productsRoutes.post('/', async (req, res)=>{

    
    const product = req.body
    product.id = Math.floor(Math.random() * 10000)


    if (!product.title || !product.description || !product.code || !product.price || !product.status || !product.stock || !product.category) {
        return res.status(400).send({status: 'error', message: 'Product incomplete'})
    }

    const products = await getProducts()
    products.push(product)

    const isOk = await saveProducts(products)

    if (!isOk) {
        return res.send({status: 'Error', message: 'Product could not add'})
    }

    res.send({status: 'ok', message: 'Product added'})
})

productsRoutes.put('/:pid', async (req, res)=>{

    const pId = +req.params.pid;
    const product = getProductById(pId)
    const productToUpdate = req.body
    const products = await getProducts()

    if (!product) {
        return res.status(404).send({status: 'Error', message: 'Product not found'})
    }


    if (!productToUpdate.title || !productToUpdate.description || !productToUpdate.code || !productToUpdate.price || !productToUpdate.status || !productToUpdate.stock || !productToUpdate.category) {
        return res.status(400).send({status: 'error', message: 'Product incomplete'})
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