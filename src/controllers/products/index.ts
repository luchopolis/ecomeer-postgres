import { Response, Request } from "express";
import { NextFunction } from "express-serve-static-core";
import Products from "../../services/products";

export default new class ProductsController {
    async find(req: Request, res: Response, next: NextFunction) {
        const { rows } = await Products.find();
        res.json(rows);
    }
}