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
        const { user_id, direccionId }  = req.body
        const create = await Orders.createOrden(user_id, direccionId)
        res.json({ data: { order: create }})
    }

    async createOrderDetail(req: Request, res: Response, next: NextFunction){
        const { orderId, productId, quantity } = req.body.data
        const create = await Orders.createOrdenDetail(orderId,productId,quantity)
        res.json(create.rows[0])
    }

    async productsFromOrder(req: Request, res: Response, next: NextFunction){
        const { orderId } = req.params
        const result = await Orders.getOrderProducts(Number.parseInt(orderId))
        const total = result.reduce( function(a, b){
            return Number.parseFloat(a) + Number.parseFloat(b['precio_final']);
        }, 0);
        
        res.json({ order: orderId, data: { productos: result,total }})
    }

    async changeStatus(req: Request, res: Response, next: NextFunction){
        const { orderId } = req.params
        const { status } = req.body
       
        try {
            const result = await Orders.changeOrderStatus(Number.parseInt(orderId), status)
            res.json({ data: result })
        } catch (error) {
            console.log(error)
        }
        
    }
}