// Create Token and saving in cookie
const User = require('../Model/userModel')
const sendToken = (user, statusCode, res) => {

    const token = user.getJWTToken();
    // options for cookie
    const options = {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    };
  
    res.status(statusCode).cookie("token",token, options).json({
      success: true,
      userInfo:{
        user,
        token,
      }
    });
  };
  
module.exports=sendToken;