const jwt = require("jsonwebtoken");

exports.verificaToken = function(req, res, next) {
    let token = req.headers["authorization"];
    if (!token) {
        res.status(401).send({
            ok: false,
            message: "Toket inválido",
        });
    }

    token = token.replace("Bearer ", "");

    jwt.verify(token, process.env.Token, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                mensaje: "Token incorrecto",
                errors: err,
            });
        } else {
            req.usuario = decoded.usuario;
            next();
        }
    });
};