import { useState } from "react";
import PhoneLoginForm from "../../components/user/PhoneLoginForm";
import PhoneLoginOTP from "../../components/user/PhoneLoginOTP";

function PhoneLogin() {
  const [number, setNumber] = useState("");

  //   const [userToVerify, setUserToVerify] = useState(null);

  const [verificationDetails, setVerificationDetails] = useState();

  const [showOtpScreen, setShowOtpScreen] = useState(false);

  const handleNext = (response) => {
    setVerificationDetails(response);
    setShowOtpScreen(true);
  };

  if (showOtpScreen) {
    return <PhoneLoginOTP number={number} verificationDetails={verificationDetails} />;
  }

  return (
    <div>
      <PhoneLoginForm number={number} setNumber={setNumber} handleNext={handleNext} />
    </div>
  );
}

export default PhoneLogin;
