const jwt = require('jsonwebtoken');

const { Token } = require('../util');


exports.verificaToken = function(req, res, next) {

    let token = req.query.token;

    jwt.verify(token, Token, (err, decoded) => {

        if (err) {
            return res.status(401).json({
                ok: false,
                mensaje: 'Token incorrecto',
                errors: err
            });
        }

        req.usuario = decoded.usuario;

        next();


    });

}