import React, { useEffect, useState } from "react";
import { USERS } from "../utils/constants";
import { Button, TextField } from "@mui/material";

function LoginForm({ number, setNumber, handleNext }) {
  const [error, setError] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!number) {
      return;
    }
    let userFound = USERS.find((user) => user.number === number);
    console.log("num", userFound);
    if (userFound) {
      handleNext(userFound);
    } else {
      setError(true);
    }
  };

  useEffect(() => {
    if (error) {
      setError(false);
    }
  }, [number]);

  return (
    <section className="bg-gray-50">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900">
          Road Safety-NearBuzz
        </a>
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-lg font-medium leading-tight tracking-tight text-gray-900">Sign in to your account</h1>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">Enter Mobile Number</label>
                <TextField
                  type="text"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                  placeholder="Mobile number"
                  size="small"
                  fullWidth
                  // className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 pb-1.5"
                  required
                />
              </div>
              <div className="flex items-center justify-between"></div>

              <div className={`text-red-500 text-xs font-medium ${error ? "" : "invisible"}`}>User doesn't exist</div>
              <Button
                variant="contained"
                fullWidth
                type="submit"
                // className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                disabled={!number}
              >
                Continue
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LoginForm;
