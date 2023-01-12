import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { PrivateRouteProps } from 'core/interfaces/props';
import { Pages } from 'core/enums';

const ProtectedRoute = ({ isLoggedIn, children }: PrivateRouteProps) => {
  if (!isLoggedIn) {
    return <Navigate to={Pages.main} replace />;
  }
  return children ? children : <Outlet />;
};

export default ProtectedRoute;
