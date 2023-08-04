import React, { useEffect, useState } from "react";
import TopBar from "../../components/admin/TopBar";
import { Button, Card, CircularProgress } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { getAwarenessTasksById } from "../../services/services";
import { ROUTES } from "../../utils/constants";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function ViewAssessmentResult() {
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [awarenessTask, setAwarenessTask] = useState();
  const navigate = useNavigate();

  const result = awarenessTask?.completionDetails;

  const trackingDetails = awarenessTask?.trackingDetails;

  const { id } = useParams();

  const fetchAwarenessTaskById = async () => {
    try {
      setLoading(true);
      const res = await getAwarenessTasksById(id);
      console.log("response", res?.data);
      setAwarenessTask(res?.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      if (error.message) {
        setLoadError(error.message);
      } else {
        setLoadError("Error loading the data!");
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAwarenessTaskById();
  }, []);

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
        <div className="w-full flex justify-start items-center py-4">
          <Button
            onClick={() => {
              navigate(ROUTES.admin.listTasks);
            }}
            startIcon={<ArrowBackIcon />}
            variant="outlined"
            size="small"
          >
            Back
          </Button>
        </div>

        <div className="w-fulll max-w-[600px]">
          <p className="text-xl font-medium py-4">Task Completion Result</p>
          <Card>
            <div className="w-[500px] max-w-full p-4">
              <p className="text-xl font-medium"> Result Analysis</p>

              <div className="flex justify-start items-center gap-4 mt-4">
                <p>Total questions:</p>
                <p>{result?.total}</p>
              </div>

              <div className="flex justify-start items-center gap-4 mt-4">
                <p>Attempted:</p>
                <p>{result?.attempted}</p>
              </div>
              <div className="flex justify-start items-center gap-4 mt-4">
                <p>Correct:</p>
                <p>{result?.correct}</p>
              </div>

              <p className="text-xl font-medium mt-6">Tracking Details</p>

              <div className="flex justify-start items-center gap-4 mt-4">
                <p>Total Duration:</p>
                <p>{trackingDetails?.total} seconds</p>
              </div>

              <div className="flex justify-start items-center gap-4 mt-4">
                <p>Focus Duration:</p>
                <p>{trackingDetails?.tracked} seconds</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default ViewAssessmentResult;
