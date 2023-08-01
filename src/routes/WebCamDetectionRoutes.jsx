import React from "react";
import { Route, Routes } from "react-router-dom";
import WebcamFaceMatch from "../pages/webCamDetections/WebcamFaceMatch";
import FaceSimilarityFinder from "../pages/webCamDetections/FaceSimilarityFinder";
import FaceSimilarityWebcamImage from "../pages/webCamDetections/FaceSimilarityWebcamImage";
import FaceSimilarityUser from "../pages/webCamDetections/FaceSimilarityUser";

function WebCamDetectionRoutes() {
  return (
    <Routes>
      <Route path="/facematch" element={<WebcamFaceMatch />} />
      <Route path="face-similarity" element={<FaceSimilarityFinder />} />
      <Route path="/face-similarity-webcam-image" element={<FaceSimilarityWebcamImage />} />
      <Route path="/face-similarity-user" element={<FaceSimilarityUser />} />
    </Routes>
  );
}

export default WebCamDetectionRoutes;
