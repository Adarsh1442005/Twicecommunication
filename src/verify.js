import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const OTPVerification = () => {
    const [otp, setOtp] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState("");
    const navigate=useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const email=localStorage.getItem("check");
            const response = await axios.post("https://twowaychat-backend.onrender.com/verify", { otp ,email});
            setMessage(response.data.message); // Backend response message
            alert(response.data.message);
            localStorage.removeItem("check");
            navigate("/");
            
        } catch (error) {
            setMessage("OTP verification failed! " + (error.response?.data?.error || "Server error"));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col min-h-screen items-center justify-center bg-gray-900 text-white p-6">
            <h2 className="text-2xl font-bold mb-4">🔑 Enter OTP for Verification</h2>
            <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-lg w-96 text-center">
                <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full p-2 rounded bg-gray-700 text-white outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter OTP"
                    required
                />
                <button type="submit" disabled={isLoading}
                    className={`mt-4 w-full py-2 rounded-lg font-semibold transition ${isLoading ? "bg-gray-600 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}>
                    {isLoading ? "Verifying..." : "Verify OTP"}
                </button>

                {isLoading && (
                    <div className="flex items-center justify-center mt-4">
                        <div className="w-6 h-6 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                        <span className="ml-2">Processing...</span>
                    </div>
                )}
                {message && <p className="mt-4 text-green-400">{message}</p>}
            </form>
        </div>
    );
};

export default OTPVerification;