const {
    getDocumentosColeccion,
    getTodo,
    dniGet,
    form
} = require("../../controllers/common/busquedas.controllers");

const mdAutenticacion = require("../../../config/middlewares/auth");
const { Router } = require("express");
const router = Router();

//router.get("/:dni", [mdAutenticacion.verificaToken], dniGet);
router.get("/formulario/:dni", [mdAutenticacion.verificaToken], form);
router.get("/:busqueda", [mdAutenticacion.verificaToken], getTodo);
//router.get("/:tabla/:busqueda", [mdAutenticacion.verificaToken],getDocumentosColeccion);

module.exports = router;