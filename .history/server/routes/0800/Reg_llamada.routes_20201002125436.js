const { Router } = require("express");
const {
    postForm,
    updateForm,
    deleteForm,
} = require("../../controllers/formcovid/reg_llamada.controllers");

const mdAutenticacion = require("../../../config/middlewares/auth");
const router = Router();



router.post("/", [mdAutenticacion.verificaToken], postForm);

router.post("/:id", [mdAutenticacion.verificaToken], updateForm);

router.delete("/:id", [mdAutenticacion.verificaToken], deleteForm);

module.exports = router;