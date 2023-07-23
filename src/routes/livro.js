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

module.exports = router;