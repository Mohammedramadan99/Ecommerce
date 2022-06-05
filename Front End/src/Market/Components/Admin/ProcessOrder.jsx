import React, { Fragment, useEffect, useState } from "react";
import { Link,useNavigate,useParams } from "react-router-dom";
import SideBar from "./Sidebar";
import Spinner from '../Layout/Spinner'
import {
  getOrder,
  reset,
  updateOrder,
} from "../../redux/order/orderSlice";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import { Button } from "@mui/material";


const ProcessOrder = () => {
  const { order, isError, message } = useSelector((state) => state.orders.orderDetails);
  const { isError: updateError, isUpdated,isLoading } = useSelector((state) => state.orders.order);
  const {id} = useParams()
  const [status, setStatus] = useState("");
  const dispatch = useDispatch();

  const updateOrderSubmitHandler = (e) => {
    e.preventDefault();

    // const myForm = new FormData();

    // myForm.set("status", status);

    const orderData = {id,status}

    dispatch(updateOrder(orderData))
  };

  useEffect(() => {
    if (isError) {
      toast.error(message);
      dispatch(reset());
    }
    if (updateError) {
      toast.error(updateError);
      dispatch(reset());
    }
    if (isUpdated) {
      toast.success("Order Updated Successfully");
      dispatch(reset());
    }

    dispatch(getOrder(id));
  }, [dispatch,toast,isLoading, isError, id, isUpdated, updateError]);

  return (
    <Fragment>
    
      <div className="admin">
        <SideBar />
        <div className="newProductContainer" data-aos="zoom-in">
          {isLoading ? (
            <Spinner/>
          ) : (
            <div
              className="confirmOrderPage"
              style={{
                display: order.orderStatus === "Delivered" ? "block" : "grid",
              }}
            >
              <div>
                <div className="confirmshippingArea">
                  <h3>Shipping Info</h3>
                  <div className="orderDetailsContainerBox">
                    <div>
                      <p>Name:</p>
                      <span>{order.user && order.user.name}</span>
                    </div>
                    <div>
                      <p>Phone:</p>
                      <span>
                        {order.shippingInfo && order.shippingInfo.phone}
                      </span>
                    </div>
                    <div>
                      <p>Address:</p>
                      <span>
                        {order.shippingInfo &&
                          `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.postalCode}, ${order.shippingInfo.country}`}
                      </span>
                    </div>
                  </div>

                  <h3>Payment</h3>
                  <div className="orderDetailsContainerBox">
                    <div>
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

                    <div>
                      <p>Amount:</p>
                      <span>{order.totalPrice && order.totalPrice}</span>
                    </div>
                  </div>

                  <h3>Order Status</h3>
                  <div className="orderDetailsContainerBox">
                    <div>
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
                <div className="confirmCartItems">
                  <h3>Your Cart Items:</h3>
                  <div className="confirmCartItemsContainer">
                    {order.orderItems &&
                      order.orderItems.map((item) => (
                        <div key={item.product}>
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
              {/*  */}
              <div
                style={{
                  display: order.orderStatus === "Delivered" ? "none" : "block",
                }}
              >
                <form
                  className="updateOrderForm"
                  onSubmit={updateOrderSubmitHandler}
                >
                  <h1>Process Order</h1>

                  <div>
                    <AccountTreeIcon />
                    <select onChange={(e) => setStatus(e.target.value)}>
                      <option value="">Choose Category</option>
                      {order.orderStatus === "Processing" && (
                        <option value="Shipped">Shipped</option>
                      )}

                      {order.orderStatus === "Shipped" && (
                        <option value="Delivered">Delivered</option>
                      )}
                    </select>
                  </div>

                  <Button
                    id="createProductBtn"
                    type="submit"
                    disabled={
                      isLoading ? true : false || status === "" ? true : false
                    }
                  >
                    Process
                  </Button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default ProcessOrder;
