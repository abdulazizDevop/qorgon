import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { chatStore, useChatStore } from '../services/chatStore';

const AIAgronom: React.FC = () => {
  const { sessions, activeSessionId, isLoading } = useChatStore();
  const [input, setInput] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [sessionToDelete, setSessionToDelete] = useState<string | null>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const activeSession = sessions?.find(s => s.id === activeSessionId) || sessions?.[0];
  const messages = activeSession?.messages || [];

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.style.scrollBehavior = 'smooth';
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    if (messages.length > 1 || isLoading) {
      scrollToBottom();
    }
  }, [messages.length, isLoading]);

  const createNewChat = () => {
    chatStore.createNewChat();
    setIsSidebarOpen(false);
  };

  const handleSend = () => {
    if (!input.trim() || isLoading) return;
    const msg = input;
    setInput('');
    chatStore.sendMessage(msg);
  };

  const suggestedPrompts = [
    { icon: '🍅', text: 'Pomidorimning barglarida qora dog\'lar paydo bo\'ldi, nima qilish kerak?' },
    { icon: '🍇', text: 'Uzumga oidium tushishini qanday oldini olish mumkin?' },
    { icon: '🌾', text: 'Paxtaga qaysi davrda dori sepish eng samarali?' },
    { icon: '🥔', text: 'Kartoshkaga fitoftoroz kasalligi qanday davolanadi?' },
  ];

  const handlePromptClick = (prompt: string) => {
    if (isLoading) return;
    chatStore.sendMessage(prompt);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="max-w-6xl mx-auto py-6 px-4 md:px-6 h-[calc(100vh-100px)] flex flex-col">
      <div className="text-center mb-6 shrink-0 relative flex items-center justify-center">
        <button 
          onClick={toggleSidebar}
          className="md:hidden absolute left-0 p-2 text-slate-500 hover:bg-slate-100 rounded-xl"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <div>
          <h2 className="text-3xl font-black text-slate-900 mb-1 font-serif">AI <span className="text-emerald-500">Agronom</span></h2>
          <p className="text-slate-500 text-sm font-light font-sans">24/7 shaxsiy maslahatchingiz</p>
        </div>
      </div>

      <div className="flex-grow flex gap-4 overflow-hidden relative">
        
        {/* Sidebar */}
        <div className={`${isSidebarOpen ? 'translate-x-0' : '-translate-x-[150%]'} absolute z-10 md:relative md:translate-x-0 transition-transform duration-300 w-64 md:w-72 bg-white/60 backdrop-blur-2xl rounded-[2rem] shadow-[0_8px_32px_rgba(0,0,0,0.05)] border border-white/60 flex flex-col h-full overflow-hidden shrink-0`}>
          <div className="p-4 border-b border-white/60">
            <button 
              onClick={createNewChat}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-emerald-50 text-emerald-600 rounded-xl font-bold text-sm shadow-sm hover:bg-emerald-100 transition-colors border border-emerald-100/50"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Yangi chat
            </button>
          </div>
          <div className="flex-grow overflow-y-auto p-2 custom-scrollbar">
            {sessions.sort((a,b) => b.updatedAt.getTime() - a.updatedAt.getTime()).map(session => (
              <div
                key={session.id}
                className={`group relative w-full text-left rounded-xl mb-1 transition-colors ${activeSessionId === session.id ? 'bg-emerald-500 text-white shadow-md shadow-emerald-200' : 'text-slate-600 hover:bg-white/80'}`}
              >
                {editingId === session.id ? (
                  <div className="flex items-center gap-1 p-2">
                    <input
                      autoFocus
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          chatStore.updateSessionTitle(session.id, editTitle);
                          setEditingId(null);
                        } else if (e.key === 'Escape') {
                          setEditingId(null);
                        }
                      }}
                      className="flex-grow w-full bg-white/20 border border-white/40 rounded px-2 py-1 text-sm outline-none placeholder-white/60 focus:ring-1 focus:ring-white"
                      placeholder="Chat nomi..."
                    />
                    <button 
                      onClick={() => {
                        chatStore.updateSessionTitle(session.id, editTitle);
                        setEditingId(null);
                      }}
                      className="p-1 rounded text-white bg-white/20 hover:bg-white/40 shrink-0"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        chatStore.setActiveSessionId(session.id);
                        setIsSidebarOpen(false);
                      }}
                      className="w-full text-left px-4 py-3 pb-8"
                    >
                      <div className="font-semibold text-sm truncate pr-14">{session.title}</div>
                      <div className={`text-[10px] mt-1 line-clamp-1 absolute bottom-3 w-[calc(100%-2rem)] ${activeSessionId === session.id ? 'text-emerald-100' : 'text-slate-400'}`}>
                        {session.messages[session.messages.length - 1]?.text || "Bosh chat"}
                      </div>
                    </button>
                    <div className="absolute top-2.5 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity bg-transparent">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditTitle(session.title);
                          setEditingId(session.id);
                        }}
                        className={`p-1 rounded-md transition-colors ${activeSessionId === session.id ? 'text-emerald-100 hover:text-white hover:bg-emerald-600' : 'text-slate-400 hover:text-emerald-500 hover:bg-emerald-50'}`}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                      </button>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setSessionToDelete(session.id);
                        }}
                        className={`p-1 rounded-md transition-colors ${activeSessionId === session.id ? 'text-emerald-100 hover:text-red-200 hover:bg-red-500/50' : 'text-slate-400 hover:text-red-500 hover:bg-red-50'}`}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-grow w-full bg-white/40 backdrop-blur-2xl rounded-[2rem] shadow-[0_8px_32px_rgba(0,0,0,0.05)] border border-white/60 flex flex-col relative before:absolute before:inset-0 before:-z-10 before:bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] before:opacity-5 overflow-hidden">
          {isSidebarOpen && (
            <div 
              className="absolute inset-0 bg-slate-900/10 backdrop-blur-sm z-0 md:hidden"
              onClick={() => setIsSidebarOpen(false)}
            />
          )}

          {/* Chat Messages */}
          <div 
            ref={chatContainerRef}
            className="flex-grow overflow-y-auto p-4 space-y-4 custom-scrollbar z-0 relative"
          >
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[85%] md:max-w-[75%] px-4 py-2.5 rounded-2xl text-[15px] leading-relaxed font-sans shadow-sm backdrop-blur-md ${
                    msg.sender === 'user' 
                      ? 'bg-emerald-400 text-white rounded-br-sm' 
                      : 'bg-emerald-50/90 text-slate-800 rounded-bl-sm border border-emerald-100/50'
                  }`}
                >
                  {msg.sender === 'ai' && (
                    <div className="flex items-center gap-2 mb-2 pb-1.5 border-b border-slate-200/40">
                      <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="font-bold text-[11px] text-emerald-700 uppercase tracking-wider">Ko'rg'on AI</span>
                    </div>
                  )}
                  <div className="whitespace-pre-wrap break-words prose prose-sm max-w-none prose-emerald
                    prose-p:my-1 prose-p:leading-relaxed 
                    prose-ul:my-1 prose-ul:pl-4 
                    prose-ol:my-1 prose-ol:pl-4 
                    prose-li:my-0.5 
                    prose-headings:my-2 prose-headings:font-bold prose-headings:text-slate-800
                    prose-a:text-emerald-600 prose-a:underline hover:prose-a:text-emerald-700
                    prose-strong:font-bold prose-strong:text-slate-800
                    [&>*:first-child]:mt-0 [&>*:last-child]:mb-0
                  ">
                    {msg.sender === 'ai' ? (
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {msg.text}
                      </ReactMarkdown>
                    ) : (
                      msg.text
                    )}
                  </div>
                  <div className={`text-[10px] mt-1.5 text-right float-right ml-3 pt-1 flex items-center gap-1 ${msg.sender === 'user' ? 'text-emerald-100' : 'text-slate-400'}`}>
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    {msg.sender === 'user' && (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <div className="clear-both"></div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white/80 backdrop-blur-md px-4 py-3 rounded-2xl rounded-bl-sm border border-white/50 shadow-sm flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce delay-75"></div>
                  <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-bounce delay-150"></div>
                </div>
              </div>
            )}

            {messages.length <= 1 && !isLoading && (
              <div className="pt-4">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 px-1">
                  Mashhur savollar
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {suggestedPrompts.map((p, i) => (
                    <button
                      key={i}
                      onClick={() => handlePromptClick(p.text)}
                      className="text-left flex items-start gap-3 p-3 rounded-2xl bg-white/70 hover:bg-white border border-emerald-100/50 hover:border-emerald-200 hover:shadow-md transition-all group"
                    >
                      <span className="text-xl shrink-0">{p.icon}</span>
                      <span className="text-sm text-slate-700 leading-snug group-hover:text-slate-900">
                        {p.text}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-3 bg-white/50 backdrop-blur-xl border-t border-white/40 z-10">
            <div className="flex gap-2 items-end bg-white/70 p-1.5 rounded-3xl border border-white/60 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] focus-within:ring-2 focus-within:ring-emerald-200/50 transition-all">
              <button className="p-2.5 text-slate-400 hover:text-emerald-500 transition-colors shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 transform rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                </svg>
              </button>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Xabar yozing..."
                className="flex-grow bg-transparent border-none outline-none focus:ring-0 px-2 py-2.5 max-h-32 resize-none text-slate-800 placeholder-slate-400 font-sans text-[15px] custom-scrollbar focus:outline-none"
                rows={1}
                style={{ minHeight: '44px' }}
              />
              <button 
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="p-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-full hover:from-emerald-600 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md shadow-emerald-200 shrink-0 mb-0.5 mr-0.5"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform rotate-90 translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
            <p className="text-center text-[10px] text-slate-400 mt-2 font-sans px-4">
              AI javoblari xato bo'lishi mumkin. Muhim qarorlar qabul qilishdan oldin mutaxassis bilan maslahatlashing.
            </p>
          </div>
        </div>

      </div>

      {/* Delete Confirmation Modal */}
      {sessionToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white/80 backdrop-blur-xl border border-white/60 rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.1)] max-w-sm w-full p-6 transform transition-all animate-in zoom-in-95 duration-200">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-red-100/80 border border-red-200 flex items-center justify-center shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-800 font-sans">Chatni o'chirish</h3>
              </div>
            </div>
            <p className="text-slate-500 mb-6 text-[15px] leading-relaxed">
              Ushbu chat xotiradan butunlay o'chib ketadi. Buni haqiqatan ham xohlaysizmi?
            </p>
            <div className="flex justify-end gap-3">
              <button 
                onClick={() => setSessionToDelete(null)}
                className="px-5 py-2.5 text-sm font-semibold text-slate-600 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-all shadow-sm"
              >
                Bekor qilish
              </button>
              <button 
                onClick={() => {
                  chatStore.deleteSession(sessionToDelete);
                  setSessionToDelete(null);
                }}
                className="px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 rounded-xl transition-all shadow-md shadow-red-200/50 flex items-center gap-2"
              >
                O'chirish
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIAgronom;
