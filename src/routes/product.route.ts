import { Router } from "express"
import CoreRouter from "./CoreRouter"

import controllers from '../controllers'

class ProductRouter extends CoreRouter{
    constructor() {
        super()
        this.initRoutes()
    }

    // definir rutas
    initRoutes(){
        this._router.get('/', controllers.products.find)
    }
}

const productRouter = new ProductRouter()
const router: Router = productRouter.router
export default router