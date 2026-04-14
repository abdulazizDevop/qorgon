import React from "react";
import { Check, X } from "lucide-react";

const features = [
  "AI tashxis (rasm orqali)",
  "Hududiy risk xaritasi",
  "O'zbek tilida",
  "AI Agronom chat (24/7)",
  "Davolash tavsiyalari",
  "Agro-dorixona integratsiyasi",
  "Mahalliy iqlim modeli",
  "Telegram bot",
];

const competitors = [
  { name: "Oddiy agro-saytlar", values: [false, false, true, false, false, false, false, false] },
  { name: "Xorijiy AI ilovalar", values: [true, false, false, false, true, false, false, false] },
  { name: "Ko'rg'on AI", values: [true, true, true, true, true, true, true, true], highlight: true },
];

const Comparison: React.FC = () => {
  return (
    <section className="py-24 relative z-10 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-emerald-600 font-bold uppercase tracking-wider text-sm">
            Raqobat tahlili
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mt-4 mb-6 font-serif tracking-tight">
            Bizni <span className="text-emerald-600 italic">nima farqlaydi?</span>
          </h2>
          <p className="text-slate-500 text-lg font-light max-w-2xl mx-auto">
            Ko'pchilik platformalar alohida xizmatlar taklif qiladi.
            Ko'rg'on AI — barcha muhim funksiyalarni bitta ekotizimda birlashtiradi.
          </p>
        </div>

        <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-100/50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr className="border-b-2 border-slate-100">
                  <th className="py-6 px-4 md:px-8 text-left text-xs md:text-sm font-black text-slate-400 uppercase tracking-wider">
                    Xususiyat
                  </th>
                  {competitors.map((c) => (
                    <th
                      key={c.name}
                      className={`py-6 px-2 md:px-4 text-center text-xs md:text-sm font-black uppercase tracking-wider ${
                        c.highlight
                          ? "bg-emerald-600 text-white"
                          : "text-slate-500"
                      }`}
                    >
                      {c.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {features.map((feature, idx) => (
                  <tr
                    key={idx}
                    className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50 transition-colors"
                  >
                    <td className="py-4 px-4 md:px-8 text-sm md:text-base text-slate-700 font-medium">
                      {feature}
                    </td>
                    {competitors.map((c) => (
                      <td
                        key={c.name}
                        className={`py-4 px-2 md:px-4 text-center ${
                          c.highlight ? "bg-emerald-50/40" : ""
                        }`}
                      >
                        {c.values[idx] ? (
                          <div className="inline-flex w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 items-center justify-center">
                            <Check className="w-4 h-4" strokeWidth={3} />
                          </div>
                        ) : (
                          <div className="inline-flex w-8 h-8 rounded-full bg-slate-100 text-slate-400 items-center justify-center">
                            <X className="w-4 h-4" strokeWidth={3} />
                          </div>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-slate-600 font-medium text-base md:text-lg max-w-2xl mx-auto">
            Biz <strong className="text-emerald-600">global emasmiz</strong> — lokal
            muammoni <strong className="text-slate-900">chuqur hal qilamiz.</strong>
            O'zbekiston iqlimi, o'simliklari va kasalliklariga moslashtirilgan yechim.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Comparison;
