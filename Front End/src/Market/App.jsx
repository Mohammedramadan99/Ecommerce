import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Layout/Navbar";

// styles lib
import "./Sass/Style.css";
import "./Bootstrap/BootStrap/bootstrap.min.css";
import 'aos/dist/aos.css'
import AOS from "aos"

import SingleProduct from "./Pages/SingleProduct";
import AuthScreen from "./Pages/AuthScreen";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cart from "./Pages/Cart";
import Success from "./Components/Order/Success";
import ShippingAddress from "./Components/Cart/ShippingAddress";
import NotFound from './Components/Layout/Notfount'
import Payment from './Components/Order/payment'
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Orders from "./Pages/Orders";
import OrderDetails from "./Components/Order/OrderDetails";
import Dashboard from './Components/Admin/Dashboard'
import ProductsList from './Components/Admin/ProductsList'
import NewProduct from "./Components/Admin/NewProduct";
import ProductedUserRoute from "./Components/ProductedRoutes/ProductedUserRoute";
import {useSelector} from 'react-redux'
import ProductedAdminRoute from "./Components/ProductedRoutes/ProductedAdminRoute";
import OrderList from "./Components/Admin/OrderList";
import ProcessOrder from "./Components/Admin/ProcessOrder";
import UsersList from "./Components/Admin/UsersList";
import UpdateUser from "./Components/Admin/UpdateUser";
import ProductReviews from "./Components/Admin/ProductReviews";
import Profile from "./Components/User/Profile";
import UpdateProfile from "./Components/User/UpdateProfile";
import ForgotPassword from "./Components/User/ForgotPassword";
import ResetPassword from "./Components/User/ResetPassword";
import Products from "./Pages/Products";
import HomeOne from "./Components/Home/HomeOne";
import HomeTwo from "./Components/Home/HomeTwo";
import HomeVersions from "./Pages/HomeVersions";
import CustomerRevForm from "./Pages/CustomerRevForm";
import Footer from "./Components/Home/sections/Footer";


export const App = () => {
  
  useEffect(() => {
    AOS.init({
      duration : 2000
    });
  }, []);
  // const [showSignup, setShowSignup] = useState(false);
  const {LogInShow} = useSelector(state => state.auth)
  const [stripeApiKey, setStripeApiKey] = useState("")

  
  // async function getStripeApiKey() {
  //   const {data} = await axios.get("/api/v1/stripeapikey")
  //   setStripeApiKey(data.stripeApiKey&&data.stripeApiKey)
  // }
  // console.log(stripeApiKey)
  // useEffect(() => {
  //   getStripeApiKey()
  // }, [])

  // !to make user cann't do right click on the website
  // window.addEventListener("contextmenu", (e) => e.preventDefault());
  
  return (
    <>
      <Navbar />
      <ToastContainer /> 
      <Elements stripe={loadStripe('pk_test_51KU7PlKTQl5sdnSan4XZdyG8ROCvMps693X5fs4PDrQSR8UahyknWe9GPkuem5zqhyoLGE8GKmFa3fPRmq23joWV00XB7Rlte3')}>
        <Routes> 
          <Route path="/" element={<HomeVersions />} />
          <Route path='/home-v1'  element={<HomeOne/>} />
          <Route path='/home-v2'  element={<HomeTwo/>} />
          <Route path="/product/:productID" element={<SingleProduct />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/password/reset/:token" element={<ResetPassword />} />
          <Route path="/password/forgot" element={<ForgotPassword />} />
          <Route path="/products" element={<Products/>} />
          <Route path="/products/:categoryName" element={<Products/>} />

          {/* only for users */}
          <Route element={<ProductedUserRoute/>}>
            <Route path="/shipping" element={<ShippingAddress />} /> 
            <Route path="/payment" element={<Payment/>} />
            <Route path="/success" element={<Success />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/order/:id" element={<OrderDetails />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/update" element={<UpdateProfile />} />
            <Route path="/customer/FAQ" element={<CustomerRevForm />} />
            
          
            {/* only for admin */}
            <Route element={<ProductedAdminRoute/>}>
              <Route path="/admin/dashboard" element={<Dashboard />} />
              <Route path="/admin/products" element={<ProductsList />} />
              <Route path="/admin/product" element={<NewProduct />} />
              <Route path="/admin/orders" element={<OrderList />} />
              <Route path="/admin/order/:id" element={<ProcessOrder />} />
              <Route path="/admin/users" element={<UsersList />} />
              <Route path="/admin/user/:id" element={<UpdateUser />} />
              <Route path="/admin/reviews" element={<ProductReviews />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
        <Footer/>
      </Elements>

      {LogInShow && <AuthScreen/>}
    </>
  );
};

export default App;

// this Project needs to develop some things in its:
// 1. review way : is so bad because of :
// a. when click on product to show the detailes, the alert of 'review submitted' display .. without make review
// b. after i click add review, the review will add in dbs but does not display on the moment in the reviews of products, it needs to make refresh