import React, { useState, useEffect } from 'react';

interface LandingProps {
  onStart: () => void;
}

const Landing: React.FC<LandingProps> = ({ onStart }) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-slate-50 font-sans overflow-hidden">
      {/* Required Animations in Global CSS or Head */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scan {
          0%, 100% { transform: translateY(-100%); }
          50% { transform: translateY(500%); }
        }
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}} />

      {/* Dynamic Background Effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-emerald-400/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-1/4 left-0 w-[30rem] h-[30rem] bg-teal-400/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/3"></div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-10 pb-20 md:pt-12 md:pb-28 z-10 border-b border-emerald-100/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="mb-16 lg:mb-0 relative text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100/80 text-emerald-700 text-sm font-bold uppercase tracking-wide mb-8 border border-emerald-200/50 shadow-sm backdrop-blur-sm mx-auto lg:mx-0">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
                </span>
                Yangi Avlod Himoyasi
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.1] mb-8 font-serif tracking-tight lg:pr-8">
                Hosilingiz uchun <br className="hidden md:block" />
                <span className="relative inline-block mt-2">
                  <span className="relative z-10 text-emerald-600 italic px-2">Mustahkam</span>
                  <span className="absolute bottom-2 left-0 w-full h-4 bg-emerald-200/50 -z-10 rounded-sm -skew-x-12"></span>
                </span>
                <br className="hidden md:block" /> Ko'rg'on
              </h1>
              <p className="text-xl text-slate-600 mb-10 max-w-lg font-light leading-relaxed mx-auto lg:mx-0">
                Sun'iy intellekt yordamida ekinlaringizni kasalliklardan himoya qiling. Aniq tashxis, mutaxassis maslahati va ishonchli davolash tarmog'i.
              </p>
              <div className="flex flex-col sm:flex-row gap-5 items-center justify-center lg:justify-start">
                <button 
                  onClick={onStart}
                  className="group relative px-8 py-4 bg-emerald-600 overflow-hidden rounded-2xl shadow-xl shadow-emerald-200/50 transition-all hover:-translate-y-1 w-full sm:w-auto hover:bg-emerald-700 hover:shadow-emerald-300"
                >
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
                  <span className="relative font-bold text-white text-lg flex items-center justify-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 3L19 12 5 21 5 3z"></path></svg>
                    Hozir Skanerlash
                  </span>
                </button>
                <div className="flex items-center gap-4 text-sm font-medium text-slate-500 bg-white/50 backdrop-blur-sm px-6 py-4 rounded-2xl border border-slate-200/50">
                   <div className="flex -space-x-3">
                     {[1,2,3].map(i => (
                        <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-emerald-100 flex items-center justify-center overflow-hidden">
                           <svg className="w-4 h-4 text-emerald-600 mt-1" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                        </div>
                     ))}
                   </div>
                   <span><strong className="text-slate-900">10,000+</strong> marta tahlil</span>
                </div>
              </div>
            </div>

            {/* Right Interactive Mockup */}
            <div className="relative mx-auto max-w-[280px] sm:max-w-[320px] lg:max-w-[360px] perspective-[2000px] z-10 mt-16 lg:mt-0 pb-0 w-full">
              {/* Decorative Green Aura Behind */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[120%] bg-gradient-to-tr from-emerald-300/30 to-teal-100/30 rounded-[full] blur-3xl -z-10 transform -rotate-12 animate-[pulse_4s_cubic-bezier(0.4,0,0.6,1)_infinite]"></div>
              
              {/* Main Phone Mockup */}
              <div 
                className="relative bg-slate-900 rounded-t-[3rem] rounded-b-none shadow-2xl shadow-emerald-900/10 border-[6px] border-b-0 border-slate-800 overflow-hidden transform transition-all duration-700 w-full"
                style={{ transform: `rotateY(-12deg) rotateX(4deg) translateY(${scrollY * -0.05}px)` }}
              >
                {/* iPhone Dynamic Island / Notch */}
                <div className="absolute top-0 inset-x-0 h-7 flex justify-center z-40 pointer-events-none">
                  <div className="w-[120px] h-6 bg-black rounded-b-3xl relative">
                    <div className="absolute top-2 right-4 w-1.5 h-1.5 rounded-full bg-emerald-500 opacity-80"></div>
                  </div>
                </div>
                
                <div className="relative aspect-[8/9] sm:aspect-[9/11] lg:aspect-[9/12] bg-slate-900 overflow-hidden rounded-t-[2.5rem] rounded-b-none">
                  <img src="https://images.unsplash.com/photo-1769613637793-1d497f0fedf0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8Mnx8c2ljayUyMGxlYWZ8ZW58MHx8fHwxNzcyNjA3NDc2fDA&ixlib=rb-4.1.0&q=80&w=1080" alt="Kasallangan barg" className="absolute inset-0 w-full h-full object-cover opacity-80" />
                  
                  {/* Camera Viewfinder Corners */}
                  <div className="absolute inset-6 md:inset-8 z-10 flex flex-col justify-between pointer-events-none">
                     <div className="flex justify-between">
                       <div className="w-8 h-8 md:w-12 md:h-12 border-t-4 border-l-4 border-white/80 rounded-tl-2xl"></div>
                       <div className="w-8 h-8 md:w-12 md:h-12 border-t-4 border-r-4 border-white/80 rounded-tr-2xl"></div>
                     </div>
                     <div className="flex justify-between pb-24 md:pb-28">
                       <div className="w-8 h-8 md:w-12 md:h-12 border-b-4 border-l-4 border-white/80 rounded-bl-2xl"></div>
                       <div className="w-8 h-8 md:w-12 md:h-12 border-b-4 border-r-4 border-white/80 rounded-br-2xl"></div>
                     </div>
                  </div>

                  {/* Top Camera Header Status overlay */}
                  <div className="absolute top-6 inset-x-0 w-full flex justify-center z-20">
                    <span className="bg-slate-900/70 backdrop-blur-md text-white text-[10px] md:text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider flex items-center gap-2 shadow-lg">
                       <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                       SKANER ISHLAMOQDA
                    </span>
                  </div>

                  {/* Scanning Animation */}
                  <div className="absolute inset-x-0 top-0 h-[30%] w-full bg-gradient-to-b from-emerald-400/0 via-emerald-400/20 to-emerald-400/0 z-20 pointer-events-none" style={{ animation: 'scan 4s ease-in-out infinite' }}>
                     <div className="absolute bottom-0 w-full h-[2px] shadow-[0_0_15px_3px_#34d399] bg-emerald-400"></div>
                  </div>

                  {/* UI Overlay */}
                  <div className="absolute bottom-0 inset-x-0 px-4 pb-6 md:px-6 bg-gradient-to-t from-slate-900 via-slate-900/90 to-transparent z-30">
                     <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl transform translate-y-2 opacity-0 shadow-[0_8px_32px_rgba(0,0,0,0.3)]" style={{ animation: 'fade-in-up 0.5s ease-out 1.2s forwards' }}>
                       <div className="flex items-center gap-3 md:gap-4 mb-3">
                         <div className="bg-red-500/20 p-2 md:p-2.5 rounded-xl shrink-0">
                           <svg className="w-5 h-5 md:w-6 md:h-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                         </div>
                         <div>
                            <p className="text-white font-bold font-serif text-base md:text-lg drop-shadow-md">Uzum Oidiumi</p>
                            <p className="text-emerald-300 text-[10px] md:text-xs font-bold uppercase tracking-wider drop-shadow-md">98% Aniqlikda topildi</p>
                         </div>
                       </div>
                       <div className="w-full bg-slate-700/50 rounded-full h-1.5 md:h-2 mt-2 border border-slate-600/50">
                         <div className="bg-gradient-to-r from-red-500 to-rose-400 h-1.5 md:h-2 rounded-full w-[85%] shadow-[0_0_12px_rgba(239,68,68,0.8)]"></div>
                       </div>
                     </div>
                  </div>
                </div>
              </div>

              {/* Floating Element 1 - Hidden on mobile for cleaner look, visible on sm+ */}
              <div 
                className="absolute -left-4 md:-left-10 top-1/4 bg-white/90 backdrop-blur-sm p-3 md:p-4 rounded-xl md:rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 flex items-center gap-3 md:gap-4 z-20 transition-transform hidden sm:flex"
                style={{ transform: `translateY(${scrollY * 0.08}px)` }}
              >
                 <div className="bg-emerald-100 p-2 md:p-3 rounded-xl text-emerald-600 shrink-0">
                    <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                 </div>
                 <div>
                   <p className="font-bold text-slate-800 font-serif text-sm md:text-base">Tezkor Tahlil</p>
                   <p className="text-[10px] md:text-xs text-slate-500 mt-0.5">3.2 soniya</p>
                 </div>
              </div>
              
              {/* Floating Element 2 - Hidden on mobile */}
              <div 
                className="absolute -right-4 md:-right-8 lg:-right-4 bottom-8 bg-white/90 backdrop-blur-sm p-3 md:p-4 rounded-xl md:rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 flex items-center gap-2 md:gap-3 z-20 transition-transform hidden sm:flex"
                style={{ transform: `translateY(${scrollY * -0.07}px)` }}
              >
                 <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 font-black shrink-0 text-sm md:text-base">AI</div>
                 <div>
                   <p className="font-bold text-slate-800 text-xs md:text-sm font-serif">Agronom yordami</p>
                   <p className="text-[9px] md:text-[10px] text-slate-500 uppercase font-bold tracking-wider">24/7 Tayyor</p>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners/Logos Section */}
      <section className="py-12 bg-white relative z-10 overflow-hidden shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <p className="text-center text-sm font-bold text-slate-400 uppercase tracking-widest mb-8">Zamonaviy Texnologiyalar Asosida</p>
           <div className="flex flex-wrap justify-center items-center gap-10 md:gap-20 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
              <span className="text-2xl md:text-3xl font-black font-serif text-slate-800 flex items-center gap-3">
                <svg className="w-8 h-8 md:w-10 md:h-10 text-blue-500" viewBox="0 0 24 24" fill="currentColor"><path d="M22.56 12.25c0-.78-.07-1.53-.2-1.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg> 
                Google Gemini
              </span>
              <span className="text-xl md:text-2xl font-black font-serif text-slate-800 flex items-center gap-2">
                <svg className="w-6 h-6 md:w-8 md:h-8 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" /></svg> 
                Agro AI
              </span>
              <span className="text-xl md:text-2xl font-black font-serif text-slate-800 flex items-center gap-2">
                <svg className="w-6 h-6 md:w-8 md:h-8 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg> 
                Xolis Xizmat
              </span>
           </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 relative z-10 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-16">
              <span className="text-emerald-600 font-bold tracking-wider uppercase text-sm mb-3 block">Oddiy & Qulay Ilova</span>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 font-serif tracking-tight">3 qadamda To'liq Tashxis</h2>
              <p className="text-slate-500 max-w-2xl mx-auto text-lg leading-relaxed">Yillar davomida orttirilgan amaliy agronom tajribasi endi mobil telefoningizda. Hech qanday qiyin jarayonlarsiz, osongina natija oling.</p>
           </div>
           
           <div className="grid md:grid-cols-3 gap-12 relative max-w-5xl mx-auto">
              <div className="hidden md:block absolute top-[25%] left-[20%] w-[60%] h-0.5 border-t-2 border-dashed border-emerald-200 z-0"></div>
              
              {[
                { step: "01", title: "Rasmga Oling", desc: "Zararlangan barg, meva yoxud ekinning yirik va aniq rasmini telefoningizda oling.", color: "bg-blue-50 text-blue-600 border-blue-200", icon: "M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" },
                { step: "02", title: "AI ga Yuklang", desc: "Rasmni 'Hozir Skanerlash' bo'limi orqali yuklang va sun'iy intellekt tahlilini kuting.", color: "bg-amber-50 text-amber-600 border-amber-200", icon: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" },
                { step: "03", title: "Yechimni Oling", desc: "Kasallik turi, unga qarshi dori va kimyoviy ishlov berish bo'yicha eng aniq tavsiyani o'qing.", color: "bg-emerald-50 text-emerald-600 border-emerald-200", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" }
              ].map((item, idx) => (
                 <div key={idx} className="relative z-10 flex flex-col items-center text-center group">
                    <div className="relative mb-8">
                      <div className={`w-24 h-24 rounded-[2rem] flex items-center justify-center shadow-xl shadow-slate-200 border transform transition-all duration-500 group-hover:scale-110 group-hover:-rotate-6 bg-white`}>
                         <svg className={`w-10 h-10 ${item.color.split(' ')[1]}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d={item.icon} /></svg>
                      </div>
                      <div className={`absolute -top-3 -right-3 w-10 h-10 rounded-full flex items-center justify-center font-black text-sm border-2 border-white shadow-md ${item.color}`}>
                        {item.step}
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-4 font-serif">{item.title}</h3>
                    <p className="text-slate-600 leading-relaxed font-light">{item.desc}</p>
                 </div>
              ))}
           </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-white relative z-10 border-t border-slate-100/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 max-w-3xl mx-auto">
            <span className="text-emerald-600 font-bold tracking-wider uppercase text-sm mb-3 block">Modullar & Imkoniyatlar</span>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 font-serif tracking-tight">Nega aynan Ko'rg'on Ai?</h2>
            <p className="text-slate-500 text-lg font-light leading-relaxed">Platformamiz yordamida qishloq xo'jaligidagi eng murakkab texnologiyalarni oddiy tilda va juda yuqori tezlikda his qilasiz.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Tezkor Tahlil",
                desc: "Rasm yuklangandan so'ng sanoqli soniyalar ichida server to'liq hisobotni aniqlaydi.",
                icon: (
                  <svg className="w-8 h-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                )
              },
              {
                title: "Yuqori Aniqlik",
                desc: "Eng ilg'or Google Gemini yordamida har bir dog' va simptom chuqur o'rganib chiqiladi.",
                icon: (
                  <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" /></svg>
                )
              },
              {
                title: "Ekspert Tavsiyalari",
                desc: "Qaysi dori, qanday dozada va qachon berilishi kerakligi bo'yicha to'liq mustaqil xulosa va qo'llanmalar.",
                icon: (
                  <svg className="w-8 h-8 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                )
              },
              {
                title: "Boshqaruv Paneli",
                desc: "1 gektardan 100 gektargacha bo'lgan hududdagi tahlillar bo'yicha dashboard hisobot, PDF eksport qilish.",
                icon: (
                  <svg className="w-8 h-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                )
              },
              {
                title: "AI Agronom Veb-chat",
                desc: "Istalgan savolingizni sun'iy intellekt mutaxassisiga yozing va agronomingizdan batafsil maslahat oling.",
                icon: (
                  <svg className="w-8 h-8 text-rose-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
                )
              },
              {
                title: "Entsiklopediya",
                desc: "Mahalliy ekinlar va Ularning Respublikada uchrovchi eng xavfli kasalliklari haqida ensiklopedik ma'lumotlar bazasi.",
                icon: (
                  <svg className="w-8 h-8 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                )
              }
            ].map((f, idx) => (
              <div key={idx} className="p-8 rounded-[2rem] border border-slate-100 bg-slate-50/50 hover:bg-white hover:border-emerald-100 hover:shadow-2xl hover:shadow-emerald-100/50 transition-all duration-300 group cursor-default">
                <div className="bg-white p-4 w-fit rounded-2xl shadow-sm mb-6 group-hover:scale-110 group-hover:bg-emerald-50 transition-all border border-slate-100/80">
                  {f.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 font-serif leading-tight">{f.title}</h3>
                <p className="text-slate-500 leading-relaxed font-light">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive CTA Section */}
      <section className="py-24 relative z-10 bg-slate-50 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="bg-emerald-900 rounded-[3rem] p-8 md:p-14 relative overflow-hidden shadow-2xl shadow-emerald-900/20">
              {/* Background abstract shapes */}
              <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-emerald-600 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 opacity-60"></div>
              <div className="absolute bottom-0 left-0 w-[30rem] h-[30rem] bg-teal-800 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/4 opacity-50"></div>
              
              <div className="relative z-10 flex flex-col lg:flex-row gap-12 items-center justify-between">
                 <div className="lg:max-w-xl text-center lg:text-left">
                    <span className="inline-block py-1.5 px-4 rounded-full bg-emerald-800 text-emerald-100 font-bold uppercase tracking-wider text-xs mb-6 border border-emerald-700">Kechikmang</span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 font-serif leading-[1.1] tracking-tight">Hosilni ishonchli <br/> <span className="text-emerald-300">asrab qoling!</span></h2>
                    <p className="text-emerald-100 text-lg md:text-xl font-light leading-relaxed mb-10 max-w-lg mx-auto lg:mx-0">Vaqtida qilingan aniq tahlil kelajakdagi butun hosil va mablag'ingizni qutqarib qoladi. Bevosita sinab ko'ring.</p>
                    <button 
                      onClick={onStart}
                      className="px-8 md:px-10 py-5 w-full sm:w-auto bg-white text-emerald-900 font-black rounded-2xl hover:bg-emerald-50 transition-all shadow-xl text-lg flex justify-center items-center gap-3 group"
                    >
                      Diagnostikani Boshlash
                      <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                    </button>
                 </div>
                 
                 <div className="grid grid-cols-2 gap-4 w-full lg:w-auto shrink-0 mt-8 lg:mt-0">
                    <div className="bg-emerald-800/40 backdrop-blur-md p-6 md:p-8 rounded-[2rem] border border-emerald-700/50 text-center transform transition-transform hover:-translate-y-1 hover:bg-emerald-800/60 shadow-lg">
                       <p className="text-4xl md:text-5xl font-black text-white mb-2 font-serif">150+</p>
                       <p className="text-emerald-200 text-[11px] md:text-sm font-bold tracking-widest uppercase mt-4">Kasallik Databazasi</p>
                    </div>
                    <div className="bg-emerald-800/40 backdrop-blur-md p-6 md:p-8 rounded-[2rem] border border-emerald-700/50 text-center transform translate-y-6 transition-transform hover:-translate-y-1 hover:bg-emerald-800/60 shadow-lg">
                       <p className="text-4xl md:text-5xl font-black text-white mb-2 font-serif">98%</p>
                       <p className="text-emerald-200 text-[11px] md:text-sm font-bold tracking-widest uppercase mt-4">Topish Aniqligi</p>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </section>

    </div>
  );
};

export default Landing;
