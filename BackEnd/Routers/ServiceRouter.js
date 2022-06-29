const express = require("express");
const serviceCtrl = require("../controllers/ServiceController");
const router = express.Router();

const {
  authorizeRoles,
  isAuthenticatedUser,
} = require("../middleware/auth.js");

const { addService, allServices, serviceDetails } = serviceCtrl;

// router.route("/send").get(test);
router.route("/service/add").post(addService);
router.route("/service/:id").get(serviceDetails);
router.route("/services").get(allServices);

module.exports = router;
