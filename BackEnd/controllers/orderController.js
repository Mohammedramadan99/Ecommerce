const Order = require("../Model/orderModel.js");
const Product = require("../Model/ProductsModel.js");
const ErrorHander = require("../Utils/errorHandler.js");
const catchAsyncError = require("../middleware/catchAsyncError.js");

// Create new Order
const orderCtrl = {
  newOrder: catchAsyncError(async (req, res, next) => {
    // first -> recieve the data from request
    const {
      shippingInfo,
      orderItems,
      paymentInfo,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body;

    //  second -> create the order
    const order = await Order.create({
      shippingInfo,
      orderItems,
      paymentInfo,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      paidAt: Date.now(),
      user: req.user._id,
    });
    // third -> send the order
    res.status(201).json({
      success: true,
      order,
    });
  }),

  // get Single Order
  getSingleOrder: catchAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate(
      // to spesific some info to take
      "user", // to show only that what you want from the user info
      "name email" // i want to show just name and email
    );

    if (!order) {
      return next(new ErrorHander("Order not found with this Id", 404));
    }

    res.status(200).json({
      success: true,
      order,
    });
    res.status(404).json({
      success: false,
      message:"no order matches this id",
    });
  }),

  // get logged in user  Orders
  myOrders: catchAsyncError(async (req, res, next) => {
    const orders = await Order.find({ user: req.user._id }); // find that have user(id) = req.user._id

    res.status(200).json({
      success: true,
      orders,
    });
  }),

  // get all Orders -- Admin
  getAllOrders: catchAsyncError(async (req, res, next) => {
    const orders = await Order.find();

    let ordersLength = orders.length;
    let totalAmount = 0;

    orders.forEach((order) => {
      totalAmount += order.totalPrice;
    });

    res.status(200).json({
      success: true,
      totalAmount,
      ordersLength,
      orders,
    });
  }),


  // update Order Status -- Admin
  updateOrder: catchAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id);
    console.log(order.orderStatus)
    console.log(req.body)

    if (!order) {
      return next(new ErrorHander("Order not found with this Id", 404));
    }

    if (order.orderStatus === "Delivered") {
      // case order status is already Delivered
      return next(
        new ErrorHander("You have already delivered this order", 400)
      );
    }

    // case user shipped the order
    if (req.body.status === "Shipped") {
      order.orderItems.forEach(async (o) => {
        await updateStock(o.product, o.quantity);
      });
    }
    order.orderStatus = req.body.status; // status that user choosed

    // case user Delivered the order -> add deliveredAt for show delivery's Date
    if (req.body.status === "Delivered") {
      order.deliveredAt = Date.now();
    }

    await order.save({ validateBeforeSave: false });
    console.log(order.orderStatus)
    res.status(200).json({
      success: true,
      order
    });
  }),


  // delete Order -- Admin
  deleteOrder: catchAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return next(new ErrorHander("Order not found with this Id", 404));
    }

    await order.remove();

    res.status(200).json({
      success: true,
    });
  }),
};

// to update the stock of the order while updating the order -> existed in updateOrder
async function updateStock (id, quantity) {
  const product = await Product.findById(id);

  // عشان ننقص من الكمية الموجودة من المنتج - الكمية اللي طلبها المستخدم = الكمية البياقية من المنتج
  product.Stock -= quantity;

  await product.save({ validateBeforeSave: false });
}
module.exports = orderCtrl;
