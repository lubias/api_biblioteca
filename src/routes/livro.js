const express = require('express');
const router = express.Router();
const conectarBancoDados = require('../middlewares/conectarBD');

router.get('/', conectarBancoDados, function(req, res, next) {
    res.send('respond with a resource 50.');
});

module.exports = router;