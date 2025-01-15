import fs from "fs";


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

export { getProducts, getProductById, saveProducts }