import { Button, TextField } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { getUser, loginUser, userLoginRegister } from "../../services/services";
import { useNavigate } from "react-router-dom";
import UserContext from "../../context/UserContent";
import { LoadingButton } from "@mui/lab";
import { ROUTES } from "../../utils/constants";

function PhoneLoginOTP({ verificationDetails, number }) {
  const [error, setError] = useState("");
  const [code, setCode] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const { handleLogin, destination } = useContext(UserContext);

  const handleVerifyOtp = async (e) => {
    try {
      e.preventDefault();
      setSubmitting(true);
      const res = await verificationDetails.confirm(code);
      await handleSignIn(res);
    } catch (error) {
      console.log("error", error.message);
      setError(error.message);
    }
  };

  const handleSignIn = async (optRes) => {
    try {
      const body = {
        // phoneNumber: number,
      };

      // console.log("response", optRes?._tokenResponse?.idToken);
      const idToken = optRes?._tokenResponse?.idToken;

      // console.log("idToken", idToken, JSON.stringify(idToken));
      const res = await loginUser(body, idToken);
      // console.log("signInRes", res);

      let data = res?.data;

      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);

      const profileRes = await getUser();

      const user = profileRes?.data;

      handleLogin(user);

      if (destination) {
        navigate(destination);
      } else {
        navigate(ROUTES.user.taskNotFound);
      }

      console.log("login success!");
    } catch (error) {
      // console.log("error", JSON.stringify(error));
      setError(error.message);
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (error) {
      setError(false);
    }
  }, [code]);

  return (
    <section className="bg-gray-50">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900">
          Road Safety-NearBuzz
        </a>
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-lg font-medium leading-tight tracking-tight text-gray-900">Sign in to your account</h1>
            <form className="space-y-4" onSubmit={handleVerifyOtp}>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">Enter OTP</label>
                <TextField
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Enter 6 digit code"
                  size="small"
                  fullWidth
                  // className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 pb-1.5"
                  required
                />
              </div>
              <div className="flex items-center justify-between">
                <div id="recaptcha-container"></div>
              </div>

              <div className={`text-red-500 text-xs font-medium ${error ? "" : "invisible"}`}>{error}</div>
              <LoadingButton
                variant="contained"
                fullWidth
                type="submit"
                loading={submitting}
                // className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                disabled={!code || code.length !== 6}
              >
                <span>Continue</span>
              </LoadingButton>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PhoneLoginOTP;
