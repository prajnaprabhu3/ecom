import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, Outlet } from "react-router-dom";
import UserAccount from "../pages/UserAccount";

const ProtectedRoute = ({ isAdmin,component: Component, ...rest }) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);


  if (isAdmin === true && user.role !== "admin") {
    return <navigate to="/login" />;
  }
   // determine if authorized, from context or however you're doing it

    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;





// <Fragment>
// {loading === false && (
//   <Route
//     {...rest}
//     render={(props) => {
//       if (isAuthenticated === false) {
//         return <Navigate to="/login" />;
//       }

//       if (isAdmin === true && user.role !== "admin") {
//         return <Navigate to="/login" />;
//       }

//       return <Component {...props} />;
//     }}
//   />
// )}
// </Fragment>