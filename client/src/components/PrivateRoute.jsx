import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

import React from "react";

const PrivateRoute = () => {
  const { currentUser } = useSelector((state) => state.user);
  console.log(currentUser);
  console.log("here");
  return currentUser ? <Outlet /> : <Navigate to={"/sign-in"} />;
};

export default PrivateRoute;
