import { Router } from "express";
import { getProducts, saveProducts } from "../services/products/productService.js"    


const viewRouter = Router()


viewRouter.get('/', async (req, res)=>{

    const products = await getProducts()

    const haveProducts = products.length > 0 ? true : false

    res.render('home', {title: "Productos", haveProducts, products})
})


viewRouter.get('/realtimeproducts', async (req, res) =>{

    const products = await getProducts()
    const io = req.io

    io.on('connection', socket => {

        console.log("se ha conectado un cliente")
        
        socket.emit('products', products)
        socket.on('newProduct', async data =>{

            products.push(data)

            const isOk = await saveProducts(products)
            
            if (!isOk) {
                console.log("Error al guardar el producto")
            }

            io.emit('products', products)
        })
    
        
    })

    res.render('realTimeProducts', {title: "Productos en tiempo real"})
})


export default viewRouter


/* viewRouter.get('/', (req, res)=>{
    const fakeUser = {
        name: 'Sergio',
        lastName: 'Luna'
    }

    res.render('index', {fakeUser, title: "Hola Sergio"})
}) */

/* viewRouter.get('/register', (req, res) =>{
    res.render('register')
}) */