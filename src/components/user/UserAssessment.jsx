import React, { useContext, useEffect, useRef, useState } from "react";
import { FormControl } from "@mui/base";
import { Button, Card, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";
import UserContext from "../../context/UserContent";
import { Navigate, useNavigate } from "react-router-dom";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import { BEST_MATCH_DISTANCE_VIGILANCE, TASK_STATUS } from "../../utils/constants";
import WebcamFaceAuth2 from "../WebcamFaceAuth2";
import { updateAwarenessTaskById } from "../../services/services";
import { LoadingButton } from "@mui/lab";

function UserAssessment({ setTaskStep, taskData, setTaskData, imgToCompare }) {
  //   console.log("capturedImage", imgToCompare);
  // console.log(taskData);
  let violationType = taskData?.awarenessContent?.violationType;

  const { user } = useContext(UserContext);
  const [matchDistance, setMatchDistance] = React.useState(null);
  const [detectedUser, setDetectedUser] = useState(null);
  const [lastDetectedTime, setLastDetectedTime] = useState(0);
  const [detectionStarted, setDetectionStarted] = useState(false);
  const [totalTime, setTotalTime] = useState(0);
  const [trackedTime, setTrackedTime] = useState(0);
  const timerRef = useRef();
  const totalTimerRef = useRef();

  const videoRef = useRef();

  const navigate = useNavigate();

  const handleResultNavigate = () => {
    // console.log("closeing", videoRef.current);
    videoRef.current?.pause();
    videoRef.current?.srcObject?.getTracks()[0]?.stop();
    // navigate("/result");
    clearInterval(totalTimerRef.current);
    setTaskStep(3);
  };

  // console.log("user", user);

  useEffect(() => {
    if (matchDistance && !detectionStarted) {
      setDetectionStarted(true);
    }

    if (detectionStarted) {
      if (matchDistance < BEST_MATCH_DISTANCE_VIGILANCE) {
        setDetectedUser(user.name);
        setTrackedTime((prev) => prev + 3000);
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

  useEffect(() => {
    let totalTimer;
    if (detectionStarted) {
      totalTimer = setInterval(() => {
        setTotalTime((prev) => prev + 1000);
      }, 1000);
      totalTimerRef.current = totalTimer;
    }

    return () => {
      clearInterval(totalTimer);
    };
  }, [detectionStarted]);

  return (
    <div className="w-full">
      <div className="max-w-full">
        <WebcamFaceAuth2
          matchDistance={matchDistance}
          setMatchDistance={setMatchDistance}
          uploadedImageSrc={imgToCompare}
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
        <div className="w-full">
          <p className="text-xl font-medium text-center">Your Awareness Task</p>
          <p className="text-base font-normal text-[#757575] text-center">for {violationType} violation </p>
        </div>
      </div>

      <div className="w-full max-w-full flex justify-center items-center pt-5 overflow-x-hidden">
        <TestComponent
          handleResultNavigate={handleResultNavigate}
          matchDistance={matchDistance}
          taskData={taskData}
          setTaskData={setTaskData}
          detectionStarted={detectionStarted}
          detectedUser={detectedUser}
          lastDetectedTime={lastDetectedTime}
          trackingResult={{
            total: totalTime / 1000,
            tracked: trackedTime / 1000,
          }}
        />
      </div>
    </div>
  );
}

export default UserAssessment;

function TestComponent({
  handleResultNavigate,
  matchDistance,
  taskData,
  setTaskData,
  detectedUser,
  detectionStarted,
  lastDetectedTime,
  trackingResult,
}) {
  let awarenessVideo = taskData?.awarenessContent?.awarenessVideo;
  let questionsData = taskData?.awarenessContent?.questions;

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
    console.log("player ended");
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
          <p className="text-lg font-medium">Watch the below video and answer the question that follows</p>

          {/* {matchDistance && <div className=" my-2 text-start">Match distance: {matchDistance}</div>} */}

          <div
            className="mt-4 w-full relative bg-gray-300 aspect-video"
            onMouseEnter={handleShowIcon}
            onMouseLeave={handleHideIcon}
            onMouseMove={handleShowIcon}
          >
            <video
              ref={videoRef}
              src={awarenessVideo}
              // controls={true}
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

      {/* <div className="h-10 pt-4">
        {detectionStarted && detectedUser && (
          <>
            <p className="text-lg text-center">Violatation: {violationType}</p>
            <p className="text-lg text-center">Current user: {detectedUser}</p>
            <p className="text-base text-center mt-2">Last checked: {lastDetectedTime} seconds ago</p>
          </>
        )}
      </div> */}

      {videoPlayedOnce && (
        <AssessmentForm
          handleResultNavigate={handleResultNavigate}
          questionsData={questionsData}
          taskData={taskData}
          setTaskData={setTaskData}
          trackingResult={trackingResult}
        />
      )}
    </div>
  );
}

const AssessmentForm = ({ handleResultNavigate, questionsData, taskData, setTaskData, trackingResult }) => {
  const { handleResultSave } = useContext(UserContext);
  const [questions, setQuestions] = useState(
    questionsData?.map((item) => ({ question: item?.question, options: item?.options, userOption: null }))
  );

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const navigate = useNavigate();

  const handleAnswer = (value, index) => {
    setQuestions((prev) => {
      const copy = [...prev];
      const question = copy[index];
      const userOption = question?.options?.find((item) => item?.option === value);
      copy[index] = {
        ...copy[index],
        userOption,
      };

      return copy;
    });
  };

  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      let correct = 0;
      let attempted = 0;
      questions?.forEach((question) => {
        if (question.userOption?.isCorrect) {
          correct += 1;
        }
        if (question.userOption) {
          attempted += 1;
        }
      });

      let result = { correct, attempted, total: questions?.length };
      const body = {
        completionDetails: result,
        status: TASK_STATUS.completed,
        trackingDetails: trackingResult,
      };

      const res = await updateAwarenessTaskById(body, taskData?.id);

      console.log("task data response", res);
      setTaskData(res?.data);
      setSubmitting(false);
      // handleResultSave(result);
      handleResultNavigate();
    } catch (error) {
      console.log("error", error);
      if (error?.message) {
        setSubmitError(error?.message);
      } else {
        setSubmitError("Error submitting the result");
      }

      setSubmitting(false);
    }
  };

  useEffect(() => {
    console.log("questions", questions);
  }, [questions]);

  return (
    <div className=" mt-10">
      <p className="text-lg font-medium">Road Safety Awareness Quiz</p>

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

      <div className="mt-6 flex flex-col items-center justify-center gap-4">
        <p className={`h-6 text-red-500 text-sm ${submitError ? "" : "invisible"}`}>{submitError}</p>

        <LoadingButton
          variant="contained"
          sx={{
            width: "200px",
          }}
          onClick={handleSubmit}
          loading={submitting}
        >
          <span>Submit</span>
        </LoadingButton>
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
          value={question?.userOption?.option ?? null}
          onChange={handleChange}
        >
          {question?.options?.map((option, optIndex) => {
            return (
              <FormControlLabel value={option?.option} key={optIndex} control={<Radio />} label={`${option?.option}`} />
            );
          })}
        </RadioGroup>
      </FormControl>
    </div>
  );
};
