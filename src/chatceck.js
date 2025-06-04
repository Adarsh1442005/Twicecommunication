import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { Link } from "react-router-dom";

const socket = io("ws://twowaychat-backend.onrender.com");

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState("");
    const [recipientId, setRecipientId] = useState("");
    const [userid, setUserid] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    return (
        <div className="flex flex-col h-screen bg-gray-900 text-white p-4">
            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto space-y-2 p-2 sm:p-4">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`p-2 rounded-lg max-w-[75%] sm:max-w-[60%] md:max-w-[50%] lg:max-w-[40%] ${
                            msg.sender === "user"
                                ? "bg-blue-600 ml-auto text-right"
                                : "bg-gray-700 text-left"
                        } break-words`}
                    >
                        {msg.text}
                    </div>
                ))}
            </div>

            {/* Input Box */}
            <div className="flex flex-col sm:flex-row items-center gap-2 mt-4">
                <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    className="w-full sm:w-auto p-2 rounded-lg bg-gray-800 text-white outline-none"
                    placeholder="Type a message..."
                />
                <input
                    type="text"
                    value={recipientId}
                    onChange={(e) => setRecipientId(e.target.value)}
                    className="w-full sm:w-auto p-2 rounded-lg bg-gray-800 text-white outline-none"
                    placeholder="Enter recipient ID..."
                />
                <input
                    type="text"
                    value={userid}
                    onChange={(e) => setUserid(e.target.value)}
                    className="w-full sm:w-auto p-2 rounded-lg bg-gray-800 text-white outline-none"
                    placeholder="Enter your ID..."
                />
                <button
                    onClick={() => console.log("Send message")}
                    className="w-full sm:w-auto bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                    Send
                </button>
                <button
                    onClick={() => console.log("Register")}
                    disabled={isLoading}
                    className={`w-full sm:w-auto bg-green-500 px-4 py-2 rounded-lg hover:bg-green-700 transition ${
                        isLoading ? "bg-gray-600 cursor-not-allowed" : ""
                    }`}
                >
                    {isLoading ? "Registering..." : "Register"}
                </button>
            </div>

            {/* Home Navigation */}
            <div className="mt-4 text-center sm:text-left">
                <Link
                    to="/"
                    className="bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-700 transition text-white"
                >
                    Go to Home
                </Link>
            </div>
        </div>
    );
};

export default Chat;
