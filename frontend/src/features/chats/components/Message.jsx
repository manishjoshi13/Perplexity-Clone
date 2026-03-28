import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import useAuth from "../../auth/hooks/useAuth";


const Message = ({ type, text }) => {
  const isUser = type === "user";
  const { authState, handleLogout } = useAuth();
  const user = authState?.user;

  return (
    <div className={`w-full flex ${isUser ? "justify-end" : "justify-start"} group`}>
      {/* AI Avatar */}
      {!isUser && (
        <div className="mr-3 mt-0.5 shrink-0">
          <div className="relative w-7 h-7">
            <div className="relative w-7 h-7 text-xs font-[heading] text-cyan-500 rounded bg-[#1e2025] border border-[#2a2d35] flex items-center justify-center">
              AI
            </div>
          </div>
        </div>
      )}

      <div
        className={`max-w-[85%] md:max-w-[75%] px-4 py-3 rounded-2xl text-[14.5px] leading-relaxed font-[text] transition-all duration-200 ${
          isUser
            ? "bg-[#1e2025] text-gray-200 border border-[#2a2d35] rounded-br-sm"
            : "bg-transparent text-gray-200"
        }`}
      >
        <ReactMarkdown  remarkPlugins={[remarkGfm]} // tables, strikethrough etc.
        rehypePlugins={[rehypeHighlight]}>
          {text}
          </ReactMarkdown>
        <div className={`flex items-center gap-1.5 mt-2 ${isUser ? "justify-end" : "justify-start"}`}>
          <span className="text-[10px] font-[text] text-gray-500">
            {isUser ? "You" : "Perplexity"}
          </span>
        </div>
      </div>

      {/* User Avatar */}
      {isUser && (
        <div className="ml-3 mt-0.5 shrink-0">
          <div className="w-7 h-7 rounded-full bg-[#1e2025] border border-[#2a2d35] flex items-center justify-center text-gray-300 text-xs font-[heading] uppercase">
            {user?.username ? user.username.charAt(0) : "U"}
          </div>
        </div>
      )}
    </div>
  );
};

export default Message;