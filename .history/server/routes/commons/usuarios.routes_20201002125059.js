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

router.get("/", [mdAutenticacion.verificaToken], getUsuarios);
router.post("/", crearUsuario);
router.put("/:id", [mdAutenticacion.verificaToken], updateUsuarioByID);
router.get("/:id", [mdAutenticacion.verificaToken], getUsuarioByID);
router.delete("/:id", [mdAutenticacion.verificaToken], delUsuario);

module.exports = router;