import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const items = [
  {
    q: "Ko'rg'on AI qanday ishlaydi?",
    a: "Oddiy: telefoningiz kamerasi bilan o'simligingizning rasmini oling yoki yuklang. AI modelimiz 10 soniyada kasallikni aniqlaydi, davolash usulini va kerakli dorilarni tavsiya qiladi.",
  },
  {
    q: "Qancha aniq natija beradi?",
    a: "Asosiy kasalliklar uchun AI modelimiz laboratoriya testlarida yuqori aniqlik ko'rsatdi. Biz doimiy ravishda lokal ma'lumotlar bilan modelni yaxshilab boramiz. Har bir tashxisda ishonch darajasi ham ko'rsatiladi.",
  },
  {
    q: "Qaysi ekinlar qo'llab-quvvatlanadi?",
    a: "Hozirda paxta, bug'doy, pomidor, bodring, uzum, anor, piyoz, kartoshka va boshqa asosiy ekinlarimiz qo'llab-quvvatlanadi. Har oy yangi ekinlar qo'shamiz.",
  },
  {
    q: "Internet aloqasi bo'lmasa ishlaydimi?",
    a: "Hozircha asosiy funksiyalar internet talab qiladi, lekin keyingi bosqichda oflayn rejim (Android ilovada) ham qo'shiladi — rasm kiritiladi, internet bo'lganda yuboriladi.",
  },
  {
    q: "To'lov qanday amalga oshiriladi?",
    a: "Tirikchilik.uz orqali Click/Payme bilan. To'lovdan so'ng kvitansiya skrinshotini Telegram orqali yuborasiz — 24 soat ichida hisobingiz faollashtiriladi. Tez kunda avtomatik obuna ham qo'shiladi.",
  },
  {
    q: "Ma'lumotlarim xavfsizmi?",
    a: "Ha. Yuklangan rasmlar faqat tahlil uchun ishlatiladi, uchinchi tomonlarga berilmaydi. Shaxsiy ma'lumotlar O'zbekiston qonunchiligiga muvofiq saqlanadi.",
  },
  {
    q: "Xato tashxis qo'yilsa nima bo'ladi?",
    a: "Ikkilangan holatlarda AI Agronom bilan qo'shimcha suhbat qiling, yoki Pro tarifdagi \"Real agronom bilan muloqot\" xizmatidan foydalaning. Biz har bir xato holatni o'rganib, modelni yaxshilaymiz.",
  },
  {
    q: "B2B / katta xo'jaliklar uchun nima taklif qilasiz?",
    a: "API access, white-label brandingi, maxsus fine-tuned AI model va shaxsiy menejer xizmati mavjud. Shartnoma asosida 1-5 mln so'm/oy oralig'ida. Batafsil — bog'lanish tugmasi orqali.",
  },
];

const FAQ: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="py-24 relative z-10 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-emerald-600 font-bold uppercase tracking-wider text-sm">
            Savol va javoblar
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mt-4 mb-6 font-serif tracking-tight">
            Tez-tez beriladigan <br className="hidden md:block" />
            <span className="text-emerald-600 italic">savollar</span>
          </h2>
          <p className="text-slate-500 text-lg font-light max-w-2xl mx-auto">
            Foydalanuvchilarimiz ko'p beradigan savollarga javoblar.
          </p>
        </div>

        <div className="space-y-3">
          {items.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all overflow-hidden ${
                  isOpen
                    ? "bg-emerald-50/40 border-emerald-200"
                    : "bg-white border-slate-100 hover:border-slate-200"
                }`}
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between gap-4 text-left p-5 md:p-6 font-bold text-slate-900"
                  aria-expanded={isOpen}
                >
                  <span className="text-base md:text-lg">{item.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-emerald-600 shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`grid transition-all duration-300 ease-out ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-5 md:px-6 pb-5 md:pb-6 text-slate-600 leading-relaxed">
                      {item.a}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-10 text-center p-6 rounded-2xl bg-emerald-50/60 border border-emerald-100">
          <p className="text-slate-700 mb-4 font-medium">
            Javobingizni topa olmadingizmi? Biz bilan bog'laning.
          </p>
          <a
            href="https://t.me/AbdulazizAlimov"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white font-bold rounded-2xl shadow-lg shadow-emerald-200 hover:bg-emerald-700 transition-all"
          >
            Telegram'da savol berish →
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
