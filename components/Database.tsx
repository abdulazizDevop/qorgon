import React, { useState } from 'react';

interface Plant {
  name: string;
  category: string;
  img: string;
  diseases: string[];
  risk: string;
  origin: string;
  description: string;
}

const PLANT_DB: Plant[] = [
  { name: 'Gʻoʻza (Paxta)', category: 'Texnik', img: 'https://plus.unsplash.com/premium_photo-1661963799175-e1205c98eb80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8Y290dG9uJTIwZmllbGR8ZW58MHx8fHwxNzcyNjA1MzExfDA&ixlib=rb-4.1.0&q=80&w=1080', diseases: ['Vilt', 'Shira', 'Bakterial kuyish', 'Kuzgi tunlam'], risk: 'High', origin: 'Fargʻona', description: 'Gʻoʻza Oʻzbekistonning asosiy texnik ekini boʻlib, asosan toʻqimachilik sanoati va yogʻ ishlab chiqarishda ishlatiladi. Issiq va yorugʻsevar oʻsimlik. Vegetatsiya davri iqlimga qarab 110-140 kunni tashkil etadi.' },
  { name: 'Bugʻdoy', category: 'Don', img: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=600&q=80', diseases: ['Sariq zang', 'Qora don', 'Septorioz'], risk: 'Medium', origin: 'Sirdaryo', description: 'Oʻzbekistonda eng muhim oziq-ovqat ekini. Asosan kuzgi va bahorgi turlari ekiladi. Yuqori unumdor tuproqni talab etadi, namlik va oʻgʻitlarga sezuvchan.' },
  { name: 'Pomidor', category: 'Sabzavot', img: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80', diseases: ['Fitoftoroz', 'Mozaika', 'Fuzarioz', 'Zang'], risk: 'High', origin: 'Toshkent', description: 'Issiqxona va ochiq dalalarda eng koʻp yetishtiriladigan darmondorilarga boy sabzavot. Tuproqni doimiy namlikda ushlab turish va vaqtida kaliy, fosfor oʻgʻitlari bilan taʼminlash talab etiladi.' },
  { name: 'Uzum', category: 'Meva', img: 'https://plus.unsplash.com/premium_photo-1675727579600-b2656a265c15?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8Z3JhcGVzJTIwb24lMjB2aW5lfGVufDB8fHx8MTc3MjYwNDQ1MXww&ixlib=rb-4.1.0&q=80&w=1080', diseases: ['Oidium', 'Mildyu', 'Kul', 'Antraknoz'], risk: 'Medium', origin: 'Parkent', description: 'Tokchilik - mamlakatimiz qishloq xoʻjaligining asosiy tarmoqlaridan biri. Uzumni meva, mayiz va vitikultura mahsulotlari sifatida saqlash va sotish qulay boʻlgan yuqori rentabelli ekin.' },
  { name: 'Anor', category: 'Meva', img: 'https://plus.unsplash.com/premium_photo-1664114934710-5aa11f2c8dac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8cG9tZWdyYW5hdGUlMjBmcnVpdCUyMG9uJTIwdHJlZXxlbnwwfHx8fDE3NzI2MDUzMTN8MA&ixlib=rb-4.1.0&q=80&w=1080', diseases: ['Don chirishi', 'Meva biti', 'Barg toʻkilishi'], risk: 'Low', origin: 'Quva', description: 'Subtropik hududlar uchun moslashgan shifobaxsh meva. Issiqqa gʻoyat chidamli, suvga esa nisbatan talabchan. Daraxtlari toʻgʻri shakl berishni va tuproqni yumshatishni yaxshi koʻradi.' },
  { name: 'Anjir', category: 'Meva', img: 'https://plus.unsplash.com/premium_photo-1764390745916-371b4a94d918?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8ZmlncyUyMG9uJTIwdHJlZXxlbnwwfHx8fDE3NzI2MDUzMTN8MA&ixlib=rb-4.1.0&q=80&w=1080', diseases: ['Barg zangi', 'Anjir shirasi'], risk: 'Low', origin: 'Xiva', description: 'Juda shirin, foydali vitaminlar xazinasi. Kuzda pishib yetiladi, barglari xalq tabobatida turli sharbatlar qilib ichiladi. Issiqlik harorati barqaror boʻlgan hududlarda yaxshi koʻkaradi.' },
  { name: 'Karam', category: 'Sabzavot', img: 'https://images.unsplash.com/photo-1557844352-761f2565b576?auto=format&fit=crop&w=600&q=80', diseases: ['Qora oyoq', 'Oila kuyishi', 'Karam biti'], risk: 'Medium', origin: 'Zangiota', description: 'Salqin havo peyroq va ochiq dalada keng koʻp ekiluvchi qishloq xoʻjalik namunasi. Asosan erta bahorda yoki kech yozda rivojlanadi, suvni va toza tuproqni faol oʻzlashtiradi.' },
  { name: 'Kartoshka', category: 'Sabzavot', img: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=600&q=80', diseases: ['Fitoftora', 'Alternarioz', 'Kolorado qoʻngʻizi', 'Makrosporioz'], risk: 'High', origin: 'Zomin', description: 'Asosiy oziq-ovqat zaxiralaridan biri hisoblangan, kraxmal va mikroelementlarga ega poliz mahsuloti. Sovuqqa nisbatan chidamli va turli xil iqlim sharoitida oʻsa oladi.' },
  { name: 'Bodring', category: 'Sabzavot', img: 'https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8Mnx8Y3VjdW1iZXJ8ZW58MHx8fHwxNzcyNjA1OTM1fDA&ixlib=rb-4.1.0&q=80&w=1080', diseases: ['Soxta un shudring', 'Kukundor shira'], risk: 'High', origin: 'Qibray', description: 'Namlikni juda yaxshi koʻradigan ekin, ayniqsa issiqxona sharoitlarida yil davomida uzluksiz hosil bera oladigan mahsulot. Tomchilatib sugʻorishga eng zoʻr moslashadiganlardan.' },
  { name: 'Oʻrik', category: 'Meva', img: 'https://images.unsplash.com/photo-1592681814168-6df0fa93161b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8Mnx8YXByaWNvdHxlbnwwfHx8fDE3NzI2MDU5MzZ8MA&ixlib=rb-4.1.0&q=80&w=1080', diseases: ['Klyasterosporioz', 'Monilioz chirish'], risk: 'Medium', origin: 'Samarqand', description: 'Yoz chillasiga qadar toʻliq hosili terib olinadigan shirin meva. Ayniqsa turshak tayyorlash uchun sanoat ahamiyatiga koʻra mamlakatimiz iqtisodida alohida oʻringa ega.' },
  { name: 'Makkajoʻxori', category: 'Don', img: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=600&q=80', diseases: ['Qorakuya', 'Poya chirishi'], risk: 'Low', origin: 'Andijon', description: 'Mol, uy hayvonlari hamda qushchilik xoʻjaligini taʼminlash, yirik urugʻlari bilan shirinlik singari isʼtemol orqali barcha dalalar uchun ideal navlardan sanaladi. Shuningdek koʻproq mineral oziq ham soʻrab turadi!' },
  { name: 'Piyoz', category: 'Sabzavot', img: 'https://images.unsplash.com/photo-1620574387735-3624d75b2dbc?auto=format&fit=crop&w=600&q=80', diseases: ['Aka chirish', 'Peronosporoz', 'Piyoz pashshasi'], risk: 'Medium', origin: 'Surxondaryo', description: 'Antibakteriyal xususiyatlarga boy ildiz-meva, shuningdek keng istemol etiladigan sabzavot boʻlib deyarli hamma turdagi taomning uzviy maxsuloti. Quritilgan holda uzoq yillik vaqtini saqlab bera oladi.' }
];

const Database: React.FC = () => {
  const [filter, setFilter] = useState('');
  const [activeTab, setActiveTab] = useState('Barchasi');
  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);

  const filtered = PLANT_DB.filter(p => 
    p.name.toLowerCase().includes(filter.toLowerCase()) && 
    (activeTab === 'Barchasi' || activeTab === p.category)
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
         {['Barchasi', 'Meva', 'Sabzavot', 'Texnik', 'Don'].map(tab => (
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
                 <button 
                  onClick={() => setSelectedPlant(plant)}
                  className="w-full py-4 bg-white text-slate-900 font-black rounded-2xl text-xs uppercase tracking-widest translate-y-4 group-hover:translate-y-0 transition-transform shadow-xl hover:bg-emerald-50 active:scale-95 duration-200"
                 >
                  Tahlilni oʻqish
                 </button>
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

      {/* Selected Plant Modal */}
      {selectedPlant && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-white rounded-[2rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] max-w-2xl w-full max-h-[90vh] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] transform transition-all animate-in zoom-in-95 duration-300">
            <div className="relative h-64 md:h-80 w-full overflow-hidden shrink-0">
              <img src={selectedPlant.img} alt={selectedPlant.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
              
              <button 
                onClick={() => setSelectedPlant(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-white/20 hover:bg-white/40 backdrop-blur rounded-full flex items-center justify-center text-white transition-colors"
               >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              <div className="absolute bottom-0 left-0 p-8 w-full">
                <div className="flex justify-between items-end gap-4">
                  <div>
                    <span className="bg-emerald-500 text-white px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-lg mb-2 inline-block">
                      {selectedPlant.category}
                    </span>
                    <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">{selectedPlant.name}</h2>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-8">
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="bg-slate-50 px-4 py-3 rounded-xl border border-slate-100 flex-1 min-w-[120px]">
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Xavflilik</p>
                  <p className={`font-black ${
                    selectedPlant.risk === 'High' ? 'text-red-500' : 
                    selectedPlant.risk === 'Medium' ? 'text-orange-500' : 'text-emerald-500'
                  }`}>{selectedPlant.risk === 'High' ? 'Yuqori xavf' : selectedPlant.risk === 'Medium' ? 'Oʻrta daraja' : 'Sogʻlom'}</p>
                </div>
                <div className="bg-slate-50 px-4 py-3 rounded-xl border border-slate-100 flex-1 min-w-[120px]">
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Otilish manzili</p>
                  <p className="font-black text-slate-800">{selectedPlant.origin}</p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-black text-slate-900 mb-3 uppercase tracking-wider">Batafsil maʻlumot</h3>
                <p className="text-slate-600 leading-relaxed indent-4 mb-8">
                  {selectedPlant.description}
                </p>
              </div>

              <div>
                <h3 className="text-lg font-black text-slate-900 mb-4 uppercase tracking-wider">Keng tarqalgan kasalliklar (<span className="text-red-500">{selectedPlant.diseases.length}</span>)</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selectedPlant.diseases.map((d, j) => (
                    <div key={j} className="flex items-center gap-3 p-3 rounded-xl bg-red-50 border border-red-100 text-red-900 font-bold text-sm">
                      <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                      </div>
                      {d}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mt-10 bg-emerald-50 rounded-2xl p-6 border border-emerald-100 text-center">
                <p className="text-emerald-800 font-medium mb-4">Kasalliklarga yechim yoki qanday dorilarni ishlatishni bilmoqchimisiz?</p>
                <a href="/agronom" className="inline-block px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl transition-colors shadow-lg shadow-emerald-200">
                  AI Agronom bilan suhbat
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Database;
