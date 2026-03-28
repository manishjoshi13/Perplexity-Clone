import React from 'react'

const Layout = ({ children }) => {
  return (
    <div className="h-screen w-full bg-[#05070a] text-white flex flex-col overflow-hidden relative">
      {/* Global ambient glows matching auth pages */}
      <div className="absolute w-[600px] h-[400px] bg-cyan-500/5 blur-[120px] rounded-full top-[-200px] left-[-150px] pointer-events-none" />
      <div className="absolute w-[500px] h-[400px] bg-cyan-400/4 blur-[120px] rounded-full bottom-[-200px] right-[-150px] pointer-events-none" />
      {children}
    </div>
  );
};

export default Layout
