import { Request, Response, Router } from "express";

class IndexRoutes {
  router: Router;
  constructor() {
    this.router = Router();
  }

  routes() {
    this.router.get("/", (req, res) => {
      res.json({
        message: "/api/v1/register ",
      });
    });
  }
}

const indexRoutes = new IndexRoutes();
indexRoutes.routes();

export default indexRoutes.router;
