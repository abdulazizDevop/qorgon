
import React from 'react';

const Dashboard: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto py-12 px-6">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-12">
        <div>
          <h2 className="text-5xl font-black text-slate-900 tracking-tight">Mening <span className="text-emerald-600">Dala</span> Statistikam</h2>
          <p className="text-slate-500 mt-2 text-lg font-medium italic font-serif">Ko'rg'on Ai: Hosilingiz nazorat ostida.</p>
        </div>
        <div className="flex bg-white p-2 rounded-2xl shadow-sm border border-slate-100">
           <button className="px-6 py-2 bg-emerald-600 text-white font-bold rounded-xl text-xs">Haftalik</button>
           <button className="px-6 py-2 text-slate-500 font-bold rounded-xl text-xs hover:bg-slate-50">Oylik</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        {[
          { label: 'Skanerlar', value: '412', delta: '+12%', icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
          ), color: 'emerald' },
          { label: 'Sogʻlom barglar', value: '88%', delta: '+4%', icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"/></svg>
          ), color: 'blue' },
          { label: 'Faol xavflar', value: '03', delta: '-2', icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
          ), color: 'red' },
          { label: 'Hosil bashorati', value: '94%', delta: 'Oltin', icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/></svg>
          ), color: 'amber' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl transition-all group overflow-hidden relative">
            <div className={`absolute -right-4 -top-4 w-20 h-20 bg-${stat.color}-50 rounded-full scale-0 group-hover:scale-150 transition-transform duration-500`}></div>
            <div className="relative z-10">
              <div className={`w-14 h-14 bg-${stat.color}-50 text-${stat.color}-600 rounded-2xl flex items-center justify-center mb-6`}>
                {stat.icon}
              </div>
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-black text-slate-900">{stat.value}</span>
                <span className={`text-[10px] font-black px-2 py-1 rounded-lg ${stat.delta.startsWith('+') ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                  {stat.delta}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 bg-white rounded-[3rem] p-10 border border-slate-100 shadow-xl">
           <div className="flex items-center justify-between mb-10">
              <h3 className="text-2xl font-black text-slate-900">Analitika Xronologiyasi</h3>
              <div className="flex gap-2">
                 <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                 <div className="w-3 h-3 rounded-full bg-slate-200"></div>
              </div>
           </div>

           <div className="space-y-6">
              {[
                { plant: 'Gʻoʻza (Sulton-2)', disease: 'Vilt aniqlandi', time: '12:30', status: 'Warning', area: '14-sektor' },
                { plant: 'Bugʻdoy', disease: 'Sogʻlom', time: '10:15', status: 'Healthy', area: '02-sektor' },
                { plant: 'Olma (Semerenko)', disease: 'Meva qurti', time: 'Kecha', status: 'Warning', area: 'Bogʻ-1' },
                { plant: 'Pomidor', disease: 'Sogʻlom', time: 'Kecha', status: 'Healthy', area: 'Issiqxona-2' }
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-6 bg-slate-50 rounded-[2rem] border border-transparent hover:border-emerald-100 hover:bg-white hover:shadow-lg transition-all">
                  <div className="flex items-center gap-6">
                    <div className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center font-black text-xl shadow-inner ${item.status === 'Healthy' ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'}`}>
                       {item.plant[0]}
                    </div>
                    <div>
                       <h4 className="font-black text-slate-900 text-lg">{item.plant}</h4>
                       <p className="text-sm text-slate-500 font-medium">{item.disease} <span className="mx-2 opacity-30">|</span> {item.area}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-black text-slate-400 uppercase mb-1">{item.time}</p>
                    <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter ${item.status === 'Healthy' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                       {item.status === 'Healthy' ? 'Xavfsiz' : 'Diqqat!'}
                    </span>
                  </div>
                </div>
              ))}
           </div>
        </div>

        <div className="lg:col-span-1 space-y-8">
           <div className="bg-slate-900 rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl group-hover:bg-emerald-500/30 transition-all"></div>
              <h3 className="text-2xl font-black mb-4">AI Maslahati</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-8">Dalangizning 14-sektorida Vilt kasalligi tarqalishini toʻxtatish uchun darhol azotli oʻgʻitlardan voz kechish va kaliyli ozuqa berish tavsiya etiladi.</p>
              <button className="w-full py-4 bg-emerald-600 text-white font-black rounded-2xl hover:bg-emerald-500 transition-all text-sm">Chora koʻrish rejasi</button>
           </div>

           <div className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-xl text-center">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-amber-50 rounded-full mb-6">
                 <svg className="w-12 h-12 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
              </div>
              <h4 className="text-xl font-black text-slate-900 mb-2">Ob-havo Xavfi</h4>
              <p className="text-slate-500 text-sm mb-6">Kelasi 3 kunda havo harorati +42C dan oshishi kutilmoqda. Sugʻorish rejimini kechki vaqtga oʻzgartiring.</p>
              <div className="flex gap-2 justify-center">
                 {[1,2,3,4,5].map(i => <div key={i} className={`h-1.5 w-8 rounded-full ${i <= 4 ? 'bg-amber-400' : 'bg-slate-100'}`}></div>)}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
