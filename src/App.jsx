import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ProtectedRouter from "./components/ProtectedRouter";
import AssessmentPage from "./pages/AssessmentPage";
import ResultPage from "./pages/ResultPage";
import WebCamDetectionRoutes from "./routes/WebCamDetectionRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import UserRoutes from "./routes/UserRoutes";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to={"/user/login"} />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/assessment"
          element={
            <ProtectedRouter>
              <AssessmentPage />
            </ProtectedRouter>
          }
        />
        <Route
          path="/result"
          element={
            <ProtectedRouter>
              <ResultPage />
            </ProtectedRouter>
          }
        />{" "}
        <Route path="/user/*" element={<UserRoutes />} />
        <Route path="/admin/*" element={<AdminRoutes />} />
        <Route path="/webcam/*" element={<WebCamDetectionRoutes />} />
      </Routes>
    </Router>
  );
}

export default App;
