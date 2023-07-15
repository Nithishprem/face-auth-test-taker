import React, { useEffect, useRef, useState } from "react";
import LoginForm from "../components/LoginForm";
import FaceDetection from "../components/FaceDetection";
import { useContext } from "react";
import UserContext from "../context/UserContent";

function LoginPage() {
  const [number, setNumber] = useState("6281594686");

  const [showFaceDetection, setShowFaceDetection] = useState(false);

  const handleNext = () => {
    setShowFaceDetection(true);
  };

  if (showFaceDetection) {
    return <FaceDetection number={number} />;
  }
  return (
    <div>
      <LoginForm number={number} setNumber={setNumber} handleNext={handleNext} />
    </div>
  );
}

export default LoginPage;
