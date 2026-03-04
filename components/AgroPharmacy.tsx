import React, { useState } from 'react';

interface Medicine {
  id: number;
  name: string;
  category: string;
  price: string;
  image: string;
  description: string;
  usage: string;
}

const MEDICINES: Medicine[] = [
  {
    id: 1,
    name: "Fungitsid Topaz",
    category: "Kasalliklarga qarshi",
    price: "45,000 so'm",
    image: "",
    description: "Uzum va olma daraxtlaridagi oidium va parsha kasalliklariga qarshi samarali vosita.",
    usage: "10 litr suvga 5 ml qo'shib purkaladi."
  },
  {
    id: 2,
    name: "Insektitsid Karate",
    category: "Zararkunandalarga qarshi",
    price: "38,000 so'm",
    image: "",
    description: "Shira, trips va boshqa so'ruvchi zararkunandalarni tezda yo'q qiladi.",
    usage: "Hektariga 0.2 litr me'yorida qo'llaniladi."
  },
  {
    id: 3,
    name: "Gerbitsid Uragan",
    category: "Begona o'tlarga qarshi",
    price: "95,000 so'm",
    image: "",
    description: "Barcha turdagi begona o'tlarni ildizi bilan qurituvchi kuchli vosita.",
    usage: "O'simliklar o'suv davrida qo'llaniladi."
  },
  {
    id: 4,
    name: "Biostimulyator Gummat",
    category: "O'g'itlar",
    price: "25,000 so'm",
    image: "",
    description: "O'simliklarning o'sishini tezlashtiradi va immunitetini oshiradi.",
    usage: "Har 10 kunda bir marta bargdan oziqlantiriladi."
  },
  {
    id: 5,
    name: "Mis kuporosi",
    category: "Kasalliklarga qarshi",
    price: "15,000 so'm",
    image: "",
    description: "Zamburug'li kasalliklarning oldini olish uchun klassik vosita.",
    usage: "Kuzda va erta bahorda daraxtlarga ishlov berish uchun."
  },
  {
    id: 6,
    name: "Nitroammofoska",
    category: "O'g'itlar",
    price: "8,000 so'm/kg",
    image: "",
    description: "Azot, fosfor va kaliyli kompleks o'g'it.",
    usage: "Ekishdan oldin tuproqqa solinadi."
  }
];

const AgroPharmacy: React.FC = () => {
  const [filter, setFilter] = useState('Barchasi');
  const categories = ['Barchasi', 'Kasalliklarga qarshi', 'Zararkunandalarga qarshi', 'O\'g\'itlar', 'Begona o\'tlarga qarshi'];

  const filteredMedicines = filter === 'Barchasi' 
    ? MEDICINES 
    : MEDICINES.filter(m => m.category === filter);

  return (
    <div className="max-w-7xl mx-auto py-12 px-6">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-black text-slate-900 mb-4 font-serif">Agro <span className="text-emerald-600">Dorixona</span></h2>
        <p className="text-slate-500 max-w-2xl mx-auto text-lg font-light font-sans">
          O'simliklaringiz uchun eng sifatli va samarali himoya vositalari. Mutaxassislar tomonidan tavsiya etilgan.
        </p>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-6 py-3 rounded-xl font-bold text-sm transition-all font-sans ${
              filter === cat 
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200' 
                : 'bg-white text-slate-600 hover:bg-emerald-50 border border-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredMedicines.map(medicine => (
          <div key={medicine.id} className="bg-white rounded-[2rem] p-6 shadow-xl border border-slate-100 hover:border-emerald-200 transition-all group">
            <div className="relative mb-6 overflow-hidden rounded-2xl h-64 bg-slate-100 flex items-center justify-center group/img">
              {medicine.image ? (
                <img 
                  src={medicine.image} 
                  alt={medicine.name} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
              ) : (
                <div className="text-center px-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto text-slate-300 mb-2 group-hover/img:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-slate-400 font-bold uppercase tracking-widest text-xs block truncate w-full">{medicine.name} Rasmi</span>
                </div>
              )}
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-bold text-emerald-700 uppercase tracking-wider font-sans">
                {medicine.category}
              </div>
            </div>
            
            <h3 className="text-2xl font-bold text-slate-900 mb-2 font-serif">{medicine.name}</h3>
            <p className="text-slate-500 text-sm mb-4 line-clamp-2 font-sans">{medicine.description}</p>
            
            <div className="bg-slate-50 p-4 rounded-xl mb-6">
              <p className="text-xs text-slate-400 font-bold uppercase mb-1 font-sans">Qo'llanilishi:</p>
              <p className="text-slate-700 text-sm font-medium font-sans">{medicine.usage}</p>
            </div>

            <div className="flex items-center justify-between mt-auto">
              <span className="text-2xl font-black text-emerald-600 font-mono">{medicine.price}</span>
              <button className="px-6 py-3 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-emerald-600 transition-colors font-sans">
                Savatga qo'shish
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AgroPharmacy;
