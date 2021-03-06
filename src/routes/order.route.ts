import { Router } from "express"
import CoreRouter from "./CoreRouter"

import controllers from '../controllers'

class OrderRouter extends CoreRouter{
    constructor() {
        super()
        this.initRoutes()
    }

    // definir rutas
    initRoutes(){
        this._router.post('/', controllers.orders.create)
        this._router.post('/orderDetail', controllers.orders.createOrderDetail)
        this._router.get('/:orderId/orderInfo/', controllers.orders.orderInfo)
        this._router.get('/:orderId/productsFromOrder', controllers.orders.productsFromOrder)
        this._router.put('/:orderId/changeStatus', controllers.orders.changeStatus)
    }
}

const orderRoute = new OrderRouter()
const router: Router = orderRoute.router
export default router