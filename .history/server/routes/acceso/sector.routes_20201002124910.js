const {
    getSector,
    getSectorById,
    crearSector,
    modificarSector,
    borrarSector,
} = require("../../controllers/acceso/sector.controllers");
const { check } = require("express-validator");
const { validarCampos } = require("../../../config/middlewares/validar-campos");
const mdAutenticacion = require("../../../config/middlewares/auth");
const { Router } = require("express");
const router = Router();

router.get("/", getSector);
router.get("/:id", getSectorById);
router.post(
    "/", [
        mdAutenticacion.verificaToken,
        check("nombre", "El nombre del acceso es necesario").not().isEmpty(),
        //check('capacidad', 'La capacidad es necesaria').not().isEmpty(),
        //check('piso', 'La capacidad es necesaria').not().isEmpty(),
        check("usuario", "El usuario id debe de ser válido").not().isEAN(),
        validarCampos,
    ],
    crearSector
);
router.put(
    "/:id", [
        mdAutenticacion.verificaToken,
        check("nombre", "El nombre del acceso es necesario").not().isEmpty(),
        check("usuario", "El usuario id debe de ser válido").not().isEAN(),
        validarCampos,
    ],
    modificarSector
);

router.delete("/:id", [mdAutenticacion.verificaToken], borrarSector);

module.exports = router;