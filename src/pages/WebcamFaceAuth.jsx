import * as faceapi from "face-api.js";
import React, { useEffect } from "react";
import { BEST_MATCH_DISTANCE, USER } from "../utils/constants";
import { saveAs } from "file-saver";
import { Button, CircularProgress } from "@mui/material";

function WebcamFaceAuth({ handleAuthSuccess }) {
  const [modelsLoaded, setModelsLoaded] = React.useState(false);
  const [captureVideo, setCaptureVideo] = React.useState(false);
  const [matchDistance, setMatchDistance] = React.useState(null);

  const videoRef = React.useRef();
  const videoHeight = 480;
  const videoWidth = 640;
  const canvasRef = React.useRef();
  const imgRef = React.useRef();
  const intervalRef = React.useRef();

  React.useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = "../../models";

      Promise.all([
        // faceapi.loadMtcnnModel(MODEL_URL),
        // faceapi.loadFaceRecognitionModel(MODEL_URL),
        faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
        // faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        // faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
      ]).then(() => {
        setModelsLoaded(true);
        startVideo();
      });
    };
    loadModels();
  }, []);

  useEffect(() => {
    if (modelsLoaded) {
      console.log("modelsLoaded", modelsLoaded);
    }
  }, [modelsLoaded]);

  const startVideo = () => {
    setCaptureVideo(true);
    navigator.mediaDevices
      .getUserMedia({ video: { width: 300 } })
      .then((stream) => {
        let video = videoRef.current;
        video.srcObject = stream;
        video.play();
      })
      .catch((err) => {
        console.error("error:", err);
      });
  };

  const handleVideoOnPlay = () => {
    intervalRef.current = setInterval(async () => {
      try {
        if (canvasRef && canvasRef.current && modelsLoaded) {
          const video = videoRef.current;
          const canvas = canvasRef.current;

          const displaySize = {
            width: video.offsetWidth,
            height: video.offsetHeight,
          };

          console.log("T_1");

          faceapi.matchDimensions(canvas, displaySize);

          const detections = await faceapi.detectAllFaces(video).withFaceLandmarks().withFaceDescriptors();
          const resizedDetections = faceapi.resizeResults(detections, displaySize);

          canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
          faceapi.draw.drawDetections(canvas, resizedDetections);
          faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
          console.log("resizedDetections", resizedDetections);

          if (resizedDetections.length > 0) {
            const faceMatcher = new faceapi.FaceMatcher(resizedDetections);
            const userImageDescriptor = await faceapi.computeFaceDescriptor(imgRef.current);
            const bestMatch = faceMatcher.findBestMatch(userImageDescriptor);
            console.log("match result", bestMatch.toString()); // Perform authentication or display result
            setMatchDistance(bestMatch.distance);
            if (bestMatch.distance < BEST_MATCH_DISTANCE) {
              takeSnapshot(video);
            }
          }
        }
      } catch (error) {
        console.log("err msg", error.message);
      }
    }, 1000);
  };

  const takeSnapshot = (video) => {
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
    const snapshotDataUrl = canvas.toDataURL("image/png");
    closeWebcam();
    handleAuthSuccess?.(snapshotDataUrl);

    // canvas.toBlob((blob) => {
    //   saveAs(blob, "snapshot.png");
    //   closeWebcam();
    // });
  };

  const closeWebcam = () => {
    videoRef.current?.pause();
    videoRef.current?.srcObject.getTracks()[0].stop();
    setCaptureVideo(false);
    clearInterval(intervalRef.current);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      {!modelsLoaded && <CircularProgress size="3rem" />}
      {/* <div style={{ textAlign: "center", padding: "10px" }}>
        {captureVideo && modelsLoaded ? (
          <Button
            onClick={closeWebcam}
            variant="contained"
            // style={{
            //   cursor: "pointer",
            //   backgroundColor: "green",
            //   color: "white",
            //   padding: "15px",
            //   fontSize: "25px",
            //   border: "none",
            //   borderRadius: "10px",
            // }}
          >
            Close Webcam
          </Button>
        ) : (
          <Button
            onClick={startVideo}
            variant="contained"
            // style={{
            //   cursor: "pointer",
            //   backgroundColor: "green",
            //   color: "white",
            //   padding: "15px",
            //   fontSize: "25px",
            //   border: "none",
            //   borderRadius: "10px",
            // }}
          >
            Open Webcam
          </Button>
        )}
      </div> */}
      {captureVideo ? (
        modelsLoaded ? (
          <div>
            <div style={{ display: "flex", justifyContent: "center", padding: "10px" }}>
              <video
                ref={videoRef}
                height={videoHeight}
                width={videoWidth}
                onPlay={handleVideoOnPlay}
                style={{ borderRadius: "10px" }}
              />
              <canvas ref={canvasRef} style={{ position: "absolute" }} />
            </div>
            {matchDistance && <div className="text-center">Match distance: {matchDistance}</div>}
          </div>
        ) : (
          <div>loading...</div>
        )
      ) : (
        <></>
      )}

      <div>
        <img id="user-image" ref={imgRef} src={USER.img} alt="User" style={{ display: "none" }} />
      </div>
    </div>
  );
}

export default WebcamFaceAuth;
