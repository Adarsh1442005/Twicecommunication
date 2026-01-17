import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen bg-black text-green-400 font-mono">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center flex-grow px-6 text-center">
        <h1 className="text-3xl md:text-5xl font-extrabold mb-6 animate-pulse">
          [🔗] Access Granted: <span className="text-red-500">DualLink</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mb-8">
          Secure. Encrypted. Ephemeral.  
          DualLink is your underground portal for real-time conversations.  
          Once disconnected, all traces vanish — like a ghost in the system.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 justify-center">
          <Link to="/login">
            <button className="bg-green-700 px-6 py-2 rounded-lg text-lg font-bold hover:bg-green-600 transition transform hover:scale-105 shadow-lg shadow-green-500/50">
              > Login
            </button>
          </Link>
          <Link to="/registration">
            <button className="bg-blue-700 px-6 py-2 rounded-lg text-lg font-bold hover:bg-blue-600 transition transform hover:scale-105 shadow-lg shadow-blue-500/50">
              > Create Account
            </button>
          </Link>
          <Link to="/logout">
            <button className="bg-red-700 px-6 py-2 rounded-lg text-lg font-bold hover:bg-red-600 transition transform hover:scale-105 shadow-lg shadow-red-500/50">
              > Logout
            </button>
          </Link>
          <Link to="/chat">
            <button className="bg-purple-700 px-6 py-2 rounded-lg text-lg font-bold hover:bg-purple-600 transition transform hover:scale-105 shadow-lg shadow-purple-500/50">
              > Start Chat
            </button>
          </Link>
        </div>

        {/* Online Users Section */}
        <div className="mt-10">
          <p className="text-gray-400 text-lg animate-pulse">
            🔹 Online users: <span className="text-green-400 font-bold">[Active]</span>
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 w-full py-4 text-center text-gray-500 text-sm border-t border-green-500">
        <p>© 2026 DualLink | Terminal Secure Chat</p>
      </footer>
    </div>
  );
};

export default Home;
