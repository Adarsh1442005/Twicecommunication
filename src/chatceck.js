import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { Link } from "react-router-dom";

const socket = io("ws://twowaychat-backend.onrender.com");

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState("");
    const [recipientId, setRecipientId] = useState("");
    const[userid,setuserid]=useState("");
    const[isLoading,setIsLoading]=useState(false);
    
    const useridchange=(e)=>{
          setuserid(e.target.value);


    }
     // Store recipient ID

    const handleRecipientChange =  (e) => {
       
     setRecipientId(e.target.value); // Update state on input change
        //  alert("your converstaion with the"+e.target.value+"begin!!");
    };

    const register=()=>{
        if(!userid.trim()){

       alert("please enter the user id");
       return;     
        }
        setIsLoading(true);
        const checkuser=localStorage.getItem("usermail");
        if(checkuser===userid){
    socket.emit("register",{userid});}
    else{
        alert(" Invalid credentials !! please enter the registered email id as your userid");
        setIsLoading(false);

    }
    const confirm=()=>{

        setIsLoading(false);
        alert("user registered successfully");
    };

const regerr=(errormsg)=>{
setIsLoading(false);
alert("Registration failed",+errormsg);


    };

 const fail=(fail)=>{
    alert(fail.message);
    setIsLoading(false);
    return;

 }   ;

socket.on("confirm",confirm);
socket.on("fail",fail);

socket.on("regerror",regerr);

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
        if (inputMessage.trim() === "" || recipientId=== "") {
            console.log("receiptent id not found");
            return;
        }

        const message = { sender:"user",text: inputMessage};
        socket.emit("privatemessage", {recipientId,message});
        setMessages((prevMessages) => [...prevMessages, message]);
        setInputMessage("");
    };

    return (
        <div className="flex flex-col h-screen bg-gray-900 text-white p-4">
            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto space-y-2">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`p-2 rounded-lg max-w-[30%] ${
                            msg.sender === "user" ? "bg-blue-600 ml-auto text-right" : "bg-gray-700 text-left"
                        }`}
                    >
                        {msg.text}
                    </div>
                ))}
            </div>

            {/* Input Box */}
            <div className="flex items-center gap-2 mt-4">
                <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    className="flex-1 p-2 rounded-lg bg-gray-800 text-white outline-none"
                    placeholder="Type a message..."
                />
                <input
                    type="text"
                    value={recipientId}
                    onChange={handleRecipientChange}
                    className="flex-1 p-2 rounded-lg bg-gray-800 text-white outline-none"
                    placeholder="enter receiptent id..."
                />
                <input
                    type="text"
                    value={userid}
                    onChange={useridchange}
                    className="flex-1 p-2 rounded-lg bg-gray-800 text-white outline-none"
                    placeholder="enter your id..."
                />
                <button
                    onClick={sendMessage}
                    className="bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                    Send
                </button>
                <button
    onClick={register}
    disabled={isLoading}
    className={`bg-green-500 px-4 py-2 rounded-lg hover:bg-green-700 transition ${isLoading ? "bg-gray-600 cursor-not-allowed" : ""}`}
>
    {isLoading ? "Registering..." : "Register"}
</button>
<div className="mt-4">
    <Link
        to="/"
        className="bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-700 transition text-white"
    >
        Go to Home
    </Link>
</div>




            </div>
        </div>
    );
};

export default Chat;