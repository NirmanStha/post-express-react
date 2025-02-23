// ProtectedRoutes.jsx

import { Outlet, Navigate } from "react-router-dom";
import { useAuthApi } from "@/api/auth/auth.api";

const ProtectedRoutes = () => {
  const { isAuth } = useAuthApi();
  if (!isAuth) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
};

export default ProtectedRoutes;
