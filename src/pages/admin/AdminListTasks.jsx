import TopBar from "../../components/TopBar";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "violatorName",
    headerName: "Violator Name",
    width: 160,
  },
  {
    field: "violationType",
    headerName: "violation Type",
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
    width: 200,
    // valueGetter: (params) => `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  },
];

const rows = [
  { id: 1, violatorName: "Snow", violationType: "Jon", phoneNumber: 9999999999, status: "pending" },
  { id: 2, violatorName: "Lannister", violationType: "Cersei", phoneNumber: 9999999999, status: "pending" },
  { id: 3, violatorName: "Lannister", violationType: "Jaime", phoneNumber: 9999999999, status: "pending" },
  { id: 4, violatorName: "Stark", violationType: "Arya", phoneNumber: 9999999999, status: "completed" },
  { id: 5, violatorName: "Targaryen", violationType: "Daenerys", phoneNumber: 9999999999, status: "completed" },
  { id: 6, violatorName: "Melisandre", violationType: null, phoneNumber: 9999999999, status: "completed" },
  { id: 7, violatorName: "Clifford", violationType: "Ferrara", phoneNumber: 9999999999, status: "pending" },
  { id: 8, violatorName: "Frances", violationType: "Rossini", phoneNumber: 9999999999, status: "pending" },
  { id: 9, violatorName: "Roxie", violationType: "Harvey", phoneNumber: 9999999999, status: "pending" },
];

function AdminListTasks() {
  const navigate = useNavigate();
  return (
    <div className="w-full mb-20">
      <TopBar />

      <div className="max-w-full flex flex-col items-center justify-start pt-20 mx-10">
        <div className="w-full flex justify-end items-center py-4">
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
              pagination: {
                paginationModel: {
                  pageSize: 5,
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
