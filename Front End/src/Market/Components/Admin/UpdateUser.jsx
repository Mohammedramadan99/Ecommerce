import React, { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Button } from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PersonIcon from "@mui/icons-material/Person";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import SideBar from "./Sidebar";
import Spinner from '../Layout/Spinner'
import {
    updateProfile,
    getSingleUser,
    reset,
} from "../../redux/auth/authSlice";


const UpdateUser = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { id } = useParams()
    const { isLoading, isError, userInfo } = useSelector((state) => state.auth);
    const {user} = userInfo
    const {
        isLoading: updateLoading,
        isError: updateError,
        isUpdated,
        message
    } = useSelector((state) => state.auth.profile);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");

    const userId = id;

    useEffect(() => {
        if (user && user._id !== userId) {
            dispatch(getSingleUser(userId));
        } else {
            setName(user.name);
            setEmail(user.email);
            setRole(user.role);
        }
        if (isError) {
            toast.error(message);
            dispatch(reset());
        }

        if (updateError) {
            toast.error(updateError);
            dispatch(reset());
        }

        if (isUpdated) {
            toast.success("User Updated Successfully");
            navigate("/admin/users");
            dispatch(reset());
        }
        dispatch(reset());
    }, [dispatch, toast, isUpdated, updateError, user, userId]);

    const updateUserSubmitHandler = (e) => {
        e.preventDefault();

        const myForm = {
            name,email,role
        }
        const data = {userId, myForm}
        dispatch(updateProfile(data));
    };

    return (
        <Fragment>

            <div className="admin">
                <SideBar />
                <div className="newProductContainer" data-aos="zoom-in">
                    {isLoading ? (
                        <Spinner/>
                    ) : (
                        <form
                            className="createProductForm"
                            onSubmit={updateUserSubmitHandler}
                        >
                            <h1>Update User</h1>

                            <div>
                                <PersonIcon />
                                <input
                                    type="text"
                                    placeholder="Name"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div>
                                <MailOutlineIcon />
                                <input
                                    type="email"
                                    placeholder="Email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div>
                                <VerifiedUserIcon />
                                <select value={role} onChange={(e) => setRole(e.target.value)}>
                                    <option value="">Choose Role</option>
                                    <option value="admin">Admin</option>
                                    <option value="user">User</option>
                                </select>
                            </div>

                            <Button
                                id="createProductBtn"
                                type="submit"
                                disabled={
                                    updateLoading ? true : false || role === "" ? true : false
                                }
                            >
                                Update
                            </Button>
                        </form>
                    )}
                </div>
            </div>
        </Fragment>
    );
};

export default UpdateUser;