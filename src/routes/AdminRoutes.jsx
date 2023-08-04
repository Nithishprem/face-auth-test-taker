import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AdminListTasks from "../pages/admin/AdminListTasks";
import AdminCreateTask from "../pages/admin/AdminCreateTask";
import PhoneLogin from "../pages/admin/PhoneLogin";
import AdminPrivateRoute from "../components/admin/AdminPrivateRoute";
import ViewAssessmentResult from "../pages/admin/ViewAssessmentResult";
import ViewAwarenessContent from "../pages/admin/ViewAwarenessContent";

function AdminRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={"phone-login"} />} />
      <Route path="/phone-login" element={<PhoneLogin />} />
      <Route
        path="/listTasks"
        element={
          <AdminPrivateRoute>
            <AdminListTasks />
          </AdminPrivateRoute>
        }
      />
      <Route
        path="/createTask"
        element={
          <AdminPrivateRoute>
            <AdminCreateTask />
          </AdminPrivateRoute>
        }
      />
      <Route
        path="/view/assessmentResult/:id"
        element={
          <AdminPrivateRoute>
            <ViewAssessmentResult />
          </AdminPrivateRoute>
        }
      />
      <Route
        path="/view/awarenessContent/:id"
        element={
          <AdminPrivateRoute>
            <ViewAwarenessContent />
          </AdminPrivateRoute>
        }
      />
    </Routes>
  );
}

export default AdminRoutes;
