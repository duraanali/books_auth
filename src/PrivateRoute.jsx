import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';

const PrivateRoute = () => {
  const token = Cookies.get('token');
  const location = useLocation();

  if (!token) {
    // not logged in, so redirect to login page with the return URL
    return <Navigate to="/user/login" state={{ from: location }} />;
  }

  // returns child route elements
  return <Outlet />;
};

export default PrivateRoute;
