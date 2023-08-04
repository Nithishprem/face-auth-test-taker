import React, { useState, useRef, useEffect } from "react";
import Webcam from "react-webcam";
import { Button, CircularProgress } from "@mui/material";
import * as faceapi from "face-api.js";

function WebcamFaceDetectAndCapture({
  imgWithScore,
  setImgWithScore,
  setMatchDistance,
  camClass,
  canvasClass,
  img2Class,
}) {
  const [modelsLoaded, setModelsLoaded] = useState(false);
  //   const [matchDistance, setMatchDistance] = useState(null);
  const [capturingInterval, setCapturingInterval] = useState(null);
  //   const [imageSrc, setImageSrc] = useState("");

  // console.log("webcam src", uploadedImageSrc);

  //   const imgRef1 = useRef();
  const imgRef2 = useRef();
  const webcamRef = useRef();
  //   const canvasRef1 = useRef();
  const canvasRef2 = useRef();
  const canvasRef3 = useRef();

  //   async function compareImages() {
  //     try {
  //       //   console.log("models loaded", modelsLoaded);
  //       if (modelsLoaded && imgRef1.current && imgRef2.current) {
  //         const img1 = imgRef1.current;
  //         const img2 = imgRef2.current;

  //         // Create new image elements to ensure images are loaded
  //         const newImg1 = new Image();
  //         const newImg2 = new Image();

  //         // Set the image source to the dataURL of the uploaded images
  //         newImg1.src = img1.src;
  //         newImg2.src = img2.src;

  //         // Wait for the images to load
  //         // await Promise.all([newImg1.onload, newImg2.onload]);

  //         const [img1Loaded, img2Loaded] = await Promise.all([
  //           new Promise((resolve) => {
  //             newImg1.onload = () => resolve(true);
  //             newImg1.src = img1.src;
  //           }),
  //           new Promise((resolve) => {
  //             newImg2.onload = () => resolve(true);
  //             newImg2.src = img2.src;
  //           }),
  //         ]);

  //         if (img1Loaded && img2Loaded) {
  //           const canvas1 = canvasRef1.current;
  //           const canvas2 = canvasRef2.current;
  //           const ctx1 = canvas1.getContext("2d");
  //           const ctx2 = canvas2.getContext("2d");

  //           // Set canvas dimensions
  //           canvas1.width = img1.width;
  //           canvas1.height = img1.height;
  //           canvas2.width = img2.width;
  //           canvas2.height = img2.height;

  //           // Draw the images on the canvas
  //           ctx1.drawImage(newImg1, 0, 0, img1.width, img1.height);
  //           ctx2.drawImage(newImg2, 0, 0, img2.width, img2.height);

  //           // Detect faces in the images
  //           const detections1 = await faceapi.detectSingleFace(canvas1).withFaceLandmarks().withFaceDescriptor();
  //           const detections2 = await faceapi.detectSingleFace(canvas2).withFaceLandmarks().withFaceDescriptor();

  //           //   console.log("detection1", detections1);
  //           //   console.log("detection2", detections2);

  //           if (canvasRef3.current && detections2) {
  //             const canvas3 = canvasRef3.current;
  //             const size = {
  //               width: img2.width,
  //               height: img2.height,
  //             };
  //             faceapi.matchDimensions(canvas3, size);
  //             const resizedDetections = faceapi.resizeResults(detections2, size);

  //             canvas3.getContext("2d").clearRect(0, 0, canvas3.width, canvas3.height);
  //             faceapi.draw.drawDetections(canvas3, resizedDetections);
  //             faceapi.draw.drawFaceLandmarks(canvas3, resizedDetections);
  //             console.log("resizedDetections", resizedDetections);
  //           }

  //           if (detections1 && detections2) {
  //             // Draw face detection features on canvas
  //             faceapi.draw.drawDetections(canvas1, detections1);
  //             faceapi.draw.drawFaceLandmarks(canvas1, detections1);

  //             faceapi.draw.drawDetections(canvas2, detections2);
  //             faceapi.draw.drawFaceLandmarks(canvas2, detections2);

  //             // Get face descriptors
  //             const descriptors1 = [detections1.descriptor];
  //             const descriptors2 = [detections2.descriptor];

  //             // console.log("Descriptors1:", JSON.stringify(descriptors1));
  //             // console.log("Descriptors2:", JSON.stringify(descriptors2));

  //             // Compare face descriptors
  //             const distance = faceapi.euclideanDistance(descriptors1[0], descriptors2[0]);
  //             console.log("Image similarity distance:", distance);

  //             setMatchDistance(distance);
  //           } else {
  //             console.log("Could not detect face(s) in the image(s).");
  //             setMatchDistance(null);
  //           }
  //         }

  //         // Get the canvas context
  //       }
  //     } catch (error) {
  //       console.log("Error:", error.message);
  //     }
  //   }

  async function detectFaceFromImage() {
    try {
      //   console.log("models loaded", modelsLoaded);
      if (modelsLoaded && imgRef2.current) {
        const img2 = imgRef2.current;

        // Create new image elements to ensure images are loaded
        const newImg2 = new Image();

        // Set the image source to the dataURL of the uploaded images
        newImg2.src = img2.src;

        // Wait for the images to load
        // await Promise.all([newImg1.onload, newImg2.onload]);

        const [img2Loaded] = await Promise.all([
          new Promise((resolve) => {
            newImg2.onload = () => resolve(true);
            newImg2.src = img2.src;
          }),
        ]);

        if (img2Loaded) {
          const canvas2 = canvasRef2.current;
          const ctx2 = canvas2.getContext("2d");

          // Set canvas dimensions
          canvas2.width = img2.width;
          canvas2.height = img2.height;

          // Draw the images on the canvas
          ctx2.drawImage(newImg2, 0, 0, img2.width, img2.height);

          // Detect faces in the images
          const detections2 = await faceapi.detectSingleFace(canvas2).withFaceLandmarks().withFaceDescriptor();

          //   console.log("detection1", detections1);
          //   console.log("detection2", detections2);
          //   console.log("detection1 score", detections2?.detection?._score);

          if (canvasRef3.current && detections2) {
            const canvas3 = canvasRef3.current;
            const size = {
              width: img2.width,
              height: img2.height,
            };
            faceapi.matchDimensions(canvas3, size);
            const resizedDetections = faceapi.resizeResults(detections2, size);

            canvas3.getContext("2d").clearRect(0, 0, canvas3.width, canvas3.height);
            faceapi.draw.drawDetections(canvas3, resizedDetections);
            faceapi.draw.drawFaceLandmarks(canvas3, resizedDetections);
            console.log("resizedDetections", resizedDetections);
          }

          if (detections2) {
            // Draw face detection features on canvas

            faceapi.draw.drawDetections(canvas2, detections2);
            faceapi.draw.drawFaceLandmarks(canvas2, detections2);

            // Get face descriptors
            // const descriptors2 = [detections2.descriptor];
            let data = {
              image: img2.src,
              score: detections2?.detection?._score,
            };

            setImgWithScore(data);

            // console.log("Descriptors2:", JSON.stringify(descriptors2));
          } else {
            console.log("Could not detect face(s) in the image(s).");
            // setMatchDistance(null);
          }
        }

        // Get the canvas context
      }
    } catch (error) {
      console.log("Error:", error.message);
    }
  }

  async function captureWebcamImage() {
    // console.log("models loaded", modelsLoaded);
    try {
      if (modelsLoaded && webcamRef.current) {
        const webcamImage = webcamRef.current.getScreenshot();
        if (webcamImage) {
          // Set the captured webcam image as the source for the second image
          imgRef2.current.src = webcamImage;
          //   imgRef1.current.src = imageSrc;

          // detect face from captured image
          detectFaceFromImage();
        }
      }
    } catch (error) {
      console.log("Error capturing webcam image:", error.message);
    }
  }

  const handleCompareClick = () => {
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
      //   setTimeout(() => {
      //     handleCompareClick();
      //   }, 3000);
    });
  };

  useEffect(() => {
    loadModels();

    return () => {
      clearInterval(capturingInterval);
    };
  }, []);

  // Use the uploadedImageSrc prop as the source for the first image
  //   useEffect(() => {
  //     setImageSrc(uploadedImageSrc);
  //   }, [uploadedImageSrc]);

  useEffect(() => {
    if (modelsLoaded) {
      // Start capturing images at the specified interval (e.g., 5 seconds)
      const interval = setInterval(() => {
        captureWebcamImage();
      }, 3000); // Adjust the interval as needed (in milliseconds)

      setCapturingInterval(interval);
    }

    return () => {
      clearInterval(capturingInterval);
    };
  }, [modelsLoaded]);

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
                style={
                  camClass
                    ? {
                        display: "block",
                        maxWidth: "300px",
                        maxHeight: "300px",
                        position: "fixed",
                        bottom: 0,
                        right: 0,
                        ...camClass,
                      }
                    : {
                        display: "block",
                        maxWidth: "300px",
                        maxHeight: "300px",
                        position: "fixed",
                        bottom: 0,
                        right: 0,
                      }
                }
              />
              <canvas ref={canvasRef3} style={canvasClass ? canvasClass : { position: "absolute", top: 0, left: 0 }} />
            </div>
          </div>

          <div className="flex justify-center gap-4 mt-10">
            {/* <div>
              <div style={{ position: "relative" }} className={`${img1Class}`}>
                <img
                  ref={imgRef1}
                  src={imageSrc}
                  alt="Image 1"
                  style={{ display: "block", maxWidth: "300px", maxHeight: "300px" }}
                />
                <canvas
                  ref={canvasRef1}
                  style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
                />
              </div>
            </div> */}

            <div>
              <div style={{ position: "relative" }} className={`${img2Class}`}>
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
        </div>
      )}
    </div>
  );
}

export default WebcamFaceDetectAndCapture;
