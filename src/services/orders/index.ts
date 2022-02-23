import { QueryResult } from 'pg';
import Connection from '../../db/connection';
import moment from 'moment';

export default new class Orders {
    nameEntity: string = 'order_tb'
    extraTable:string = 'order_detail'

    async orderInfo(orderId){
        const query = `select * from ${this.extraTable}
        inner join ${this.nameEntity}
        on ${this.extraTable}.order_id = ${this.nameEntity}.id
        inner join producto 
        on ${this.extraTable}.producto_id = producto.id
        where ${this.extraTable}.order_id = ${orderId}`
        
        return (await Connection.query(query)).rows
    }
    // Crear la orden
    async createOrden(user_id:number, direccionId:number) :  Promise<QueryResult<any>>{
        const orderDate = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
        const query = `INSERT INTO ${this.nameEntity}(user_id,fecha_orden,direccion_id) VALUES(${user_id},'${orderDate}',${direccionId}) returning *`
        const create = (await Connection.query(query)).rows[0].id
        return create
    }
    // Crear el detalle de la orden por cada producto
    async createOrdenDetail(order: number,productId:number,quantity:number){
        const productoPrecio = await Connection.query(`SELECT precio from producto where id = ${productId}`)
        let total = productoPrecio.rows[0].precio * quantity
        const query = `INSERT INTO order_detail(order_id,producto_id,cantidad,precio_final) VALUES(${order},${productId},${quantity},${total}) returning *`
        return Connection.query(query)
    }

}
