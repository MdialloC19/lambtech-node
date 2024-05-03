import { Router } from "express";
import jwtMiddleware from "../middlewares/jwt.middleware.js";
import costumerController from "../controllers/app/costumer.controller.js";
import partnerController from "../controllers/app/partner.controller.js";
import delivererController from "../controllers/app/deliverer.controller.js";
import orderController from "../controllers/app/order.controller.js";
import productController from "../controllers/app/product.controller.js";
import notificationController from "../controllers/app/notification.controller.js";
import messageController from "../controllers/app/message.controller.js";



const router = Router();

router.get("/", (req, res) => {
    res.json({ message: "Welcome to the application." });
});

/*
 * Costumers routes
 */
router.get("/costumers/welcome", jwtMiddleware.requireAnyToken,(req, res) => {
    res.json({ message: "Welcome to the application." });
});

router.get(
    "/costumers",
    jwtMiddleware.requireAdminToken,
    jwtMiddleware.checkAuthenticity,
    costumerController.findAll
);
router.get(
    "/costumers/:id",
    jwtMiddleware.requireCostumerOrAdminToken,
    jwtMiddleware.checkIdentity,
    jwtMiddleware.checkAuthenticity,
    costumerController.findById
);
router.get(
    "/costumers/:id/profile",
    jwtMiddleware.requireAnyToken,
    jwtMiddleware.checkAuthenticity,
    costumerController.getProfile
);
router.get(
    "/costumers/:id/orders",
    jwtMiddleware.requireCostumerOrAdminToken,
    jwtMiddleware.checkAuthenticity,
    costumerController.getOrders
);

router.post(
    "/costumers/:id/register",
    jwtMiddleware.requireAnonymousToken,
    //jwtMiddleware.checkAuthenticity,
    costumerController.register
);

router.put(
    "/costumers/:id",
    jwtMiddleware.requireCostumerToken,
    jwtMiddleware.checkAuthenticity,
    costumerController.update
);
router.put(
    "/costumers/:id/password",
    jwtMiddleware.requireCostumerToken,
    jwtMiddleware.checkAuthenticity,
    costumerController.updatePassword
);

router.delete(
    "/costumers/:id",
    jwtMiddleware.requireCostumerOrAdminToken,
    jwtMiddleware.checkAuthenticity,
    costumerController.remove
);

/*
 * Partners routes
 */
router.get(
    "/partners",
    jwtMiddleware.requireAdminToken,
    jwtMiddleware.checkAuthenticity,
    partnerController.findAll
);
router.get(
    "/partners/:id",
    jwtMiddleware.requireAdminOrPartnerToken,
    jwtMiddleware.checkAuthenticity,
    partnerController.findById
);
router.get(
    "/partners/:id/profile",
    jwtMiddleware.requireAnyToken,
    jwtMiddleware.checkAuthenticity,
    partnerController.getProfile
);
router.get(
    "/partners/:id/deliverers",
    jwtMiddleware.requireAdminOrPartnerToken,
    jwtMiddleware.checkAuthenticity,
    partnerController.getDeliverers
);
router.get(
    "/partners/:id/orders",
    jwtMiddleware.requireAdminOrPartnerToken,
    jwtMiddleware.checkAuthenticity,
    partnerController.getOrders
);

router.post(
    "/partners/:id/register",
    jwtMiddleware.requireAnonymousToken,
    jwtMiddleware.checkAuthenticity,
    partnerController.register
);

router.put(
    "/partners/:id",
    jwtMiddleware.requirePartnerToken,
    jwtMiddleware.checkAuthenticity,
    partnerController.update
);
router.put(
    "/partners/:id/password",
    jwtMiddleware.requirePartnerToken,
    jwtMiddleware.checkAuthenticity,
    partnerController.updatePassword
);

router.delete(
    "/partners/:id",
    jwtMiddleware.requireAdminOrPartnerToken,
    jwtMiddleware.checkAuthenticity,
    partnerController.remove
);


/*
 * Deliverers routes
 */
router.get("/deliverers/welcome", jwtMiddleware.requireDelivererToken,(req, res) => {
    res.json({ message: "Welcome to the application." });
});

router.get(
    "/deliverers",
    jwtMiddleware.requireAdminToken,
    jwtMiddleware.checkAuthenticity,
    delivererController.findAll
);
router.get(
    "/deliverers/:id",
    jwtMiddleware.requireAdminOrDelivererToken,
    jwtMiddleware.checkAuthenticity,
    delivererController.findById
);
router.get(
    "/deliverers/:id/profile",
    jwtMiddleware.requireAnyToken,
    jwtMiddleware.checkAuthenticity,
    delivererController.getProfile
);
router.get(
    "/deliverers/:id/orders",
    jwtMiddleware.requireAdminOrDelivererToken,
    jwtMiddleware.checkAuthenticity,
    delivererController.getOrders
);

router.post(
    "/deliverers/:id/register",
    jwtMiddleware.requireAnonymousToken,
    //jwtMiddleware.checkAuthenticity,
    delivererController.register
);

router.put(
    "/deliverers/:id",
    jwtMiddleware.requireDelivererToken,
    jwtMiddleware.checkAuthenticity,
    delivererController.update
);
router.put(
    "/deliverers/:id/password",
    jwtMiddleware.requireDelivererToken,
    jwtMiddleware.checkAuthenticity,
    delivererController.updatePassword
);

router.delete(
    "/deliverers/:id",
    jwtMiddleware.requireAdminOrDelivererToken,
    jwtMiddleware.checkAuthenticity,
    delivererController.remove
);


/*
 * Orders routes
 */
router.get(
    "/orders",
    //jwtMiddleware.requireAdminToken,
    //jwtMiddleware.checkAuthenticity,
    orderController.findAll
);
router.get(
    "/orders/:id",
    //jwtMiddleware.requireAdminToken,
    //jwtMiddleware.checkAuthenticity,
    orderController.findById
);
router.get(
    "/orders/:id/details",
    jwtMiddleware.requireAnyToken,
    jwtMiddleware.checkAuthenticity,
    orderController.getDetails
);

router.post(
    "/orders",
    jwtMiddleware.requireCostumerToken,
    //jwtMiddleware.checkAuthenticity,
    orderController.create
);

router.put(
    "/orders/:id",
    jwtMiddleware.requireAdminOrDelivererToken,
    jwtMiddleware.checkAuthenticity,
    orderController.update
);
router.put(
    "/orders/:id/status",
    jwtMiddleware.requireAdminOrDelivererToken,
    jwtMiddleware.checkAuthenticity,
    orderController.updateStatus
);

router.delete(
    "/orders/:id",
    jwtMiddleware.requireAdminToken,
    jwtMiddleware.checkAuthenticity,
    orderController.remove
);

/*
 * Products routes
 */
router.get(
    "/products",
    jwtMiddleware.requireAdminToken,
    jwtMiddleware.checkAuthenticity,
    productController.findAll
);
router.get(
    "/products/:id",
    jwtMiddleware.requireAdminToken,
    jwtMiddleware.checkAuthenticity,
    productController.findById
);
router.get(
    "/products/:id/details",
    jwtMiddleware.requireAnyToken,
    jwtMiddleware.checkAuthenticity,
    productController.getDetails
);

router.post(
    "/products",
    jwtMiddleware.requireAdminToken,
    jwtMiddleware.checkAuthenticity,
    productController.create
);

router.put(
    "/products/:id",
    jwtMiddleware.requireAdminToken,
    jwtMiddleware.checkAuthenticity,
    productController.update
);
router.put(
    "/products/:id/stock",
    jwtMiddleware.requireAdminToken,
    jwtMiddleware.checkAuthenticity,
    productController.updateStock
);

router.delete(
    "/products/:id",
    jwtMiddleware.requireAdminToken,
    jwtMiddleware.checkAuthenticity,
    productController.remove
);

/*
 * Notifications routes
 */
router.get(
    "/notifications",
    jwtMiddleware.requireAdminToken,
    jwtMiddleware.checkAuthenticity,
    notificationController.findAll
);
router.get(
    "/notifications/:id",
    jwtMiddleware.requireAdminToken,
    jwtMiddleware.checkAuthenticity,
    notificationController.findById
);
router.get(
    "/notifications/:id/details",
    jwtMiddleware.requireAnyToken,
    jwtMiddleware.checkAuthenticity,
    notificationController.getDetails
);

router.post(
    "/notifications",
    jwtMiddleware.requireAdminToken,
    jwtMiddleware.checkAuthenticity,
    notificationController.create
);

router.put(
    "/notifications/:id/status",
    jwtMiddleware.requireAnyToken,
    jwtMiddleware.checkAuthenticity,
    notificationController.updateStatus
);

router.delete(
    "/notifications/:id",
    jwtMiddleware.requireAnyToken,
    jwtMiddleware.checkAuthenticity,
    notificationController.remove
);

/*
 * Messages routes
 */
router.get(
    "/messages",
    jwtMiddleware.requireAdminToken,
    jwtMiddleware.checkAuthenticity,
    messageController.findAll
);
router.get(
    "/messages/:id",
    jwtMiddleware.requireAdminToken,
    jwtMiddleware.checkAuthenticity,
    messageController.findById
);
router.get(
    "/messages/:id/details",
    jwtMiddleware.requireAnyToken,
    jwtMiddleware.checkAuthenticity,
    messageController.getDetails
);

router.post(
    "/messages",
    jwtMiddleware.requireAnyToken,
    jwtMiddleware.checkAuthenticity,
    messageController.create
);

router.put(
    "/messages/:id/status",
    jwtMiddleware.requireAnyToken,
    jwtMiddleware.checkAuthenticity,
    messageController.updateStatus
);

router.delete(
    "/messages/:id",
    jwtMiddleware.requireAnyToken,
    jwtMiddleware.checkAuthenticity,
    messageController.remove
);

export default router;