import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import mongoose from "mongoose";
import compression from "compression";
import dotenv from "dotenv";
import cors from "cors";
import indexRoutes from "./routes/indexRoutes";
import registerAutor from "./routes/registerAutor";
import registerBook from "./routes/registerBook";
import registerEditorial from "./routes/registerEditorial";

class Server {
  public app: express.Application;
  constructor() {
    this.app = express();
    dotenv.config({ path: "vars.env" });
    this.config();
    this.routes();
  }
  config() {
    const MONGO_URI = "localhost:2703/comida";
    mongoose.set("useFindAndModify", true);
    mongoose
      .connect(process.env.MONGO_URI || MONGO_URI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
      })
      .then((db) => console.log("Connected to Mongo Ready"))
      .catch((error) => console.log(error));
    this.app.set("port", process.env.PORT || 3000);
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(morgan("dev"));
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(cors());
  }
  routes() {
    this.app.use(indexRoutes);
    this.app.use("/api/v1/book", registerBook);
    this.app.use("/api/v1/autor", registerAutor);
    this.app.use("/api/v1/editorial", registerEditorial);
  }
  start() {
    this.app.listen(this.app.get("port"), () => {
      console.log(`Server ruuning on port`, this.app.get("port"));
    });
  }
}
const server = new Server();
server.start();
