import { useState } from "react";
import { useNavigate } from "react-router-dom";


import axios from "axios";
import Home from "./home";

function LogoutButton() {
    const [isLoading, setIsLoading] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [message, setMessage] = useState("");
    const navigate=useNavigate();

    const handleLogout = async () => {
        setIsLoading(true);
        const email = localStorage.getItem("usermail"); // ✅ Retrieve stored email
        console.log(email);

        try {
            const response = await axios.post("https://twowaychat-backend.onrender.com/logout", { email });
            localStorage.removeItem("usermail");
            localStorage.removeItem("loginuser") // ✅ Remove email after logout
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
        <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-96 text-center">
                <h2 className="text-2xl font-semibold mb-4">Logout</h2>

                <button onClick={() => setShowConfirm(true)} disabled={isLoading} 
                    className={`w-full py-2 rounded-lg font-semibold transition ${isLoading ? "bg-gray-600 cursor-not-allowed" : "bg-red-600 hover:bg-red-700"}`}>
                    {isLoading ? "Logging out..." : "Logout"}
                </button>

                {showConfirm && (
                    <div className="mt-4 bg-gray-700 p-4 rounded-lg">
                        <p>❗ Do you really want to logout?</p>
                        <button onClick={handleLogout} className="mt-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg">
                            Yes, Logout
                        </button>
                        <button onClick={() =>{ setShowConfirm(false)
                                                navigate("/")
                        }} className="mt-2 ml-2 bg-gray-500 px-4 py-2 rounded-lg">
                            Cancel
                        </button>
                    </div>
                )}

                {isLoading && (
                    <div className="flex items-center justify-center mt-4">
                        <div className="w-6 h-6 border-4 border-gray-300 border-t-red-500 rounded-full animate-spin"></div>
                        <span className="ml-2">Processing...</span>
                    </div>
                )}

                {message && <p className="mt-4">{message}</p>}
            </div>
        </div>
    );
}

export default LogoutButton;
