import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e){
    e.preventDefault();
    // Handle login logic here
    
  }

  return (
    <div className="h-screen overflow-hidden flex items-center justify-center bg-[#05070a]  font-[text] relative">

      {/* background glow */}
      <div className="absolute w-96 h-96 bg-cyan-500/10 blur-[100px] rounded-full top-[-100px] left-[-100px]" />
      <div className="absolute w-80 h-80 bg-cyan-400/10 blur-[100px] rounded-full bottom-[-100px] right-[-100px]" />

      <div className="w-full max-w-md p-6 rounded-2xl bg-[#0b0f14]/90 backdrop-blur-xl border border-white/10">

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
            className="w-full p-3 rounded-xl bg-[#0a0a0a] border border-white/10 text-white focus:border-cyan-400 focus:shadow-[0_0_10px_rgba(0,255,255,0.3)] outline-none"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            required="true"
            onChange={(e) => setEmail(e.target.value)}
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
            Register
          </button> 
          </form>

          <p className="text-center text-gray-400 text-sm">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-cyan-400 cursor-pointer"
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