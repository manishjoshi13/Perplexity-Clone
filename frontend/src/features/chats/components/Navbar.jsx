const Navbar = () => {
  return (
    <div className="w-full h-14 flex items-center justify-between px-4 md:px-6 border-b border-white/5 bg-[#030508]/90 backdrop-blur-xl">
      {/* Left: Logo */}
      <div className="flex items-center gap-2.5">
        <div className="relative flex items-center justify-center w-7 h-7">
          <div className="absolute w-5 h-5 rounded-full bg-cyan-500/20 blur-[8px] animate-pulse" />
          <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-br from-cyan-400 to-cyan-700 shadow-[0_0_10px_rgba(34,211,238,0.6)]" />
        </div>
        <h1 className="text-base font-semibold text-white font-[heading] tracking-wide">
          Perp<span className="text-cyan-500">lexity</span>
        </h1>
      </div>

      {/* Right: User + Logout */}
      <div className="flex items-center gap-3">
        {/* User avatar */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-cyan-600 to-cyan-900 flex items-center justify-center text-white text-xs font-[heading] shadow-[0_0_8px_rgba(34,211,238,0.25)]">
              U
            </div>
            <div className="absolute bottom-0 right-0 w-2 h-2 bg-emerald-400 rounded-full border-2 border-[#030508]" />
          </div>
          <span className="text-sm font-[text] text-gray-400 hidden sm:block">User</span>
        </div>

        {/* Divider */}
        <div className="w-px h-4 bg-white/8" />

        {/* Logout button */}
        <button className="flex items-center gap-1.5 text-sm font-[text] text-gray-500 hover:text-red-400 transition-colors duration-200 group">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span className="hidden sm:block">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Navbar;