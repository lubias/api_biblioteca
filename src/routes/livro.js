const express = require('express');
const router = express.Router();
const conectarBancoDados = require('../middlewares/conectarBD');
const tratarErrosEsperados = require('../functions/tratarErrosEsperados');
const EsquemaLivro = require('../models/livro');

router.post('/criar', conectarBancoDados, async function(req, res, next) {
    try{
        // #swagger.tags = ['Livro']
        let {titulo, paginas, isbn, editora} = req.body;
        const respostaBD = await EsquemaLivro.create({titulo, paginas, isbn, editora});

        res.status(200).json({
            status: "OK",
            statusMensagem: "Livro criado com sucesso.",
            resposta: respostaBD
        });
    }catch(error){
        return tratarErrosEsperados(res, error);
    }
});

router.put('/editar/:id', conectarBancoDados, async function(req, res, next) {
    try{
        // #swagger.tags = ['Livro']
        let idLivro = req.params.id;
        let {titulo, paginas, isbn, editora} = req.body;
        const checkLivro = await EsquemaLivro.findOne({ _id: idLivro});
        if(!checkLivro) {
            throw new Error("Livro não encontrado.");
        }

        const livroAtualizado = await EsquemaLivro.updateOne({_id: idLivro}, {titulo, paginas, isbn, editora});

        if(livroAtualizado.modifiedCount > 0){
            const dadosTarefa = await EsquemaLivro.findOne({_id: idLivro});
            
            res.status(200).json({
                status: "OK",
                statusMensagem: "Livro atualizado com sucesso.",
                resposta: dadosTarefa
            });
        }
    }catch(error){
        return tratarErrosEsperados(res, error);
    }
});

router.get('/obter-livros', conectarBancoDados, async function(req, res, next) {
    try{
        // #swagger.tags = ['Livro']
        const respostaBD = await EsquemaLivro.find();

        res.status(200).json({
            status: "OK",
            statusMensagem: "Livros listados na resposta com sucesso.",
            resposta: respostaBD
        });
    }catch(error){
        return tratarErrosEsperados(res, error);
    }
});

router.get('/obter-livro/:id', conectarBancoDados, async function(req, res, next) {
    try{
        // #swagger.tags = ['Livro']
        let idLivro = req.params.id;

        const checkLivro = await EsquemaLivro.findOne({ _id: idLivro});
        if(!checkLivro) {
            throw new Error("Livro não encontrado.");
        }

        const respostaBD = await EsquemaLivro.findOne({ _id: idLivro});

        res.status(200).json({
            status: "OK",
            statusMensagem: "Livro listado na resposta com sucesso.",
            resposta: respostaBD
        });
    }catch(error){
        return tratarErrosEsperados(res, error);
    }
});

router.delete('/deletar/:id', conectarBancoDados, async function(req, res, next) {
    try{
        // #swagger.tags = ['Livro']
        let idLivro = req.params.id;

        const checkLivro = await EsquemaLivro.findOne({ _id: idLivro});
        if(!checkLivro) {
            throw new Error("Livro não encontrado.");
        }

        const respostaBD = await EsquemaLivro.deleteOne({ _id: idLivro});

        res.status(200).json({
            status: "OK",
            statusMensagem: "Livro excluido com sucesso.",
            resposta: respostaBD
        });
    }catch(error){
        return tratarErrosEsperados(res, error);
    }
});

module.exports = router;