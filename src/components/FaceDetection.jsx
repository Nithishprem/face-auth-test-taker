import { CircularProgress } from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import { ReactComponent as LockIcon } from "../assets/browser-lock-icon.svg";
import UserContext from "../context/UserContent";
import { BEST_MATCH_DISTANCE, USER } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import WebcamFaceAuth from "../pages/WebcamFaceAuth";
import WebcamFaceAuth2 from "./WebcamFaceAuth2";

function FaceDetection({ number }) {
  const [videoDevices, setVideoDevices] = useState(null);
  const [loadingPermissions, setLoadingPermissions] = useState(true);

  const handlePermissionsLoaded = () => {
    setLoadingPermissions(false);
  };

  if (loadingPermissions) {
    return <Permissionhandler setVideoDevices={setVideoDevices} handlePermissionsLoaded={handlePermissionsLoaded} />;
  }

  return <FaceAuthenticate videoDevices={videoDevices} number={number} />;
}

export default FaceDetection;

function Permissionhandler({ setVideoDevices, handlePermissionsLoaded }) {
  const [permissionDenied, setPermissionDenied] = useState(false);

  const [loadpermissions, setLoadingPermissions] = useState(true);

  const handlePermission = () => {
    setLoadingPermissions(true);
    setPermissionDenied(false);
    navigator.mediaDevices
      .getUserMedia({ audio: true, video: true })
      .then((stream) => {
        navigator.mediaDevices.enumerateDevices().then(function (devices) {
          console.log(devices);
          const videoDevices = devices.filter(function (device) {
            return device.kind === "videoinput";
          });
          setVideoDevices(videoDevices);
          setLoadingPermissions(false);
          handlePermissionsLoaded();
          stream.getTracks().forEach((x) => x.stop());
        });
      })
      .catch((error) => {
        console.log(error);
        setPermissionDenied(true);
      });
  };

  useEffect(() => {
    handlePermission();
  }, []);

  if (permissionDenied) {
    return (
      <div className="w-screen h-screen p-4 flex justify-between items-center bg-gray-50">
        <div className="w-full max-w-500px bg-white rounded-lg">
          <div className="w-full h-full flex flex-col items-center justify-center relative">
            <p className="text-xl text-secondary font-medium text-center mb-2">Permission Denied</p>
            <p className="text-base text-secondary text-center">
              Permissions for accessing camera and microphone should be granted for recording media.
              <br /> Click on <LockIcon className="w-4 h-4 inline-block" /> icon to the left of address bar and allow
              camera and microphone permissions to grant access and click allow button
            </p>

            <button className="primaryButtonOutlined w-[200px] mt-10" onClick={handlePermission}>
              Allow
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-screen h-screen p-4 flex justify-between items-center bg-gray-50">
      <div className="w-full max-w-500px bg-white rounded-lg">
        <div className="w-full aspect-video bg-recorderDarkbg flex items-center justify-center rounded-t overflow-hidden">
          <CircularProgress size="3rem" />
        </div>
      </div>
    </div>
  );
}

function FaceAuthenticate({ number }) {
  const { handleLogin } = useContext(UserContext);
  const [matchDistance, setMatchDistance] = useState(null);
  const navigate = useNavigate();

  const handleAuthSuccess = (snapshot) => {
    let user = {
      number: number,
      snapshot: snapshot,
    };
    handleLogin(user);
    navigate("/assessment");
  };

  const handleAuthenticationFailed = () => {};

  useEffect(() => {
    if (matchDistance && matchDistance < BEST_MATCH_DISTANCE) {
      handleAuthSuccess();
    }
  }, [matchDistance]);

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      {/* <WebcamFaceAuth handleAuthSuccess={handleAuthSuccess} /> */}
      <WebcamFaceAuth2
        matchDistance={matchDistance}
        setMatchDistance={setMatchDistance}
        uploadedImageSrc={USER.img}
        img1Class={"hidden"}
        img2Class={"hidden"}
        camClass={{
          visbility: "hidden",
          position: "relative",
        }}
      />
    </div>
  );
}
