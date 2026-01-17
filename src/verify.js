import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const OTPVerification = () => {
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const email = localStorage.getItem("check");
      const response = await axios.post(
        "https://twowaychat-backend.onrender.com/verify",
        { otp, email }
      );
      setMessage(response.data.message);
      alert(response.data.message);
      localStorage.removeItem("check");
      navigate("/");
    } catch (error) {
      setMessage(
        "OTP verification failed! " +
          (error.response?.data?.error || "Server error")
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-black text-green-400 font-mono px-4">
      {/* Title */}
      <h2 className="text-3xl font-bold mb-6 animate-pulse">
        [🔑] DualLink OTP Verification
      </h2>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-md border border-green-500 text-center"
      >
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full p-2 rounded bg-black text-green-400 border border-green-500 outline-none focus:ring-2 focus:ring-green-400"
          placeholder="Enter OTP Code"
          required
        />

        <button
          type="submit"
          disabled={isLoading}
          className={`mt-4 w-full py-2 rounded-lg font-bold transition transform hover:scale-105 shadow-lg ${
            isLoading
              ? "bg-gray-700 cursor-not-allowed"
              : "bg-green-700 hover:bg-green-600 shadow-green-500/50"
          }`}
        >
          {isLoading ? "Verifying..." : "Verify OTP >"}
        </button>

        {/* Loading Spinner */}
        {isLoading && (
          <div className="flex items-center justify-center mt-4">
            <div className="w-6 h-6 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
            <span className="ml-2">Processing command...</span>
          </div>
        )}

        {/* Message */}
        {message && (
          <p className="mt-4 text-center text-yellow-400 animate-pulse">
            {message}
          </p>
        )}
      </form>
    </div>
  );
};

export default OTPVerification;
