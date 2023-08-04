import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="w-screen h-screen flex justify-center items-center ">
      <div className="flex flex-col items-center justify-center gap-4">
        <p className="text-lg font-medium ">Page Not Found</p>

        <Button
          variant="contained"
          onClick={() => {
            navigate("/");
          }}
        >
          Home
        </Button>
      </div>
    </div>
  );
}

export default NotFound;
