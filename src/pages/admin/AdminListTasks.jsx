import TopBar from "../../components/admin/TopBar";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Link as Muilink } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAwarenessTasks } from "../../services/services";
import CircularProgress from "@mui/material/CircularProgress";
import moment from "moment";
import { ROUTES, TASK_STATUS } from "../../utils/constants";

const columns = [
  { field: "id", headerName: "Task ID", width: 90 },
  {
    field: "violatorName",
    headerName: "Violator Name",
    width: 160,
  },
  {
    field: "violationType",
    headerName: "Violation Type",
    width: 160,
  },
  {
    field: "phoneNumber",
    headerName: "Phone",
    type: "number",
    headerAlign: "left",
    align: "left",
    width: 200,
  },
  {
    field: "status",
    headerName: "Status",
    description: "",
    width: 160,
  },
  {
    field: "completionDetails",
    headerName: "Task Completion",
    description: "",
    width: 150,
    renderCell: (params) => {
      return <Link>View</Link>;
    },
  },
  {
    field: "drivingLicense",
    headerName: "Driving License",
    width: 200,
  },
  {
    field: "violationTicket",
    headerName: "Challan Ticket",
    width: 160,
    valueGetter: (params) => {
      if (params.value) {
        return params.value;
      } else {
        return "Not raised";
      }
    },
  },
  {
    field: "createdAt",
    headerName: "Date Created",
    valueGetter: (params) => {
      return moment(params?.createdAt).format("DD MMM YY, h:mm a");
    },
    width: 160,
  },
  {
    field: "awareness",
    headerName: "Awareness Content",
    renderCell: (params) => {
      let awarenessContentId = params.row.awarenessContentId;

      console.log("awarenessContent", awarenessContentId);
      return (
        <Button
          onClick={() => {
            navigate(ROUTES.admin.viewAwarenessContent.replace(":id", awarenessContentId));
          }}
          size="small"
        ></Button>
      );
    },
  },
];

function AdminListTasks() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([
    { field: "id", headerName: "Task ID", width: 90 },
    {
      field: "violatorName",
      headerName: "Violator Name",
      width: 160,
    },
    {
      field: "violationType",
      headerName: "Violation Type",
      width: 160,
    },
    {
      field: "phoneNumber",
      headerName: "Phone",
      type: "number",
      headerAlign: "left",
      align: "left",
      width: 200,
    },
    {
      field: "status",
      headerName: "Status",
      description: "",
      width: 160,
    },
    {
      field: "completionDetails",
      headerName: "Task Completion",
      description: "",
      width: 150,
      renderCell: ({ row }) => {
        let awarenessTaskId = row.id;

        let { status, completionDetails } = row;

        if (status === TASK_STATUS.completed && completionDetails) {
          return (
            <Button
              onClick={() => {
                console.log();
                navigate(ROUTES.admin.viewAssessmentResult.replace(":id", awarenessTaskId));
              }}
              size="small"
              variant="outlined"
            >
              View
            </Button>
          );
        } else {
          return "Not Completed";
        }
      },
    },
    {
      field: "violationTicket",
      headerName: "Challan Ticket",
      width: 160,
      valueGetter: (params) => {
        if (params.value) {
          return params.value;
        } else {
          return "Not raised";
        }
      },
    },
    {
      field: "createdAt",
      headerName: "Date Created",
      valueGetter: (params) => {
        return moment(params?.createdAt).format("DD MMM YY, h:mm a");
      },
      width: 160,
    },
    {
      field: "awareness",
      headerName: "Awareness Content",
      renderCell: (params) => {
        let awarenessContentId = params.row.awarenessContentId;

        console.log("awarenessContent", awarenessContentId);
        return (
          <Button
            onClick={() => {
              console.log();
              navigate(ROUTES.admin.viewAwarenessContent.replace(":id", awarenessContentId));
            }}
            size="small"
            variant="outlined"
          >
            View
          </Button>
        );
      },
    },
  ]);

  const fetchAllTasks = async () => {
    try {
      setLoading(true);
      const res = await getAwarenessTasks();
      console.log("res", res?.data);

      const data = res?.data?.map((task) => {
        return {
          id: task.id,
          violatorName: task.violatorName,
          violationType: task.violationType,
          phoneNumber: task.phoneNumber,
          status: task.status,
          createdAt: task.createdAt,
          completionDetails: task?.completionDetails,
          awarenessContent: task?.awarenessContent,
          awarenessContentId: task?.awarenessContentId,
        };
      });

      setRows(data);
      setLoading(false);
    } catch (error) {
      console.log("error", error.message);
      if (error.message) {
        setLoadError(error.message);
      } else {
        setLoadError("error loading the data");
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllTasks();
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
        <div className="w-full flex justify-between items-end py-4">
          <div className="flex flex-col gap-1">
            <p className="text-xl font-medium">Awareness Tasks</p>
            <p className="text-base font-normal text-[#757575]">create awareness tasks for Road Safety violation</p>
          </div>

          <Button
            variant="contained"
            onClick={() => {
              navigate("/admin/createTask");
            }}
          >
            Create Task
          </Button>
        </div>

        <Box sx={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              sorting: {
                sortModel: [{ field: "id", sort: "desc" }],
              },
              pagination: {
                paginationModel: {
                  pageSize: 25,
                },
              },
            }}
            pageSizeOptions={[5]}
            // checkboxSelection
            disableRowSelectionOnClick
          />
        </Box>
      </div>
    </div>
  );
}

export default AdminListTasks;
