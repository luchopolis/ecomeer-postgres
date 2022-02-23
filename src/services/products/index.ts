import { QueryResult } from 'pg';
import Connection from '../../db/connection';


export default new class Products {
    nameEntity:string = 'producto'

    async find() : Promise<QueryResult<any>> {
        const query = `SELECT * FROM ${this.nameEntity}`
        return Connection.query(query)
    }

    async findOne(id: number){
        const query = `SELECT * FROM ${this.nameEntity} WHERE id = ${id}`
        const result = await Connection.query(query)
        return result.rows 
    }
}