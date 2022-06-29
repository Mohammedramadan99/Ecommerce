// * arr -> objs -> info(name,rating,img,...,....)
const mongoose = require("mongoose");

const ServiceSchema = mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  Type: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
  features: {
    type: Array,
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Service = mongoose.model("service", ServiceSchema);
module.exports = Service;
