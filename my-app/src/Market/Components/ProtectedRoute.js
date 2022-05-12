import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Navigate, Route } from "react-router-dom";

const ProtectedRoute = ({ isAdmin, element,path , ...rest }) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.auth);
  console.log('hihiii')
  console.log(this.props)
  return (
    <Fragment>
      {loading === false && (
        <Route
          {...rest}
          render={(props) => {
            if (user.id) {
              return <Navigate to="/login" />;
            }

            if (isAdmin === true && user.role !== "admin") {
              return <Navigate to="/login" />;
            }

            return <element {...props} />;
          }}
        />
      )}
    </Fragment>
  );
};

export default ProtectedRoute;
