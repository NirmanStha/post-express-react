// PublicRoutes.jsx

import { Outlet, Navigate } from "react-router-dom";
import { useAuthApi } from "@/api/auth/auth.api";

const PublicRoutes = () => {
  const { isAuth } = useAuthApi();
  if (isAuth) {
    // Already logged in? Kick them out of public pages.
    return <Navigate to="/app" replace />;
  }
  return <Outlet />;
};

export default PublicRoutes;
