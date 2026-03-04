import { ShoppingCart, Search, CheckCircle2, PackageOpen, LucideShoppingCart } from 'lucide-react';
import React, { useState, useMemo } from 'react';

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
    image: "/images/topaz.png",
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
    image: "/images/karate.png",
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
    image: "/images/uragan.png",
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
    image: "/images/gummat.png",
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
    image: "/images/miskuporosi.png",
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
    image: "/images/nitroammofoska.png",
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
      <div className="relative bg-teal-900 overflow-hidden pt-12 pb-14 mb-10 rounded-b-[3rem] shadow-sm">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[40rem] h-[40rem] rounded-full bg-emerald-500/20 blur-[100px] translate-x-1/3 -translate-y-1/3" />
          <div className="absolute bottom-0 left-0 w-[30rem] h-[30rem] rounded-full bg-teal-400/20 blur-[80px] -translate-x-1/4 translate-y-1/3" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
            
            {/* Left Content */}
            <div className="lg:w-1/2 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-emerald-300 text-sm font-bold mb-6 tracking-wide shadow-lg mx-auto lg:mx-0">
                <LucideShoppingCart />
                100+ Sertifikatlangan Dori Vositalari
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 font-serif drop-shadow-xl tracking-tight leading-tight">
                Agro <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">Dorixona</span>
              </h1>
              <p className="text-teal-100/90 text-lg max-w-lg mx-auto lg:mx-0 font-light leading-relaxed">
                Ekinlaringiz uchun mutaxassislar tomonidan sinovdan o'tgan, eng ishonchli o'g'it va himoya vositalari markazi.
              </p>
            </div>

            {/* Right Search Bar */}
            <div className="lg:w-1/2 w-full max-w-xl">
               <div className="bg-white/10 backdrop-blur-md p-2 rounded-3xl border border-white/20 shadow-2xl relative">
                 <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none text-white/50">
                    <Search color='black' />
                 </div>
                 <input 
                    type="text" 
                    placeholder="Dori nomi yoki kasallik..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-14 pr-6 py-5 rounded-2xl bg-white/95 text-slate-800 placeholder:text-slate-500 focus:outline-none focus:ring-4 focus:ring-emerald-500/50 shadow-inner font-medium text-lg transition-all"
                 />
                 {/* Decorative elements around search */}
               </div>
               <p className="text-teal-200/60 text-sm mt-4 text-center lg:text-right font-medium pr-2">Tezkor qidiruv, doimiy natija!</p>
            </div>
            
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
                className="group flex flex-col bg-white rounded-[2.5rem] p-4 border border-slate-100 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] hover:shadow-2xl hover:shadow-emerald-100/60 hover:border-emerald-100 transition-all duration-500 hover:-translate-y-2 h-full justify-between relative"
              >
                {/* Image Area */}
                <div className="relative h-56 bg-gradient-to-br from-slate-50 to-emerald-50/20 rounded-[2rem] overflow-hidden mb-6 flex items-center justify-center border border-slate-50">
                  {medicine.image ? (
                    <img 
                      src={medicine.image} 
                      alt={medicine.name} 
                      className="w-[85%] h-[85%] object-contain transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-700 ease-out drop-shadow-2xl"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-slate-300">
                      <PackageOpen className="w-12 h-12 mb-2 group-hover:text-emerald-300 transition-colors" />
                      <span className="text-[10px] font-black uppercase tracking-widest">Surat Yo'q</span>
                    </div>
                  )}
                  
                  {/* Badges Overlay */}
                  <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                    {medicine.badge && (
                      <span className="bg-white/90 backdrop-blur-md text-amber-600 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider shadow-sm border border-amber-100/50">
                        {medicine.badge}
                      </span>
                    )}
                  </div>
                  <div className="absolute top-4 right-4 z-10">
                    <span className="bg-emerald-50 text-emerald-600 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider border border-emerald-100/50 shadow-sm">
                      {medicine.category.split(' ')[0]} {/* Shorter category name for badge */}
                    </span>
                  </div>
                </div>
                
                {/* Content Area */}
                <div className="px-2 flex flex-col flex-grow">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex">
                       {[1,2,3,4,5].map(star => (
                         <StarIcon key={star} filled={star <= Math.round(medicine.rating)} />
                       ))}
                    </div>
                    <span className="text-[11px] font-black bg-slate-100 text-slate-500 px-2 py-0.5 rounded-md">{medicine.rating} / 5</span>
                  </div>

                  <h3 className="text-2xl font-black text-slate-900 mb-3 font-serif line-clamp-2 leading-tight group-hover:text-emerald-700 transition-colors" title={medicine.name}>
                    {medicine.name}
                  </h3>
                  
                  <p className="text-slate-500 text-sm mb-6 line-clamp-2 leading-relaxed font-medium">
                    {medicine.description}
                  </p>
                  
                  {/* Usage / Usage Instructions Box */}
                  <div className="bg-slate-50 rounded-2xl p-4 mb-6 border border-slate-100 group-hover:bg-emerald-50/50 group-hover:border-emerald-100/50 transition-colors flex-grow">
                    <p className="text-[10px] font-black text-emerald-600/70 uppercase tracking-widest mb-1.5 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Qo'llash
                    </p>
                    <p className="text-slate-700 text-[13px] font-bold leading-snug">
                      {medicine.usage}
                    </p>
                  </div>

                  {/* Price & Cart Actions */}
                  <div className="flex items-center justify-between pt-2">
                    <div>
                      <span className="text-2xl font-black text-slate-900 tracking-tight font-serif drop-shadow-sm">
                        {medicine.price.split(' ')[0]}
                      </span>
                      <span className="text-xs font-bold text-slate-400 ml-1 uppercase">{medicine.price.split(' ').slice(1).join(' ')}</span>
                    </div>

                    <button 
                      onClick={() => handleAddToCart(medicine.id)}
                      disabled={addedItems.includes(medicine.id)}
                      className={`relative overflow-hidden w-14 h-14 flex items-center justify-center rounded-[1.25rem] transition-all duration-300 shadow-md ${
                        addedItems.includes(medicine.id)
                          ? 'bg-emerald-500 text-white scale-95 shadow-none'
                          : 'bg-slate-900 text-white hover:bg-emerald-600 hover:-translate-y-1 hover:shadow-emerald-600/30'
                      }`}
                      title="Savatga qo'shish"
                    >
                      <div className={`transition-transform duration-300 absolute ${addedItems.includes(medicine.id) ? 'scale-0 blur-sm' : 'scale-100 blur-0'}`}>
                        <ShoppingCart className="w-5 h-5" />
                      </div>
                      <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${addedItems.includes(medicine.id) ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}>
                        <CheckCircle2 className="w-6 h-6" />
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
               <Search color='black' />
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
