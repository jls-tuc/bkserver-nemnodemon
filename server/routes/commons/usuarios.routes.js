const { Router } = require("express");
const mdAutenticacion = require("../../../config/middlewares/auth");
const {
  crearUsuario,
  updateUsuarioByID,
  getUsuarios,
  getUsuarioByID,
  delUsuario,
} = require("../../controllers/common/usuario.controllers");
const router = Router();

//Exporto el modelo (tabla)

router.get(
  "/",
  [mdAutenticacion.verificaToken, mdAutenticacion.verificaRol],
  getUsuarios
);
router.post(
  "/",
  [mdAutenticacion.verificaToken, mdAutenticacion.verificaRol],
  crearUsuario
);
router.put(
  "/:id",
  [mdAutenticacion.verificaToken, mdAutenticacion.verificaRol],
  updateUsuarioByID
);
router.get(
  "/:id",
  [mdAutenticacion.verificaToken, mdAutenticacion.verificaRol],
  getUsuarioByID
);
router.delete(
  "/:id",
  [mdAutenticacion.verificaToken, mdAutenticacion.verificaRol],
  delUsuario
);

module.exports = router;
