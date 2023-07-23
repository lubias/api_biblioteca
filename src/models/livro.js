const mongoose = require('mongoose');

const esquema = new mongoose.Schema(
    {
        titulo: {
            type: String,
            required: 'é obrigatório',
        },
        paginas: {
            type: Number,
            required: 'é obrigatório',
        },
        isbn: {
            type: String,
            required: 'é obrigatório',
        },
        editora: {
            type: String,
            required: 'é obrigatório',
        },
    },
    {
        timestamps: true
    }
);

const EsquemaLivro = mongoose.models.Livro || mongoose.model('Livro', esquema);
module.exports = EsquemaLivro;