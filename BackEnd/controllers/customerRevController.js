const cloudinary = require("cloudinary")
const catchAsyncError = require("../middleware/catchAsyncError.js");
const CustomerRev = require("../Model/CustomerReviews")
const User = require('../Model/userModel')

const customerRevCtr = {
    newRev: catchAsyncError(async (req,res) => {
        // image 
        let images = [];

        if (typeof req.body.images === "string") {
            images.push(req.body.images);
        } else {
            images = req.body.images;
        }

        const imagesLinks = [];

        for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
            folder: "customersRevsImages",
        });
        imagesLinks&&imagesLinks.push({
            public_id: result.public_id,
            url: result.secure_url,
        });
        }
        req.body.images?req.body.images = imagesLinks:null
        req.body.user?req.body.user = req.user.id:null

        // const {name,email,address,avatar,rating,revContent} = req.body
        // const existEmail = await User.find({email})
        // if(existEmail) {
            
        // }
        // const customerRev = await CustomerRev.create(req.body);
        
        const customerRev = new CustomerRev(req.body);
        await customerRev.save();
        
        console.log('customerRev' + customerRev)
        res.status(201).json({
            success: true,
            customerRev,
          });
    }),
    
    getAllCustomerRevs: catchAsyncError(async (req, res, next) => {
        try {
            const revs = await CustomerRev.find();
            let revsLength = revs.length;
            res.status(200).json({
                success: true,
                revsLength,
                revs,
            });
        } catch (error) {
            res.status(404).json({
                success:false,
                message:error
            })
        }
    }),
}

module.exports = customerRevCtr