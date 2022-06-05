import React, { useEffect, useState } from "react";
import {RemoveShoppingCart} from '@mui/icons-material';
import CheckoutSteps from "../Components/Cart/CheckoutSteps";
import { useDispatch, useSelector } from "react-redux";
import { Add, Remove, Delete } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import {addToCart,increaseCart,decreaseCart,removeFromCart} from '../redux/cart/cartSlice';
import {toast} from 'react-toastify';
import blog_1 from '../Imgs/blog-3.jpg';

import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";


function Cart() {
  const dispatch = useDispatch()
  // const elements = useElements();
  // const stripe = useStripe();
  const [showItem,setShowItem] = useState(false)
  const { products, total, quantity } = useSelector((state) => state.cart);
  // const [stripeToken, setStripeToken] = useState(null);
  const navigate = useNavigate();
  const [newQty,setNewQty] = useState(0)
  const {shippingInfo} = useSelector(state => state.cart)
  const {user} = useSelector(state => state.auth.userInfo)
  // console.log(stripeToken)
  
  const ChangeQuantity = (id,type,size,Stock) => {
    console.log(type)
    type === 'plus' ? setNewQty(newQty + 1) : setNewQty(newQty - 1)
    
    console.log(newQty)
    
    console.log(Stock)
    dispatch(addToCart({id,quantity:newQty,avtiveSize:size,Stock}))
  };

  const checkoutHandler = () => {
    navigate('/shipping')
  }
  
  const onToken = (token) => {
    // setStripeToken(token);
  };

  const [changeQty,setChangeQty] = useState({})
  
  const changeQtyHandler = (data) => {
    console.log(data)
    dispatch(addToCart(data))
  }

  const handleAddToCart = (product) => {
    dispatch(increaseCart(product));
  };
  const handleDecreaseCart = (product) => {
    dispatch(decreaseCart(product));
  };
  const deleteFromCart = (product) => {
    dispatch(removeFromCart(product));
  };

  return (
    <>
      {products?.length === 0 ? (
        <div className="emptyCart">
          <div className="icon">
            <RemoveShoppingCart/>
          </div>
          <img src={blog_1} alt="ssss" />

          <p>your cart is empty</p>
        </div>
      ) : (
          <div className="cart">
            <div className="container">
              <div className="top">
                <CheckoutSteps step1 step2></CheckoutSteps>
              </div>
              <div className="bottom">
                <div className="info">
                  {products&&products.map((p) => (
                    <div key={p.id} className="product" data-aos="fade-down">
                      <div className="left">
                        <div className="img">
                          <img src={p?.image?p.image : p?.images[0]?.url} alt="" />
                        </div>
                        <div className="detailes">
                          <div className="name">
                            {" "}
                            <strong> product </strong> {p.name}{" "}
                          </div>
                          <div className="rating"> {p.ratings} </div>
                          <div className="price">
                            {" "}
                            <strong> price </strong> {p.price}{" "}
                          </div>
                          <div className="size">
                            {" "}
                            <strong> size </strong> {p.activeSize}{" "}
                          </div>
                          <div className="stock">
                            {" "}
                            <strong> in stock </strong> {p.Stock}{" "}
                          </div>
                        </div>
                      </div>
                      <div className="right">
                        <div className="priceDetailes">
                          <div className="quantity">
                            <Add onClick={() => handleAddToCart(p)} />
                              {p.quantity}
                            <Remove onClick={() => handleDecreaseCart(p) } />
                          </div>
                          <div className="trash">
                            <Delete onClick={() => deleteFromCart(p)} />
                          </div>
                          <div className="price"> ${p.price * p.quantity} </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="summary" data-aos="fade-down">
                  <h3>checkout</h3>
                  <div className="items">
                    <div className="item">
                      <h5> subtotal </h5>
                      <p> {total} </p>
                     
                    </div>
                    <div className="item">
                      <h5> extimated shipping </h5>
                      <p> $5.90 </p>
                    </div>
                    <div className="item">
                      <h5> shipping discount </h5>
                      <p> $-5.90 </p>
                    </div>
                    <div className="item">
                      <h5> total </h5>
                      <p> {total} </p>
                    </div>
                  </div>
                  <div className="checkout_btn" onClick={checkoutHandler}>
                    checkout Now
                  </div>
                  {/* for paypal */}
                  {/* <div id="paypal-btn"></div> */}
                  
                  {/* for paypal */}
                  {/* <StripeCheckout
                    name="Lama Shop"
                    image="https://avatars.githubusercontent.com/u/1486366?v=4"
                    billingAddress
                    shippingAddress
                    description={`Your total is $${total}`}
                    amount={total * 100}
                    token={onToken}
                    stripeKey={KEY}
                  >
                    <div className="btn">checkout now</div>
                  </StripeCheckout> */}
                </div>
              </div>
            </div>
          </div>
      )}
    </>
  );
}

export default Cart;
