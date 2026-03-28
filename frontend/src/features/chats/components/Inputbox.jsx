import { useState } from "react";
import useChats from "../hooks/useChats";

const Inputbox = () => {
  const { handleSendMessage, currentChatId, chats } = useChats();
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);
  const [sending, setSending] = useState(false);

  const onSend = async () => {
    if (!value.trim() || sending) return;
    setSending(true);
    try {
      const currentChat = chats?.find(c => c._id === currentChatId);
      const actualChatId = currentChat?.title ? currentChatId : null;
      setValue("");
      await handleSendMessage(value, actualChatId);
      
    } catch (err) {
      console.error(err);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="w-full px-4 pb-5 pt-3 relative">
      

      {/* Main input container */}
      <div
        className={`relative flex items-end gap-3 bg-white/4 border rounded-2xl px-4 py-3 transition-all duration-300 ${focused
            ? "border-cyan-500/40 shadow-[0_0_25px_rgba(34,211,238,0.08),0_0_0_1px_rgba(34,211,238,0.08)] bg-white/6"
            : "border-white/8 hover:border-white/12"
          }`}
      >
        {/* Glow layer */}
        {focused && (
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-cyan-500/3 to-transparent pointer-events-none" />
        )}

        {/* Textarea */}
        <textarea
          rows={1}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              onSend();
            }
          }}
          placeholder="Ask anything..."
          disabled={sending}
          className="flex-1 bg-transparent resize-none outline-none text-gray-100 placeholder:text-gray-600 font-[text] text-sm leading-6 max-h-36 overflow-y-auto scrollbar-thin scrollbar-thumb-white/5 relative z-10"
          style={{ height: "24px" }}
          onInput={(e) => {
            e.target.style.height = "24px";
            e.target.style.height = Math.min(e.target.scrollHeight, 144) + "px";
          }}
        />

        {/* Right actions */}
        <div className="flex items-center gap-2 pb-0.5 relative z-10 shrink-0">
          {/* Send button */}
          <button
            onClick={onSend}
            disabled={!value.trim() || sending}
            className={`w-8 h-8 flex items-center justify-center rounded-xl transition-all duration-300 ${value.trim() && !sending
                ? "bg-cyan-500 text-black shadow-[0_0_15px_rgba(34,211,238,0.4)] hover:shadow-[0_0_25px_rgba(34,211,238,0.6)] hover:bg-cyan-400 scale-100"
                : "bg-white/8 text-gray-600 cursor-not-allowed"
              }`}
          >
            {sending ? (
              <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Footer hint */}
      <p className="text-center text-[10px] font-[text] text-gray-700 mt-2">
        AI can make mistakes. Verify important information.
      </p>
    </div>
  );
};

export default Inputbox;