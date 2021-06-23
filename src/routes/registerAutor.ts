import { Request, Response, NextFunction, Router } from "express";
import Autor from "../models/Autor";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import auth from "../middleware/auth";
class ResgisterAutor {
  router: Router;
  constructor() {
    this.router = Router();
    this.routes();
  }
  public async getAutors(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const respuesta = await Autor.findOne({ _id: id });
      res.status(200).json(respuesta);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  public getAutor() {}
  async createAutor(req: Request, res: Response): Promise<void> {
    const { name, lastName, email, city, birthDate, password } = req.body;
    const user = await Autor.findOne({ email });
    if (user) {
      res.status(500).send({ Message: "Usuario ya existe" });
    } else {
      try {
        const newUser = new Autor({
          name,
          lastName,
          email,
          password,
          city,
          birthDate,
        });
        newUser.password = await bcrypt.hash(password, 12);

        await newUser.save();
        res.status(201).json({ data: newUser });
      } catch (error) {
        res.status(500).json(error);
      }
    }
  }
  public async autenticateAutor(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;
    const user = await Autor.findOne({ email });
    if (user) {
      if (!bcrypt.compareSync(password, user.password)) {
        res.status(401).json({ message: "Invalid Password" });
      } else {
        const token = jwt.sign(
          {
            email: user.email,
            name: user.name,
            id: user._id,
          },
          "LLAVE",
          {
            expiresIn: "1h",
          }
        );
        res.json({ token: token, user: user });
      }
    } else {
      res.status(404).json({ message: "User no exist" });
    }
  }
  public async updateAutor(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const autor = await Autor.findOneAndUpdate({ _id: id }, req.body);
    res.json({ autor });
  }
  deleteAutor() {}

  routes() {
    this.router.get("/:id", this.getAutors);
    this.router.get("/:id", this.getAutor);
    this.router.post("/", this.createAutor);
    this.router.put("/:id", this.updateAutor);
    this.router.post("/autenticar", this.autenticateAutor);
    this.router.post("/example", auth, this.updateAutor);
    this.router.delete("/:url", this.deleteAutor);
  }
}
const CreateAutor = new ResgisterAutor();
export default CreateAutor.router;
