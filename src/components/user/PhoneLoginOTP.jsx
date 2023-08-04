import { Button, TextField } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { getUser, loginUser, otpAuth, userLoginRegister } from "../../services/services";
import { useNavigate } from "react-router-dom";
import UserContext from "../../context/UserContent";
import { LoadingButton } from "@mui/lab";
import { ROUTES } from "../../utils/constants";
import * as faceapi from "face-api.js";

function PhoneLoginOTP({ verificationDetails, number }) {
  const [error, setError] = useState("");
  const [code, setCode] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const { handleLogin, destination, storeUserProfileImage } = useContext(UserContext);

  // const handleVerifyOtp = async (e) => {
  //   try {
  //     e.preventDefault();
  //     setSubmitting(true);
  //     const res = await verificationDetails.confirm(code);
  //     await handleSignIn(res);
  //   } catch (error) {
  //     console.log("error", error.message);
  //     setError(error.message);
  //   }
  // };

  // const handleSignIn = async (optRes) => {
  //   try {
  //     const body = {
  //       // phoneNumber: number,
  //     };

  //     // console.log("response", optRes?._tokenResponse?.idToken);
  //     const idToken = optRes?._tokenResponse?.idToken;

  //     // console.log("idToken", idToken, JSON.stringify(idToken));
  //     const res = await loginUser(body, idToken);
  //     // console.log("signInRes", res);

  //     let data = res?.data;

  //     localStorage.setItem("accessToken", data.accessToken);
  //     localStorage.setItem("refreshToken", data.refreshToken);

  //     const profileRes = await getUser();

  //     const user = profileRes?.data;

  //     if (user?.photo) {
  //       const image = await faceapi.fetchImage(user?.photo);
  //       storeUserProfileImage(image?.src);
  //     }

  //     console.log("userLogin", user);

  //     await handleLogin(user);

  //     if (destination) {
  //       navigate(destination);
  //     } else {
  //       navigate(ROUTES.user.taskNotFound);
  //     }

  //     console.log("login success!");
  //   } catch (error) {
  //     // console.log("error", JSON.stringify(error));
  //     setError(error.message);
  //     setSubmitting(false);
  //   }
  // };

  const fetchuserPhoto = async (user) => {
    try {
      if (user?.photo) {
        const image = await faceapi.fetchImage(user?.photo);
        storeUserProfileImage(image?.src);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      const body = {
        authType: "phone_number",
        authUser: number,
        authPass: code,
      };
      const res = await otpAuth(body);
      const data = res?.data;

      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);

      const profileRes = await getUser();

      const user = profileRes?.data;

      await fetchuserPhoto(user);

      console.log("userLogin", user);

      await handleLogin(user);

      if (destination) {
        navigate(destination);
      } else {
        navigate(ROUTES.user.taskNotFound);
      }

      console.log("login success!");
    } catch (error) {
      console.log("error", error);
      if (error?.message) {
        setError(error?.message);
      } else {
        setError("Error submitting the request");
      }
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
          Road Safety Awareness - NearBuzz
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
