const { Router } = require("express");

const controllers = require("../controllers");

const middlewares = require("../middlewares");

const router = Router();

router.get("/tedarikci-kayit", middlewares.locals, controllers.supplierAuth.getSupplierRegister);
router.post("/tedarikci-kayit", middlewares.locals, controllers.supplierAuth.postSupplierRegister);

router.get("/tedarikci-giris", middlewares.locals, controllers.supplierAuth.getSupplierLogin);
router.post("/tedarikci-giris", middlewares.locals, controllers.supplierAuth.postSupplierLogin);

module.exports = router;
