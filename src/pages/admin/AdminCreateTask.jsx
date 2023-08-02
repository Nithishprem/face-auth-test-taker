import React, { useEffect, useState } from "react";
import TopBar from "../../components/TopBar";
import { Box, Button, MenuItem, Select, TextField } from "@mui/material";
import { VIOLATION_TYPES } from "../../utils/constants";
import { MuiTelInput, matchIsValidTel } from "mui-tel-input";
import { createAwarenessTask } from "../../services/services";
import LoadingButton from "@mui/lab/LoadingButton";

function AdminCreateTask() {
  const [formData, setFormData] = useState({
    violatorName: "",
    phoneNumber: "",
    registrationNumber: "",
    drivingLicense: "",
    vehicleNumber: "",
    violationType: "",
    violationTicket: "",
  });

  const [submitError, setSubmitError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    // console.log("name", e.target.name, e.target.value);
    setFormData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handlePhoneInput = (number, info) => {
    // if (!matchIsValidTel(number)) {
    //   console.log(number);
    //   return;
    // }
    console.log("info", info);
    setFormData((prev) => {
      return {
        ...prev,
        phoneNumber: info.numberValue,
      };
    });
  };

  const handleSubmit = async () => {
    console.log(formData);
    try {
      setSubmitting(true);
      const res = await createAwarenessTask(formData);
      console.log("create task response", res);
      setSubmitting(false);
    } catch (error) {
      console.log("error", error);
      if (error.message && typeof error.message === "string") {
        setSubmitError(error.message);
      } else if (error.message) {
        setSubmitError(error.message);
      } else {
        setSubmitError("Error submitting the response");
      }
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (submitError) {
      setSubmitError("");
    }
  }, [formData]);

  return (
    <div className="w-full mb-20">
      <TopBar />

      <div className="max-w-full flex flex-col items-center justify-start pt-20 mx-10">
        <div className="w-full flex justify-start items-center py-4"></div>

        <div className="mt-5 w-[800px] max-w-full grid grid-cols-2 gap-x-6 gap-y-4 p-4 shadow-2xl rounded-md">
          <div className="w-full col-span-2 py-3">
            <p className="text-xl text-center font-medium">Create Task</p>
          </div>
          <div className="w-full">
            <p className="text-base font-normal text-gray-600 mb-2">Violator Name</p>
            <TextField
              id="outlined-basic"
              fullWidth
              label=""
              placeholder="Enter"
              variant="outlined"
              onChange={handleChange}
              value={formData["violatorName"]}
              name="violatorName"
              size="small"
            />
          </div>
          <div className="w-full">
            <p className="text-base font-normal text-gray-600 mb-2">Phone Number</p>
            {/* <TextField
              id="outlined-basic"
              fullWidth
              label=""
              placeholder="Enter"
              variant="outlined"
              onChange={handleChange}
              value={formData["number"]}
              name="number"
              size="small"
            /> */}

            <MuiTelInput
              onChange={handlePhoneInput}
              value={formData["phoneNumber"]}
              forceCallingCode
              onlyCountries={["IN"]}
              defaultCountry="IN"
              fullWidth
              size="small"
            />
          </div>{" "}
          <div className="w-full">
            <p className="text-base font-normal text-gray-600 mb-2">Regisration Number</p>
            <TextField
              id="outlined-basic"
              fullWidth
              label=""
              placeholder="Enter"
              variant="outlined"
              onChange={handleChange}
              value={formData["registrationNumber"]}
              name="registrationNumber"
              size="small"
            />
          </div>{" "}
          <div className="w-full">
            <p className="text-base font-normal text-gray-600 mb-2">Driving License</p>
            <TextField
              id="outlined-basic"
              fullWidth
              label=""
              placeholder="Enter"
              variant="outlined"
              onChange={handleChange}
              value={formData["drivingLicense"]}
              name="drivingLicense"
              size="small"
            />
          </div>
          <div className="w-full">
            <p className="text-base font-normal text-gray-600 mb-2">Vehicle Number</p>
            <TextField
              id="outlined-basic"
              fullWidth
              label=""
              placeholder="Enter"
              variant="outlined"
              onChange={handleChange}
              value={formData["vehicleNumber"]}
              name="vehicleNumber"
              size="small"
            />
          </div>
          <div className="w-full">
            <p className="text-base font-normal text-gray-600 mb-2">Violation Type</p>
            {/* <TextField
              id="outlined-basic"
              fullWidth
              label=""
              placeholder="Enter"
              variant="outlined"
              onChange={handleChange}
              value={formData["violationType"]}
              name="violationType"
              size="small"
            /> */}

            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={formData["violationType"]}
              //   label="Age"
              onChange={handleChange}
              name="violationType"
              size="small"
              fullWidth
            >
              {VIOLATION_TYPES.map((violation, i) => {
                return (
                  <MenuItem value={violation.value} key={i}>
                    {violation?.label}
                  </MenuItem>
                );
              })}
            </Select>
          </div>
          <div className="w-full">
            <p className="text-base font-normal text-gray-600 mb-2">Violation Ticket Number</p>
            <TextField
              id="outlined-basic"
              fullWidth
              label=""
              placeholder="Enter"
              variant="outlined"
              onChange={handleChange}
              value={formData["violationTicket"]}
              name="violationTicket"
              size="small"
            />
          </div>
          <div className="col-span-2 flex flex-col items-center justify-center gap-4 mt-5">
            <p className={`text-red-500 text-sm font-normal h-6 ${submitError ? "visible" : ""}`}>{submitError}</p>
            <LoadingButton
              //   color="secondary"
              onClick={handleSubmit}
              sx={{
                minWidth: "200px",
              }}
              loading={submitting}
              //   loadingPosition="start"
              //   startIcon={<SaveIcon />}
              variant="contained"
            >
              <span>Submit</span>
            </LoadingButton>
            {/* <Button
              onClick={handleSubmit}
              variant="contained"
              sx={{
                minWidth: "200px",
              }}
            >
              Submit
            </Button> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminCreateTask;
