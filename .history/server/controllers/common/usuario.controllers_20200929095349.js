const { Request, Response } = require("express");
const bcrypt = require("bcryptjs");
const Usuario = require("../../models/usuario");

const crearUsuario = async (req, res = Response) => {
  if (!req.body.documento) {
    console.log("Body", req.body);
    return res.status(400).json({ msg: "Debes completar el formulario" });
  } else {
    let body = req.body;
    let usuario = new Usuario({
      nombre: body.nombre,
      apellido: body.apellido,
      documento: body.documento,
      password: bcrypt.hashSync(body.password, 10),
      organismo: body.organismo,
      interno: body.interno,
      box: body.box,
    });
    usuario.save((err, usuarioGuardado) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          mensaje: "Error al crear usuario",
          errors: err,
        });
      }
      res.status(201).json({
        ok: true,
        usuario: usuarioGuardado,
        usuariotoken: req.usuario,
      });
    });
  }
};

const updateUsuarioByID = async (req, res = Response) => {
  const usuarioDB = req.session.user;

  if (!usuarioDB) {
    return res.status(404).json({
      ok: false,
      msg: "No existe un usuario por ese id",
    });
  }

  // Actualizaciones
  const { password, ...campos } = req.body;

  if (usuarioDB.documento !== documento) {
    const existeDoc = await Usuario.findOne({ documento });
    if (existeDoc) {
      return res.status(400).json({
        ok: false,
        msg: "Ya existe un usuario con ese documento",
      });
    }
  }

  const usuarioActualizado = await Usuario.findByIdAndUpdate(
    usuarioDB._id,
    campos,
    { new: true }
  );

  res.json({
    ok: true,
    usuario: usuarioActualizado,
  });
};

const getUsuarios = async (req, res = Response) => {
  const usuarios = await Usuario.find();
  return res.status(200).json({
    ok: true,
    usuarios,
  });
};

const getUsuarioByID = async (req, res = Response) => {
  const id = req.params.id;
  const usuario = await Usuario.findById(id);
  return res.json({
    ok: true,
    usuario,
  });
};

const delUsuario = async (req, res = Response) => {
  const id = req.params.id;
  await Usuario.findByIdAndDelete(id);
  return res.json({
    ok: true,
    msg: "El usuario se elimino correctamente",
  });
};

module.exports = {
  crearUsuario,
  updateUsuarioByID,
  getUsuarios,
  getUsuarioByID,
  delUsuario,
};
