// 5:35:00
const express = require("express");
const product = require("./Routers/ProductRouter");
const userRouter = require("./Routers/userRouter");
const orderRouter = require("./Routers/orderRouter");
const customerRev = require("./Routers/CustomerRevsRoute");
const Service = require("./Routers/ServiceRouter");
const projects = require("./Routers/ProjectsRouter");
const PostRouter = require("./Routers/PostRoute");
const SendMail = require("./Routers/SendMailRouter");
const cookieParser = require("cookie-parser");
const errorMiddlerware = require("./middleware/error");
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");
const payment = require("./Routers/paymentRoute");
const dotenv = require("dotenv");

// config
dotenv.config({ path: "Backend/config/config.env" });

const app = express();
// ======= Big error <=> forgot to write the brackets of json  ========
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
// app.use(express.json());
app.use(cookieParser());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

app.use("/api/v1", product);
app.use("/api/v1", SendMail);
app.use("/api/v1", Service);
app.use("/api/v1", projects);
app.use("/api/v1", userRouter);
app.use("/api/v1", orderRouter);
app.use("/api/v1", payment);
app.use("/api/v1", customerRev);
app.use("/api/v1", PostRouter);
app.get("/api/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || "sb");
});

app.use(errorMiddlerware);

module.exports = app;
