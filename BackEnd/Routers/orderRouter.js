const express = require("express");
const orderCtrl = require("../controllers/orderController.js");
const {
  authorizeRoles,
  isAuthenticatedUser,
} = require("../middleware/auth.js");
const {
  deleteOrder,
  getAllOrders,
  getSingleOrder,
  myOrders,
  newOrder,
  updateOrder,
} = orderCtrl;
const orderRouter = express.Router();

orderRouter.route("/order/new").post(isAuthenticatedUser, newOrder);

orderRouter.route("/orders/me").get(isAuthenticatedUser, myOrders);

orderRouter
  .route("/order/:id")
  .get(isAuthenticatedUser, getSingleOrder);

orderRouter
  .route("/admin/orders")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAllOrders);

orderRouter
  .route("/admin/order/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateOrder)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteOrder);

module.exports = orderRouter;
