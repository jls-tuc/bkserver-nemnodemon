const { Router } = require("express");
const {
    getRegistro,
    getRegistroById,
    crearRegistro,
    updateRegistro,
    deleteRegistro,
} = require("../../controllers/acceso/registro.controllers");
const { check } = require("express-validator");
const { validarCampos } = require("../../../config/middlewares/validar-campos");
const mdAutenticacion = require("../../../config/middlewares/auth");
const router = Router();

router.get("/", [mdAutenticacion.verificaToken], getRegistro);

router.get("/:id", [mdAutenticacion.verificaToken], getRegistroById);

router.post(
    "/", [
        mdAutenticacion.verificaToken,
        check("estado", "El estado  es necesario").not().isEmpty(),
        check("tipo_registro", "El tipo de registro  es necesario").not().isEmpty(),
        check("temperatura", "La temperatura  es necesaria").not().isEmpty(),
        check("fechahora", "La fecha y hora necesaria para crear el regisro")
        .not()
        .isEmpty(),
        check("persona", "La persona id debe de ser válido").not().isEmpty(),
        check("usuario", "El usuario id debe de ser válido").not().isEmpty(),
        check("edificio", "El edificio id debe de ser válido").not().isEmpty(),
        validarCampos,
    ],
    crearRegistro
);

router.post(
    "/:id", [
        mdAutenticacion.verificaToken,
        check("estado", "El estado  es necesario").not().isEmpty(),
        check("tipo_registro", "El tipo de registro  es necesario").not().isEmpty(),
        check("temperatura", "La temperatura  es necesaria").not().isEmpty(),
        check("fechahora", "La fecha y hora necesaria para crear el regisro")
        .not()
        .isEmpty(),
        check("persona", "La persona id debe de ser válido").not().isEmpty(),
        check("usuario", "El usuario id debe de ser válido").not().isEmpty(),
        check("edificio", "El edificio id debe de ser válido").not().isEmpty(),
        validarCampos,
    ],
    updateRegistro
);

router.delete("/:id", [mdAutenticacion.verificaToken], deleteRegistro);

module.exports = router;