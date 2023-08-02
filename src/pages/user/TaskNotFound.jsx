import React from "react";
import TopBar from "../../components/TopBar";

function TaskNotFound() {
  return (
    <div className="w-full mb-20">
      <TopBar />
      <div className="max-w-full flex flex-col min-h-[50vh] items-center justify-center pt-20 mx-10">
        <p className="text-red-500 text-base ">Task not Found</p>
      </div>
    </div>
  );
}

export default TaskNotFound;
