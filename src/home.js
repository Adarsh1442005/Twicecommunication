import React, { useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="flex flex-col min-h-screen items-center justify-center bg-gray-900 text-white p-6">
            {/* Title Section */}
            <h1 className="text-4xl font-bold mb-4">💬 Welcome to ChatConnect you can Chat with anyone freely Without Fear ,Your Chat is secure</h1>
            <h1 className="text-4xl font-bold mb-4">💬 Even the Chatconnect cannot see your message Once you disconnect Everything remove!! only online Chat Possible</h1>
            <p className="text-lg text-gray-300 mb-6">Connect and chat in real-time with friends and colleagues .</p>

            {/* Action Buttons */}
            <div className="space-x-4">
                <Link to="/login">
                    <button className="bg-blue-600 px-6 py-2 rounded-lg text-lg font-semibold hover:bg-blue-700 transition">Login</button>
                </Link>
                <Link to="/registration">
                    <button className="bg-green-500 px-6 py-2 rounded-lg text-lg font-semibold hover:bg-green-600 transition">Create Account</button>
                </Link>
                <Link to="/logout">
                    <button className="bg-red-500 px-6 py-2 rounded-lg text-lg font-semibold hover:bg-green-600 transition">Logout</button>
                </Link>

                <Link to="/chat">
                    <button className="bg-violet-500 px-6 py-2 rounded-lg text-lg font-semibold hover:bg-green-600 transition">StartChat</button>
                </Link>
            </div>

            {/* Online Users Section */}
            <div className="mt-8">
                <p className="text-gray-400">🔹 Online users:<span className="text-green-400"></span></p>
            </div>

            {/* Footer */}
            <footer className="mt-10 text-gray-500 text-sm">
                <p>© 2025 ChatConnect. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Home;