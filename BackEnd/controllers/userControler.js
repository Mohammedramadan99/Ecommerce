const ErrorHander = require("../utils/errorHandler.js");
const catchAsyncError = require("../middleware/catchAsyncError.js");
const User = require("../Model/userModel.js");
const ErrorHandler = require("../utils/errorHandler.js");
const bcrypt = require("bcryptjs");
const getResetPasswordToken = require("../Model/userModel.js");
const sendToken = require("../Utils/jwtToken.js");
const sendEmail = require("../Utils/sendEmail.js");
const cloudinary = require("cloudinary");

const userCtrl = {
  registerUser: catchAsyncError(async (req, res, next) => { 
    // const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
    //   folder: "avatars",
    //   width: 150,
    //   crop: "scale",
    // });
    try {
      const { name, email, password, role } = req.body;

      const user = await User.findOne({ email });
      console.log(user);
      // FIRST => "check email" case email already found
      if (user) return res.status(400).json({ message: "the email already exists" });

      // SECOND => "check password" case password less than 6ch
      if (password.length < 6)
        return res
          .status(400)
          .json({ message: "password is at least 6 characters long" });

      // THIRD => make new user
      const newUser = await User.create({
        name,
        email,
        password,
        avatar: {
          // public_id:myCloud.public_id,
          // url: myCloud.secure_url,
          public_id: "s",
          url: "da",
        },
      })

      // FOURTH => with success case => create the token and pass the user to frontend
      sendToken(newUser, 201, res);

    } catch (err) {
      res.status(404).json({
        success: false,
        message: ``,
      });
    }
    
  }),
  loginUser: catchAsyncError(async (req, res, next) => {
    try {
      const { email, password } = req.body;
      // FIRST => check if user wrote the email and password
      if (!email || !password) {
        return next(new ErrorHandler("please enter email and password", 400));
      }

      // SECOND => check if email is in database & select the password
      const user = await User.findOne({ email }).select("+password"); // because password have select false. but i want it so i made (select +password ) to select it and transfare select true to false
      if (!user) return res.status(401).json({ message: "Invalid email." });

      // THIRD => compare password that user written with that in database
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(401).json({ message: "Incorrect password." });

      // FOURTH => sendToken it's doing the user Token & make the status case success response
      sendToken(user, 201, res);
      // user => for send user to the token ,201 => sutaus Code with success , res => response

      // ####$#### OLD WAY ####$####
      // const token = user.getJWTToken();
      // res.status(201).json({
      //     success:true,
      //     token,
      // })
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }),
  logout: catchAsyncError(async (req, res, next) => {
    
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });

    res.status(200).json({
      success: true,
      message: "Logged Out",
    });
  }),
  forgetPassword: catchAsyncError(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return next(new ErrorHandler("user not found", 404));

    const resetToken = getResetPasswordToken();

    await user.save({ validateBeforeSave: false });

    const resetPasswordUrl = `${req.protocol}://${req.get(
      "host"
    )}/api/v1/password/reset/${resetToken}`;

    const message = `your password reset token is :- \n\n ${resetPasswordUrl} \n\n if you haven't requested this email then, please ignore it`;
    try {
      await sendEmail({
        email: user.email,
        subject: `ecommerce password recovery`,
        message,
      });
      res.status(200).json({
        success: true,
        message: `email sent to ${user.email} successfully`,
      });
    } catch (err) {
      User.resetPasswordToken = undefined;
      User.resetPasswordExpire = undefined;
      await user.save({ validateBeforeSave: false });
      return next(new ErrorHandler(err.message, 500));
    }
  }),
  resetpassword: catchAsyncError(async (req, res, next) => {
    // creating token hash
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return next(
        new ErrorHander(
          "Reset Password Token is invalid or has been expired",
          400
        )
      );
    }

    if (req.body.password !== req.body.confirmPassword) {
      return next(new ErrorHander("Password does not password", 400));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sendToken(user, 200, res);
  }),
  // Get User Detail
  getUserDetails: catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user.id);

    res.status(200).json({
      success: true,
      user,
    });
  }),
  // update User password
  updatePassword: catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user.id).select("+password");

    const isMatch = await bcrypt.compare(req.body.oldPassword, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Old password is incorrect." });

    if (req.body.newPassword !== req.body.confirmPassword) {
      return next(new ErrorHander("password does not match", 400));
    }

    user.password = req.body.newPassword;

    await user.save();

    sendToken(user, 200, res);
  }),
  // update User profile
  updateProfile: catchAsyncError(async (req, res, next) => {
    try {
      const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role:req.body.role,
      };

      // if (req.body.avatar !== "") {
      //   const user = await User.findById(req.user.id);

      //   const imageId = user.avatar.public_id;

      //   await cloudinary.v2.uploader.destroy(imageId);
      //   // to edit profile image
      //   const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      //     folder: "avatars",
      //     width: 150,
      //     crop: "scale",
      //   });

      //   newUserData.avatar = {
      //     public_id: myCloud.public_id,
      //     url: myCloud.secure_url,
      //   };
      // }

      const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true, // without it - if user write name less than 4 characters , the name will accept - but with its ->  server will send error "name must be more than 4 character"
        useFindAndModify: false, // i don't know without it what will happen ?
      });

      res.status(200).json({
        success: true,
      });
      res.status(404).json({
        success: false,
        error,
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }),
  // Get all users(admin)
  getAllUser: catchAsyncError(async (req, res, next) => {
    const users = await User.find();

    res.status(200).json({
      success: true,
      users,
    });
  }),
  // Get single user (admin)
  getSingleUser: catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
      return next(
        new ErrorHander(`User does not exist with Id: ${req.params.id}`)
      );
    }

    res.status(200).json({
      success: true,
      user,
    });
  }),
  updateUserRole: catchAsyncError(async (req, res, next) => {
    const newUserData = {
      name: req.body.name,
      email: req.body.email,
      role: req.body.role,
    };

    await User.findByIdAndUpdate(req.params.id, newUserData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    res.status(200).json({
      success: true,
    });
  }),
  deleteUser: catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
      return next(
        new ErrorHander(`User does not exist with Id: ${req.params.id}`, 400)
      );
    }

    // const imageId = user.avatar.public_id;

    // await cloudinary.v2.uploader.destroy(imageId);

    await user.remove();

    res.status(200).json({
      success: true,
      message: "User Deleted Successfully",
    });
  }),
};
module.exports = userCtrl;