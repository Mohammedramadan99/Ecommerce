const express = require("express");
const SendMailController = require("../controllers/SendMailController");
const router = express.Router();

const {
  authorizeRoles,
  isAuthenticatedUser,
} = require("../middleware/auth.js");

const { sendMsg, getAllMsgs } = SendMailController;

// router.route("/send").get(test);
router.route("/sendMsg").post(sendMsg);
router.route("/messages").get(getAllMsgs);

module.exports = router;
