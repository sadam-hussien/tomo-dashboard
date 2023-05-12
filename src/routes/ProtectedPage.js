import React from "react";

import { Navigate, useLocation } from "react-router-dom";

import { useSelector, shallowEqual } from "react-redux";

import AuthLayout from "layout/authLayout";

import DashboardLayout from "layout/dashboardLayout";

export default function ProtectedPage({ children, data }) {
  // get pathname
  const { pathname } = useLocation();

  // isAuthPathname
  const isAuthPathname = pathname.includes("auth");

  const { isAuth } = useSelector(
    ({ auth }) => ({
      isAuth: auth.user != null,
    }),
    shallowEqual
  );

  // if user is not authenticated and goes to auth page
  if (!isAuth && isAuthPathname) {
    return <AuthLayout>{children}</AuthLayout>;
  }

  // check if not auth -> redirect to auth page
  if (!isAuth) {
    return <Navigate to="/auth" replace />;
  }

  // if user is authenticated and goes to auth page
  if (isAuth && isAuthPathname) {
    return <Navigate to="/" replace />;
  }

  // if user authenticated and goes to any page execlude auth pages
  if (data.layout) {
    return <data.layout {...data}>{children}</data.layout>;
  }
  return <DashboardLayout {...data}>{children}</DashboardLayout>;
}
