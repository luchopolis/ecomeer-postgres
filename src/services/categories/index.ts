import { QueryResult } from 'pg';
import Connection from '../../db/connection';
import { queryParams } from './interfaces'


export default new class CategoryService {
    nameEntity: string = 'categoria'
    
    async getAll() : Promise<QueryResult<any>>{
        const query = `SELECT * FROM ${this.nameEntity}`
        return Connection.query(query)
    }

    async getOne(id){
        const query = `SELECT * FROM ${this.nameEntity} where id=${id}`
        return Connection.query(query)
    }

    async products(categoryId, queries?:queryParams){
        let extraQueryData: string
        let query = `SELECT * FROM producto where producto.categoria_id=${categoryId}`
        if(queries){
            extraQueryData = ` and producto.precio between ${queries.minrange} and ${queries.maxrange}`
            query += extraQueryData
        }        
        return Connection.query(query)
    }

    async countProducts() {
        const query = `select * from vwproductsbycategory`;
        return Connection.query(query);
    }


}