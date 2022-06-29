// * arr -> objs -> info(name,rating,img,...,....)
const mongoose = require("mongoose");

const SendMailSchema = mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  serviceType: {
    type: String,
  },
  message: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Email = mongoose.model("email", SendMailSchema);
module.exports = Email;
