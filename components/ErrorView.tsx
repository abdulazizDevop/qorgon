
import React from 'react';

interface ErrorViewProps {
  message: string;
  onRetry: () => void;
}

const ErrorView: React.FC<ErrorViewProps> = ({ message, onRetry }) => {
  return (
    <div className="max-w-md mx-auto py-20 px-4 text-center">
      <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6 text-red-600">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      <h2 className="text-2xl font-bold text-slate-800 mb-4">Xatolik yuz berdi</h2>
      <p className="text-slate-500 mb-8 leading-relaxed">
        {message || "Rasmni tahlil qilishda texnik xatolik yuz berdi. Iltimos, qaytadan urinib ko'ring yoki boshqa rasm tanlang."}
      </p>
      <div className="flex flex-col gap-3">
        <button 
          onClick={onRetry}
          className="px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-emerald-200"
        >
          Qayta urinish
        </button>
        <button 
          onClick={() => window.location.reload()}
          className="px-8 py-4 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold rounded-xl transition-all"
        >
          Bosh sahifaga qaytish
        </button>
      </div>
    </div>
  );
};

export default ErrorView;
