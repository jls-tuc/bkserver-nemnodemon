const jwt = require("jsonwebtoken");
const Request = require("express");
const Usuario = require("../../server/models/usuario");

exports.verificaToken = function (req, res, next) {
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
exports.verificaRol = async (req, res, next) => {
  const id = req.usuario._id;
  console.log(id);
  try {
    const usuario = await Usuario.findById(id);

    if (!usuario) {
      return res.status(400).json({
        ok: false,
        msg: "No existe el usuario",
      });
    } else if (usuario.role !== "SYSTEM_ROLE") {
      return res.status(400).json({
        ok: false,
        msg: "No tiene permisos",
      });
    }
    next();
  } catch (error) {
    console.log("VerificaRol", error),
      res.status(500).json({
        ok: false,
        msg: "MMMMM algo paso!!!",
      });
  }
};
