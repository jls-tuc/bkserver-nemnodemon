const { Router } = require("express");
const {
  postForm,
  updateForm,
  getRegistros,
  getOneReg,
  queryForm,
} = require("../../controllers/formcovid/reg_llamada.controllers");

const mdAutenticacion = require("../../../config/middlewares/auth");
const router = Router();

router.post("/", [mdAutenticacion.verificaToken], postForm);

router.put("/:id", [mdAutenticacion.verificaToken], updateForm);
router.get("/", [mdAutenticacion.verificaToken], getRegistros);
router.get("/doc", [mdAutenticacion.verificaToken], getOneReg);
router.post("/query", [mdAutenticacion.verificaToken], queryForm);

module.exports = router;
