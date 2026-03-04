
import React from 'react';

interface LandingProps {
  onStart: () => void;
}

const Landing: React.FC<LandingProps> = ({ onStart }) => {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-24 md:pt-24 md:pb-32">
        <div className="absolute top-0 right-0 -z-10 w-1/2 h-full opacity-10 blur-3xl bg-emerald-400 rounded-full translate-x-1/2 -translate-y-1/2"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
            <div className="mb-12 lg:mb-0">
              <span className="inline-block py-1 px-3 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-6 font-sans">
                Yangi Avlod Himoyasi
              </span>
              <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-tight mb-6 font-serif">
                Hosilingiz uchun <span className="text-emerald-600 italic">Mustahkam</span> Ko'rg'on
              </h1>
              <p className="text-xl text-slate-600 mb-8 max-w-xl font-light leading-relaxed">
                Sun'iy intellekt yordamida ekinlaringizni kasalliklardan himoya qiling. Aniq tashxis va samarali davolash usullari — endi sizning qo'lingizda.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={onStart}
                  className="px-8 py-4 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl shadow-lg shadow-emerald-200 transition-all transform hover:scale-105 font-sans tracking-wide"
                >
                  Hozir Skanerlash
                </button>
              </div>
              <div className="mt-12 flex items-center gap-6">
                <div className="flex -space-x-3">
                  {[1,2,3,4].map(i => (
                    <img key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200" src={`data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%2394a3b8'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 4c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm0 14c-2.03 0-4.43-.82-6.14-2.88C7.55 15.8 9.68 15 12 15s4.45.8 6.14 2.12C16.43 19.18 14.03 20 12 20z'/%3E%3C/svg%3E`} alt={`Foydalanuvchi ${i}`} />
                  ))}
                </div>
                <p className="text-sm text-slate-500 font-sans">
                  <span className="font-bold text-slate-900">5000+</span> fermerlar ishlatish uchun tayyor
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white p-4 rounded-[2.5rem] shadow-2xl border border-slate-100 relative z-10 transform rotate-2 hover:rotate-0 transition-all duration-500">
                <div className="rounded-2xl w-full h-auto aspect-[4/3] bg-slate-100 flex items-center justify-center border border-slate-200">
                   <span className="text-slate-400 font-bold uppercase tracking-widest text-sm">Ilova Skrinshoti (Kerak)</span>
                </div>
                <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-4 animate-bounce">
                  <div className="bg-red-50 p-3 rounded-xl text-red-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Aniqlangan Xavf</p>
                    <p className="text-lg font-bold text-slate-900 font-serif">Uzum oidiumi</p>
                  </div>
                </div>
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-emerald-50 rounded-full -z-20 blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4 font-serif">Nega aynan Ko'rg'on Ai?</h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-lg font-light">Bizning sun'iy intellekt modelimiz minglab o'simlik turlari va kasalliklari bo'yicha o'qitilgan.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Tezkor Tahlil",
                desc: "Rasm yuklangandan so'ng 5 soniya ichida to'liq hisobotni oling.",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                )
              },
              {
                title: "Aniq Natijalar",
                desc: "Google Gemini Vision API orqali 98% gacha aniqlik darajasi.",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )
              },
              {
                title: "Ekspert Tavsiyalari",
                desc: "Faqat tashxis emas, balki aniq davolash va oldini olish choralari.",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 01-.586 1.414l-2.828 2.828a2 2 0 01-1.414.586H8.586a2 2 0 01-1.414-.586L4.344 11.586A2 2 0 013.758 10.172V5L2.758 4h10z" />
                  </svg>
                )
              }
            ].map((f, idx) => (
              <div key={idx} className="p-8 rounded-2xl border border-slate-100 hover:border-emerald-100 hover:bg-emerald-50/50 transition-all group">
                <div className="bg-white p-3 w-fit rounded-xl shadow-sm mb-6 group-hover:scale-110 transition-transform">
                  {f.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">{f.title}</h3>
                <p className="text-slate-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
