const { Router } = require("express");
const { getFormXls } = require("../controllers/export/excel.controllers");
const mdAuthenticacion = require("../../config/middlewares/auth");
const router = express();

module.exports = router;
