import { Schema, model } from "mongoose";

const BookSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  ano: {
    type: Date,
    default: new Date(),
  },
  gender: {
    type: String,
    requiere: true,
  },
  numPages: {
    type: Number,
    require: true,
  },
  image: {
    type: String,
  },
  autor: {
    type: Schema.Types.ObjectId,
    ref: "Autor",
  },
});

export default model("Book", BookSchema);
