const { Router } = require("express");

const controllers = require("../controllers");

const middlewares = require("../middlewares");

const router = Router();

router.get("/urun-onay", middlewares.locals, controllers.admin.getConfirmProducts);
router.post("/urun-onay", middlewares.locals, controllers.admin.postConfirmProducts);

router.get("/tedarikci-onay", middlewares.locals, controllers.admin.getConfirmSupplier);
router.post("/tedarikci-onay", middlewares.locals, controllers.admin.postConfirmSupplier);

router.get("/kategori-ekle", middlewares.locals, controllers.admin.getAddCategory);
router.post("/kategori-ekle", middlewares.locals, controllers.admin.postAddCategory);

module.exports = router;
