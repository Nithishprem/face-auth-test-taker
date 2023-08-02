import { Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { auth } from "../../firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { postUserExists } from "../../services/services";

function PhoneLoginForm({ number, setNumber, handleNext }) {
  const [error, setError] = useState("");

  const setUpRecaptcha = async (number) => {
    try {
      const recapthaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {});
      recapthaVerifier.render();
      const confirmationResult = await signInWithPhoneNumber(auth, number, recapthaVerifier);
      console.log("confirmationResult", confirmationResult);
      return confirmationResult;
    } catch (error) {
      console.log(error);
    }
  };

  const checkUserExists = async (e) => {
    e.preventDefault();
    try {
      const res = await postUserExists("+" + number);

      console.log("user exists", res?.data);
      if (res?.data) {
        await sendOtp();
      } else {
        throw new Error("User doesn't exist");
      }
    } catch (error) {
      console.log("error", error.message);
      if (error.message) {
        setError(error.message);
      } else {
        setError("Error submiting the request");
      }
    }
  };

  const sendOtp = async () => {
    if (number === "" || number === undefined) {
      return;
    }
    try {
      const response = await setUpRecaptcha("+" + number);
      handleNext(response);
    } catch (error) {
      console.log(error);
      //   setError(error.message);
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
            <h1 className="text-lg font-medium leading-tight tracking-tight text-gray-900">Login</h1>
            <form className="space-y-4" onSubmit={checkUserExists}>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">Enter Mobile Number</label>
                {/* <TextField
                  type="text"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                  placeholder="Mobile number"
                  size="small"
                  fullWidth
                  // className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 pb-1.5"
                  required
                /> */}
                <PhoneInput
                  defaultCountry="in"
                  country={"in"}
                  onlyCountries={["in"]}
                  value={number}
                  onChange={(phone) => setNumber(phone)}
                  placeholder="Enter Phone Number"
                  inputStyle={{
                    containerClass: "100%",
                  }}
                />
              </div>
              <div className="flex items-center justify-between">
                <div id="recaptcha-container"></div>
              </div>

              <div className={`text-red-500 text-xs font-medium h-6 ${error ? "" : "invisible"}`}>{error}</div>
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

export default PhoneLoginForm;
