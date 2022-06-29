const mg = require("mailgun-js");
const catchAsyncError = require("../middleware/catchAsyncError.js");
const Email = require("../Model/EmailModel");
const sendMail = require("../Utils/SendMail");

const SendMailController = {
  sendMsg: async (req, res, next) => {
    try {
      const { email, name, serviceType, message } = req.body;
      // sendMail.sendEmail(email, serviceType, message, name);

      const newMsg = new Email(req.body);
      await newMsg.save();
      res.status(200).json({ message: "message sended" });
    } catch (err) {
      res.status(404).json({
        message: err.message,
        newMsg,
      });
    }
  },
  getAllMsgs: async (req, res, next) => {
    try {
      // sendMail.sendEmail(email, serviceType, message, name);

      const msgs = await Email.find();
      res.status(200).json({
        success: true,
        messages: msgs,
      });
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  },
};
module.exports = SendMailController;
