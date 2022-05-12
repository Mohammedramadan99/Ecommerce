// !orders,orderDetails,userOption,Dashboard,sidebar

// stopped at 12:03:00m
// make sizes of products with postman  
import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import "./Sass/Style.css";
import "./Bootstrap/BootStrap/bootstrap.min.css";
import HomeScreen from "./Pages/HomeScreen";
import SingleProduct from "./Pages/SingleProduct";
import AuthScreen from "./Pages/AuthScreen";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cart from "./Pages/Cart";
import Success from "./Components/Order/Success";
import axios from "axios";
import ShippingAddress from "./Components/Cart/ShippingAddress";
import NotFound from './Components/Notfount'
import Payment from './Components/Order/payment'
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
// import Orders from "./Pages/Orders";
// import OrderDetails from "./Components/Order/OrderDetails";
import Dashboard from './Components/Admin/Dashboard'
import ProductsList from './Components/Admin/ProductsList'
import NewProduct from "./Components/Admin/NewProduct";

export const App = () => {
  const [showSignup, setShowSignup] = useState(false);
  const [stripeApiKey, setStripeApiKey] = useState("");

  useState("");

  async function getStripeApiKey() {
    const {data} = await axios.get("/api/v1/stripeapikey")
    setStripeApiKey(data.stripeApiKey)
  }
  console.log(stripeApiKey)
  useEffect(() => {
    getStripeApiKey()
  }, [])

  // !to make user cann't do right click on the website
  // window.addEventListener("contextmenu", (e) => e.preventDefault());
  
  return (
    <>
      <Navbar showSignup={showSignup} setShowSignup={setShowSignup} />
      <ToastContainer /> 
      {/* {stripeApiKey && (
          
            <ProtectedRoute path="/test" element={<Payment/>} />
        )} */}
      <Elements stripe={loadStripe('pk_test_51KU7PlKTQl5sdnSan4XZdyG8ROCvMps693X5fs4PDrQSR8UahyknWe9GPkuem5zqhyoLGE8GKmFa3fPRmq23joWV00XB7Rlte3')}>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/product/:productID" element={<SingleProduct />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/shipping" element={<ShippingAddress setShowSignup={setShowSignup} />} /> 
          <Route path="/payment" element={<Payment/>} />
          <Route path="/success" element={<Success />} />
          {/* <Route path="/orders" element={<Orders />} /> */}
          {/* <Route path="/order/:id" element={<OrderDetails />} /> */}
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/products" element={<ProductsList />} />
          <Route path="/admin/product" element={<NewProduct />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Elements>

      {showSignup && <AuthScreen setShowSignup={setShowSignup} />}
    </>
  );
};

export default App;

// this Project needs to develop some things in its:
// 1. review way : is so bad because of :
// a. when click on product to show the detailes, the alert of 'review submitted' display .. without make review
// b. after i click add review, the review will add in dbs but does not display on the moment in the reviews of products, it needs to make refresh

// 5:12:00m