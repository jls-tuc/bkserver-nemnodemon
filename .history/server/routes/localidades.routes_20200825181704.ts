const express = require("express");
const { getLocalidades } = require("../controllers/localidades.controllers");
const { Router } = require("express");
const router = Router();

router.get("/", getLocalidades);

module.exports = router;
