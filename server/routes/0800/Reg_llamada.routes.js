const { Router } = require("express");
<<<<<<< HEAD
const {
  postForm,
  updateForm,
  getRegistros,
  getOneReg,
} = require("../../controllers/formcovid/reg_llamada.controllers");
=======
const { postForm, updateForm, getRegistros } = require("../../controllers/formcovid/reg_llamada.controllers");
>>>>>>> bf153e8855648d5cb0bac6a3e9b71f86bb57f261

const mdAutenticacion = require("../../../config/middlewares/auth");
const router = Router();

<<<<<<< HEAD
router.post("/", [mdAutenticacion.verificaToken], postForm);

router.put("/:id", [mdAutenticacion.verificaToken], updateForm);
router.get("/", [mdAutenticacion.verificaToken], getRegistros);
router.get("/doc", [mdAutenticacion.verificaToken], getOneReg);

module.exports = router;
=======


router.post("/", [mdAutenticacion.verificaToken], postForm);

router.put("/:id", [mdAutenticacion.verificaToken], updateForm);
router.get("/", [mdAutenticacion.verificaToken], getRegistros)




module.exports = router;
>>>>>>> bf153e8855648d5cb0bac6a3e9b71f86bb57f261
