
import React, { useState } from 'react';

const PLANT_DB = [
  { name: 'Gʻoʻza (Paxta)', category: 'Texnik', img: 'https://images.unsplash.com/photo-1582214691490-53bc1bfde2f4?auto=format&fit=crop&w=600&q=80', diseases: ['Vilt', 'Shira', 'Bakterial kuyish', 'Kuzgi tunlam'], risk: 'High', origin: 'Fargʻona' },
  { name: 'Bugʻdoy', category: 'Don', img: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=600&q=80', diseases: ['Sariq zang', 'Qora don', 'Septorioz'], risk: 'Medium', origin: 'Sirdaryo' },
  { name: 'Pomidor', category: 'Sabzavot', img: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80', diseases: ['Fitoftoroz', 'Mozaika', 'Fuzarioz', 'Zang'], risk: 'High', origin: 'Toshkent' },
  { name: 'Uzum', category: 'Meva', img: 'https://images.unsplash.com/photo-1596362438670-381dc35ff1eb?auto=format&fit=crop&w=600&q=80', diseases: ['Oidium', 'Mildyu', 'Kul', 'Antraknoz'], risk: 'Medium', origin: 'Parkent' },
  { name: 'Anor', category: 'Meva', img: 'https://images.unsplash.com/photo-1615485437887-4d6d6daece60?auto=format&fit=crop&w=600&q=80', diseases: ['Don chirishi', 'Meva biti', 'Barg toʻkilishi'], risk: 'Low', origin: 'Quva' },
  { name: 'Anjir', category: 'Meva', img: 'https://images.unsplash.com/photo-1620023023078-4ea8c2794cc5?auto=format&fit=crop&w=600&q=80', diseases: ['Barg zangi', 'Anjir shirasi'], risk: 'Low', origin: 'Xiva' },
  { name: 'Shaftoli', category: 'Meva', img: 'https://images.unsplash.com/photo-1528821128474-27f9ee07974e?auto=format&fit=crop&w=600&q=80', diseases: ['Barg bujmayishi', 'Moniolioz', 'Zang'], risk: 'High', origin: 'Fargʻona' },
  { name: 'Qovun', category: 'Poliz', img: 'https://images.unsplash.com/photo-1587049352847-81a56d773c1c?auto=format&fit=crop&w=600&q=80', diseases: ['Oq chirish', 'Qovun pashshasi', 'Ildiz chirishi'], risk: 'High', origin: 'Mirzachoʻl' },
  { name: 'Karam', category: 'Sabzavot', img: 'https://images.unsplash.com/photo-1557844352-761f2565b576?auto=format&fit=crop&w=600&q=80', diseases: ['Qora oyoq', 'Oila kuyishi', 'Karam biti'], risk: 'Medium', origin: 'Zangiota' },
  { name: 'Kartoshka', category: 'Sabzavot', img: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=600&q=80', diseases: ['Fitoftora', 'Alternarioz', 'Kolorado qoʻngʻizi', 'Makrosporioz'], risk: 'High', origin: 'Zomin' },
  { name: 'Bodring', category: 'Sabzavot', img: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=600&q=80', diseases: ['Soxta un shudring', 'Kukundor shira'], risk: 'High', origin: 'Qibray' },
  { name: 'Gilos', category: 'Meva', img: 'https://images.unsplash.com/photo-1559181567-c3190ca9959b?auto=format&fit=crop&w=600&q=80', diseases: ['Kokkomikoz', 'Teshikli dogʻlanish', 'Gilos pashshasi'], risk: 'Medium', origin: 'Namangan' },
  { name: 'Oʻrik', category: 'Meva', img: 'https://images.unsplash.com/photo-1629828552108-a00d8beeb9ce?auto=format&fit=crop&w=600&q=80', diseases: ['Klyasterosporioz', 'Monilioz chirish'], risk: 'Medium', origin: 'Samarqand' },
  { name: 'Yongʻoq', category: 'Meva', img: 'https://images.unsplash.com/photo-1596700542368-8e68db35b128?auto=format&fit=crop&w=600&q=80', diseases: ['Bakterioz', 'Antraknoz', 'Yongʻoq kuyasi'], risk: 'Low', origin: 'Boʻstonliq' },
  { name: 'Limon', category: 'Meva', img: 'https://images.unsplash.com/photo-1582294432170-13f5728a47fd?auto=format&fit=crop&w=600&q=80', diseases: ['Gommoz', 'Meva toʻkilishi', 'Sitrus trips'], risk: 'Medium', origin: 'Toshkent' },
  { name: 'Tarvuz', category: 'Poliz', img: 'https://images.unsplash.com/photo-1589984662646-e7b2e4962f18?auto=format&fit=crop&w=600&q=80', diseases: ['Antraknoz', 'Fuzarioz soʻlish', 'Shira'], risk: 'Medium', origin: 'Qashqadaryo' },
  { name: 'Makkajoʻxori', category: 'Don', img: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=600&q=80', diseases: ['Qorakuya', 'Poya chirishi'], risk: 'Low', origin: 'Andijon' },
  { name: 'Piyoz', category: 'Sabzavot', img: 'https://images.unsplash.com/photo-1620574387735-3624d75b2dbc?auto=format&fit=crop&w=600&q=80', diseases: ['Aka chirish', 'Peronosporoz', 'Piyoz pashshasi'], risk: 'Medium', origin: 'Surxondaryo' }
];

const Database: React.FC = () => {
  const [filter, setFilter] = useState('');
  const [activeTab, setActiveTab] = useState('Barchasi');

  const filtered = PLANT_DB.filter(p => 
    p.name.toLowerCase().includes(filter.toLowerCase()) && 
    (activeTab === 'Barchasi' || (activeTab === 'Xavfli' && p.risk === 'High') || activeTab === p.category)
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

      <div className="flex gap-4 mb-12 overflow-x-auto pb-4 custom-scrollbar">
         {['Barchasi', 'Meva', 'Sabzavot', 'Poliz', 'Texnik', 'Don', 'Xavfli'].map(tab => (
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
