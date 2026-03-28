import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth"
import { Navigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  
  const {handleRegister,handleLogin,authState,handleCheckVerificationStatus} = useAuth();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [buttonVal,setButtonVal] = useState("Register");
  if(authState.user && !authState.loading){
      return <Navigate to='/' replace></Navigate>
    }


  async function handleSubmit(e){
    e.preventDefault();
    // Handle registration logic here
    try{
      if(buttonVal==="Register"){
        let res=await handleRegister(username,email,password);
        if(res){
          setButtonVal("Verify");
        }
        
      }
      else if(buttonVal==="Verify"){
        const isVerified = await handleCheckVerificationStatus(username);
        console.log(isVerified);
        if(isVerified=='true'){
          await handleLogin(email,password);
          navigate("/");
          
        }
        else{
          alert("Email not verified yet. Please check your email and verify your account.");
        }
      }
    }
    catch(error){
        console.error("Registration failed:", error);
    }

  }

  return (
    <div className="h-screen overflow-hidden flex items-center justify-center bg-[#0a0b0e] font-[text] relative">

      <div className="w-full max-w-md p-6 sm:p-8 rounded-2xl bg-[#0b0f14]/90 backdrop-blur-xl border border-[#1e2025]">

        <h2 className="text-3xl text-center text-white mb-6 font-[heading]">
          Create Account
        </h2>

        <div className="space-y-4">
          <form  onSubmit={(e)=>{handleSubmit(e)}} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            required={true}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 rounded-xl bg-[#0f1115] border border-[#1e2025] text-white focus:border-gray-500 focus:bg-[#15171c] outline-none transition-colors"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            required={true}
            onChange={(e) => setEmail(e.target.value)}
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

          <button type="submit" className={`w-full py-3 mt-2 rounded-xl bg-white text-black font-semibold hover:bg-gray-200 transition-colors ${authState.loading ? "cursor-not-allowed opacity-50" : ""}`}  disabled={authState.loading}>   
            {buttonVal}
          </button> 
          
          </form>
          <p className="text-red-400 text-center text-sm ">{authState.error}</p>
          <p className="text-green-400 text-center text-sm ">{buttonVal==="Verify" && authState.error==null? "Check Your Email For verification..." : ""}</p>

          <p className="text-center text-gray-500 text-sm mt-4">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-white hover:underline cursor-pointer font-medium"
            >
              Login
            </span>
          </p>

        </div>
      </div>
    </div>
  );
};

export default Register;