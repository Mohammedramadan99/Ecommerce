import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";
import { Link,useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SideBar from "./Sidebar";
import { allUsers, reset, deleteUser } from "../../redux/auth/authSlice";

const UsersList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { isError, users } = useSelector((state) => state.auth);
  const {
    isError: deleteError,
    isDeleted,
    message,
  } = useSelector((state) => state.auth.profile);

  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));
  };

  useEffect(() => {
    if (isError) {
      toast.error(message);
      dispatch(reset());
    }

    if (deleteError) {
      toast.error(deleteError);
      dispatch(reset());
    }

    if (isDeleted) {
      toast.success(message);
      navigate("/admin/users");
    }

    dispatch(allUsers());
  }, [dispatch, toast,reset, isError, deleteError, isDeleted, message]);

  const columns = [
    { field: "id", headerName: "User ID", minWidth: 180, flex: 0.8 },

    {
      field: "email",
      headerName: "Email",
      minWidth: 200,
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 150,
      flex: 0.5,
    },

    {
      field: "role",
      headerName: "Role",
      type: "number",
      minWidth: 150,
      flex: 0.3,
      cellClassName: (params) => {
        return params.getValue(params.id, "role") === "admin"
          ? "greenColor"
          : "redColor";
      },
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
          <Fragment>
            <Link to={`/admin/user/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>

            <Button
              onClick={() =>
                deleteUserHandler(params.getValue(params.id, "id"))
              }
            >
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  users &&
    users.forEach((item) => {
      rows.push({
        id: item._id,
        role: item.role,
        email: item.email,
        name: item.name,
      });
    });

  return (
        <>
            <div className="admin">
                <SideBar />
                <div className="productListContainer" data-aos="zoom-in">
                  <div className="productListHeading">ALL USERS</div>
                  <DataGrid
                      rows={rows}
                      columns={columns}
                      pageSize={10}
                      disableSelectionOnClick
                      className="productListTable"
                      autoHeight
                  />
                </div>
            </div>
        </>
  );
};

export default UsersList;
