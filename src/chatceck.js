import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { Link } from "react-router-dom";

const socket = io("https://twowaychat-backend.onrender.com");

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [recipientId, setRecipientId] = useState("");
  const [userid, setUserid] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const useridchange = (e) => setUserid(e.target.value);
  const handleRecipientChange = (e) => setRecipientId(e.target.value);

  const register = () => {
    if (!userid.trim()) {
      alert("Please enter the user ID");
      return;
    }
    setIsLoading(true);
    const checkuser = localStorage.getItem("usermail");
    if (checkuser === userid) {
      socket.emit("register", { userid });
    } else {
      alert("Invalid credentials! Please enter the registered email ID as your user ID.");
      setIsLoading(false);
    }

    const confirm = () => {
      setIsLoading(false);
      alert("User registered successfully");
    };
    const regerr = (errormsg) => {
      setIsLoading(false);
      alert("Registration failed: " + errormsg);
    };
    const fail = (fail) => {
      alert(fail.message);
      setIsLoading(false);
    };

    socket.on("confirm", confirm);
    socket.on("fail", fail);
    socket.on("regerror", regerr);
  };

  useEffect(() => {
    socket.on("message", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });
    return () => {
      socket.off("message");
    };
  }, []);

  const sendMessage = () => {
    if (inputMessage.trim() === "" || recipientId === "") {
      alert("Invalid credentials! Enter recipient ID and type a message.");
      return;
    }

    const message = { sender: "user", text: inputMessage };
    const email = localStorage.getItem("usermail");
    socket.emit("privatemessage", { recipientId, message, email });

    let usercode = 1;
    let receivercode = 1;

    const usererr = ({ message, code }) => {
      usercode = code;
      alert(message);
    };
    const receivererr = ({ message, code }) => {
      receivercode = code;
      alert(message);
    };

    socket.on("usererr", usererr);
    socket.on("receivererr", receivererr);

    if (usercode === 0 || receivercode === 0) return;

    setMessages((prevMessages) => [...prevMessages, message]);
    setInputMessage("");
  };

  return (
    <div className="flex flex-col h-screen bg-black text-green-400 font-mono p-4">
      {/* Header */}
      <div className="text-center mb-4">
        <h1 className="text-3xl md:text-4xl font-bold animate-pulse">
          [💻] DualLink Secure Chat Console
        </h1>
        <p className="text-gray-400 text-sm md:text-base">
          Real-time encrypted communication. No traces left once disconnected.
        </p>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto space-y-2 p-2 sm:p-4 border border-green-500 rounded-lg bg-gray-900">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 rounded-lg max-w-[75%] sm:max-w-[60%] md:max-w-[50%] lg:max-w-[40%] break-words ${
              msg.sender === "user"
                ? "bg-green-700 ml-auto text-right shadow-lg shadow-green-500/50"
                : "bg-gray-800 text-left shadow-lg shadow-blue-500/50"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      {/* Input Box */}
      <div className="flex flex-wrap items-center gap-2 mt-4">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          className="w-full sm:w-auto p-2 rounded-lg bg-black text-green-400 border border-green-500 outline-none focus:ring-2 focus:ring-green-400"
          placeholder="Type a message..."
        />
        <input
          type="text"
          value={recipientId}
          onChange={handleRecipientChange}
          className="w-full sm:w-auto p-2 rounded-lg bg-black text-green-400 border border-green-500 outline-none focus:ring-2 focus:ring-green-400"
          placeholder="Enter recipient ID..."
        />
        <input
          type="text"
          value={userid}
          onChange={useridchange}
          className="w-full sm:w-auto p-2 rounded-lg bg-black text-green-400 border border-green-500 outline-none focus:ring-2 focus:ring-green-400"
          placeholder="Enter your ID..."
        />
        <button
          onClick={sendMessage}
          className="w-full sm:w-auto bg-green-700 px-4 py-2 rounded-lg font-bold hover:bg-green-600 transition transform hover:scale-105 shadow-lg shadow-green-500/50"
        >
          > Send
        </button>
        <button
          onClick={register}
          disabled={isLoading}
          className={`w-full sm:w-auto px-4 py-2 rounded-lg font-bold transition transform hover:scale-105 shadow-lg ${
            isLoading
              ? "bg-gray-700 cursor-not-allowed"
              : "bg-blue-700 hover:bg-blue-600 shadow-blue-500/50"
          }`}
        >
          {isLoading ? "Registering..." : "> Register"}
        </button>
      </div>

      {/* Navigation */}
      <div className="mt-6 text-center sm:text-left">
        <Link
          to="/"
          className="bg-gray-800 px-4 py-2 rounded-lg hover:bg-gray-700 transition text-green-400 font-bold shadow-lg shadow-green-500/50"
        >
          > Go to Home
        </Link>
      </div>
    </div>
  );
};

export default Chat;
