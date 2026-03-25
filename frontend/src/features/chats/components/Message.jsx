const Message = ({ type, text }) => {
  const isUser = type === "user";

  return (
    <div className={`w-full flex ${isUser ? "justify-end" : "justify-start"} group`}>
      {/* AI Avatar */}
      {!isUser && (
        <div className="mr-3 mt-0.5 shrink-0">
          <div className="relative w-7 h-7">
            <div className="absolute inset-0 rounded-full bg-cyan-500/30 blur-[6px]" />
            <div className="relative w-7 h-7 rounded-full bg-gradient-to-br from-cyan-400 to-cyan-700 flex items-center justify-center shadow-[0_0_10px_rgba(34,211,238,0.4)]">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2a10 10 0 110 20A10 10 0 0112 2zm0 3a7 7 0 100 14A7 7 0 0012 5zm-1 10v-4a1 1 0 112 0v4a1 1 0 11-2 0zm1-6a1 1 0 110-2 1 1 0 010 2z"/>
              </svg>
            </div>
          </div>
        </div>
      )}

      <div
        className={`max-w-[78%] md:max-w-[60%] px-4 py-3 rounded-2xl text-sm md:text-base font-[text] relative transition-all duration-200 ${
          isUser
            ? "bg-gradient-to-br from-cyan-600/25 to-cyan-700/15 text-cyan-100 border border-cyan-500/20 rounded-br-sm shadow-[0_0_20px_rgba(34,211,238,0.04)]"
            : "bg-white/4 border border-white/8 text-gray-200 rounded-bl-sm backdrop-blur-sm"
        }`}
      >
        {/* Animated glow on AI messages */}
        {!isUser && (
          <div className="absolute -inset-px rounded-2xl rounded-bl-sm bg-gradient-to-br from-cyan-500/5 to-transparent pointer-events-none" />
        )}
        <p className="leading-relaxed relative z-10">{text}</p>
        <div className={`flex items-center gap-1.5 mt-2 ${isUser ? "justify-end" : "justify-start"}`}>
          <span className="text-[10px] font-[text] text-gray-600">
            {isUser ? "You" : "AI"}
          </span>
          <span className="text-[10px] text-gray-700">•</span>
          <span className="text-[10px] font-[text] text-gray-600">just now</span>
          {isUser && (
            <>
              <span className="text-[10px] text-gray-700">•</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 text-cyan-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </>
          )}
        </div>
      </div>

      {/* User Avatar */}
      {isUser && (
        <div className="ml-3 mt-0.5 shrink-0">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-gray-600 to-gray-700 border border-white/10 flex items-center justify-center text-white text-xs font-[heading]">
            U
          </div>
        </div>
      )}
    </div>
  );
};

export default Message;