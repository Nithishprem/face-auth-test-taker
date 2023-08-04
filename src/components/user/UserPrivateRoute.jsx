import React, { useContext } from "react";
import { Navigate, useLocation, useSearchParams } from "react-router-dom";
import UserContext from "../../context/UserContent";
import { ROUTES } from "../../utils/constants";

function UserPrivateRoute({ children }) {
  let { user, handleDestinationSave } = useContext(UserContext);

  const location = useLocation();
  const [searchParams] = useSearchParams();
  const phoneNumber = searchParams.get("phoneNumber");

  if (!user) {
    if (location.pathname.includes("/user/awareness")) {
      handleDestinationSave(location.pathname);
      return <Navigate to={`${ROUTES.user.login}?phoneNumber=${phoneNumber}`} />;
    }
    return <Navigate to={ROUTES.user.login} />;
  }

  return <div>{children}</div>;
}

export default UserPrivateRoute;
