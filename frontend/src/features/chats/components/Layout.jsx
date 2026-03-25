import React from 'react'

const Layout = ({ children }) => {
  return (
    <div className="h-screen w-full bg-[#030508] text-white flex flex-col overflow-hidden relative">
      {/* Global ambient glows */}
      <div className="absolute w-[600px] h-[400px] bg-cyan-500/3 blur-[150px] rounded-full top-[-200px] left-[-150px] pointer-events-none" />
      <div className="absolute w-[500px] h-[400px] bg-cyan-400/2 blur-[150px] rounded-full bottom-[-200px] right-[-150px] pointer-events-none" />
      {children}
    </div>
  );
};

export default Layout
