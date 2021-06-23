import { Request, Response, Router } from "express";
import Editorial from "../models/Editorial";
class registerEditorial {
  router: Router;
  constructor() {
    this.router = Router();
    this.routes();
  }
  public async newEditorial(req: Request, res: Response): Promise<void> {
    const { name, address, phone, email, max_books } = req.body;
    try {
      const newEditorial = new Editorial({
        name,
        address,
        phone,
        email,
        max_books,
      });
      await newEditorial.save();
      res.status(200).json({ newEditorial });
    } catch (error) {
      console.log(error);
    }
  }
  public async getEditorials(req: Request, res: Response): Promise<void> {
    try {
      const response = await Editorial.find({});
      res.status(200).json({ response });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }

  routes() {
    this.router.post("/", this.newEditorial);
    this.router.get("/", this.getEditorials);
  }
}
const createrEditorial = new registerEditorial();
export default createrEditorial.router;
