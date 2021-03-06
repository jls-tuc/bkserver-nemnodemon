const { Router } = require("express");
const { postForm, updateForm } = require("../../controllers/formcovid/reg_llamada.controllers");

const mdAutenticacion = require("../../../config/middlewares/auth");
const router = Router();



router.post("/", postForm);

router.post("/:id", updateForm);




module.exports = router;