import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ProtectedRouter from "./components/ProtectedRouter";
import AssessmentPage from "./pages/AssessmentPage";
import ResultPage from "./pages/ResultPage";
import WebcamPage from "./pages/WebcamPage";
import WebcamPageGPT from "./pages/WebcamGPT";

function App() {
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
        {/* <Route
          path="/webcam-page"
          element={
            // <ProtectedRouter>
            <WebcamPage />
            // </ProtectedRouter>
          }
        />{" "} */}
        <Route
          path="/webcam-page"
          element={
            // <ProtectedRouter>
            <WebcamPageGPT />
            // </ProtectedRouter>
          }
        />{" "}
      </Routes>
    </Router>
  );
}

export default App;
