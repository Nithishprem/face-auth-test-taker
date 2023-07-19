import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import UserContext from "../context/UserContent";

function ProtectedRouter({ children }) {
  let { user } = useContext(UserContext);

  if (!user || !user.number) return <Navigate to="/login" />;

  return <div>{children}</div>;
}

export default ProtectedRouter;
