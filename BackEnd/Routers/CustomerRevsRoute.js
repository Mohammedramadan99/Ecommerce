const express = require("express");
const customerRevCtr = require("../controllers/customerRevController");

const {
  authorizeRoles,
  isAuthenticatedUser,
} = require("../middleware/auth.js");

const {newRev,getAllCustomerRevs} = customerRevCtr

const customerRouter = express.Router();


customerRouter.route("/customerRev/new").post(isAuthenticatedUser, newRev);

customerRouter
  .route("/customerRevs")
  .get(getAllCustomerRevs);

module.exports = customerRouter;
