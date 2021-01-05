const { Router } = require("express");

const controllers = require("../controllers");

const middlewares = require("../middlewares");

const router = Router();

router.get("/", middlewares.locals, middlewares.isAuth, controllers.cart.getCart);
router.post("/", middlewares.locals, middlewares.isAuth, controllers.cart.postCart);

router.get("/payment", middlewares.locals, middlewares.isAuth, controllers.cart.getPayment);

module.exports = router;
