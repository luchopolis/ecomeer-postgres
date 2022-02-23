
import { Pool  } from 'pg'
import config from '../config/database';

require('dotenv').config()

export default new class Connection {
    
    pool: Pool
    constructor() {
        this.pool = new Pool({
            user: config.user,
            host: config.host,
            database: config.database,
            password: config.password,
            port: config.port,
        })
    }

    async query(query: string,values?: Array<string>) {
        const result = await this.pool.query(query, values)
        if(process.env.ENV === 'DEV') {
            console.log(
                `${new Date().toISOString()} START QUERY ${query} - ${JSON.stringify(
                  (!values) ? 'no values' : values,
                )}`,
              );
        }
        return result
    }
    
}