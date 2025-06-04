import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";



function LoginForm() {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState("");
    const navigate=useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await axios.post("https://twowaychat-backend.onrender.com/login", formData);
            setMessage(response.data.message);
            if(response.data.code===1){
                localStorage.setItem("loginuser",1);
                localStorage.setItem("usermail",formData.email);
                navigate("/");
            }
        } catch (error) {
            console.log(error);
            setMessage("Login Failed! " + error.response?.data?.error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
            <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>

                <label className="block mb-2">Email:</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange}
                    className="w-full p-2 rounded bg-gray-700 text-white outline-none focus:ring-2 focus:ring-blue-500" required />

                <label className="block mt-4 mb-2">Password:</label>
                <input type="password" name="password" value={formData.password} onChange={handleChange}
                    className="w-full p-2 rounded bg-gray-700 text-white outline-none focus:ring-2 focus:ring-blue-500" required />

                <button type="submit" disabled={isLoading} 
                    className={`mt-6 w-full py-2 rounded-lg font-semibold transition ${isLoading ? "bg-gray-600 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}>
                    {isLoading ? "Logging in..." : "Login"}
                </button>
                <div class="flex space-x-4">
                <Link to="/" className="text-blue-500 hover:underline"> Go to Home page</Link>
                <Link to="/registration" className="text-blue-500 hover:underline"> create Account </Link>
                <Link to="/logout" className="text-blue-500 hover:underline"> Logout</Link>

    
     
    </div>



                {isLoading && (
                    <div className="flex items-center justify-center mt-4">
                        <div className="w-6 h-6 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                        <span className="ml-2">Authenticating...</span>
                    </div>
                )}

                {message && <p className="mt-4 text-center">{message}</p>}
            </form>
        </div>
    );
}

export default LoginForm;
