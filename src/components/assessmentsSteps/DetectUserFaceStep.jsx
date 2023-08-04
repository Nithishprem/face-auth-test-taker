import React, { useContext, useEffect, useState } from "react";
import PermissionHandler from "../PermissionHandler";
import WebcamFaceAuth2 from "../WebcamFaceAuth2";
import nithish from "../../assets/images/nithish3.jpeg";
import { BEST_MATCH_DISTANCE, IMAGE_DETECTION_SCORE } from "../../utils/constants";
import UserContext from "../../context/UserContent";
import { useNavigate } from "react-router-dom";
import WebcamFaceDetectAndCapture from "../WebcamFaceDetectAndCapture";

function DetectUserFaceStep({ setTaskStep, taskData, handleNext }) {
  const [videoDevices, setVideoDevices] = useState(null);
  const [loadingPermissions, setLoadingPermissions] = useState(true);

  const handlePermissionsLoaded = () => {
    setLoadingPermissions(false);
  };

  if (loadingPermissions) {
    return <PermissionHandler setVideoDevices={setVideoDevices} handlePermissionsLoaded={handlePermissionsLoaded} />;
  }

  return <FaceAuthenticate setTaskStep={setTaskStep} taskData={taskData} handleNext={handleNext} />;
}

export default DetectUserFaceStep;

function FaceAuthenticate({ setTaskStep, taskData, handleNext }) {
  const { user, userProfilePhoto } = useContext(UserContext);
  const [matchDistance, setMatchDistance] = useState(null);
  const [imgWithScore, setImgWithScore] = useState(null);
  const [loading, setLoading] = useState(true);
  const [detectionSuccess, setDetectionSuccess] = useState(false);
  const [detectionCount, setDetectionCount] = useState(0);
  const navigate = useNavigate();

  const handleAuthSuccess = () => {
    handleSaveImage(imgWithScore?.image);
  };

  // const handleAuthenticationFailed = () => {};

  useEffect(() => {
    let timeoutId;
    if (matchDistance && !detectionSuccess) {
      setLoading(false);
      setDetectionCount((prev) => prev + 1);
      if (matchDistance < BEST_MATCH_DISTANCE) {
        setDetectionSuccess(true);
        timeoutId = setTimeout(() => {
          handleNext(imgWithScore?.image);
        }, 5000);
      }
    }

    () => {
      clearTimeout(timeoutId);
    };
  }, [matchDistance]);

  useEffect(() => {
    let timeoutId;
    console.log(imgWithScore);
    if (imgWithScore && !detectionSuccess) {
      setLoading(false);
      setDetectionCount((prev) => prev + 1);
      if (imgWithScore?.score > IMAGE_DETECTION_SCORE) {
        setDetectionSuccess(true);
        timeoutId = setTimeout(() => {
          handleNext(imgWithScore?.image);
        }, 2000);
      }
    }

    () => {
      clearTimeout(timeoutId);
    };
  }, [imgWithScore]);

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="max-w-[700px] flex flex-col items-center gap-4">
        {/* <p className="flex items-center text-2xl font-semibold text-gray-900">Road Safety-NearBuzz</p> */}
        <p className="text-xl font-medium leading-tight tracking-tight text-gray-900 h-8">
          {loading ? "Detecting face..." : detectionSuccess ? "Face Detection successful" : ""}
        </p>
        {userProfilePhoto ? (
          <WebcamFaceAuth2
            matchDistance={matchDistance}
            setMatchDistance={setMatchDistance}
            setImgWithScore={setImgWithScore}
            uploadedImageSrc={userProfilePhoto}
            img1Class={"hidden"}
            img2Class={"hidden"}
            camClass={{
              visbility: "hidden",
              position: "relative",
            }}
          />
        ) : (
          <WebcamFaceDetectAndCapture
            imgWithScore={imgWithScore}
            setImgWithScore={setImgWithScore}
            camClass={{
              visbility: "hidden",
              position: "relative",
            }}
            img1Class={"hidden"}
            img2Class={"hidden"}
          />
        )}
        <div className="flex flex-col items-center gap-2">
          <p className="text-lg font-medium leading-tight tracking-tight text-gray-900 h-8">
            {detectionSuccess ? `Welcome ${taskData?.violatorName},` : ""}
          </p>{" "}
          <p className="text-lg font-normal leading-tight tracking-tight text-gray-900 h-8">
            {detectionSuccess ? `Redirecting to home page...` : ""}
          </p>{" "}
        </div>
      </div>
    </div>
  );
}
