import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function LoginForm() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(
        "https://twowaychat-backend.onrender.com/login",
        formData
      );
      setMessage(response.data.message);
      if (response.data.code === 1) {
        localStorage.setItem("loginuser", 1);
        localStorage.setItem("usermail", formData.email);
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
    <div className="min-h-screen flex items-center justify-center bg-black text-green-400 font-mono px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-md border border-green-500"
      >
        {/* Title */}
        <h2 className="text-3xl font-bold text-center mb-6 animate-pulse">
          [🔐] DualLink Access Portal
        </h2>

        {/* Email */}
        <label className="block mb-2">Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 rounded bg-black text-green-400 border border-green-500 outline-none focus:ring-2 focus:ring-green-400"
          required
        />

        {/* Password */}
        <label className="block mt-4 mb-2">Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-2 rounded bg-black text-green-400 border border-green-500 outline-none focus:ring-2 focus:ring-green-400"
          required
        />

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className={`mt-6 w-full py-2 rounded-lg font-bold transition transform hover:scale-105 shadow-lg ${
            isLoading
              ? "bg-gray-700 cursor-not-allowed"
              : "bg-green-700 hover:bg-green-600 shadow-green-500/50"
          }`}
        >
          {isLoading ? "Authenticating..." : "Login >"}
        </button>

        {/* Navigation Links */}
        <div className="flex flex-wrap justify-center gap-4 mt-6 text-sm">
          <Link to="/" className="hover:text-green-300 transition">
            > Home
          </Link>
          <Link to="/registration" className="hover:text-green-300 transition">
            > Create Account
          </Link>
          <Link to="/logout" className="hover:text-green-300 transition">
            > Logout
          </Link>
        </div>

        {/* Loading Spinner */}
        {isLoading && (
          <div className="flex items-center justify-center mt-4">
            <div className="w-6 h-6 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
            <span className="ml-2">Verifying credentials...</span>
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
}

export default LoginForm;
