import React from "react";
import { Users, Sprout, AlertTriangle, TrendingDown } from "lucide-react";

const stats = [
  {
    icon: <Users className="w-7 h-7" />,
    value: "4.5M+",
    label: "O'zbek fermer xo'jaligi",
    hint: "Jami maqsadli auditoriya",
  },
  {
    icon: <Sprout className="w-7 h-7" />,
    value: "3.5M ga",
    label: "ekin maydonlari",
    hint: "Yillik sug'oriladigan yerlar",
  },
  {
    icon: <AlertTriangle className="w-7 h-7" />,
    value: "30–40%",
    label: "hosil yo'qotish",
    hint: "Kasallik va zararkunandalar ta'siridan",
  },
  {
    icon: <TrendingDown className="w-7 h-7" />,
    value: "~$2B",
    label: "yillik iqtisodiy zarar",
    hint: "Soha bo'yicha umumiy yo'qotish",
  },
];

const MarketStats: React.FC = () => {
  return (
    <section className="py-24 relative z-10 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-emerald-600 font-bold uppercase tracking-wider text-sm">
            Muammo raqamlarda
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mt-4 mb-6 font-serif tracking-tight">
            O'zbekiston qishloq xo'jaligi <br className="hidden md:block" />
            <span className="text-emerald-600 italic">katta muammo oldida</span>
          </h2>
          <p className="text-slate-500 text-lg font-light max-w-2xl mx-auto">
            Fermerlar har yili o'simlik kasalliklari tufayli milliardlab so'mlik
            hosil yo'qotadi. Ko'rg'on AI shu muammoni AI orqali hal qilish uchun yaratildi.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {stats.map((s, i) => (
            <div
              key={i}
              className="relative p-6 md:p-8 rounded-[2rem] bg-gradient-to-br from-slate-50 to-white border border-slate-100 shadow-xl shadow-slate-100/50 hover:-translate-y-2 hover:shadow-emerald-100/50 transition-all duration-300 group"
            >
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              </div>
              <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-5">
                {s.icon}
              </div>
              <div className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 font-serif leading-none mb-2">
                {s.value}
              </div>
              <div className="text-sm font-bold text-slate-700 mb-1">{s.label}</div>
              <div className="text-xs text-slate-400 font-medium">{s.hint}</div>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-slate-400 mt-10 font-medium">
          Manba: O'zbekiston Davlat Statistika qo'mitasi, UN FAO hisobotlari (2023-2024)
        </p>
      </div>
    </section>
  );
};

export default MarketStats;
