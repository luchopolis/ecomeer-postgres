import express,{ Router } from 'express'

abstract class CoreRouter {
    protected _router: express.Router

    constructor() {
        this._router = Router()
    }

    get router() {
        return this._router
    }

}

export default CoreRouter