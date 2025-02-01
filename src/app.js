import express from "express"
import handlebars from 'express-handlebars'
import {Server} from 'socket.io'
import routerApp from "./routes/index.js"
import socketMiddleware from "./utils/socketMiddleware.js"
import { connectDB } from "./db/mongoDB/index.js"

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

connectDB()

const io = new Server(httpServer)

app.use(socketMiddleware(io))

app.use(routerApp)





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