import React, { useContext, useEffect } from "react";
import UserContext from "../context/UserContent";
import { CircularProgress } from "@mui/material";
import * as faceapi from "face-api.js";
import { BEST_MATCH_DISTANCE, BEST_MATCH_DISTANCE_VIGILANCE } from "../utils/constants";

function WebCamVigilence({ videoRef }) {
  const [modelsLoaded, setModelsLoaded] = React.useState(false);
  const [captureVideo, setCaptureVideo] = React.useState(false);
  const { user } = useContext(UserContext);

  // const videoRef = React.useRef();
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
            width: video.videoWidth,
            height: video.videoHeight,
          };

          faceapi.matchDimensions(canvas, displaySize);

          const detections = await faceapi.detectAllFaces(video).withFaceLandmarks().withFaceDescriptors();
          const resizedDetections = faceapi.resizeResults(detections, displaySize);

          canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
          faceapi.draw.drawDetections(canvas, resizedDetections);
          faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);

          if (resizedDetections.length > 0) {
            const faceMatcher = new faceapi.FaceMatcher(resizedDetections);
            const userImageDescriptor = await faceapi.computeFaceDescriptor(imgRef.current);
            const bestMatch = faceMatcher.findBestMatch(userImageDescriptor);
            // console.log("match result", bestMatch.toString()); // Perform authentication or display result
            if (bestMatch.distance < BEST_MATCH_DISTANCE_VIGILANCE) {
              console.log("user match", true, bestMatch.distance);
            } else {
              console.log("user match", false, bestMatch.distance);
            }
          }
        }
      } catch (error) {
        console.log("err msg", error.message);
      }
    }, 3000);
  };

  const closeWebcam = () => {
    console.log("closeing", videoRef.current);
    videoRef.current?.pause();
    videoRef.current?.srcObject?.getTracks()[0]?.stop();
    setCaptureVideo(false);
    clearInterval(intervalRef.current);
    console.log("closed");
  };

  useEffect(() => {
    return () => {
      closeWebcam();
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

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
          </div>
        ) : (
          <div>loading...</div>
        )
      ) : (
        <></>
      )}

      <div>
        <img id="user-image" ref={imgRef} src={user.snapshot} alt="User" style={{ display: "none" }} />
      </div>
    </div>
  );
}

export default WebCamVigilence;
