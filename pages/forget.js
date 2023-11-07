import { sendPasswordResetEmail } from "firebase/auth";
import React from "react";
import { auth } from "../config/firebase";

const Forget = ({ onPasswordReset }) => {
  console.log("onPasswordReset:", onPasswordReset);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailValue = e.target.email.value;

    sendPasswordResetEmail(auth, emailValue)
      .then(() => {
        alert("Check your email for password reset instructions");
      })
      .catch((err) => {
        alert(err.code);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white w-full max-w-md p-8 rounded shadow-lg">
        <h1 className="text-2xl font-semibold mb-6 text-center">
          Forgot Password
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-600 mb-2"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="w-full px-4 py-2 border rounded shadow-sm focus:ring focus:ring-blue-400"
              placeholder="Enter your email"
            />
          </div>
          <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-semibold py-3 rounded">
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default Forget;
