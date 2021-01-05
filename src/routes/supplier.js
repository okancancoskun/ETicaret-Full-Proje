const { Router } = require("express");

const controllers = require("../controllers");

const middlewares = require("../middlewares");

const router = Router();

router.get("/add-product", middlewares.locals, middlewares.isSupplier, controllers.supplier.getAddProduct);
router.post("/add-product", middlewares.locals, middlewares.isSupplier, controllers.supplier.postAddProduct);

router.get("/siparisler", middlewares.locals, middlewares.isSupplier, controllers.supplier.getSupplierOrders);

router.get("/siparis-detay/:orderId", middlewares.locals, middlewares.isSupplier, controllers.supplier.getOrderDetail);

router.post("/siparis-detay", middlewares.locals, middlewares.isSupplier, controllers.supplier.postShipmentID);

module.exports = router;
