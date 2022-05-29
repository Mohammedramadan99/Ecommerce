import React, { useEffect, useState } from "react";
import {RemoveShoppingCart} from '@mui/icons-material'
import CheckoutSteps from "../Components/Cart/CheckoutSteps";
import { useDispatch, useSelector } from "react-redux";
import { Add, Remove } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import {addProduct} from '../redux/cart/cartSlice'
import {toast} from 'react-toastify'

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
  const KEY =
    "pk_test_51KU7PlKTQl5sdnSan4XZdyG8ROCvMps693X5fs4PDrQSR8UahyknWe9GPkuem5zqhyoLGE8GKmFa3fPRmq23joWV00XB7Rlte3";
  const { products, total, quantity } = useSelector((state) => state.cart);
  // const [stripeToken, setStripeToken] = useState(null);
  const navigate = useNavigate();
  const [newQty,setNewQty] = useState(quantity)
  const {shippingInfo} = useSelector(state => state.cart)
  const {user} = useSelector(state => state.auth.userInfo)
  // console.log(stripeToken)
  
  const ChangeQuantity = (id,type,size) => {
    type === 'plus' ?  setNewQty(newQty + 1) : setNewQty(newQty - 1)
    console.log(id)
    dispatch(addProduct({id,quantity:newQty,avtiveSize:size}))
  };

  const checkoutHandler = () => {
    navigate('/shipping')
  }
  
  const onToken = (token) => {
    // setStripeToken(token);
  };
  // stripe
  // useEffect(() => {
  //   const makeRequest = async () => {
  //     try {
  //       const res = await userRequest.post("/checkout/payment", {
  //         tokenId: stripeToken.id,
  //         amount: total * 100,
  //       });
  //       console.log(res.data)
  //       const client_secret = res.data.client_secret;
  //       const result = await stripe.confirmCardPayment(client_secret, {
  //         payment_method: {
  //           card: elements.getElement(CardNumberElement),
  //           billing_details: {
  //             name: user.name,
  //             email: user.email,
  //             address: {
  //               line1: shippingInfo.address,
  //               city: shippingInfo.city,
  //               state: shippingInfo.state,
  //               postal_code: shippingInfo.pinCode,
  //               country: shippingInfo.country,
  //             },
  //           },
  //         },
  //       });
  //       navigate.push("/success",{data:res.data})
  //     } catch  {}
  //   };
  //   stripeToken && makeRequest()
  // }, [stripeToken,navigate,total]);

  // paypal
  // useEffect(() => {
  //   window.paypal.Buttons({
  //     createOrder: (data,actions) => {
  //       return actions.order.create({
  //         purchase_units:[{
  //           amount:{
  //             value: total 
  //           }
  //         }]
  //       })
  //     },
  //     onApprove:  (data,actions) => {
  //       return actions.order.capture().then((details) => {
  //         toast.success('thanks for paying dear: ' + details.payer.name.given_name)
  //       })
  //     }
  //   }
  //   ).render('#paypal-btn')
  // }, [])

  return (
    <>
      {products?.length === 0 ? (
        <div className="emptyCart">
          <div className="icon">
            <RemoveShoppingCart/>
          </div>
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
                    <div key={p.id} className="product">
                      <div className="left">
                        <div className="img">
                          <img src={p.image?p.image : p.images[0].url} alt="" />
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
                            <strong> size </strong> {p.size}{" "}
                          </div>
                        </div>
                      </div>
                      <div className="right">
                        <div className="priceDetailes">
                          <div className="quantity">
                            <Add onClick={() => ChangeQuantity(p.id,"plus",p.size)} />
                            {p.quantity}
                            {console.log(p)}
                            <Remove onClick={() => ChangeQuantity(p.id,"minus",p.size)} />
                          </div>
                          <div className="price"> ${p.price * p.quantity} </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="summary">
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
