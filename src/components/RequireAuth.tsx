import { Outlet, useLocation, Navigate } from "react-router-dom";

import { getToken } from "@/service/token.service";

const RequireAuth = () => {
  const location = useLocation();
  const token = getToken();

  return token ? (
    <Outlet />
  ) : (
    <Navigate to={"/"} state={{ from: location }} replace />
  );
};

export default RequireAuth;
