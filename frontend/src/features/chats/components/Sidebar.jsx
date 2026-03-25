import React, { useState } from "react";

const Sidebar = () => {
  const [activeChat, setActiveChat] = useState(0);

  const recentChats = [
    { id: 1, title: "What is quantum entanglement?", time: "2m ago" },
    { id: 2, title: "React performance optimization tips", time: "1h ago" },
    { id: 3, title: "Best practices for REST APIs", time: "3h ago" },
    { id: 4, title: "History of the Roman Empire", time: "Yesterday" },
    { id: 5, title: "How does photosynthesis work?", time: "2d ago" },
  ];

  return (
    <div className="h-full w-64 flex flex-col bg-[#030508] border-r border-white/5 relative overflow-hidden">
      {/* Subtle ambient glow */}
      <div className="absolute top-0 left-0 w-40 h-40 bg-cyan-500/4 blur-[70px] rounded-full pointer-events-none" />

      {/* New Chat Button */}
      <div className="px-4 pt-5 pb-4">
        <button className="w-full flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/15 text-cyan-400 font-[heading] text-sm hover:bg-cyan-500/15 hover:border-cyan-400/30 hover:shadow-[0_0_15px_rgba(34,211,238,0.1)] transition-all duration-200">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
          </svg>
          New Chat
        </button>
      </div>

      {/* Divider */}
      <div className="mx-4 border-t border-white/5 mb-3" />

      {/* Section label */}
      <div className="px-4 mb-2">
        <p className="text-[10px] font-[heading] text-gray-700 uppercase tracking-widest">Recent Chats</p>
      </div>

      {/* Chat list */}
      <div className="flex-1 overflow-y-auto px-3 pb-3 space-y-0.5">
        {recentChats.map((chat, i) => (
          <button
            key={chat.id}
            onClick={() => setActiveChat(i)}
            className={`w-full text-left px-3 py-2.5 rounded-lg transition-all duration-200 group relative ${
              activeChat === i
                ? "bg-cyan-500/8 border border-cyan-500/15"
                : "hover:bg-white/3 border border-transparent"
            }`}
          >
            {activeChat === i && (
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-cyan-500 rounded-full" />
            )}
            <p className={`text-sm font-[text] truncate pl-1 ${activeChat === i ? "text-cyan-200" : "text-gray-500 group-hover:text-gray-300"} transition-colors`}>
              {chat.title}
            </p>
            <p className="text-[10px] font-[text] text-gray-700 pl-1 mt-0.5">{chat.time}</p>
          </button>
        ))}
      </div>

      {/* Bottom user card */}
      <div className="mx-3 mb-3 p-3 rounded-xl bg-white/2 border border-white/5 flex items-center gap-2.5">
        <div className="relative">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-cyan-600 to-cyan-900 flex items-center justify-center text-white text-xs font-[heading]">
            U
          </div>
          <div className="absolute bottom-0 right-0 w-2 h-2 bg-emerald-400 rounded-full border-2 border-[#030508]" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-[heading] text-gray-300 truncate">User</p>
          <p className="text-[10px] font-[text] text-gray-700 truncate">Free Plan</p>
        </div>
        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400/60" />
      </div>
    </div>
  );
};

export default Sidebar;