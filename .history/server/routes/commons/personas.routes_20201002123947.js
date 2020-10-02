const { Router } = require("express");
const mdAutenticacion = require("../../../config/middlewares/auth");
const { getPersona, postPersona, updatePersona } = require("../../controllers/common/persona.controllers.js");
const router = Router();


router.get("/", getPersona);
router.post("/", [mdAutenticacion.verificaToken], postPersona);
router.put("/:id", updatePersona);
//[mdAutenticacion.verificaToken],

module.exports = router