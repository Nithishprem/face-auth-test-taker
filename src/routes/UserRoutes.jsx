import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import PhoneLogin from "../pages/user/PhoneLogin";
import ViolationAssessmentPage from "../pages/user/ViolationAssessmentPage";
import TaskNotFound from "../pages/user/TaskNotFound";
import UserPrivateRoute from "../components/user/UserPrivateRoute";

function UserRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={"phone-login"} />} />
      <Route path="/phone-login" element={<PhoneLogin />} />
      <Route
        path="/awareness/:id"
        element={
          <UserPrivateRoute>
            <ViolationAssessmentPage />
          </UserPrivateRoute>
        }
      />
      <Route
        path="/taskNotFound"
        element={
          <UserPrivateRoute>
            <TaskNotFound />
          </UserPrivateRoute>
        }
      />
      <Route />
    </Routes>
  );
}

export default UserRoutes;
