import {Navigate} from "react-router-dom";
 export const ProtectedRoute=({element})=>{
    const isAuthenticated=localStorage.getItem("loginuser");
    console.log(isAuthenticated);
    return isAuthenticated ? element:<Navigate to="/login"/>;



}