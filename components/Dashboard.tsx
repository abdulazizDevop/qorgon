import React from 'react';
import { Activity, ShieldAlert, ShieldCheck, Sun, CloudRain, Leaf, ChevronRight, TrendingUp, TrendingDown, Clock, MapPin } from 'lucide-react';

const Dashboard: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto py-12 px-6 font-sans pb-24">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-10 mb-16">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 mb-3">
             <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></span>
             <span className="text-emerald-600 font-bold uppercase tracking-[0.3em] text-[10px]">Real vaqt nazorati</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-none mb-4">
            Mening <span className="text-emerald-600">Statistikam</span>
          </h2>
          <p className="text-slate-500 text-lg font-medium leading-relaxed">
            Ko'rg'on Ai orqali barcha dalalar, ekinlar va tahlil natijalari to'liq nazoratingiz ostida.
          </p>
        </div>
        
        {/* Filter Toggle */}
        <div className="flex bg-white p-2 rounded-2xl shadow-xl shadow-slate-200/40 border border-slate-100 shrink-0">
           <button className="px-8 py-3 bg-slate-900 text-white font-black rounded-xl text-xs transition-colors shadow-md">Haftalik</button>
           <button className="px-8 py-3 text-slate-500 font-bold rounded-xl text-xs hover:bg-slate-50 transition-colors">Oylik</button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        {[
          { 
            label: 'Jami Skanerlar', 
            value: '412', 
            delta: '+12%', 
            isPositive: true,
            icon: <Activity className="w-6 h-6 text-emerald-600" />, 
            colorClass: 'bg-emerald-50',
            borderClass: 'hover:border-emerald-200'
          },
          { 
            label: 'Sogʻlom holat', 
            value: '88%', 
            delta: '+4%', 
            isPositive: true,
            icon: <ShieldCheck className="w-6 h-6 text-blue-600" />, 
            colorClass: 'bg-blue-50',
            borderClass: 'hover:border-blue-200'
          },
          { 
            label: 'Aniqlangan xavflar', 
            value: '14', 
            delta: '-2 ta', 
            isPositive: true,
            icon: <ShieldAlert className="w-6 h-6 text-red-600" />, 
            colorClass: 'bg-red-50',
            borderClass: 'hover:border-red-200'
          },
          { 
            label: 'Hosil bashorati', 
            value: 'A+', 
            delta: 'Barqaror', 
            isPositive: true,
            icon: <Leaf className="w-6 h-6 text-amber-600" />, 
            colorClass: 'bg-amber-50',
            borderClass: 'hover:border-amber-200'
          },
        ].map((stat, i) => (
          <div key={i} className={`bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-100/50 transition-all duration-500 group overflow-hidden relative cursor-default hover:-translate-y-2 ${stat.borderClass}`}>
            <div className={`absolute -right-6 -top-6 w-24 h-24 ${stat.colorClass} rounded-full opacity-50 scale-0 group-hover:scale-150 transition-transform duration-700 ease-out`}></div>
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div className={`w-14 h-14 ${stat.colorClass} rounded-2xl flex items-center justify-center mb-6 shadow-sm`}>
                {stat.icon}
              </div>
              <div>
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                <div className="flex items-baseline justify-between">
                  <span className="text-4xl md:text-5xl font-black text-slate-900 font-serif tracking-tight">{stat.value}</span>
                  <span className={`text-[10px] font-black px-2.5 py-1.5 rounded-xl flex items-center gap-1 uppercase tracking-wider ${stat.isPositive ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                    {stat.isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    {stat.delta}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Timeline Sequence */}
         <div className="lg:col-span-2 bg-white rounded-[3rem] p-8 md:p-10 border border-slate-100 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)]">
           <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-50">
              <div>
                <h3 className="text-3xl font-black text-slate-900 font-serif tracking-tight">Analitika Xronologiyasi</h3>
                <p className="text-sm font-medium text-slate-400 mt-1">Oxirgi amalga oshirilgan barcha tahlillar tarixi</p>
              </div>
              <div className="hidden sm:flex gap-2">
                 <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)] animate-pulse"></div>
                 <div className="w-2.5 h-2.5 rounded-full bg-slate-200"></div>
                 <div className="w-2.5 h-2.5 rounded-full bg-slate-200"></div>
              </div>
           </div>

           <div className="space-y-4">
              {[
                { plant: 'Gʻoʻza (Sulton-2)', disease: 'Vilt aniqlandi', time: '12:30', status: 'Warning', area: '14-sektor' },
                { plant: 'Bugʻdoy', disease: 'Sogʻlom, toza', time: '10:15', status: 'Healthy', area: '02-sektor' },
                { plant: 'Olma (Semerenko)', disease: 'Meva qurti', time: 'Kecha, 16:40', status: 'Warning', area: 'Bogʻ-1' },
                { plant: 'Pomidor', disease: 'Sogʻlom', time: 'Kecha, 09:20', status: 'Healthy', area: 'Issiqxona-2' }
              ].map((item, i) => (
                <div key={i} className="group flex flex-col sm:flex-row sm:items-center justify-between p-5 bg-slate-50 rounded-[2rem] border border-transparent hover:border-emerald-100 hover:bg-emerald-50/30 hover:shadow-lg transition-all cursor-pointer">
                  <div className="flex items-center gap-5 sm:gap-6 mb-4 sm:mb-0">
                    <div className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center font-black text-2xl shadow-sm shrink-0 transition-transform group-hover:scale-110 ${item.status === 'Healthy' ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'}`}>
                       {item.plant[0]}
                    </div>
                    <div>
                       <h4 className="font-black text-slate-900 text-lg group-hover:text-emerald-700 transition-colors">{item.plant}</h4>
                       <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-500 font-medium mt-1">
                          <span className="flex items-center gap-1.5"><ShieldAlert className={`w-3.5 h-3.5 ${item.status === 'Healthy' ? 'text-emerald-500' : 'text-red-500'}`} /> {item.disease}</span>
                          <span className="w-1 h-1 rounded-full bg-slate-200"></span>
                          <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-slate-400" /> {item.area}</span>
                       </div>
                    </div>
                  </div>
                  <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center border-t border-slate-200/50 sm:border-0 pt-4 sm:pt-0">
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1 mb-2 sm:mb-1.5"><Clock className="w-3 h-3" /> {item.time}</p>
                    <span className={`text-[9px] font-black px-3 py-1.5 rounded-xl uppercase tracking-widest border ${item.status === 'Healthy' ? 'bg-emerald-50 text-emerald-600 border-emerald-200/50' : 'bg-red-50 text-red-600 border-red-200/50'}`}>
                       {item.status === 'Healthy' ? 'Xavfsiz' : 'Diqqat!'}
                    </span>
                  </div>
                </div>
              ))}
           </div>
           
           <button className="w-full mt-8 py-4 text-emerald-700 bg-emerald-50 hover:bg-emerald-100 font-bold rounded-2xl transition-colors flex items-center justify-center gap-2 group text-sm">
              Barcha tarixni ko'rish 
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
           </button>
        </div>

        {/* Side Cards */}
        <div className="lg:col-span-1 space-y-8 flex flex-col h-full">
           
           {/* AI Warning Card */}
           <div className="bg-gradient-to-br from-slate-900 to-teal-950 rounded-[3rem] p-8 md:p-10 text-white shadow-2xl relative overflow-hidden group">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-500/20 rounded-full blur-[40px] group-hover:bg-emerald-400/30 transition-colors duration-500"></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-emerald-300 backdrop-blur-md">
                    <CloudRain className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-emerald-300">Shoshilinch Tavsiya</span>
                </div>
                
                <h3 className="text-2xl font-black mb-4 font-serif leading-tight">Yangi profilaktika rejasi</h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-8">
                  Dalangizning <strong className="text-white bg-white/10 px-1 rounded">14-sektorida</strong> Vilt kasalligi tarqalishini toʻxtatish uchun darhol azotli oʻgʻitlardan voz kechish va kaliyli ozuqa berish tavsiya etiladi.
                </p>
                
                <button className="w-full py-4 bg-emerald-500 text-white font-black rounded-2xl hover:bg-emerald-400 transition-all text-sm shadow-lg shadow-emerald-500/30">
                  Davolash rejasini ochish
                </button>
              </div>
           </div>

           {/* Weather Warning Card */}
           <div className="bg-amber-50 rounded-[3rem] p-8 md:p-10 border border-amber-100 shadow-xl flex-grow flex flex-col justify-center text-center relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-200/40 rounded-full blur-[40px] group-hover:scale-150 transition-transform duration-700"></div>
              
              <div className="relative z-10 flex flex-col items-center">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-[1.5rem] mb-6 shadow-sm shadow-amber-200/50">
                   <Sun className="w-10 h-10 text-amber-500" />
                </div>
                <h4 className="text-2xl font-black text-amber-900 mb-3 font-serif">Ob-havo Xavfi</h4>
                <p className="text-amber-800/80 text-sm leading-relaxed mb-8 font-medium">
                  Kelasi 3 kunda havo harorati <strong className="text-amber-900 font-bold bg-amber-200/50 px-1.5 rounded">+42°C</strong> dan oshishi kutilmoqda. Sugʻorish rejimini kechki vaqtga oʻzgartiring.
                </p>
                <div className="flex gap-2 justify-center w-full">
                   {[1,2,3,4,5].map(i => (
                     <div key={i} className={`h-2.5 flex-1 rounded-full ${i <= 4 ? 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.5)]' : 'bg-amber-200/50'}`}></div>
                   ))}
                </div>
              </div>
           </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
