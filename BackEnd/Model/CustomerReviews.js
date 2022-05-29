// * arr -> objs -> info(name,rating,img,...,....)
const mongoose = require('mongoose')

const CustomersRevSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter Your Name"],
        maxLength: [30, "Name cannot exceed 30 characters"],
        minLength: [2, "Name should have more than 4 characters"],
      },
    email: {
        type: String,
        required: [true, "Please Enter Your Email"],
    },
    images: [
        {
          public_id: {
            type: String,
            required: true,
          },
          url: {
            type: String,
            required: true,
          },
        },
      ],
    rating:{
        type: Number,
        require:true
    },
    revContent:{
        type:String,
        require:true
    },
    address:{
        type:String,
        require:true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

const CustomerRev = mongoose.model("customerRev",CustomersRevSchema);
module.exports = CustomerRev