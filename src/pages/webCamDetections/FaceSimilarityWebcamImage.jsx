import React, { useState, useRef, useEffect } from "react";
import Webcam from "react-webcam";
import { Button, CircularProgress } from "@mui/material";
import { BEST_MATCH_DISTANCE } from "../../utils/constants";
import * as faceapi from "face-api.js";
import { Link } from "react-router-dom";

function FaceSimilarityWebcamImage() {
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [matchDistance, setMatchDistance] = useState(null);
  const [capturingInterval, setCapturingInterval] = useState(null);

  const imgRef1 = useRef();
  const imgRef2 = useRef();
  const webcamRef = useRef();
  const canvasRef1 = useRef();
  const canvasRef2 = useRef();

  const handleImageUpload = (event, imageRef) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      if (reader.result) {
        imageRef.current.src = reader.result;
      }
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  async function compareImages() {
    try {
      if (modelsLoaded && imgRef1.current && imgRef2.current) {
        const img1 = imgRef1.current;
        const img2 = imgRef2.current;

        // Create new image elements to ensure images are loaded
        const newImg1 = new Image();
        const newImg2 = new Image();

        // Set the image source to the dataURL of the uploaded images
        newImg1.src = img1.src;
        newImg2.src = img2.src;

        // Wait for the images to load
        await Promise.all([newImg1.onload, newImg2.onload]);

        // Get the canvas context
        const canvas1 = canvasRef1.current;
        const canvas2 = canvasRef2.current;
        const ctx1 = canvas1.getContext("2d");
        const ctx2 = canvas2.getContext("2d");

        // Set canvas dimensions
        canvas1.width = img1.width;
        canvas1.height = img1.height;
        canvas2.width = img2.width;
        canvas2.height = img2.height;

        // Draw the images on the canvas
        ctx1.drawImage(newImg1, 0, 0, img1.width, img1.height);
        ctx2.drawImage(newImg2, 0, 0, img2.width, img2.height);

        // Detect faces in the images
        const detections1 = await faceapi.detectSingleFace(canvas1).withFaceLandmarks().withFaceDescriptor();
        const detections2 = await faceapi.detectSingleFace(canvas2).withFaceLandmarks().withFaceDescriptor();

        console.log("detection1 score", detections1?.detection?._score);
        console.log("detection2 score", detections2?.detection?._score);

        if (detections1 && detections2) {
          // Draw face detection features on canvas
          faceapi.draw.drawDetections(canvas1, detections1);
          faceapi.draw.drawFaceLandmarks(canvas1, detections1);

          faceapi.draw.drawDetections(canvas2, detections2);
          faceapi.draw.drawFaceLandmarks(canvas2, detections2);

          // Get face descriptors
          const descriptors1 = [detections1.descriptor];
          const descriptors2 = [detections2.descriptor];

          // console.log("Descriptors1:", JSON.stringify(descriptors1));
          // console.log("Descriptors2:", JSON.stringify(descriptors2));

          // Compare face descriptors
          const distance = faceapi.euclideanDistance(descriptors1[0], descriptors2[0]);
          console.log("Image similarity distance:", distance);

          setMatchDistance(distance);
        } else {
          console.log("Could not detect face(s) in the image(s).");
          setMatchDistance(null);
        }
      }
    } catch (error) {
      console.log("Error:", error.message);
    }
  }

  async function captureWebcamImage() {
    try {
      if (modelsLoaded && webcamRef.current) {
        const webcamImage = webcamRef.current.getScreenshot();
        if (webcamImage) {
          // Set the captured webcam image as the source for the second image
          imgRef2.current.src = webcamImage;

          // Compare the captured image with the uploaded image
          compareImages();
        }
      }
    } catch (error) {
      console.log("Error capturing webcam image:", error.message);
    }
  }

  const handleCompareClick = () => {
    // Start capturing images at the specified interval (e.g., 5 seconds)
    const interval = setInterval(() => {
      captureWebcamImage();
    }, 3000); // Adjust the interval as needed (in milliseconds)

    setCapturingInterval(interval);
  };

  const loadModels = async () => {
    const MODEL_URL = "../../models";

    Promise.all([
      faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
      faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
      faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
    ]).then(() => {
      console.log("loaded");
      setModelsLoaded(true);
    });
  };

  useEffect(() => {
    loadModels();

    return () => {
      clearInterval(capturingInterval);
    };
  }, []);

  return (
    <div className="flex flex-col justify-center items-center">
      {!modelsLoaded && <CircularProgress size="3rem" />}
      {modelsLoaded && (
        <div>
          <div className="flex flex-col items-center gap-4">
            <div style={{ position: "relative" }}>
              <Webcam
                audio={false}
                mirrored={true}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                style={{ display: "block", maxWidth: "300px", maxHeight: "300px" }}
              />
            </div>
            <Button variant="contained" onClick={handleCompareClick}>
              Start Capturing and Comparing Images
            </Button>
          </div>

          <div className="flex justify-center gap-4 mt-10">
            <div>
              <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, imgRef1)} />
              <div style={{ position: "relative" }} className="">
                <img
                  ref={imgRef1}
                  src={""}
                  alt="Image 1"
                  style={{ display: "block", maxWidth: "300px", maxHeight: "300px" }}
                />
                <canvas
                  ref={canvasRef1}
                  style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
                />
              </div>
            </div>

            <div>
              <div style={{ position: "relative" }} className="">
                <img
                  ref={imgRef2}
                  src=""
                  alt="Image 2"
                  style={{ display: "block", maxWidth: "300px", maxHeight: "300px" }}
                />
                <canvas
                  ref={canvasRef2}
                  style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
                />
              </div>
            </div>
          </div>

          {matchDistance !== null && <div className="text-center">Image similarity distance: {matchDistance}</div>}
          <Button>
            <Link className="mt-10" to={"/webcam-facematch"}>
              Face matcher
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}

export default FaceSimilarityWebcamImage;
