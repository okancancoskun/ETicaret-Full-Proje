const { Router, query } = require("express");

const controllers = require("../controllers");

const middlewares = require("../middlewares");

const router = Router();

router.get("/login", middlewares.locals, controllers.account.getLogin);
router.post("/login", middlewares.locals, controllers.account.postLogin);

router.get("/register", middlewares.locals, controllers.account.getRegister);
router.post("/register", middlewares.locals, controllers.account.postRegister);

module.exports = router;
