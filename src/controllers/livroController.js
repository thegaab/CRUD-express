import livro from "../models/Livro.js";
import { autor } from "../models/Autor.js";

class LivroController {

    static async listarLivros(req, res) {
        try {
            const listaLivros = await livro.find({});
            res.status(200).json(listaLivros);
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - falha ao listar livros` });
        }
    };

    static async listarLivroPorId(req, res) {
        const id = req.params.id;
        const livroEncontrado = await livro.findById(id);
        if (!livroEncontrado) {
            return res.status(404).json({ message: "Livro não encontrado" });
        }
        try {
            const id = req.params.id;
            const livroEncontrado = await livro.findById(id);
            res.status(200).json(livroEncontrado);
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - falha na requisição do livro` });
        }
    };

    static async cadastrarLivro(req, res) {
        const novoLivro = req.body;

        try {
            const autorEncontrado = await autor.findById(novoLivro.autor);
            const livroCompleto = { ...novoLivro, autor: {...autorEncontrado._doc} };
            const livroCriado = await livro.create(livroCompleto);
            res.status(201).json({ message: "Livro cadastrado com sucesso", livro: livroCriado });
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - falha ao cadastrar livro` });
        }

    };

    static async atualizarLivro(req, res) {
        try {
            const id = req.params.id;
            await livro.findByIdAndUpdate(id, req.body);
            res.status(200).json({message: "Livro atualizado com sucesso"});
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - falha ao atualizar livro` });
        }
    };

    static async deletarLivro(req, res) {
        try {
            const id = req.params.id;
            const livroEncontrado = await livro.findById(id);
            if (!livroEncontrado) {
            res.status(404).json({ message: "Livro não encontrado ou já foi deletado" });
            } else {
            await livro.findByIdAndDelete(id);
            res.status(200).json({message: "Livro deletado com sucesso"});
            }
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - falha ao deletar livro` });
        }
    };

    static async listarLivrosPorEditora(req, res) {
        const editora = req.query.editora;
        try{
            const livrosPorEditora = await livro.find({editora: editora});
            res.status(200).json(livrosPorEditora);
        }catch(erro){
            res.status(500).json({ message: `${erro.message} - falha ao listar livros por editora` });
        }
    };

    static async listarLivrosPorAutor(req, res) {
        const autorEncontrado = await autor.findOne({nome: autor});
        if (!autorEncontrado) {
            return res.status(404).json({ message: "Autor não encontrado" });
        }
        const livrosPorAutor = await livro.find({"autor.nome": autor});
        if (livrosPorAutor.length === 0) {
            return res.status(404).json({ message: "Não existem livros para este autor" });
        }
        const autor = req.query.autor;
        try{
            const livrosPorAutor = await livro.find({"autor.nome": autor});
            res.status(200).json(livrosPorAutor);
        }catch(erro){
            res.status(500).json({ message: `${erro.message} - falha ao listar livros por autor` });
        }
    }
};

export default LivroController;
