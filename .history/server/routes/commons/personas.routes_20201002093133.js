const { Router } = require("express");
const mdAutenticacion = require("../../config/middlewares/auth");
const { getPersona } = require("../../controllers/common/persona.controllers.js");
const router = Router();


router.get("/:id", [mdAutenticacion.verificaToken], getPersona);


module.exports = router