const { Router } = require("express");

const controllers = require("../controllers");

const middlewares = require("../middlewares");

const router = Router();

router.get("/", middlewares.locals, middlewares.isAuth, controllers.user.getUserProfile);
router.post("/", middlewares.locals, middlewares.isAuth, controllers.user.updateUserProfile);

module.exports = router;
