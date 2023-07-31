import React, { useState } from "react";
import { USER } from "../utils/constants";
import WebcamFaceAuth2 from "../components/WebcamFaceAuth2";

function FaceSimilarityUser() {
  const [matchDistance, setMatchDistance] = useState(null);
  const imgSrc = USER.img;

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <WebcamFaceAuth2
        matchDistance={matchDistance}
        setMatchDistance={setMatchDistance}
        uploadedImageSrc={imgSrc}
        // uploadedImageSrc={"https://s3.ap-south-1.amazonaws.com/dev.upstar.io.output-media/face-auth-poc/nithish3.jpeg"}
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
