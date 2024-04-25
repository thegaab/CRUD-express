import mongoose from "mongoose";
import { autorSchema } from "./Autor.js";

const livroSchema = new mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId
    },
    titulo: {
        type: String,
        required: true
    },
    editora: {
        type: String,
        required: true
    },
    preco: {
        type: Number,
        required: true
    },
    paginas: {
        type: Number,
        required: true
    },
    autor: autorSchema
}, {
    versionKey: false
});

const livro = mongoose.model("livros", livroSchema);

export default livro;