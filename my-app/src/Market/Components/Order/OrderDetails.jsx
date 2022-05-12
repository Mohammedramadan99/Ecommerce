import React, { Fragment, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { Link,useParams } from "react-router-dom";
import { getOrder,reset } from "../../redux/order/orderSlice";
import UserOptions from '../../Components/UserOptions'
import { toast } from "react-toastify";

const OrderDetails = () => {
  const { order, isError, isLoading,message } = useSelector((state) => state.orders.orderDetails);
  const {id} = useParams()
  const dispatch = useDispatch();

  useEffect(() => {
    if (isError) {
      toast.error(message);
      dispatch(reset());
    }

    dispatch(getOrder(id));
  }, [dispatch, toast, isError, id]);
  
  return (
    <Fragment>
      {isLoading ? (
        <p>loading</p>
      ) : (
        <Fragment>
          <div className="orderDetailsPage">
            <UserOptions/>
            <div className="order_id">
              Order #{order && order._id}
            </div>
            <div className="container">
              <div className="orderDetailsBoxes">
                <div className="box">
                  <h3>Shipping Info</h3>
                  <div className="details">
                    <p>Name:</p>
                    <span>{order.user && order.user.name}</span>
                  </div>
                  <div className="details">
                    <p>Phone:</p>
                    <span>
                      {order.shippingInfo && order.shippingInfo.phone}
                    </span>
                  </div>
                  <div className="details">
                    <p>Address:</p>
                    <span>
                      {order.shippingInfo &&
                        `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.postalCode}, ${order.shippingInfo.country}`}
                    </span>
                  </div>
                </div>
                <div className="box">
                  <h3>Payment</h3>
                  <div className="details">
                    <p
                      className={
                        order.paymentInfo &&
                        order.paymentInfo.status === "succeeded"
                          ? "greenColor"
                          : "redColor"
                      }
                    >
                      {order.paymentInfo &&
                      order.paymentInfo.status === "succeeded"
                        ? "PAID"
                        : "NOT PAID"}
                    </p>
                  </div>

                  <div className="details">
                    <p>Amount:</p>
                    <span>{order.totalPrice && order.totalPrice}</span>
                  </div>
                </div>
                <div className="box">
                  <h3>Order Status</h3>
                  <div className="details">
                    <p
                      className={
                        order.orderStatus && order.orderStatus === "Delivered"
                          ? "greenColor"
                          : "redColor"
                      }
                    >
                      {order.orderStatus && order.orderStatus}
                    </p>
                  </div>
                </div>
              </div>

              <div className="orderDetailsCartItems">
                <div className="h3">Order Items:</div>
                <div className="orderDetailsCartItemsContainer">
                  {order.orderItems &&
                    order.orderItems.map((item) => (
                      <div className="item" key={item.product}>
                        <img src={item.image} alt="Product" />
                        <Link to={`/product/${item.product}`}>
                          {item.name}
                        </Link>{" "}
                        <span>
                          {item.quantity} X ₹{item.price} ={" "}
                          <b>₹{item.price * item.quantity}</b>
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default OrderDetails;
