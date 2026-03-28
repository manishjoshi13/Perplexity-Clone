import { useSelector } from "react-redux";
import Inputbox from "./Inputbox";
import Message from "./Message";
import useChats from "../hooks/useChats";
import { setCurrentChatId,setMessages } from "../chats.slice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";



const ChatArea = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { messages, currentChatId, chats } = useSelector(state => state.chat);
  const hasMessages = messages && messages.length > 0;
  const {handleGetChats,handleDeleteChat} = useChats();
  
  
  // Find current chat title
  const currentChat = chats?.find(c => c._id === currentChatId);
  const title = currentChat ? currentChat.title : "New Chat";

  return (
    <div className="flex flex-col h-full relative chatarea overflow-hidden bg-[#0a0b0e]">
      {/* Messages or Empty state */}

      {/* Messages or Empty state */}
      {hasMessages ? (
        <div className="flex-1 overflow-y-auto px-4 md:px-8 py-6 space-y-5">
          {/* Chat header */}
          <div className="flex items-center gap-3 pb-4 border-b border-white/5 mb-2">
            <div className="flex-1">
              <h2 className="text-lg font-[heading] text-white">{title}</h2>
              <p className="text-[11px] font-[text] text-gray-600 flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                Active • {messages.length} messages
              </p>
            </div>
            <div className="flex items-center gap-2">
              
              <button onClick={async() => {await handleDeleteChat(currentChatId)   ; dispatch(setCurrentChatId(null));dispatch(setMessages([]));await handleGetChats()}} className="p-1.5 rounded-lg hover:bg-white/5 text-gray-600 hover:text-red-400 transition-all duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>

          {messages.map((msg, idx) => (
            <Message key={msg._id || idx} type={msg.role} text={msg.content} />
          ))}
        </div>
      ) : (
        /* Empty / Welcome State */
        <div className="flex-1 flex flex-col items-center justify-center px-6 py-10">
          {/* Logo minimalist */}
          <div className="relative mb-6">
            <div className="relative w-14 h-14 rounded-xl bg-[#1e2025] border border-[#2a2d35] flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
          </div>
          <h2 className="text-xl font-[heading] text-gray-200 text-center mb-2">What can I help with?</h2>
          <p className="text-sm font-[text] text-gray-500 text-center mb-8 max-w-sm">
            Ask me anything. I can search the web, write code, analyze documents and much more.
          </p>

          {/* Key Features / Suggestions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl mt-2">
            
            {/* Feature 1: Automated Email */}
            <button 
              className="text-left p-4 rounded-xl border border-[#2a2d35] bg-[#1a1c23] hover:bg-[#1f2128] transition-all duration-200 group"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-lg bg-[#2a2d35] flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-gray-200 text-sm font-semibold font-[heading]">Send Automated Email</h3>
              </div>
              <p className="text-gray-500 text-xs font-[text] leading-relaxed">
                Send the title in chat box as well as subject and email directly from the website.
              </p>
            </button>

            {/* Feature 2: Website Builder */}
            <button 
              onClick={() => navigate('/website')}
              className="text-left p-4 rounded-xl border border-[#2a2d35] bg-[#1a1c23] hover:bg-[#1f2128] transition-all duration-200 group"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-lg bg-[#2a2d35] flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                </div>
                <h3 className="text-gray-200 text-sm font-semibold font-[heading]">Website Builder</h3>
              </div>
              <p className="text-gray-500 text-xs font-[text] leading-relaxed">
                Redirect to our powerful website builder to design and deploy custom sites safely.
              </p>
            </button>
          </div>
        </div>
      )}

      <Inputbox />
    </div>
  );
};

export default ChatArea;