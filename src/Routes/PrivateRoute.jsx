import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const is_auth = useSelector((store) => store.authReducer.is_auth);
  if (!is_auth) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default PrivateRoute;
