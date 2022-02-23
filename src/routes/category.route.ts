import { Router } from "express"
import CoreRouter from "./CoreRouter"

import controllers from '../controllers'

class CategoryRouter extends CoreRouter{
    constructor() {
        super()
        this.initRoutes()
    }

    // definir rutas
    initRoutes(){
        this._router.get('/', controllers.categories.getAll)
        this._router.get('/:id', controllers.categories.show)
        this._router.get('/:id/products', controllers.categories.productosByCategory)
    }
}

const categoryRouter = new CategoryRouter()
const router: Router = categoryRouter.router
export default router