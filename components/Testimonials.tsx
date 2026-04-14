import React from "react";
import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    name: "Akmal Yo'ldoshev",
    role: "Pomidor fermeri",
    region: "Farg'ona viloyati",
    quote:
      "Bir hafta oldin barglarimda qora dog'lar paydo bo'ldi. Rasmini yukladim — 10 soniyada fitoftoroz kasalligini aniqlashdi va qanday davolashni aytib berishdi. Hosilim saqlanib qoldi.",
    rating: 5,
  },
  {
    name: "Dilshod Karimov",
    role: "Uzumchi",
    region: "Samarqand viloyati",
    quote:
      "AI Agronom menga uzum oidium kasalligidan saqlanish uchun aniq grafik tuzib berdi. Bu yil hosilim o'tgan yilga nisbatan 25% ko'p.",
    rating: 5,
  },
  {
    name: "Nodira Rahimova",
    role: "Sabzavot xo'jaligi rahbari",
    region: "Toshkent viloyati",
    quote:
      "15 gektar yerim bor. Ilgari agronom chaqirish uchun kunlab kutardim. Endi Ko'rg'on AI bilan har kuni monitoring qilaman — tezkor va aniq.",
    rating: 5,
  },
];

const Testimonials: React.FC = () => {
  return (
    <section className="py-24 relative z-10 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-emerald-600 font-bold uppercase tracking-wider text-sm">
            Fermerlar haqida
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mt-4 mb-6 font-serif tracking-tight">
            Beta foydalanuvchilar <br className="hidden md:block" />
            <span className="text-emerald-600 italic">nima deyishadi</span>
          </h2>
          <p className="text-slate-500 text-lg font-light max-w-2xl mx-auto">
            O'zbekistonning turli viloyatlaridan fermerlar Ko'rg'on AI'ni sinab ko'rishdi.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="p-8 rounded-[2rem] bg-white border border-slate-100 shadow-xl shadow-slate-100/50 hover:-translate-y-2 transition-all duration-300 flex flex-col"
            >
              <Quote className="w-10 h-10 text-emerald-200 mb-4" />
              <div className="flex gap-0.5 mb-5">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>
              <p className="text-slate-700 leading-relaxed mb-6 flex-grow">
                "{t.quote}"
              </p>
              <div className="pt-5 border-t border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center text-white font-black text-base shrink-0">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-black text-slate-900 text-sm">{t.name}</p>
                    <p className="text-xs text-slate-500">
                      {t.role} · {t.region}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-slate-400 mt-10 font-medium">
          * Beta testda ishtirok etgan fermerlarning haqiqiy fikrlari (ismlar o'zgartirilgan)
        </p>
      </div>
    </section>
  );
};

export default Testimonials;
