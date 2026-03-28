import React from "react";
import useChats from "../hooks/useChats";
import { useDispatch } from "react-redux";
import { setChats, setMessages, setCurrentChatId } from "../chats.slice";
import useAuth from "../../auth/hooks/useAuth";

const Sidebar = ({ chats = [] }) => {
  const dispatch = useDispatch();
  const { currentChatId, handleSetCurrentChat, handleGetChatMessages, handleDeleteChat } = useChats();
  const { authState } = useAuth();
  const user = authState?.user;

  const onChatClick = async (chatId) => {
    handleSetCurrentChat(chatId);
    await handleGetChatMessages(chatId);
  };

  const handleNewChat = () => {
    dispatch(setCurrentChatId(null));
    dispatch(setChats([{ title: "", _id: Date.now() }, ...chats]));
    dispatch(setMessages([]));
  };

  return (
    <div className="h-full w-64 flex flex-col bg-[#0f1115] border-r border-[#1e2025] relative overflow-hidden text-gray-300">
      {/* Header */}
      <div className="px-4 pt-5 pb-4">
        

        {/* New Chat Button */}
        <button 
          onClick={handleNewChat} 
          className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg border border-[#2a2d35] bg-[#17191e] hover:bg-[#1f2128] transition-all duration-200 group text-sm"
        >
          <span className="font-medium text-gray-200">New Chat</span>
          <div className="flex items-center justify-center text-gray-500 group-hover:text-gray-300 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </div>
        </button>
      </div>

      {/* Chat list */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden px-3 pb-3 space-y-3 scrollbar-thin scrollbar-thumb-[#2a2c33] scrollbar-track-transparent">
        <div className="px-1 py-2">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest font-[heading]">Recent</p>
        </div>

        {chats && chats.length > 0 ? chats.map((chat) => (
          <button
            key={chat._id}
            onClick={() => onChatClick(chat._id)}
            className={`w-full text-left px-3 bg-[#1f2128]  py-2.5 rounded-lg transition-all duration-200 group relative flex items-center ${
              currentChatId === chat._id
                ? " text-white outline"
                : "hover:bg-[#1a1c23] text-gray-400 hover:text-gray-200"
            }`}
          >
            <div className="flex items-center justify-between gap-2 w-full">
              <div className="flex-1 min-w-0">
                <p className={`text-[13px] font-[text] truncate transition-colors ${chat.title ? "opacity-100" : "opacity-50"} ${currentChatId === chat._id ? "font-medium" : ""}`}>
                  {chat.title ? chat.title : "New Chat"}
                </p>
              </div>
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  if (!chat.title) {
                    const updatedChats = chats.filter(c => c._id !== chat._id);
                    dispatch(setChats(updatedChats));
                    if (currentChatId === chat._id) {
                      dispatch(setCurrentChatId(null));
                      dispatch(setMessages([]));
                      
                    }
                  } else {
                    handleDeleteChat(chat._id);
                    dispatch(setCurrentChatId(null));
                    dispatch(setMessages([]));
                  }
                }}
                className={`opacity-0 group-hover:opacity-100 p-1 hover:text-red-400 transition-all rounded-md hover:bg-white/5 shrink-0 ${currentChatId === chat._id ? "text-gray-400" : "text-gray-500"}`}
                title="Delete Chat"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </div>
            </div>
          </button>
        )) : (
          <p className="text-center text-gray-500 text-[11px] mt-4">No recent chats</p>
        )}
      </div>

      {/* Bottom user card */}
      <div className="p-4 border-t border-[#1e2025]">
        <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#1a1c23] transition-colors cursor-pointer group">
          <div className="w-8 h-8 rounded-full bg-[#2a2d35] flex items-center justify-center text-gray-300 text-xs font-medium uppercase shrink-0 border border-[#3b3e48]">
            {user?.username ? user.username.charAt(0) : "U"}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[13px] font-medium text-gray-200 truncate group-hover:text-white transition-colors">{user?.username || "User"}</p>
            <p className="text-[11px] text-gray-500 truncate">{user?.email || "Free Plan"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;