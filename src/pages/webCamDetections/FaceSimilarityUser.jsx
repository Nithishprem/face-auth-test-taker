import React, { useEffect, useState } from "react";
import { USER } from "../../utils/constants";
import WebcamFaceAuth2 from "../../components/WebcamFaceAuth2";
import nithish from "../../assets/images/nithish3.jpeg";
import * as faceapi from "face-api.js";

function FaceSimilarityUser() {
  const [matchDistance, setMatchDistance] = useState(null);

  const [loading, setLoading] = useState(true);

  const [imgFromSrc, setImageFromSrc] = useState();

  const fetchImage = async () => {
    try {
      const image = await faceapi.fetchImage("https://roadsafety-assets.s3.ap-south-1.amazonaws.com/nithish3.jpeg");
      console.log("image", image);
      setImageFromSrc(image);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchImage();
  }, []);

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <WebcamFaceAuth2
        matchDistance={matchDistance}
        setMatchDistance={setMatchDistance}
        // uploadedImageSrc={nithish}
        // uploadedImageSrc={"https://roadsafety-assets.s3.ap-south-1.amazonaws.com/nithish3.jpeg"}
        uploadedImageSrc={imgFromSrc?.src}
        // img1Class={"hidden"}
        // img2Class={"hidden"}
        camClass={{
          visbility: "hidden",
          position: "relative",
        }}
      />
    </div>
  );
}

export default FaceSimilarityUser;
