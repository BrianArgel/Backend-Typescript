import { Schema, model } from "mongoose";

const EditorialSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  max_books: {
    type: Number,
    default: -1,
  },
  categorias: {
    type: String,
    cats: [{ name: String }],
  },
});

export default model("Editorial", EditorialSchema);
