const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Usuario = require("../models/usuario");
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
    const isMatch = bcrypt.compareSync(body.password, usuarioDB.password);
    if (isMatch) {
      usuarioDB.lastLogin = Date.now();
      Usuario.save();
      res.status(200).json({
        ok: true,
        usuario: usuarioDB,
        token: token,
        id: usuarioDB._id,
      });
    }
    return res.status(400).json({
      ok: false,
      mensaje: "Credenciales incorrectas - password",
      errors: err,
    });
  });
});

module.exports = app;
