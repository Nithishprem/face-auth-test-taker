import { Card } from "@mui/material";
import React from "react";

function AssessmentResult({ taskData }) {
  const result = taskData?.completionDetails;
  const trackingDetails = taskData?.trackingDetails;

  console.log("assessment result", taskData);

  return (
    <div className="w-full">
      <div className="w-full mx-auto max-w-[600px]">
        <p className="text-2xl font-medium my-4">Awareness Task Result</p>
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

            <p className="text-xl font-medium mt-6"> Tracking Details</p>

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
  );
}

export default AssessmentResult;
