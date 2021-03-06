import { Navigate, useLocation, Outlet } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppSelector } from "../store/configureStore";
import { useEffect, useState } from "react";

export default function PrivateRoute({ roles = null }) {
  const { userInfo } = useAppSelector((state) => state.account);
  const location = useLocation();
  let state = useState(true);

  useEffect(() => {
    if (!state || !userInfo) {
      toast.error("You shall not pass!");
    }
  }, [state, userInfo]);

  if (!roles) {
    if (userInfo) {
      state = true;
      return <Outlet />;
    }
  }
  if (roles) {
    if (userInfo && roles?.some((r) => userInfo.roles?.includes(r))) {
      state = true;
      return <Outlet />;
    }
  }

  state = false;
  return <Navigate exact to="/" state={{ from: location }} />;
}
