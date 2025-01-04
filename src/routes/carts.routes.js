import { Router } from "express";
import fs from 'fs';
import { send } from "process";

const cartRoutes = Router()

const getCarts = async () => {

    try {
        const carts = await fs.promises.readFile('src/db/carts.json', 'utf-8')
        const cartsConverted = JSON.parse(carts)
        return cartsConverted
    } catch (error) {
        return [];
    }
}

const getCartById = async (cId) => {

    const carts = await getCarts();
    const cart = carts.find( p => p.id === cId)
    return cart
}

const saveCarts = async (carts) => {

    try {
        const cartsConverted = JSON.stringify(carts)
        await fs.promises.writeFile('src/db/carts.json', cartsConverted, 'utf-8')
        return true
    } catch (error) {
        return false;
    }
}

cartRoutes.get('/:cid', async (req, res)=>{

    const cId = +req.params.cid
    const cart = await getCartById(cId)

    if (!cart) {
        return res.status(400).send({status: 'error', message: 'Cart not found'})
    }

    res.send(cart)

})

cartRoutes.post('/', async (req, res)=>{
    
    const cart = req.body
    cart.id = Math.floor(Math.random() * 10000)
    const carts = await getCarts()

    if (!cart.products) {
        return res.status(400).send({status: 'error', message: 'Product incomplete'})
    }

    carts.push(cart)

    const isOk = await saveCarts(carts)

    if (!isOk) {
        return res.send({status: 'Error', message: 'Cart could not add'})
    }

    res.send({status: 'ok', message: 'Cart added'})

})

cartRoutes.post('/:cid/product/:pid', async (req, res)=>{
    
    const cId = +req.params.cid
    const pId = +req.params.pid
    let {quantity}= req.body
    const cart = await getCartById(cId)
    const carts = await getCarts()

    if (!quantity){
        quantity = 1
    }

    if (!cart) {
        return res.status(400).send({status: 'error', message: 'Cart not found'})
    }

    const index = cart.products.findIndex(p=>p.id===pId)

   if (index !== -1) {
        cart.products[index] = {id: pId, quantity: cart.products[index].quantity + quantity}
   }else{
        cart.products.push({id: pId, quantity: quantity})
   }

   const updateCarts = carts.map(c=>{
    if (c.id===cId) {
        return {
            ...cart
        }
    }
    return c
   })

   const isOk = await saveCarts(updateCarts)

   if (!isOk) {
        return res.send({status: 'error', message: 'Product could not add'})
   }

   res.send({status: 'ok', message: 'Product added'})

})

export default cartRoutes