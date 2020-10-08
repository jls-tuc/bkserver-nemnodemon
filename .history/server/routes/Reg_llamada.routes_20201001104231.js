const { Router } = require("express");
const {
  getForm,
  getFormById,
  postForm,
  updateForm,
  deleteForm,
} = require("../controllers/formcovid/llamada.controllers");

const mdAutenticacion = require("../../config/middlewares/auth");
const router = Router();



router.post("/", [mdAutenticacion.verificaToken], postForm);

router.post("/:id", [mdAutenticacion.verificaToken], updateForm);

router.delete("/:id", [mdAutenticacion.verificaToken], deleteForm);

module.exports = router;