const { Router } = require("express");
const { postForm, updateForm } = require("../../controllers/formcovid/reg_llamada.controllers");

const mdAutenticacion = require("../../../config/middlewares/auth");
const router = Router();



router.post("/", [mdAutenticacion.verificaToken], postForm);

router.post("/:id", [mdAutenticacion.verificaToken], updateForm);




module.exports = router;