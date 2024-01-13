import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import Auth from "../store/auth";
const Logout = () => {
  const { LogoutUser } = Auth.useAuth();
  useEffect(() => {
    LogoutUser();
  }, [LogoutUser]);
  return <Navigate to="/login" />;
};

export default Logout;
