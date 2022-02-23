import express from 'express';
import config from './config/app'

// controllers
import CategoryRoute from './routes/category.route'
import ProductsRoute from './routes/product.route'
import OrdersRoute from './routes/order.route'
class AppServer {
    private app: express.Application
    private PORT: number | string
    constructor() {
        this.app = express()
        this.PORT = config.port
    }

    start() {
        this.initServer()
        this.app.listen(this.PORT, () => {
            console.log(`Running at ${this.PORT}`);
        })
    }

    private initServer(){
        this.initialize()
        this.initializateControllers()
    }

    // extra initialize
    initialize() {
        this.app.use(express.urlencoded({ extended: true }))
        this.app.use(express.json())
    }

    initializateControllers() {
        this.app.use('/categories',CategoryRoute)
        this.app.use('/products', ProductsRoute)
        this.app.use('/orders', OrdersRoute)
    }
}

const appServer = new AppServer()

export default appServer.start()