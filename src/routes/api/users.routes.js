import { Router } from "express";

const usersRouters = Router()

const users = []

usersRouters.post('/', (req, res) =>{
    const user = req.body
    user.role = 'user'
    users.push(user)
    res.send({status: 'ok', message: 'user added'})
})

usersRouters.get('/', (req, res) =>{
    res.send({users})
})

export default usersRouters