import React, { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Spinner from '../Layout/Spinner'

const Profile = () => {
    const { isLoading, userInfo } = useSelector((state) => state.auth);
    const { user } = userInfo
    return (
        <Fragment>
            {isLoading ? (
                <Spinner/>
            ) : (
                <Fragment>
                    <div className="profile">
                        <div className="h3">My Profile</div>
                        <div className="container">
                            <div className="img">
                                <img src={user.avatar.url} alt={user.name} />
                                <Link to="/profile/update">Edit Profile</Link>
                            </div>
                            <div className="info">
                                <div className="item">
                                    <h4>Full Name</h4>
                                    <p>{user.name}</p>
                                </div>
                                <div className="item">
                                    <h4>Email</h4>
                                    <p>{user.email}</p>
                                </div>
                                <div className="item">
                                    <h4>Joined On</h4>
                                    <p>{String(user.createdAt).substr(0, 10)}</p>
                                </div>

                                <div className="links">
                                    <Link to="/orders">My Orders</Link>
                                    <Link to="/password/update">Change Password</Link>
                                    {user.role === 'admin' && <Link to="/admin/dashboard">dashboard</Link>}
                                </div>
                            </div>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
};

export default Profile;
