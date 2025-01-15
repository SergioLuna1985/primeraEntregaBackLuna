import express from "express"
import productsRoutes from "./routes/api/products.routes.js"
import cartRoutes from "./routes/api/carts.routes.js"
import handlebars from 'express-handlebars'
import viewRouter from "./routes/views.routes.js"
import usersRouters from "./routes/api/users.routes.js"
import {Server} from 'socket.io'


const PORT = 8080
const app = express()


app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.engine('handlebars', handlebars.engine())
app.set('views','src/views')
app.set('view engine', 'handlebars')

const httpServer = app.listen(PORT, ()=>{
    console.log(`Escuchando en ${PORT}`)
})

const io = new Server(httpServer)

const socketMiddleware = (io) => (req, res, next) =>{
    req.io = io
    next()
}

app.use(socketMiddleware(io))

app.use('/', viewRouter)
app.use("/api/products", productsRoutes)
app.use("/api/carts", cartRoutes)
app.use('/api/users', usersRouters)




/* const messages = []

io.on('connection', socket=>{
    console.log("se ha conectado un cliente")
    
    socket.on('message', data =>{
        messages.push(data)
        io.emit('messagesLogs', messages)
    })

    socket.on('newUser', user =>{
        socket.broadcast.emit('newUserNotification', user)
    })

    socket.emit('mensaje_individual', 'Esta es una muestra de un mensaje individual')
    socket.broadcast.emit('mensaje_masivo', 'Este es un mensaje que se envia a todos menos al que lo envia')
    socketServer.emit('mensaje_para_todos', 'Este mensaje se esparce a todos inclusive quién lo envia')
}) */