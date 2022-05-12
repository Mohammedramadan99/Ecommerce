import React, { useEffect } from 'react'
import {Link,useNavigate} from 'react-router-dom'
import {DataGrid} from '@mui/x-data-grid'
// import UserOptions from '../Components/UserOptions'
import {Launch} from "@mui/icons-material";
import {getMyOrders,reset} from '../redux/order/orderSlice'
import {useSelector,useDispatch} from 'react-redux'

function Orders() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {myOrders,isLoading} = useSelector(state => state.orders)
    const {userInfo} = useSelector(state => state.auth)
    const {user} = userInfo
  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty", 
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },
    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 270,
      flex: 0.5,
    },
    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Link to={`/order/${params.getValue(params.id, "id")}`}>
            <Launch />
          </Link>
        );
      },
    },
  ];
  const rows = [];

  myOrders &&
    myOrders.forEach((item, index) => {
      rows.push({
        itemsQty: item.orderItems.length,
        id: item._id,
        status: item.orderStatus,
        amount: item.totalPrice,
      });
    });

    useEffect(() => {
          
      // to check if user logged in or not, and then check if this user is admin to access this page or not 
      userInfo && user && user._id ?  console.log('good') : navigate('/login')
      console.log(user._id)
      dispatch(getMyOrders());
    }, [dispatch])
    
  return (
    <div>
          {/* <UserOptions/> */}
        {isLoading ? (
        <p> loading ... ... </p>
      ) : (
        <div className="myOrdersPage">
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="myOrdersTable"
            autoHeight
          />

          <h3 id="myOrdersHeading">{user&&user.name}'s Orders</h3>
        </div>
      )}
    </div>
  )
}

export default Orders