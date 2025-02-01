import {Router} from 'express'
import productsRoutes from './api/products.routes.js'
import cartRoutes from './api/carts.routes.js'
import usersRouters from './api/users.routes.js'
import viewRouter from './views.routes.js'

const router = Router()

router.use('/', viewRouter)
router.use("/api/products", productsRoutes)
router.use("/api/carts", cartRoutes)
router.use('/api/users', usersRouters)

export default router