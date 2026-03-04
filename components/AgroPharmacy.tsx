import React, { useState, useMemo } from 'react';

// Icons using SVG directly for portability
const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
  </svg>
);

const ShoppingCartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
  </svg>
);

const StarIcon = ({ filled = true }: { filled?: boolean }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth={1} className={`w-4 h-4 ${filled ? 'text-amber-400' : 'text-slate-300'}`}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
  </svg>
);

interface Medicine {
  id: number;
  name: string;
  category: string;
  price: string;
  priceNumber: number;
  image: string;
  description: string;
  usage: string;
  rating: number;
  badge?: string;
}

const MEDICINES: Medicine[] = [
  {
    id: 1,
    name: "Fungitsid Topaz",
    category: "Kasalliklarga qarshi",
    price: "45 000 so'm",
    priceNumber: 45000,
    image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&q=80&w=500",
    description: "Uzum va olma daraxtlaridagi oidium va parsha kasalliklariga qarshi samarali vosita.",
    usage: "10 litr suvga 5 ml qo'shib purkaladi.",
    rating: 4.8,
    badge: "Ko'p sotilgan"
  },
  {
    id: 2,
    name: "Insektitsid Karate",
    category: "Zararkunandalarga qarshi",
    price: "38 000 so'm",
    priceNumber: 38000,
    image: "https://images.unsplash.com/photo-1628102491629-778571d893a3?auto=format&fit=crop&q=80&w=500", 
    description: "Shira, trips va boshqa so'ruvchi zararkunandalarni tezda yo'q qiladi.",
    usage: "Hektariga 0.2 litr me'yorida qo'llaniladi.",
    rating: 4.5
  },
  {
    id: 3,
    name: "Gerbitsid Uragan",
    category: "Begona o'tlarga qarshi",
    price: "95 000 so'm",
    priceNumber: 95000,
    image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&q=80&w=500",
    description: "Barcha turdagi begona o'tlarni ildizi bilan qurituvchi kuchli vosita.",
    usage: "O'simliklar o'suv davrida qo'llaniladi.",
    rating: 4.9,
    badge: "Yangi"
  },
  {
    id: 4,
    name: "Biostimulyator Gummat",
    category: "O'g'itlar",
    price: "25 000 so'm",
    priceNumber: 25000,
    image: "https://images.unsplash.com/photo-1601646271960-e836ec43a85b?auto=format&fit=crop&q=80&w=500",
    description: "O'simliklarning o'sishini tezlashtiradi va immunitetini oshiradi.",
    usage: "Har 10 kunda bir marta bargdan oziqlantiriladi.",
    rating: 4.7
  },
  {
    id: 5,
    name: "Mis kuporosi",
    category: "Kasalliklarga qarshi",
    price: "15 000 so'm",
    priceNumber: 15000,
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=500",
    description: "Zamburug'li kasalliklarning oldini olish uchun klassik vosita.",
    usage: "Kuzda va erta bahorda daraxtlarga ishlov berish uchun.",
    rating: 4.6,
    badge: "Chegirma: 10%"
  },
  {
    id: 6,
    name: "Nitroammofoska",
    category: "O'g'itlar",
    price: "8 000 so'm/kg",
    priceNumber: 8000,
    image: "https://images.unsplash.com/photo-1588623676100-24e031976008?auto=format&fit=crop&q=80&w=500",
    description: "Azot, fosfor va kaliyli kompleks o'g'it. Barcha ekinlar uchun.",
    usage: "Ekishdan oldin tuproqqa solinadi.",
    rating: 4.8
  }
];

const CATEGORIES = ['Barchasi', 'Kasalliklarga qarshi', 'Zararkunandalarga qarshi', "O'g'itlar", "Begona o'tlarga qarshi"];

const AgroPharmacy: React.FC = () => {
  const [filter, setFilter] = useState('Barchasi');
  const [searchQuery, setSearchQuery] = useState('');
  const [addedItems, setAddedItems] = useState<number[]>([]);

  const filteredMedicines = useMemo(() => {
    let result = MEDICINES;
    if (filter !== 'Barchasi') {
      result = result.filter(m => m.category === filter);
    }
    if (searchQuery.trim()) {
      const lowerQuery = searchQuery.toLowerCase();
      result = result.filter(m => 
        m.name.toLowerCase().includes(lowerQuery) || 
        m.description.toLowerCase().includes(lowerQuery)
      );
    }
    return result;
  }, [filter, searchQuery]);

  const handleAddToCart = (id: number) => {
    setAddedItems(prev => [...prev, id]);
    setTimeout(() => {
      setAddedItems(prev => prev.filter(itemId => itemId !== id));
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-24">
      {/* Hero Section */}
      <div className="relative bg-teal-900 overflow-hidden pt-20 pb-28 mb-12">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
          <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[100%] rounded-full bg-emerald-500/20 blur-[120px]" />
          <div className="absolute top-[40%] -left-[10%] w-[40%] h-[80%] rounded-full bg-teal-400/20 blur-[100px]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-emerald-300 text-sm font-bold mb-6 tracking-wide shadow-2xl">
            <ShoppingCartIcon />
            100+ Sertifikatlangan Dori Vositalari
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6 font-serif drop-shadow-xl tracking-tight">
            Agro <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">Dorixona</span>
          </h1>
          <p className="text-teal-100/90 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light leading-relaxed">
            Ekinlaringiz uchun mutaxassislar tomonidan sinovdan o'tgan, eng ishonchli o'g'it va himoya vositalari.
          </p>

          {/* Search Bar */}
          <div className="relative max-w-xl mx-auto group">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-emerald-500 transition-colors">
              <SearchIcon />
            </div>
            <input 
              type="text" 
              placeholder="Dori nomi yoki kasallikni qidiring..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-6 py-4 rounded-2xl bg-white/95 backdrop-blur-xl border border-white/40 shadow-2xl text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-emerald-500/30 transition-all font-medium text-lg"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Categories / Filters */}
        <div className="flex flex-col xl:flex-row justify-between items-center gap-6 mb-12">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 md:gap-3">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-5 py-2.5 rounded-full font-bold text-sm transition-all duration-300 shadow-sm outline-none border-2 focus:ring-4 focus:ring-teal-500/20 ${
                  filter === cat 
                    ? 'bg-teal-900 text-white border-teal-900 shadow-teal-900/30 scale-105' 
                    : 'bg-white text-teal-800 border-teal-200 hover:bg-teal-50 hover:text-teal-900 hover:border-teal-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          
          <div className="flex items-center gap-2 text-sm font-bold text-slate-500 bg-white px-4 py-2.5 rounded-xl border border-slate-200 shadow-sm shrink-0">
            Topilgan natijalar: <span className="text-teal-900">{filteredMedicines.length}</span>
          </div>
        </div>

        {/* Products Grid */}
        {filteredMedicines.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredMedicines.map(medicine => (
              <div 
                key={medicine.id} 
                className="group flex flex-col bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl hover:border-emerald-200 transition-all duration-500 hover:-translate-y-1"
              >
                {/* Image Container */}
                <div className="relative h-56 bg-slate-50 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent z-10"></div>
                  {medicine.image ? (
                    <img 
                      src={medicine.image} 
                      alt={medicine.name} 
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-slate-300 group-hover:scale-110 transition-transform duration-700">
                      <ShoppingCartIcon />
                      <span className="text-xs font-bold uppercase tracking-wider mt-2">Rasm yo'q</span>
                    </div>
                  )}
                  
                  {/* Badges */}
                  <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
                    {medicine.badge && (
                      <span className="bg-gradient-to-r from-amber-400 to-orange-500 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-lg">
                        {medicine.badge}
                      </span>
                    )}
                  </div>
                  <div className="absolute top-4 right-4 z-20">
                    <span className="bg-white/90 backdrop-blur-md text-teal-800 px-3 py-1.5 rounded-xl text-xs font-black shadow-lg">
                      {medicine.category}
                    </span>
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-6 flex-grow flex flex-col">
                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-3">
                    <div className="flex">
                       {[1,2,3,4,5].map(star => (
                         <StarIcon key={star} filled={star <= Math.round(medicine.rating)} />
                       ))}
                    </div>
                    <span className="text-xs font-bold text-slate-400 ml-1">{medicine.rating}</span>
                  </div>

                  <h3 className="text-xl font-black text-slate-900 mb-2 font-serif group-hover:text-emerald-700 transition-colors line-clamp-1" title={medicine.name}>
                    {medicine.name}
                  </h3>
                  
                  <p className="text-slate-500 text-sm mb-4 line-clamp-2 leading-relaxed flex-grow">
                    {medicine.description}
                  </p>
                  
                  <div className="bg-slate-50/80 rounded-2xl p-4 mb-6 border border-slate-100 group-hover:bg-emerald-50/50 transition-colors">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">
                      Qo'llash usuli:
                    </p>
                    <p className="text-slate-700 text-sm font-medium leading-snug line-clamp-2">
                      {medicine.usage}
                    </p>
                  </div>

                  {/* Price & Action */}
                  <div className="mt-auto flex items-center justify-between gap-4 pt-2 border-t border-slate-100">
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Narxi:</p>
                      <span className="text-xl font-black text-teal-900 tracking-tight">
                        {medicine.price}
                      </span>
                    </div>

                    <button 
                      onClick={() => handleAddToCart(medicine.id)}
                      disabled={addedItems.includes(medicine.id)}
                      className={`relative overflow-hidden w-12 h-12 flex items-center justify-center rounded-2xl transition-all duration-300 shadow-lg ${
                        addedItems.includes(medicine.id)
                          ? 'bg-teal-500 text-white scale-95 shadow-teal-500/20'
                          : 'bg-slate-900 text-white hover:bg-emerald-600 hover:-translate-y-1 hover:shadow-emerald-600/30'
                      }`}
                      title="Savatga qo'shish"
                    >
                      <div className={`transition-transform duration-300 ${addedItems.includes(medicine.id) ? 'scale-0' : 'scale-100'}`}>
                        <ShoppingCartIcon />
                      </div>
                      <div className={`absolute inset-0 flex items-center justify-center transition-transform duration-300 ${addedItems.includes(medicine.id) ? 'scale-100' : 'scale-0'}`}>
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
               <SearchIcon />
            </div>
            <h3 className="text-2xl font-black text-slate-800 mb-2 font-serif">Hech narsa topilmadi</h3>
            <p className="text-slate-500">Kiritilgan qidiruv bo'yicha dori vositalari topilmadi. Boshqa so'z bilan izlab ko'ring.</p>
            <button 
              onClick={() => {setSearchQuery(''); setFilter('Barchasi');}}
              className="mt-6 px-6 py-3 bg-teal-900 text-white rounded-xl font-bold shadow-lg hover:shadow-teal-900/30 hover:-translate-y-1 transition-all"
            >
              Filtrlarni tozalash
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AgroPharmacy;
