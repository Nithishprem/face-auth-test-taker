import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ProtectedRouter from "./components/ProtectedRouter";
import AssessmentPage from "./pages/AssessmentPage";
import ResultPage from "./pages/ResultPage";
import WebCamDetectionRoutes from "./routes/WebCamDetectionRoutes";
import AdminRoutes from "./routes/AdminRoutes";
// import firebase from "firebase";

function App() {
  // const firebaseApp = firebase.apps[0];

  // console.log(JSON.stringify(firebaseApp.options));
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to={"/login"} />} />
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
        <Route path="/admin/*" element={<AdminRoutes />} />
        <Route path="/webcam/*" element={<WebCamDetectionRoutes />} />
      </Routes>
    </Router>
  );
}

export default App;
