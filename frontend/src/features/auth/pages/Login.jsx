import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth"
import { Navigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const {handleLogin,authState} = useAuth();


  const [cred, setCred] = useState("");
  const [password, setPassword] = useState("");
  if(authState.user && !authState.loading){
    return <Navigate to='/' replace></Navigate>
  }

  async function handleSubmit(e){
    e.preventDefault();
    // Handle login logic here
    try{
        let res=await handleLogin(cred, password);
        if(res===true){
          navigate("/")
        }
        
    }
    
    catch(error){
        console.error("Login failed:", authState.error);
    }
  }


  return (
    <div className="h-screen overflow-hidden flex items-center justify-center bg-[#0a0b0e] font-[text] relative">

      <div className="w-full max-w-md p-6 sm:p-8 rounded-2xl bg-[#0b0f14]/90 backdrop-blur-xl border border-[#1e2025]">

        <h2 className="text-3xl text-center text-white mb-6 font-[heading]">
          Welcome Back
        </h2>

        <div className="space-y-4">
            <form  onSubmit={(e)=>{handleSubmit(e)}} className="space-y-4">

          <input
            placeholder="Username or Email"
            required={true}
            value={cred}
            onChange={(e) => setCred(e.target.value)}
            className="w-full p-3 rounded-xl bg-[#0f1115] border border-[#1e2025] text-white focus:border-gray-500 focus:bg-[#15171c] outline-none transition-colors"
          />

          <input
            type="password"
            placeholder="Password"
            required={true}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-xl bg-[#0f1115] border border-[#1e2025] text-white focus:border-gray-500 focus:bg-[#15171c] outline-none transition-colors"
          />

          <button type="submit" className="w-full py-3 rounded-xl bg-white text-black font-semibold hover:bg-gray-200 transition-colors mt-2">
            Login
          </button>

          </form>
          <p className="text-red-400 text-center text-sm ">{authState.error}</p>
          


          <p className="text-center text-gray-500 text-sm mt-4">
            Don’t have an account?{" "}
            <span
              onClick={() => navigate("/register")}
              className="text-white hover:underline cursor-pointer font-medium"
            >
              Register
            </span>
          </p>

        </div>
      </div>
    </div>
  );
};

export default Login;