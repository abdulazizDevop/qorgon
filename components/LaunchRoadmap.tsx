import React from "react";
import {
  FlaskConical,
  Microscope,
  BookOpen,
  Users,
  Building,
  Rocket,
  Megaphone,
  TrendingUp,
  Send,
} from "lucide-react";

const TELEGRAM_ADMIN = "https://t.me/AbdulazizAlimov";

const timeline = [
  {
    month: "1-oy",
    title: "Tayyorgarlik",
    desc: "Backend yakunlash, Telegram bot integratsiyasi, dastlabki 100 early-adopter fermer",
    icon: <Rocket className="w-6 h-6" />,
  },
  {
    month: "2-oy",
    title: "Ommaviy launch",
    desc: "Keng marketing kampaniyasi, 1,000–3,000 foydalanuvchi, viloyat agronomlari bilan aloqa",
    icon: <Megaphone className="w-6 h-6" />,
  },
  {
    month: "3-oy",
    title: "Kengayish",
    desc: "5,000+ faol foydalanuvchi, 14 viloyat bo'ylab qamrov, B2B shartnomalar",
    icon: <TrendingUp className="w-6 h-6" />,
  },
];

const dataSources = [
  {
    icon: <Microscope className="w-6 h-6 text-emerald-600" />,
    source: "Tadqiqot markazlari",
    detail: "O'zbekiston QXIITI, TIQXMMI",
    value: "O'zbek iqlimida uchraydigan kasalliklar va rasm kolleksiyasi",
  },
  {
    icon: <FlaskConical className="w-6 h-6 text-emerald-600" />,
    source: "QX laboratoriyalari",
    detail: "Viloyat laboratoriyalari",
    value: "Patogen namunalari va tashxis natijalari",
  },
  {
    icon: <BookOpen className="w-6 h-6 text-emerald-600" />,
    source: "Ochiq manbalar",
    detail: "PlantVillage, iNaturalist, FAO",
    value: "Xalqaro validatsiya qilingan rasm datasetlari",
  },
  {
    icon: <Users className="w-6 h-6 text-emerald-600" />,
    source: "Viloyat agronomlari",
    detail: "Fermer uyushmalari",
    value: "Amaliy maslahat va davolash usullari",
  },
  {
    icon: <Building className="w-6 h-6 text-emerald-600" />,
    source: "QX Vazirligi",
    detail: "Rejalashtirilgan hamkorlik",
    value: "Rasmiy statistika va hududiy ma'lumotlar",
  },
];

const budget = [
  {
    icon: "🤖",
    title: "Data & AI",
    share: "40–50%",
    items: [
      "Gemini API (premium model)",
      "Maxsus fine-tuned model",
      "Server va GPU xarajatlari",
      "Ma'lumotlar bazasi",
    ],
  },
  {
    icon: "📣",
    title: "Marketing",
    share: "50–60%",
    items: [
      "Telegram ommaviy reklama",
      "Instagram / YouTube kampaniyasi",
      "Viloyat bo'yicha targeting",
      "Kontent va influencer-fermerlar",
    ],
  },
];

const kpis = [
  { label: "Ro'yxatdan o'tgan foydalanuvchi", m1: "100", m2: "1 500", m3: "5 000+" },
  { label: "Oylik faol fermer", m1: "50", m2: "800", m3: "3 000" },
  { label: "Basic obuna", m1: "5", m2: "150", m3: "600" },
  { label: "Pro obuna", m1: "0", m2: "20", m3: "100" },
  { label: "Qamrab olingan viloyatlar", m1: "2", m2: "7", m3: "14 (barcha)" },
];

const LaunchRoadmap: React.FC = () => {
  return (
    <section id="roadmap" className="py-24 relative z-10 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-emerald-600 font-bold uppercase tracking-wider text-sm">
            Ishga tushirish uchun
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mt-4 mb-6 font-serif tracking-tight">
            3 oylik <span className="text-emerald-600 italic">ishga tushirish rejasi</span>
          </h2>
          <p className="text-slate-500 text-lg font-light max-w-2xl mx-auto">
            Ko'rg'on AI'ni O'zbekiston bo'ylab to'liq ishga tushirish uchun
            yo'l xaritasi, ma'lumot manbalari va byudjet taqsimoti.
          </p>
        </div>

        {/* Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {timeline.map((step, idx) => (
            <div
              key={idx}
              className="relative bg-white p-8 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-100/50"
            >
              <div className="absolute -top-4 left-8 bg-emerald-600 text-white px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider shadow-lg">
                {step.month}
              </div>
              <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-5 mt-3">
                {step.icon}
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-3 font-serif">
                {step.title}
              </h3>
              <p className="text-slate-500 leading-relaxed font-light">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Data Sources */}
        <div className="bg-white rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-100/50 p-8 md:p-12 mb-10">
          <div className="mb-8">
            <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-3 font-serif">
              Ma'lumotlar manbalari
            </h3>
            <p className="text-slate-500 font-light">
              Ko'rg'on AI'ning asosiy kuchi — sifatli lokal ma'lumotlar.
              Bularni sotib olmaymiz, ochiq va hamkorlik orqali to'playmiz.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {dataSources.map((ds, idx) => (
              <div
                key={idx}
                className="flex items-start gap-4 p-5 rounded-2xl bg-slate-50/50 border border-slate-100 hover:border-emerald-100 transition-all"
              >
                <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center shrink-0">
                  {ds.icon}
                </div>
                <div>
                  <h4 className="font-black text-slate-900 text-base mb-0.5">
                    {ds.source}
                  </h4>
                  <p className="text-xs font-bold text-emerald-600 mb-2 uppercase tracking-wider">
                    {ds.detail}
                  </p>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {ds.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Budget */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {budget.map((b, idx) => (
            <div
              key={idx}
              className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-100/50"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <span className="text-4xl">{b.icon}</span>
                  <h3 className="text-2xl font-black text-slate-900 font-serif">
                    {b.title}
                  </h3>
                </div>
                <span className="text-xl font-black text-emerald-600 font-serif">
                  {b.share}
                </span>
              </div>
              <ul className="space-y-2">
                {b.items.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-slate-600 text-sm"
                  >
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="text-center text-sm text-slate-500 mb-16">
          Aniq byudjet miqdori grant dasturiga qarab belgilanadi. Nisbatlar
          3 oylik ishga tushirish bosqichi uchun taqsimlanadi.
        </div>

        {/* KPIs */}
        <div className="bg-slate-900 rounded-[3rem] p-8 md:p-12 relative overflow-hidden shadow-2xl mb-16">
          <div className="absolute top-0 right-0 w-[30rem] h-[30rem] bg-emerald-600 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 opacity-40"></div>
          <div className="relative z-10">
            <div className="mb-8">
              <span className="text-emerald-400 font-bold uppercase tracking-wider text-xs">
                Maqsadli ko'rsatkichlar
              </span>
              <h3 className="text-2xl md:text-3xl font-black text-white mt-3 font-serif">
                3 oylik KPI rejasi
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="py-4 pr-4 text-emerald-300 font-bold text-sm uppercase tracking-wider">
                      Ko'rsatkich
                    </th>
                    <th className="py-4 px-4 text-emerald-300 font-bold text-sm uppercase tracking-wider text-center">
                      1-oy
                    </th>
                    <th className="py-4 px-4 text-emerald-300 font-bold text-sm uppercase tracking-wider text-center">
                      2-oy
                    </th>
                    <th className="py-4 pl-4 text-emerald-300 font-bold text-sm uppercase tracking-wider text-center">
                      3-oy
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {kpis.map((kpi, idx) => (
                    <tr
                      key={idx}
                      className="border-b border-slate-800/60 last:border-0"
                    >
                      <td className="py-4 pr-4 text-slate-200 font-medium">
                        {kpi.label}
                      </td>
                      <td className="py-4 px-4 text-center text-slate-300">
                        {kpi.m1}
                      </td>
                      <td className="py-4 px-4 text-center text-white font-bold">
                        {kpi.m2}
                      </td>
                      <td className="py-4 pl-4 text-center text-emerald-300 font-black">
                        {kpi.m3}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h3 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 font-serif">
            Hamkor bo'ling
          </h3>
          <p className="text-slate-500 text-lg font-light max-w-xl mx-auto mb-8">
            Agar siz investor, hamkor yoki qishloq xo'jaligi sohasida faoliyat
            yurituvchi bo'lsangiz — biz bilan bog'laning.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={TELEGRAM_ADMIN}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-emerald-600 text-white font-black rounded-2xl shadow-lg shadow-emerald-200 hover:bg-emerald-700 transition-all"
            >
              <Send className="w-5 h-5" />
              Telegram'da yozish
            </a>
            <a
              href="mailto:olimovabdulaziz464@gmail.com"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-slate-900 font-black rounded-2xl border-2 border-slate-200 hover:border-emerald-500 hover:text-emerald-600 transition-all"
            >
              Email yuborish
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LaunchRoadmap;
