import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminListTasks from "../pages/admin/AdminListTasks";
import AdminCreateTask from "../pages/admin/AdminCreateTask";
import PhoneLogin from "../pages/admin/PhoneLogin";

function AdminRoutes() {
  return (
    <Routes>
      <Route path="/phone-login" element={<PhoneLogin />} />
      <Route path="/listTasks" element={<AdminListTasks />} />
      <Route path="/createTask" element={<AdminCreateTask />} />
    </Routes>
  );
}

export default AdminRoutes;
