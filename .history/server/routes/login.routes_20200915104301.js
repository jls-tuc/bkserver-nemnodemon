const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Usuario = require("../models/usuario");
const app = express();

app.post("/", (req, res) => {
    let body = req.body;
    console.log(body);
    Usuario.findOne({ documento: body.documento }, (err, usuarioDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: "Error al buscar usuario",
                errors: err,
            });
        }

        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                mensaje: "Credenciales incorrectas - documento",
                errors: err,
            });
        }

        if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
            return res.status(400).json({
                ok: false,
                mensaje: "Credenciales incorrectas - password",
                errors: err,
            });
        }

        // Crear un token!!!
        usuarioDB.password = ":)";
        let token = jwt.sign({ usuario: usuarioDB }, process.env.TOKEN, {
            expiresIn: 14400,
        }); // 4 horas

        res.status(200).json({
            ok: true,
            usuario: usuarioDB,
            token: token,
            id: usuarioDB._id,
        });
    });
});

module.exports = app;