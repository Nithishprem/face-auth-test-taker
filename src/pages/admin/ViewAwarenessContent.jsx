import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAwarenessContentById } from "../../services/services";
import TopBar from "../../components/admin/TopBar";
import { Button, Card, CircularProgress } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { ROUTES } from "../../utils/constants";

function ViewAwarenessContent() {
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [awarenessContent, setAwarenessContent] = useState();
  const navigate = useNavigate();

  const { id } = useParams();

  const fetchAwarenessContentById = async () => {
    try {
      setLoading(true);
      const res = await getAwarenessContentById(id);
      console.log("response", res?.data);
      setAwarenessContent(res?.data);
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
    fetchAwarenessContentById();
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
          <div className="w-full flex justify-start items-center">
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
        </div>

        <div className="w-full max-w-[600px]">
          <p className="text-xl font-medium py-4">Awareness Content</p>
          <Card>
            <div className="flex flex-col justify-center items-center p-4">
              <video src={awarenessContent?.awarenessVideo}></video>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default ViewAwarenessContent;
