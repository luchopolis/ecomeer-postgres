import { Response, Request } from "express";
import { NextFunction } from "express-serve-static-core";

import CategoryService from "../../services/categories";
import responseFormat from "../../utils/response";

import { queryParams } from "../../services/categories/interfaces";

export default new (class Category {
  async getAll(req: Request, res: Response, next: NextFunction) {
    const { rows } = await CategoryService.getAll();
    res.json(rows);
  }

  async show(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const { rows } = await CategoryService.getOne(id);
    res.json(rows);
  }

  async productosByCategory(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    let queriesFilter: queryParams;
    let rows:any;
    if (req.query.minrange && req.query.maxrange) {
        queriesFilter = {
            minrange: parseInt(req.query.minrange.toString()),
            maxrange: parseInt(req.query.maxrange.toString()),
        };
        rows = await (await CategoryService.products(id, { ...queriesFilter })).rows;
    } else {
        rows = await (await CategoryService.products(id)).rows;
    }

    const sanitized = responseFormat.responseFormated(rows);
    res.json(sanitized);
  }
})();
