function routes(app) {
    app.use('/livro', require('./routes/livro.js'));
    return;
}

module.exports = routes;