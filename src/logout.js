import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function LogoutButton() {
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogout = async () => {
    setIsLoading(true);
    const email = localStorage.getItem("usermail"); // ✅ Retrieve stored email
    console.log(email);

    try {
      const response = await axios.post(
        "https://twowaychat-backend.onrender.com/logout",
        { email }
      );
      localStorage.removeItem("usermail");
      localStorage.removeItem("loginuser"); // ✅ Remove email after logout
      alert(response.data.message);
      navigate("/");
    } catch (error) {
      setMessage("Logout Failed! " + error.response?.data?.error);
    } finally {
      setIsLoading(false);
      setShowConfirm(false); // ✅ Hide confirmation box
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-green-400 font-mono px-4">
      <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-md border border-green-500 text-center">
        {/* Title */}
        <h2 className="text-3xl font-bold mb-6 animate-pulse">
          [⚠] DualLink Logout Terminal
        </h2>

        {/* Logout Button */}
        <button
          onClick={() => setShowConfirm(true)}
          disabled={isLoading}
          className={`w-full py-2 rounded-lg font-bold transition transform hover:scale-105 shadow-lg ${
            isLoading
              ? "bg-gray-700 cursor-not-allowed"
              : "bg-red-700 hover:bg-red-600 shadow-red-500/50"
          }`}
        >
          {isLoading ? "Logging out..." : "Logout >"}
        </button>

        {/* Confirmation Box */}
        {showConfirm && (
          <div className="mt-6 bg-black border border-green-500 p-4 rounded-lg text-left">
            <p className="text-yellow-400">❗ Confirm Command: Terminate Session?</p>
            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={handleLogout}
                className="bg-green-700 hover:bg-green-600 px-4 py-2 rounded-lg font-bold shadow-lg shadow-green-500/50"
              >
                > Yes, Logout
              </button>
              <button
                onClick={() => {
                  setShowConfirm(false);
                  navigate("/");
                }}
                className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg font-bold"
              >
                > Cancel
              </button>
            </div>
          </div>
        )}

        {/* Loading Spinner */}
        {isLoading && (
          <div className="flex items-center justify-center mt-4">
            <div className="w-6 h-6 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
            <span className="ml-2">Processing command...</span>
          </div>
        )}

        {/* Message */}
        {message && (
          <p className="mt-4 text-center text-red-400 animate-pulse">{message}</p>
        )}
      </div>
    </div>
  );
}

export default LogoutButton;
