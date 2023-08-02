import React from "react";
import { Route, Routes } from "react-router-dom";
import PhoneLogin from "../pages/user/PhoneLogin";
import ViolationAssessmentPage from "../pages/user/ViolationAssessmentPage";
import TaskNotFound from "../pages/user/TaskNotFound";

function UserRoutes() {
  return (
    <Routes>
      <Route path="/phone-login" element={<PhoneLogin />} />
      {/* <Route path="/listTasks" element={<AdminListTasks />} /> */}
      {/* <Route path="/createTask" element={<AdminCreateTask />} /> */}
      <Route path="/assessment/:id" element={<ViolationAssessmentPage />} />
      <Route path="/taskNotFound" element={<TaskNotFound />} />
      <Route />
    </Routes>
  );
}

export default UserRoutes;
