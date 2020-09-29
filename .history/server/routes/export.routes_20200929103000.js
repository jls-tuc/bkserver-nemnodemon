const { Router } = require("express");
const { getFormXls } = require("../controllers/export/excel.controllers");
const mdAuthenticacion = require("../../config/middlewares/auth");
const router = Router();

//router.get("/", [mdAuthenticacion], getFormXls);
router.get("/", [mdAuthenticacion], getFormXls);
module.exports = router;
