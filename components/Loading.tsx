
import React, { useEffect, useState } from 'react';

const Loading: React.FC = () => {
  const [step, setStep] = useState(0);
  const messages = [
    "Rasm yuklanmoqda...",
    "AI model ishga tushirildi...",
    "Barg strukturasi tahlil qilinmoqda...",
    "Kasallik belgilari qidirilmoqda...",
    "Davolash usullari shakllantirilmoqda...",
    "Hisobot tayyorlanmoqda..."
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setStep(prev => (prev + 1) % messages.length);
    }, 2000);
    return () => clearInterval(timer);
  }, [messages.length]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] py-20 px-4 text-center">
      <div className="relative mb-12">
        <div className="w-32 h-32 border-4 border-emerald-100 rounded-full animate-spin border-t-emerald-600"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-emerald-600 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </div>
      </div>
      <h2 className="text-2xl font-bold text-slate-800 mb-2">Tahlil ketmoqda</h2>
      <div className="h-6 overflow-hidden">
        <p className="text-emerald-600 font-medium animate-bounce">
          {messages[step]}
        </p>
      </div>
      <div className="mt-12 max-w-sm mx-auto">
        <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
           <div className="bg-emerald-600 h-full animate-[loading_4s_ease-in-out_infinite]"></div>
        </div>
      </div>
      
      <style>{`
        @keyframes loading {
          0% { width: 0%; transform: translateX(-100%); }
          50% { width: 100%; transform: translateX(0); }
          100% { width: 0%; transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

export default Loading;
