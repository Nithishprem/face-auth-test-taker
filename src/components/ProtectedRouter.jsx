import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRouter({ children }) {
  let loggedIn = true;

  if (!loggedIn) return <Navigate to="login" />;

  return <div>{children}</div>;
}

export default ProtectedRouter;
