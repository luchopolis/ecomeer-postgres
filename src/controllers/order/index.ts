import { Response, Request } from "express";
import { NextFunction } from "express-serve-static-core";
import Orders from '../../services/orders'
export default new class Order {

    async orderInfo(req: Request, res: Response, next: NextFunction) {
        const { orderId } = req.params
        const orderInfo = await Orders.orderInfo(orderId)
        const productos = orderInfo.map((element) => {
            return { 
                producto_id: element.producto_id,
                nombre: element.nombre,
                cantidad: element.cantidad,
                precio_final: element.precio_final
            }
        });
        const formatResponse = {
            order: orderInfo[0].order_id,
            productos
        }
        
        res.json(formatResponse)
    }
    async create(req: Request, res: Response, next: NextFunction){
        const create = await Orders.createOrden(1,1)
        res.json(create)
    }

    async createOrderDetail(req: Request, res: Response, next: NextFunction){
        const { orderId, productId, quantity } = req.body.data
        const create = await Orders.createOrdenDetail(orderId,productId,quantity)
        res.json(create.rows[0])
    }
}