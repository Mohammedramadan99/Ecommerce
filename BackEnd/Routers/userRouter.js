const express = require("express");
const userCtrl = require("../controllers/userControler.js");
const {
  authorizeRoles,
  isAuthenticatedUser,
  resetAuth
} = require("../middleware/auth.js");
const userRouter = express.Router();

const {
  loginUser,
  registerUser,
  logout,
  getUserDetails,
  updatePassword,
  getAllUser,
  getSingleUser,
  updateProfile,
  deleteUser,
  updateUserRole,
  activate,
  forgot,
  reset
} = userCtrl;

userRouter.route("/register").post(registerUser);
userRouter.route("/activate").post(activate);

userRouter.route("/login").post(loginUser);
userRouter.route("/logout").get(logout);
userRouter.route("/me").get(isAuthenticatedUser, getUserDetails);
userRouter.route("/me/update").put(isAuthenticatedUser, updateProfile);

userRouter.route("/password/forgot").post(forgot);
userRouter.route("/password/reset").post(resetAuth,reset);
userRouter.route("/password/update").put(isAuthenticatedUser, updatePassword);

userRouter
  .route("/admin/users")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAllUser);
userRouter
  .route("/admin/user/:id")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getSingleUser)
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateUserRole)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUser);

module.exports = userRouter;
