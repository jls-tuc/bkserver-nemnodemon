const {
    getAcceso,
    getAccesoById,
    crearAcceso,
    modificarAcceso,
    borrarAcceso,
} = require("../../controllers/acceso/acceso.controllers");
const { check } = require("express-validator");
const { validarCampos } = require("../../../config/middlewares/validar-campos");
const mdAutenticacion = require("../../../config/middlewares/auth");
const { Router } = require("express");
const router = Router();

router.get("/", getAcceso);
router.get("/:id", getAccesoById);
router.post(
    "/", [
        mdAutenticacion.verificaToken,
        check("nombre", "El nombre del acceso es necesario").not().isEmpty(),
        check("direccion", "La direccion es necesaria").not().isEmpty(),
        check("usuario", "El usuario id debe de ser válido").not().isEAN(),
        validarCampos,
    ],
    crearAcceso
);
router.put(
    "/:id", [
        mdAutenticacion.verificaToken,
        check("nombre", "El nombre del acceso es necesario").not().isEmpty(),
        check("direccion", "La direccion es necesaria").not().isEmpty(),
        check("usuario", "El usuario id debe de ser válido").not().isEAN(),
        validarCampos,
    ],
    modificarAcceso
);

router.delete("/:id", [mdAutenticacion.verificaToken], borrarAcceso);

module.exports = router;