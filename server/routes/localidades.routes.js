const { Router } = require("express");
<<<<<<< HEAD
const {
    getLocalidades,
} = require("../controllers/common/localidades.controllers");
=======
const { getLocalidades } = require("../controllers/localidades.controllers");
>>>>>>> eae98e95944dff4123f47ccfa9462a6d150c1c97
const router = Router();

router.get("/", getLocalidades);

<<<<<<< HEAD
module.exports = router;
=======
module.exports = router;
>>>>>>> eae98e95944dff4123f47ccfa9462a6d150c1c97
