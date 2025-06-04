import { useState } from "react";
import axios from "axios"; // Import Axios
import OTPVerification from './verify.js'
import { useNavigate ,Link} from "react-router-dom";

function RegistrationForm() {
    const [formData, setFormData] = useState({ email: "", username: "", password: "" });
    const [isLoading, setIsLoading] = useState(false); // ✅ State for loading animation
    const navigate=useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true); // ✅ Start spinner when request starts

        try {
            const response = await axios.post("https://twowaychat-backend.onrender.com/registration", formData);
            alert(response.data.message); // Success message from backend
            if(response.data.success===1){
            
               const email=formData.email;
               localStorage.setItem("check",email);
               navigate("/veri");

               
            }
          //  console.log(localStorage.getItem("usermail"));
        } catch (error) {
            console.log(error);
            alert("Registration Failed! " + error.response?.data?.error);
        } finally {
            setIsLoading(false); // ✅ Stop spinner when request completes
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
            <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-semibold text-center mb-4">Register</h2>

                <label className="block mb-2">Email:</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange}
                    className="w-full p-2 rounded bg-gray-700 text-white outline-none focus:ring-2 focus:ring-blue-500" required />

                <label className="block mt-4 mb-2">Username:</label>
                <input type="text" name="username" value={formData.username} onChange={handleChange}
                    className="w-full p-2 rounded bg-gray-700 text-white outline-none focus:ring-2 focus:ring-blue-500" required />

                <label className="block mt-4 mb-2">Password:</label>
                <input type="password" name="password" value={formData.password} onChange={handleChange}
                    className="w-full p-2 rounded bg-gray-700 text-white outline-none focus:ring-2 focus:ring-blue-500" required />

                <button type="submit" disabled={isLoading} 
                    className={`mt-6 w-full py-2 rounded-lg font-semibold transition ${isLoading ? "bg-gray-600 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}>
                    {isLoading ? "Registering..." : "Register"}
                </button>
            <div class="flex space-x-4">
                <Link to="/" className="text-blue-500 hover:underline"> Go to Home page</Link>
                <Link to="/login" className="text-blue-500 hover:underline"> Login page </Link>
                <Link to="/logout" className="text-blue-500 hover:underline"> Logout</Link>
             


            </div>

                {isLoading && (
                    <div className="flex items-center justify-center mt-4">
                        <div className="w-6 h-6 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                        <span className="ml-2">Processing...</span>
                    </div>
                )}
            </form>
        </div>
    );
}

export default RegistrationForm;