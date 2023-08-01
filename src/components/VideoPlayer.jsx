import React from "react";

function VideoPlayer() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <video
        src="https://s3.ap-south-1.amazonaws.com/dev.upstar.io.output-media/face-auth-poc/Road+Safety+Awareness+Video+(Animation)+for+Children.mp4"
        // src="http://media.w3.org/2010/05/sintel/trailer.mp4"
        controls
        className="w-[400px] aspect-video"
      ></video>
    </div>
  );
}

export default VideoPlayer;
