import { useEffect, useState } from "react";
import { ReactComponent as LockIcon } from "../assets/browser-lock-icon.svg";
import { CircularProgress } from "@mui/material";

function PermissionHandler({ setVideoDevices, handlePermissionsLoaded }) {
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
      <div className="w-[80vw] h-[70vw] p-4 flex justify-between items-center bg-gray-50">
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

export default PermissionHandler;
