const { Router } = require("express");
//const mdAutenticacion = require("../../config/middlewares/auth");
const { getPersona, postPersona } = require("../../controllers/common/persona.controllers.js");
const router = Router();


router.get("/", getPersona);
router.post("/", postPersona)
    //[mdAutenticacion.verificaToken],

module.exports = router