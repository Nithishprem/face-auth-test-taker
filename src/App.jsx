import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ProtectedRouter from "./components/ProtectedRouter";
import AssessmentPage from "./pages/AssessmentPage";
import ResultPage from "./pages/ResultPage";
import WebcamPageGPT from "./pages/WebcamGPT";
import WebcamFaceMatch from "./pages/WebcamFaceMatch";

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
        <Route path="/webcam-facematch" element={<WebcamFaceMatch />} />
      </Routes>
    </Router>
  );
}

export default App;
