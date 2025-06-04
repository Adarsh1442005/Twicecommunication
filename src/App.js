
import LoginForm from './login.js';
import Chat from './chatceck.js';
import RegistrationForm from './userregistration.js';
import LogoutButton from './logout.js';
import Home from './home.js'
import './App.css';
import {ProtectedRoute} from './protectedroute';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import OTPVerification from './verify.js'



function App() {
  return (
    <BrowserRouter>
    <Routes>
       <Route path="/" element={<Home/>}/>
       <Route path="/login" element={<LoginForm/>}/>
       <Route path="/registration" element={<RegistrationForm/>}/>
       <Route path="/logout" element={<LogoutButton/>}/>
       <Route path="/chat" element={<ProtectedRoute element={<Chat/>}/>}/>
        <Route path="/veri" element={<OTPVerification/>}/>
    </Routes>




    </BrowserRouter>
    
  );
}

export default App;
