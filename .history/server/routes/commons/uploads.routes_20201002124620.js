const { Router } = require("express");
const expFileUpload = require("express-fileupload");
const mdAutenticacion = require("../../config/middlewares/auth");

const {
    fileUpload,
    retornaImagen,
} = require("../controllers/common/upload.controllers");

const router = Router();

router.use(expFileUpload());

router.put("/:tipo/:id", [mdAutenticacion.verificaToken], fileUpload);

router.get("/:tipo/:foto", [mdAutenticacion.verificaToken], retornaImagen);

module.exports = router;