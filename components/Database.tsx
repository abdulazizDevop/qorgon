
import React, { useState } from 'react';

const PLANT_DB = [
  { name: 'Gʻoʻza (Cotton)', img: '', diseases: ['Vilt', 'Shira', 'Bakterial kuyish'], risk: 'High', origin: 'Oltin vodiy' },
  { name: 'Bugʻdoy (Wheat)', img: '', diseases: ['Sariq zang', 'Qora don', 'Septorioz'], risk: 'Medium', origin: 'Sirdaryo' },
  { name: 'Pomidor (Tomato)', img: '', diseases: ['Fitofthora', 'Mozaika', 'Fuzarioz'], risk: 'High', origin: 'Toshkent' },
  { name: 'Uzum (Husayni)', img: '', diseases: ['Oidium', 'Mildyu', 'Kul'], risk: 'Medium', origin: 'Parkent' },
  { name: 'Anor (Pomegranate)', img: '', diseases: ['Don chirishi', 'Meva biti', 'Barg toʻkilishi'], risk: 'Low', origin: 'Quva' },
  { name: 'Anjir (Fig)', img: '', diseases: ['Barg zangi', 'Anjir shirasi'], risk: 'Low', origin: 'Xiva' },
  { name: 'Shaftoli (Peach)', img: '', diseases: ['Barg bujmayishi', 'Moniolioz'], risk: 'Medium', origin: 'Fargʻona' },
  { name: 'Qovun (Melon)', img: '', diseases: ['Oq chirish', 'Pashsha tushishi'], risk: 'High', origin: 'Mirzachoʻl' },
  { name: 'Tut (Mulberry)', img: '', diseases: ['Ipak qurti kasalliklari', 'Meva chirishi'], risk: 'Low', origin: 'Buxoro' },
  { name: 'Kartoshka (Potato)', img: '', diseases: ['Fitoftora', 'Alternarioz', 'Kolorado qoʻngʻizi'], risk: 'High', origin: 'Zomin' },
  { name: 'Bodring (Cucumber)', img: '', diseases: ['Sariq kasalligi', 'Kukundor shira'], risk: 'Medium', origin: 'Qibray' },
  { name: 'Gilos (Cherry)', img: '', diseases: ['Kokkomikoz', 'Teshikli dogʻlanish'], risk: 'Medium', origin: 'Namangan' },
  { name: 'Oʻrik (Apricot)', img: '', diseases: ['Klyasterosporioz', 'Sogʻon chirishi'], risk: 'Medium', origin: 'Samarqand' },
  { name: 'Yongʻoq (Walnut)', img: '', diseases: ['Bakterioz', 'Antraknoz'], risk: 'Low', origin: 'Bostoniq' },
  { name: 'Limon (Lemon)', img: '', diseases: ['Gommoz', 'Meva tushishi'], risk: 'Medium', origin: 'Toshkent' }
];

const Database: React.FC = () => {
  const [filter, setFilter] = useState('');
  const [activeTab, setActiveTab] = useState('Barchasi');

  const filtered = PLANT_DB.filter(p => 
    p.name.toLowerCase().includes(filter.toLowerCase()) && 
    (activeTab === 'Barchasi' || (activeTab === 'Xavfli' && p.risk === 'High') || (activeTab === 'Meva' && !['Gʻoʻza', 'Bugʻdoy', 'Kartoshka'].some(x => p.name.includes(x))))
  );

  return (
    <div className="max-w-7xl mx-auto py-12 px-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-16">
        <div className="max-w-xl">
          <span className="text-emerald-600 font-bold uppercase tracking-[0.3em] text-[10px] mb-3 block">Agro Bilimlar Baza</span>
          <h2 className="text-6xl font-black text-slate-900 leading-none">Oʻsimliklar <span className="text-emerald-600">Entsiklopediyasi</span></h2>
          <p className="text-slate-500 mt-6 text-lg font-medium">Oʻzbekiston florasining 15+ turdagi qishloq xoʻjaligi ekinlari va ularning kasalliklari haqida toʻliq maʻlumot.</p>
        </div>
        <div className="relative w-full md:w-[450px]">
          <input 
            type="text" 
            placeholder="Qidiruv (masalan: Shaftoli)..." 
            className="w-full pl-14 pr-6 py-6 rounded-[2rem] border border-slate-200 focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 bg-white shadow-xl shadow-slate-200/40 font-bold placeholder:text-slate-400 transition-all"
            onChange={(e) => setFilter(e.target.value)}
          />
          <svg className="h-6 w-6 text-emerald-500 absolute left-5 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      <div className="flex gap-4 mb-12 overflow-x-auto pb-4 no-scrollbar">
         {['Barchasi', 'Meva', 'Xavfli', 'Sabzavot'].map(tab => (
           <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-8 py-3 rounded-2xl font-black text-sm transition-all whitespace-nowrap ${
              activeTab === tab ? 'bg-slate-900 text-white shadow-xl' : 'bg-white text-slate-500 border border-slate-100 hover:bg-slate-50'
            }`}
           >
             {tab}
           </button>
         ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filtered.map((plant, i) => (
          <div key={i} className="group bg-white rounded-[3rem] border border-slate-100 shadow-xl overflow-hidden hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)] transition-all duration-700 hover:-translate-y-4">
            <div className="h-64 overflow-hidden relative bg-emerald-50 flex items-center justify-center">
              {plant.img ? (
                <img src={plant.img} alt={plant.name} className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-1000" />
              ) : (
                <div className="text-center px-4 z-10">
                  <span className="text-emerald-700 font-bold uppercase tracking-widest text-xs block opacity-50">{plant.name} Rasmi (Kerak)</span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8 z-20">
                 <button className="w-full py-4 bg-white text-slate-900 font-black rounded-2xl text-xs uppercase tracking-widest translate-y-4 group-hover:translate-y-0 transition-transform shadow-xl">Tahlilni oʻqish</button>
              </div>
              <div className="absolute top-6 left-6 px-4 py-2 bg-white/90 backdrop-blur rounded-full text-[9px] font-black uppercase tracking-widest text-slate-900 shadow-lg z-20">
                {plant.origin}
              </div>
            </div>
            <div className="p-10">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-2xl font-black text-slate-900 tracking-tight leading-tight">{plant.name}</h3>
                <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase ${
                  plant.risk === 'High' ? 'bg-red-50 text-red-600' : 
                  plant.risk === 'Medium' ? 'bg-orange-50 text-orange-600' : 'bg-emerald-50 text-emerald-600'
                }`}>
                  {plant.risk}
                </span>
              </div>
              
              <div className="space-y-2">
                {plant.diseases.map((d, j) => (
                  <div key={j} className="flex items-center gap-2 text-xs text-slate-500 font-bold group/item">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 group-hover/item:scale-150 transition-transform"></span>
                    {d}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {filtered.length === 0 && (
        <div className="py-32 text-center bg-white rounded-[4rem] border-4 border-dashed border-slate-100">
           <p className="text-3xl font-black text-slate-300">Hech qanday maʻlumot topilmadi :(</p>
           <button onClick={() => setFilter('')} className="mt-6 text-emerald-600 font-bold underline">Qidiruvni tozalash</button>
        </div>
      )}
    </div>
  );
};

export default Database;
