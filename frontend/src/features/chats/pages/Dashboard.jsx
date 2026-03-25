import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useChats from "../hooks/useChats";

const Dashboard = () => {
  const navigate = useNavigate();
  let {initializeSocketConnection}=useChats()
  useEffect(()=>{
    initializeSocketConnection()

  },[])

  return (
    <div className="min-h-screen w-full bg-[#05070a] text-white font-[text] flex flex-col overflow-x-hidden">

      {/* 🔹 Navbar */}
      <header className="w-full border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <h1 className="text-lg sm:text-xl font-[heading] text-cyan-400 tracking-wide">
            AI Drive
          </h1>

          <div className="flex items-center gap-2 sm:gap-4">
            <button className="px-3 py-1.5 sm:px-4 sm:py-2 text-sm rounded-lg bg-white/5 hover:bg-white/10 transition">
              History
            </button>

            <button
              onClick={() => navigate("/profile")}
              className="w-8 h-8 sm:w-9 sm:h-9 text-sm rounded-full bg-cyan-500/20 flex items-center justify-center hover:bg-cyan-400 hover:text-black transition"
            >
              U
            </button>
          </div>
        </div>
      </header>

      {/* 🔹 Main */}
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 relative">

        {/* 🌌 Safe Glow (no overflow issues) */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute w-[400px] h-[400px] sm:w-[500px] sm:h-[500px] bg-cyan-500/10 blur-[120px] rounded-full top-[-150px] left-1/2 -translate-x-1/2" />
          <div className="absolute w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] bg-cyan-400/10 blur-[120px] rounded-full bottom-[-120px] left-1/2 -translate-x-1/2" />
        </div>

        {/* 🔹 Content */}
        <div className="w-full max-w-2xl text-center z-10">

          {/* Heading */}
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-[heading] mb-4 sm:mb-6 leading-tight">
            Ask anything.
          </h2>

          <p className="text-gray-400 text-sm sm:text-base mb-6 sm:mb-10">
            Search smarter with AI. Get answers, explanations, and insights instantly.
          </p>

          {/* 🔹 Search Box */}
          <div className="w-full bg-[#0b0f14]/90 border border-white/10 rounded-2xl p-2 sm:p-3 backdrop-blur-xl flex items-center gap-2 sm:gap-3 shadow-lg">

            <input
              type="text"
              placeholder="Ask anything..."
              className="flex-1 bg-transparent outline-none text-white placeholder-gray-500 px-2 text-sm sm:text-base"
            />

            <button className="px-3 sm:px-5 py-2 text-sm sm:text-base rounded-xl bg-cyan-500/20 text-cyan-300 hover:bg-cyan-400 hover:text-black transition whitespace-nowrap">
              Ask
            </button>
          </div>

          {/* 🔹 Suggestions */}
          <div className="mt-6 sm:mt-8 flex flex-wrap gap-2 sm:gap-3 justify-center">
            {[
              "Explain black holes",
              "Best AI tools",
              "Blockchain",
              "Learn React",
            ].map((item, index) => (
              <button
                key={index}
                className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition whitespace-nowrap"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </main>

      {/* 🔹 Footer */}
      <footer className="w-full border-t border-white/10 text-center text-gray-500 text-xs py-3 px-4">
        Powered by AI • Built by You 🚀
      </footer>
    </div>
  );
};

export default Dashboard;