import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import UserContext from "../../context/UserContent";
import { ROUTES } from "../../utils/constants";

function AdminPrivateRoute({ children }) {
  let { user } = useContext(UserContext);

  if (!user) return <Navigate to={ROUTES.admin.login} />;

  return <div>{children}</div>;
}

export default AdminPrivateRoute;
