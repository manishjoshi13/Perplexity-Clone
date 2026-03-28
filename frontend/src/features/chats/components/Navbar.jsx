import React from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../auth/hooks/useAuth";

const Navbar = () => {
  const navigate = useNavigate();
  const { authState, handleLogout } = useAuth();
  const user = authState?.user;

  const onLogout = async () => {
    await handleLogout?.();
    navigate("/login");
  };

  return (
    <div className="w-full h-14 flex items-center justify-between px-4 md:px-6 border-b border-[#1e2025] bg-[#0a0b0e] relative z-10">
      {/* Logo */}
      <div className="flex items-center gap-2.5">
        <h1 className="text-base font-semibold text-gray-200 font-[heading] tracking-wide">
          Perplexity
        </h1>
      </div>

      {/* Right: User + Logout */}
      <div className="flex items-center gap-3">
        {/* User avatar */}
        <div className="relative">
          <div className="w-7 h-7 rounded-full bg-[#1e2025] border border-[#2a2d35] flex items-center justify-center text-gray-300 text-xs font-[text] uppercase">
            {user?.username ? user.username.charAt(0) : "U"}
          </div>
        </div>
        <span className="text-sm font-[text] text-gray-400 hidden sm:block">{user?.username || "User"}</span>

        {/* Divider */}
        <div className="w-px h-4 bg-[#2a2d35] mx-1" />

        {/* Logout */}
        <button
          onClick={onLogout}
          className="flex items-center gap-1.5 text-sm font-[text] text-gray-500 hover:text-red-400 transition-colors duration-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span className="hidden sm:block">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Navbar;