/* import fs from "fs"; */
import { ProductModel } from "../../models/product.model.js";

const getProducts = async () => {
    try {
        return await ProductModel.find().lean()

    } catch (error) {
        console.log(error)
    }
}

const getProductById = async (pId) => {
    try {
        return await ProductModel.findById(pId).lean()  
    } catch (error) {
        console.log(error)
    }
}

const saveProduct = async (product) => {   
    try {
        await ProductModel.create(product)
    } catch (error) {
        console.log('error al intentar guardar el/los productos', error)
    }
}

const deleteProduct = async (pId) => { 
    try {
        return await ProductModel.findByIdAndDelete(pId)
    } catch (error) {
        console.log(error)
    }
}

export { getProducts, getProductById, saveProduct, deleteProduct }






/* const getProducts = async () => {
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

export { getProducts, getProductById, saveProducts } */