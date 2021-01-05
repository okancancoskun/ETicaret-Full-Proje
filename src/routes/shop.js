const { Router, query } = require("express");

const controllers = require("../controllers");

const middlewares = require("../middlewares");

const router = Router();

router.get("/", middlewares.locals, controllers.shop.getIndex);

router.get("/urun-detay/:categoryname", query(), middlewares.locals, controllers.shop.getProductDetail);

router.get("/orders", middlewares.locals, middlewares.isAuth, controllers.shop.getOrders);

router.post("/create-order", middlewares.locals, middlewares.isAuth, controllers.shop.postOrders);

router.get("/siparis-detay/:orderId", middlewares.locals, middlewares.isAuth, controllers.shop.getOrderDetail);
router.get("/kategoriler/:slug", middlewares.locals, controllers.shop.getProductsByCategory);

router.post("/create-comment", middlewares.locals, middlewares.isAuth, controllers.shop.postComment);

router.get("/search", middlewares.locals, controllers.shop.searchData);
module.exports = router;
