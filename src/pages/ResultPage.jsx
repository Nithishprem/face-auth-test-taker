import React, { useContext } from "react";
import UserContext from "../context/UserContent";
import TopBar from "../components/TopBar";

function ResultPage() {
  const { result } = useContext(UserContext);
  return (
    <div className="w-screen h-screen px-4">
      <TopBar />
      <div className="w-full mt-16">
        <p className="text-2xl font-medium">Assessment Result</p>

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
      </div>
    </div>
  );
}

export default ResultPage;
