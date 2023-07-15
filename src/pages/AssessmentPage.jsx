import React, { useContext, useEffect, useRef, useState } from "react";
import { FormControl } from "@mui/base";
import { Button, Card, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";
import UserContext from "../context/UserContent";
import { Navigate, useNavigate } from "react-router-dom";
import TopBar from "../components/TopBar";
import WebCamVigilence from "../components/WebCamVigilence";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";

function AssessmentPage() {
  const { user } = useContext(UserContext);

  const videoRef = useRef();

  const navigate = useNavigate();

  const handleResultNavigate = () => {
    // console.log("closeing", videoRef.current);
    videoRef.current?.pause();
    videoRef.current?.srcObject?.getTracks()[0]?.stop();
    navigate("/result");
  };

  console.log("user", user);

  if (!user?.snapshot || !user?.number) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div className="w-full mb-20">
      <TopBar />

      <div className="max-w-full hidden">
        <WebCamVigilence videoRef={videoRef} />
      </div>

      <div className="w-full max-w-full flex justify-center items-center pt-20 overflow-x-hidden px-4">
        <TestComponent handleResultNavigate={handleResultNavigate} />
      </div>
    </div>
  );
}

export default AssessmentPage;

function TestComponent({ handleResultNavigate }) {
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
    <div className="">
      {/* <Card> */}
      <div>
        <p className="mt-4 text-2xl font-medium">Watch the below video and answer the question that follows</p>

        <div
          className="mt-4 w-full max-w-[400px] relative"
          onMouseEnter={handleShowIcon}
          onMouseLeave={handleHideIcon}
          onMouseMove={handleShowIcon}
        >
          <video
            ref={videoRef}
            src="http://media.w3.org/2010/05/sintel/trailer.mp4"
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
      {/* </Card> */}

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
    <div className=" mt-8">
      <p className="text-2xl font-medium">Road Safety Quiz</p>

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
