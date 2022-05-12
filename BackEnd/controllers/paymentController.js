const catchAsyncError = require("../middleware/catchAsyncError.js")

const stripe = require('stripe')('sk_test_51KU7PlKTQl5sdnSaj9lh55XX2WjLNayGLxYYP7cuEI4R0McQNQbzZZQ5DeJGbg1o1hzG2aiPBbGcqToWSjFpQPuI00njuZ613c')

exports.processPayment = catchAsyncError(async (req, res, next) => {
  const myPayment = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "usd",
    metadata: {
      company: "Ecommerce",
    },
  });

  res
    .status(200)
    .json({ success: true, client_secret: myPayment.client_secret });
});

exports.sendStripeApiKey = catchAsyncError(async (req, res, next) => {
  res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY });
});