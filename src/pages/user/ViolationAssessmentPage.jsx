import React, { useContext, useEffect, useState } from "react";
import UserContext from "../../context/UserContent";
import { Navigate, useLocation, useNavigate, useParams } from "react-router-dom";
import { ROUTES, routes } from "../../utils/constants";
import { getAwarenessTasksById } from "../../services/services";
import TopBar from "../../components/TopBar";
import { CircularProgress } from "@mui/material";
import DetectUserFaceStep from "../../components/assessmentsSteps/DetectUserFaceStep";

function ViolationAssessmentPage() {
  const { user, handleDestinationSave } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [taskStep, setTaskStep] = useState(1);
  const [taskData, setTaskData] = useState(null);
  const [imgToCompare, setImgToCompare] = useState();
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  const fetchAwarenessTask = async () => {
    try {
      setLoading(true);
      const res = await getAwarenessTasksById(id);
      console.log("task response", res);
      setTaskData(res?.data);
      setLoading(false);
    } catch (error) {
      console.log("error", error);
      if (error.message) {
        setLoadError(error.message);
      } else {
        setLoadError("Error loading the data!");
      }
      setLoading(false);
    }
  };

  const handleSaveImage = (img) => {
    setImgToCompare(img);
  };

  useEffect(() => {
    fetchAwarenessTask();
  }, []);

  if (!user) {
    handleDestinationSave(location.pathname);
    return <Navigate to={ROUTES.user.login} />;
    // navigate(ROUTES.user.login);
  }

  if (loading) {
    return (
      <div className="w-full mb-20">
        <TopBar />
        <div className="max-w-full flex flex-col min-h-[50vh] items-center justify-center pt-20 mx-10">
          <CircularProgress size="3rem" />
        </div>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="w-full mb-20">
        <TopBar />
        <div className="max-w-full flex flex-col min-h-[50vh] items-center justify-center pt-20 mx-10">
          <p className="text-red-500 text-base ">{loadError}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full mb-20">
      <TopBar />
      <div className="max-w-full flex flex-col items-center justify-start pt-20 mx-10">
        {taskStep === 1 && (
          <DetectUserFaceStep setTaskStep={setTaskStep} taskData={taskData} handleSaveImage={handleSaveImage} />
        )}
      </div>
    </div>
  );
}

export default ViolationAssessmentPage;
