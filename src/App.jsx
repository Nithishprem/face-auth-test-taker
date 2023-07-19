import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ProtectedRouter from "./components/ProtectedRouter";
import AssessmentPage from "./pages/AssessmentPage";
import ResultPage from "./pages/ResultPage";
import WebcamFaceMatch from "./pages/WebcamFaceMatch";
import FaceSimilarityFinder from "./pages/FaceSimilarityFinder";
import FaceSimilarityWebcamImage from "./pages/FaceSimilarityWebcamImage";
import FaceSimilarityUser from "./pages/FaceSimilarityUser";
import { USER } from "./utils/constants";

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
        <Route path="/webcam-facematch" element={<WebcamFaceMatch />} />
        <Route path="face-similarity" element={<FaceSimilarityFinder />} />
        <Route path="/face-similarity-webcam-image" element={<FaceSimilarityWebcamImage />} />
        <Route path="face-similarity-user" element={<FaceSimilarityUser />} />
      </Routes>
    </Router>
  );
}

export default App;
