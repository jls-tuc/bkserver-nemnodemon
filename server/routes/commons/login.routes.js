const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Usuario = require("../../models/usuario");
<<<<<<< HEAD
const { getMenu } = require("../../../config/helpers/menu-front");
const app = express();

app.post("/", async (req, res) => {
  let body = req.body;
  //console.log(req.body);
  await Usuario.findOne({ documento: req.body.documento }, (err, usuarioDB) => {
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
    // actualizamos lastLogin!
    usuarioDB.lastLogin = Date.now();
    usuarioDB.save();
    const { role, picture, nombre, apellido, lastLogin, organismo } = usuarioDB;

    res.status(200).json({
      ok: true,
      usuario: { role, picture, nombre, apellido, lastLogin, organismo },
      token: token,
      id: usuarioDB._id,
      menu: getMenu(usuarioDB.role),
    });
    console.log(usuarioDB.documento, "\x1b[35mUsuario online\x1b[0m");
  });
});

app.get("/", async (req, res = response) => {
  //cconsole.log("id" ,req.body.id)
  const id = req.id;

  /* // Generar el TOKEN - JWT
<<<<<<< HEAD:server/routes/commons/login.routes.js
       const token = await generarJWT( id ); */
=======
     const token = await generarJWT( id ); */
>>>>>>> bf153e8855648d5cb0bac6a3e9b71f86bb57f261:.history/server/routes/commons/login.routes_20201002124610.js

  // Obtener el usuario por UID
  const usuario = await Usuario.findById(id);

  res.json({
    ok: true,
    usuario,
    // menu: getMenuFrontEnd( usuario.role )
  });
});

module.exports = app;
=======
const app = express();

app.post("/", async(req, res) => {
    let body = req.body;
    console.log(req.body)
    await Usuario.findOne({ documento: req.body.documento }, (err, usuarioDB) => {
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
        // actualizamos lastLogin!
        usuarioDB.lastLogin = Date.now();
        usuarioDB.save();
        const { role, picture, nombre, apellido, lastLogin, organismo } = usuarioDB;

        res.status(200).json({
            ok: true,
            usuario: { role, picture, nombre, apellido, lastLogin, organismo },
            token: token,
            id: usuarioDB._id,
        });
        console.log(usuarioDB.documento, "\x1b[35mUsuario online\x1b[0m");
    });
});

app.get("/", async(req, res = response) => {
    //cconsole.log("id" ,req.body.id)
    const id = req.id;

    /* // Generar el TOKEN - JWT
       const token = await generarJWT( id ); */

    // Obtener el usuario por UID
    const usuario = await Usuario.findById(id);

    res.json({
        ok: true,
        usuario,
        // menu: getMenuFrontEnd( usuario.role )
    });
});

module.exports = app;
>>>>>>> bf153e8855648d5cb0bac6a3e9b71f86bb57f261
