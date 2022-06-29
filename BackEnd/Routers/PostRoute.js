const express = require("express");
const {
  createPost,
  getPost,
  getAllPosts,
  deletePost,
  updataPost,
  deleteAllPosts,
} = require("../controllers/PostController");
const router = express.Router();

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

router
  .route("/blog/new")
  .post(isAuthenticatedUser, authorizeRoles("admin"), createPost);

router
  .route("/blog/:id")
  .get(isAuthenticatedUser, getPost)
  .put(isAuthenticatedUser, authorizeRoles("admin"), updataPost)
  .delete(isAuthenticatedUser, deletePost);

router
  .route("/blog")
  .get(getAllPosts)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteAllPosts);

module.exports = router;
