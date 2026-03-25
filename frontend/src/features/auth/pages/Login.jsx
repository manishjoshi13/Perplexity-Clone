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
    <div className="h-screen overflow-hidden flex items-center justify-center bg-[#05070a] font-[text] relative">

      {/* background glow */}
      <div className="absolute w-96 h-96 bg-cyan-500/10 blur-[100px] rounded-full top-[-100px] left-[-100px]" />
      <div className="absolute w-80 h-80 bg-cyan-400/10 blur-[100px] rounded-full bottom-[-100px] right-[-100px]" />

      <div className="w-full max-w-md p-6 rounded-2xl bg-[#0b0f14]/90 backdrop-blur-xl border border-white/10">

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
            className="w-full p-3 rounded-xl bg-[#0a0a0a] border border-white/10 text-white focus:border-cyan-400 focus:shadow-[0_0_10px_rgba(0,255,255,0.3)] outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            required={true}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-xl bg-[#0a0a0a] border border-white/10 text-white focus:border-cyan-400 focus:shadow-[0_0_10px_rgba(0,255,255,0.3)] outline-none"
          />

          <button type="submit" className="w-full py-3 rounded-xl bg-cyan-500/20 text-cyan-300 hover:bg-cyan-400 hover:text-black transition">
            Login
          </button>

          </form>
          <p className="text-red-500 text-center text-sm ">{authState.error}</p>
          


          <p className="text-center text-gray-400 text-sm">
            Don’t have an account?{" "}
            <span
              onClick={() => navigate("/register")}
              className="text-cyan-400 cursor-pointer"
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