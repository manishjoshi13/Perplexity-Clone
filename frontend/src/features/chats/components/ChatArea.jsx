import Inputbox from "./Inputbox";
import Message from "./Message";

const suggestions = [
  { icon: "🌐", label: "Search the web", desc: "Find latest information" },
  { icon: "📄", label: "Summarize docs", desc: "Upload & analyze files" },
  { icon: "💡", label: "Brainstorm ideas", desc: "Creative collaboration" },
  { icon: "🧑‍💻", label: "Write code", desc: "Any language, any task" },
];

const ChatArea = () => {
  const hasMessages = true; // set false to see empty state

  return (
    <div className="flex flex-col h-full relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-cyan-500/3 blur-[100px] rounded-full pointer-events-none" />

      {/* Messages or Empty state */}
      {hasMessages ? (
        <div className="flex-1 overflow-y-auto px-4 md:px-8 py-6 space-y-5">
          {/* Chat header */}
          <div className="flex items-center gap-3 pb-4 border-b border-white/5 mb-2">
            <div className="flex-1">
              <h2 className="text-base font-[heading] text-white">What is quantum entanglement?</h2>
              <p className="text-[11px] font-[text] text-gray-600 flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                Active • 3 messages
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-1.5 rounded-lg hover:bg-white/5 text-gray-600 hover:text-cyan-400 transition-all duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
              </button>
              <button className="p-1.5 rounded-lg hover:bg-white/5 text-gray-600 hover:text-red-400 transition-all duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>

          <Message type="ai" text="Hello! I'm your AI assistant. How can I help you today? I can search the web, analyze data, write code, and much more." />
          <Message type="user" text="What is quantum entanglement?" />
          <Message type="ai" text="Quantum entanglement is a phenomenon where two or more particles become interconnected in such a way that the quantum state of each particle cannot be described independently of the others, even when separated by large distances. When you measure one particle, you instantly know the state of the other — Einstein famously called this 'spooky action at a distance'." />
        </div>
      ) : (
        /* Empty / Welcome State */
        <div className="flex-1 flex flex-col items-center justify-center px-6 py-10">
          {/* Logo glow */}
          <div className="relative mb-6">
            <div className="absolute inset-0 rounded-full bg-cyan-500/30 blur-[30px]" />
            <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-400 to-cyan-700 flex items-center justify-center shadow-[0_0_30px_rgba(34,211,238,0.5)]">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
          </div>
          <h2 className="text-2xl font-[heading] text-white text-center mb-2">What can I help with?</h2>
          <p className="text-sm font-[text] text-gray-500 text-center mb-8 max-w-sm">
            Ask me anything. I can search the web, write code, analyze documents and much more.
          </p>

          {/* Suggestion cards */}
          <div className="grid grid-cols-2 gap-3 w-full max-w-md">
            {suggestions.map((s) => (
              <button
                key={s.label}
                className="p-4 rounded-xl bg-white/3 border border-white/8 hover:bg-white/6 hover:border-cyan-500/20 hover:shadow-[0_0_20px_rgba(34,211,238,0.05)] transition-all duration-300 text-left group"
              >
                <span className="text-xl mb-2 block">{s.icon}</span>
                <p className="text-sm font-[heading] text-gray-200 group-hover:text-white transition-colors">{s.label}</p>
                <p className="text-[11px] font-[text] text-gray-600 mt-0.5">{s.desc}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      <Inputbox />
    </div>
  );
};

export default ChatArea;