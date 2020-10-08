const { Router } = require("express");
const { postForm, updateForm, getRegistros } = require("../../controllers/formcovid/reg_llamada.controllers");

const mdAutenticacion = require("../../../config/middlewares/auth");
const router = Router();



router.post("/", [mdAutenticacion.verificaToken], postForm);

router.put("/:id", [mdAutenticacion.verificaToken], updateForm);
router.get("/", [mdAutenticacion.verificaToken], getRegistros)




module.exports = router;