const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Usuario = require("../models/usuario");
const { update } = require("../models/usuario");
const app = express();

app.post("/", async (req, res) => {
  let body = req.body;

  await Usuario.findOne({ documento: body.documento }, (err, usuarioDB) => {
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
    if (usuarioDB.active === false) {
      return res.status(400).json({
        ok: false,
        msg: "El usuario no esta activo, hable con el administrador",
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

    let token = jwt.sign({ usuario: usuarioDB }, process.env.TOKEN, {
      expiresIn: 14400,
    }); // 4 horas
    usuarioDB.lastLogin = Date.now();
    usuarioDB.save();

    // usuarioDB.password = ":)";
    res.status(200).json({
      ok: true,
      usuario: usuarioDB,
      token: token,
      id: usuarioDB._id,
    });
  });
});

module.exports = app;
