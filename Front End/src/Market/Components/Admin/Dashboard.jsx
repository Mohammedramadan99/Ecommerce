import React,{useEffect} from "react";
import {Link,useNavigate} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
// import { Doughnut, Line } from "react-chartjs-2";
import {Line,Doughnut} from 'react-chartjs-2'
import {allUsers,reset} from '../../redux/auth/authSlice'
import {getAdminOrders} from '../../redux/order/orderSlice'
import {getAdminProducts} from '../../redux/product/productSlice'
import Sidebar from "./Sidebar";
import { Chart as ChartJS } from 'chart.js/auto'
import { Chart }            from 'react-chartjs-2'
import { toast } from "react-toastify";
// import UserOptions from '../UserOptions'
// import './dashboard.css'

function Dashboard() {
  const dispatch = useDispatch();

  const { allProducts } = useSelector((state) => state.products);

  const { allOrders } = useSelector((state) => state.orders);

  const { users,userInfo,isError,message } = useSelector((state) => state.auth);

  const {user} = userInfo

  const navigate = useNavigate()
  
  useEffect(() => {
    
    // to check if user logged in or not, and then check if this user is admin to access this page or not 
    // userInfo && user._id &&  user.role !== 'admin' && navigate('/') 

    dispatch(getAdminProducts());
    dispatch(getAdminOrders());
    dispatch(allUsers());
    dispatch(reset());
    if(isError){
      toast(message)
      dispatch(reset());
    }
  }, [dispatch,toast,message,isError]);

  let outOfStock = 3;

  allProducts &&
    allProducts.forEach((item) => {
      if (item.Stock === 0) {
        outOfStock += 1;
      }
    });

  let totalAmount = 0;
  allOrders &&
  allOrders.orders.forEach((item) => {
      totalAmount += item.totalPrice;
    });

  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, totalAmount],
      },
    ],
  };

  const doughnutState = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [outOfStock, allProducts.length - outOfStock],
      },
    ],
  };


  return (
    <div className="admin"> 
        <Sidebar/>
        <div className="dashboardContainer">
          <div className="productListHeading">Dashboard</div>
          {/* <UserOptions/> */}
          <div className="dashboardSummary">
            <div className="amount">
              <p>
                Total Amount <br /> ${totalAmount}
              </p>
            </div>
            <div className="dashboardSummaryBox2">
              <Link to="/admin/products">
                <p>Product</p>
                <p>{allProducts && allProducts.length}</p>
              </Link>
              <Link to="/admin/orders">
                <p>Orders</p>
                <p>{allOrders.orders && allOrders.orders.length}</p>
              </Link>
              <Link to="/admin/users">
                <p>Users</p>
                <p>{users && users.length}</p>
              </Link>
            </div>
          </div>

          <div className="lineChart">
            <Line data={lineState} />
          </div>

          <div className="doughnutChart">
            <Doughnut data={doughnutState} />
          </div>
      </div>
    </div>
);
}

export default Dashboard;
