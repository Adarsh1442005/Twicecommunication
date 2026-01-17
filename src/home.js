import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center flex-grow px-6 text-center">
        <h1 className="text-3xl md:text-5xl font-extrabold mb-6 leading-tight">
          🔗 Welcome to <span className="text-blue-400">DualLink</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mb-8">
          DualLink lets you connect instantly with anyone, anywhere.  
          Your conversations are secure, private, and vanish once you disconnect.  
          Only real-time online chat — no traces left behind.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 justify-center">
          <Link to="/login">
            <button className="bg-blue-600 px-6 py-2 rounded-lg text-lg font-semibold hover:bg-blue-700 transition transform hover:scale-105">
              Login
            </button>
          </Link>
          <Link to="/registration">
            <button className="bg-green-500 px-6 py-2 rounded-lg text-lg font-semibold hover:bg-green-600 transition transform hover:scale-105">
              Create Account
            </button>
          </Link>
          <Link to="/logout">
            <button className="bg-red-500 px-6 py-2 rounded-lg text-lg font-semibold hover:bg-red-600 transition transform hover:scale-105">
              Logout
            </button>
          </Link>
          <Link to="/chat">
            <button className="bg-violet-500 px-6 py-2 rounded-lg text-lg font-semibold hover:bg-violet-600 transition transform hover:scale-105">
              Start Chat
            </button>
          </Link>
        </div>

        {/* Online Users Section */}
        <div className="mt-10">
          <p className="text-gray-400 text-lg">
            🔹 Online users: <span className="text-green-400 font-bold">Active Now</span>
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 w-full py-4 text-center text-gray-400 text-sm">
        <p>© 2026 DualLink. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
