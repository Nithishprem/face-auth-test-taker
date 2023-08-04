import React, { useContext, useEffect, useRef, useState } from "react";
import { FormControl } from "@mui/base";
import { Button, Card, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";
import UserContext from "../context/UserContent";
import { Navigate, useNavigate } from "react-router-dom";
import TopBar from "../components/user/TopBar";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import WebcamFaceAuth2 from "../components/WebcamFaceAuth2";
import { BEST_MATCH_DISTANCE_VIGILANCE, ROAD_SAFETY_VIDEO } from "../utils/constants";

function AssessmentPage() {
  const { user } = useContext(UserContext);
  const [matchDistance, setMatchDistance] = React.useState(null);
  const [detectedUser, setDetectedUser] = useState(null);
  const [lastDetectedTime, setLastDetectedTime] = useState(0);
  const [detectionStarted, setDetectionStarted] = useState(false);
  const timerRef = useRef();

  const videoRef = useRef();

  const navigate = useNavigate();

  const handleResultNavigate = () => {
    // console.log("closeing", videoRef.current);
    videoRef.current?.pause();
    videoRef.current?.srcObject?.getTracks()[0]?.stop();
    navigate("/result");
  };

  // console.log("user", user);

  useEffect(() => {
    if (matchDistance && !detectionStarted) {
      setDetectionStarted(true);
    }

    if (detectionStarted) {
      if (matchDistance < BEST_MATCH_DISTANCE_VIGILANCE) {
        setDetectedUser(user.name);
      } else {
        setDetectedUser("unknown");
      }
      setLastDetectedTime(0);
      clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        setLastDetectedTime((prev) => prev + 1);
      }, 1000);
    }
  }, [matchDistance]);

  if (!user?.number) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div className="w-full mb-20">
      <TopBar />

      <div className="max-w-full">
        {/* <WebCamVigilence videoRef={videoRef} matchDistance={matchDistance} setMatchDistance={setMatchDistance} /> */}
        <WebcamFaceAuth2
          matchDistance={matchDistance}
          setMatchDistance={setMatchDistance}
          uploadedImageSrc={user.img}
          img1Class={"hidden"}
          img2Class={"hidden"}
          camClass={{
            visibility: "hidden",
            // position: "relative",
          }}
          canvasClass={{
            visibility: "hidden",
            position: "fixed",
            top: "-1000px",
            left: "-1000px",
          }}
        />
        <div className="h-20 pt-10">
          {detectionStarted && detectedUser && (
            <>
              <p className="text-lg text-center">Current user: {detectedUser}</p>
              <p className="text-base text-center mt-2">Last checked: {lastDetectedTime} seconds ago</p>
            </>
          )}
        </div>
      </div>

      <div className="w-full max-w-full flex justify-center items-center pt-10 overflow-x-hidden px-4">
        <TestComponent handleResultNavigate={handleResultNavigate} matchDistance={matchDistance} />
      </div>
    </div>
  );
}

export default AssessmentPage;

function TestComponent({ handleResultNavigate, matchDistance }) {
  const [videoPlayedOnce, setVideoPlayedOnce] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const [showIcon, setShowIcon] = useState(false);

  const videoRef = useRef(null);

  const handleTogglePlay = () => {
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleVideoEnded = () => {
    if (videoPlayedOnce) return;
    setVideoPlayedOnce(true);
    console.log("video played once");
  };

  const handleShowIcon = () => {
    setShowIcon(true);
  };

  const handleHideIcon = () => {
    if (!videoRef.current.paused) {
      setTimeout(() => {
        setShowIcon(false);
      }, 2000);
    }
  };

  return (
    <div className="max-w-[600px]">
      <Card>
        <div className="flex flex-col justify-center items-center p-4">
          <p className="text-xl font-medium">Watch the below video and answer the question that follows</p>

          {/* {matchDistance && <div className=" my-2 text-start">Match distance: {matchDistance}</div>} */}

          <div
            className="mt-4 w-full max-w-[400px] relative bg-gray-300 aspect-video"
            onMouseEnter={handleShowIcon}
            onMouseLeave={handleHideIcon}
            onMouseMove={handleShowIcon}
          >
            <video
              ref={videoRef}
              src={ROAD_SAFETY_VIDEO}
              controls={videoPlayedOnce}
              onEnded={handleVideoEnded}
              onLoadedData={handleShowIcon}
              // autoPlay
            ></video>

            {!videoPlayedOnce && showIcon && (
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white cursor-pointer p-2 rounded-full bg-black bg-opacity-30"
                onClick={handleTogglePlay}
              >
                {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
              </div>
            )}
          </div>
        </div>
      </Card>

      {videoPlayedOnce && <AssessmentForm handleResultNavigate={handleResultNavigate} />}
    </div>
  );
}

const AssessmentForm = ({ handleResultNavigate }) => {
  const { handleResultSave } = useContext(UserContext);
  const [questions, setquestions] = useState([
    {
      question: "Pedestrians can cross the road only at ?",
      options: {
        a: "anywhere",
        b: "signals",
        c: "zebra crossing",
        d: "none",
      },
      correctOption: "c",
      userOption: null,
    },
    {
      question: "Road Safety Week is celebrated in which month of the year?",
      options: {
        a: "January",
        b: "December",
        c: "March",
        d: "May",
      },
      correctOption: "a",
      userOption: null,
    },
    {
      question: "What is emergency number for ambulance service ?",
      options: {
        a: "108",
        b: "100",
        c: "106",
        d: "101",
      },
      correctOption: "a",
      userOption: null,
    },
    {
      question: "What are the causes for the road accidents?",
      options: {
        a: "Over Speeding",
        b: "Drunken Driving",
        c: "Distraction to Drivers",
        d: "All of these",
      },
      correctOption: "d",
      userOption: null,
    },
    {
      question: "Overtaking when approaching a bend is",
      options: {
        a: "permissible",
        b: "not permissible",
        c: "permissible with care",
        d: "our wish",
      },
      correctOption: "b",
      userOption: null,
    },
  ]);

  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleAnswer = (userOption, index) => {
    setquestions((prev) => {
      const copy = [...prev];
      copy[index] = {
        ...copy[index],
        userOption,
      };

      return copy;
    });
  };

  const handleSubmit = () => {
    setSubmitting(true);
    let correct = 0;
    let attempted = 0;
    questions?.forEach((question) => {
      if (question.userOption === question.correctOption) {
        correct += 1;
      }
      if (question.userOption) {
        attempted += 1;
      }
    });

    let result = { correct, attempted, total: questions?.length };
    handleResultSave(result);
    handleResultNavigate();
  };

  return (
    <div className=" mt-10">
      <p className="text-xl font-medium">Road Safety Quiz</p>

      <div className="w-full mt-6">
        {questions?.map((question, i) => {
          return (
            <div className="w-full mt-5" key={i}>
              <Card sx={{ padding: "20px" }} variant="outlined">
                <Question question={question} index={i} handleAnswer={handleAnswer} />
              </Card>
            </div>
          );
        })}
        <Question />
      </div>

      <div className="mt-6">
        <Button variant="contained" onClick={handleSubmit} disabled={submitting}>
          Submit
        </Button>
      </div>
    </div>
  );
};

const Question = ({ question, index, handleAnswer }) => {
  // console.log(question, question?.options);
  const handleChange = (e) => {
    // console.log(e.target.value, index);
    handleAnswer(e.target.value, index);
  };

  if (!question) return null;
  return (
    <div className="w-full">
      <FormControl>
        <FormLabel id="demo-controlled-radio-buttons-group">
          {index + 1}) {question?.question}
        </FormLabel>
        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={question?.userOption}
          onChange={handleChange}
        >
          {Object?.keys(question?.options)?.map((option, optIndex) => {
            return (
              <FormControlLabel
                value={option}
                key={optIndex}
                control={<Radio />}
                label={`${option.toUpperCase()}) ${question?.options[option]}`}
              />
            );
          })}
        </RadioGroup>
      </FormControl>
    </div>
  );
};
