import { Router } from "express";
import { getProducts, saveProduct } from "../services/products/productService.js"    

const viewRouter = Router()


viewRouter.get('/', async (req, res)=>{

    const products = await getProducts()

    const haveProducts = products.length > 0 ? true : false

    res.render('home', {titlePag: "Productos", haveProducts, products})
})


viewRouter.get('/realtimeproducts', async (req, res) =>{

    const products = await getProducts()
    const io = req.io

    io.on('connection', socket => {

        console.log("se ha conectado un cliente")
        
        socket.emit('products', products)
        socket.on('newProduct', async data =>{

            try {
                await saveProduct(data)
                
            } catch (error) {
                console.log(error)
            }

            io.emit('products', await getProducts())
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