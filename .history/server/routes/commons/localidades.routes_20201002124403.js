const { Router } = require("express");
const {
    getLocalidades,
} = require("../controllers/common/localidades.controllers");
const router = Router();

router.get("/", getLocalidades);

module.exports = router;