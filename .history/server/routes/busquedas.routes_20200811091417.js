const { getDocumentosColeccion, getTodo,dniGet  } = require("../controllers/busquedas.controllers");
const { check } = require('express-validator');
const { validarCampos } = require('../../config/middlewares/validar-campos');
const mdAutenticacion = require('../../config/middlewares/auth');
const { Router } = require('express');
const router = Router();




router.get('/:dni',[mdAutenticacion.verificaToken],dniGet);

router.get ('/:busqueda',[mdAutenticacion.verificaToken],getTodo)
router.get('/:tabla/:busqueda',[mdAutenticacion.verificaToken], getDocumentosColeccion);

module.exports = router;