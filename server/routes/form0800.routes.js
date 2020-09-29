const { Router } = require("express");
const {
  getForm,
  getFormById,
  postForm,
  updateForm,
  deleteForm,
} = require("../controllers/formcovid/fc0800.controllers");

const mdAutenticacion = require("../../config/middlewares/auth");
const router = Router();

router.get("/", [mdAutenticacion.verificaToken], getForm);

router.get("/:id", [mdAutenticacion.verificaToken], getFormById);

router.post("/", [mdAutenticacion.verificaToken], postForm);

router.post("/:id", [mdAutenticacion.verificaToken], updateForm);

router.delete("/:id", [mdAutenticacion.verificaToken], deleteForm);

module.exports = router;
