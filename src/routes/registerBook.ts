import { Request, Response, Router } from "express";
import Book from "../models/Book";

class registerBook {
  router: Router;
  constructor() {
    this.router = Router();
    this.routes();
  }
  public async createBook(req: Request, res: Response): Promise<void> {
    const { title, ano, gender, numPages, autor } = req.body;
    try {
      const newBook = new Book({ title, ano, gender, numPages, autor });
      await newBook.save();
      res.status(201).json(newBook);
    } catch (error) {
      res.status(500).json({ error });
    }
  }
  public async getBooks(req: Request, res: Response): Promise<void> {
    try {
      const response = await Book.find({});
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ error });
    }
  }
  public async getBook(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const book = await Book.findOne({ _id: id }).populate("autor");
      res.status(200).json({ book });
    } catch (error) {
      res.status(500).json({ error });
    }
  }
  public async updateBook(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const book = await Book.findOneAndUpdate({ _id: id }, req.body);
    res.json({ book });
  }
  public async deleteBook(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    await Book.deleteOne({ _id: id });
    res.json({ Deleted: "deleted" });
  }
  routes() {
    this.router.get("/", this.getBooks);
    this.router.get("/:id", this.getBook);
    this.router.post("/", this.createBook);
    this.router.put("/:id", this.updateBook);
    this.router.delete("/:id", this.deleteBook);
  }
}
const createrBook = new registerBook();
export default createrBook.router;
