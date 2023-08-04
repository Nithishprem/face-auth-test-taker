import { useEffect, useState } from "react";
import PhoneLoginForm from "../../components/user/PhoneLoginForm";
import PhoneLoginOTP from "../../components/user/PhoneLoginOTP";
import { useSearchParams } from "react-router-dom";

function PhoneLogin() {
  const [number, setNumber] = useState("");

  const [searchParams] = useSearchParams();

  const phoneNumberQuery = searchParams.get("phoneNumber");

  //   const [userToVerify, setUserToVerify] = useState(null);

  const [verificationDetails, setVerificationDetails] = useState();

  const [showOtpScreen, setShowOtpScreen] = useState(false);

  const handleNext = (response) => {
    setVerificationDetails(response);
    setShowOtpScreen(true);
  };

  useEffect(() => {
    if (phoneNumberQuery) {
      setNumber("+" + phoneNumberQuery?.trim());
    }
  }, []);

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
