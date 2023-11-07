/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../config/firebase";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const phone = () => {
  const [phone, setPhone] = useState("");
  const [user, setUser] = useState(null);
  const [otp, setOtp] = useState("");
  const [isOtpInputDisabled, setIsOtpInputDisabled] = useState(true);

  const sendOtp = async () => {
    try {
      const recaptcha = new RecaptchaVerifier(auth, "recaptcha", {});
      const confirmation = await signInWithPhoneNumber(auth, phone, recaptcha);
      console.log("confirm:", confirmation);
      setUser(confirmation);
      setIsOtpInputDisabled(false);
      toast.success("send otp");
    } catch (error) {
      console.error(error);
      toast.error("send otp failed");
    }
  };

  const verifyOtp = async () => {
    try {
      const data = await user.confirm(otp);
      console.log("data:", data);
      toast.success("Verification successful");

      setOtp("");
    } catch (error) {
      console.error(error);
      toast.error("Verification failed");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-4 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-semibold text-center mb-4">
        Phone Verification
      </h1>

      <div className="mb-4">
        <PhoneInput
          country={"us"}
          value={phone}
          onChange={(phone) => setPhone("+" + phone)}
          inputClass="w-full border border-gray-300 p-2 rounded-md"
        />
      </div>

      <button
        className="w-full bg-blue-500 hover:bg-blue-400 text-white font-semibold py-2 rounded-md"
        onClick={sendOtp}
      >
        Send OTP
      </button>

      <div id="recaptcha" className="my-4"></div>

      <input
        onChange={(e) => {
          setOtp(e.target.value);
        }}
        placeholder="Enter the OTP"
        className="w-full border border-gray-300 p-2 rounded-md"
        disabled={isOtpInputDisabled}
      />

      <button
        className="w-full bg-blue-500 hover:bg-blue-400 text-white font-semibold py-2 rounded-md mt-4"
        onClick={verifyOtp}
        disabled={isOtpInputDisabled}
      >
        Verify OTP
      </button>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default phone;
