const express = require("express");
const productCtrl = require("../controllers/ProductController.js");
const {
  authorizeRoles,
  isAuthenticatedUser,
} = require("../middleware/auth.js");
const router = express.Router();

const {
  getAllProducts,
  filterProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  productDetails,
  createProductReview,
  getProductReviews,
  deleteReview,
  getAdminProducts,
} = productCtrl;

router.route("/products").get(getAllProducts);
router.route("/products/filter").get(filterProducts);

router
  .route("/product/new")
  .post(isAuthenticatedUser, authorizeRoles("admin"), createProduct);

router
  .route("/product/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct)
  .get(productDetails);

router.route("/admin/products").get(isAuthenticatedUser, getAdminProducts);
router.route("/review").put(isAuthenticatedUser, createProductReview);

router
  .route("/reviews")
  .get(getProductReviews)
  .delete(isAuthenticatedUser, deleteReview);

module.exports = router;
