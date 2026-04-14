import React, { useState } from "react";
import { Check, Sparkles, Zap, Building2, Leaf } from "lucide-react";

const TIRIKCHILIK_URL = "https://tirikchilik.uz/lazik";
const TELEGRAM_ADMIN = "https://t.me/AbdulazizAlimov";

interface Tier {
  id: string;
  name: string;
  price: string;
  priceSuffix?: string;
  description: string;
  features: string[];
  cta: { label: string; href: string; external: boolean };
  icon: React.ReactNode;
  highlight?: boolean;
  badge?: string;
  accentColor: string;
}

const tiers: Tier[] = [
  {
    id: "b2c",
    name: "B2C",
    price: "Bepul",
    description: "Oddiy foydalanuvchilar — fermerlar uchun",
    features: [
      "Kuniga 2 ta rasm tahlili",
      "Oddiy tashxis (AI basic)",
      "Entsiklopediyaga kirish",
      "Reklama ko'rsatiladi",
    ],
    cta: { label: "Hoziroq boshlash", href: "/analyzer", external: false },
    icon: <Leaf className="w-7 h-7" />,
    accentColor: "slate",
  },
  {
    id: "basic",
    name: "Basic",
    price: "19 900",
    priceSuffix: "so'm / oy",
    description: "Faol fermer uchun kundalik yordamchi",
    features: [
      "Kuniga 15 ta tahlil",
      "Kasallik + davolash tavsiyasi",
      "AI Agronom cheksiz",
      "Reklama yo'q",
    ],
    cta: { label: "Obuna bo'lish", href: TIRIKCHILIK_URL, external: true },
    icon: <Zap className="w-7 h-7" />,
    badge: "Mashhur",
    accentColor: "emerald",
  },
  {
    id: "pro",
    name: "Pro",
    price: "49 900",
    priceSuffix: "so'm / oy",
    description: "Professional fermer va xo'jaliklar uchun",
    features: [
      "Cheksiz tahlil",
      "Premium AI (yuqori aniqlik)",
      "Kasallik prognozi — oldindan ogohlantirish",
      "Telegram bot orqali ishlash",
      "Real agronom bilan muloqot",
    ],
    cta: { label: "Obuna bo'lish", href: TIRIKCHILIK_URL, external: true },
    icon: <Sparkles className="w-7 h-7" />,
    highlight: true,
    badge: "Tavsiya etamiz",
    accentColor: "emerald",
  },
  {
    id: "b2b",
    name: "B2B",
    price: "1M – 5M",
    priceSuffix: "so'm / oy",
    description: "Agro-kompaniyalar, katta xo'jaliklar",
    features: [
      "API access — o'z tizimingizga ulash",
      "White-label — o'z brendingiz",
      "Maxsus AI model (custom)",
      "Shartnoma asosida",
      "Shaxsiy menejer",
    ],
    cta: { label: "Biz bilan bog'laning", href: TELEGRAM_ADMIN, external: true },
    icon: <Building2 className="w-7 h-7" />,
    accentColor: "slate",
  },
];

const Pricing: React.FC = () => {
  const [toastVisible, setToastVisible] = useState(false);

  const handleSubscribeClick = (tier: Tier) => {
    if (tier.id === "basic" || tier.id === "pro") {
      setToastVisible(true);
      window.setTimeout(() => setToastVisible(false), 6000);
    }
  };

  return (
    <section id="pricing" className="py-24 relative z-10 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-emerald-600 font-bold uppercase tracking-wider text-sm">
            Monetizatsiya modeli
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mt-4 mb-6 font-serif tracking-tight">
            Har bir fermer va kompaniya uchun <br className="hidden md:block" />
            <span className="text-emerald-600 italic">mos reja</span>
          </h2>
          <p className="text-slate-500 text-lg font-light max-w-2xl mx-auto">
            Kichik fermerdan tortib katta agro-kompaniyalargacha — har bir ehtiyojga
            mos tarif. Istalgan vaqtda o'zgartirish mumkin.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {tiers.map((tier) => {
            const isHighlight = tier.highlight;
            return (
              <div
                key={tier.id}
                className={`relative flex flex-col p-8 rounded-[2rem] transition-all duration-300 ${
                  isHighlight
                    ? "bg-slate-900 text-white ring-2 ring-emerald-500 shadow-2xl shadow-emerald-900/30 lg:-translate-y-4"
                    : "bg-white border border-slate-100 shadow-xl shadow-slate-100/50 hover:-translate-y-2"
                }`}
              >
                {tier.badge && (
                  <div
                    className={`absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider shadow-lg ${
                      isHighlight
                        ? "bg-emerald-500 text-white"
                        : "bg-amber-400 text-slate-900"
                    }`}
                  >
                    {tier.badge}
                  </div>
                )}

                <div
                  className={`w-fit p-3 rounded-2xl mb-5 ${
                    isHighlight
                      ? "bg-emerald-500/20 text-emerald-300"
                      : "bg-emerald-50 text-emerald-600"
                  }`}
                >
                  {tier.icon}
                </div>

                <h3
                  className={`text-2xl font-black mb-2 font-serif ${
                    isHighlight ? "text-white" : "text-slate-900"
                  }`}
                >
                  {tier.name}
                </h3>
                <p
                  className={`text-sm mb-6 min-h-[40px] ${
                    isHighlight ? "text-slate-300" : "text-slate-500"
                  }`}
                >
                  {tier.description}
                </p>

                <div className="mb-6">
                  <span
                    className={`text-4xl font-black font-serif ${
                      isHighlight ? "text-white" : "text-slate-900"
                    }`}
                  >
                    {tier.price}
                  </span>
                  {tier.priceSuffix && (
                    <span
                      className={`ml-2 text-sm font-medium ${
                        isHighlight ? "text-slate-400" : "text-slate-500"
                      }`}
                    >
                      {tier.priceSuffix}
                    </span>
                  )}
                </div>

                <ul className="space-y-3 mb-8 flex-grow">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div
                        className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                          isHighlight
                            ? "bg-emerald-500/20 text-emerald-300"
                            : "bg-emerald-50 text-emerald-600"
                        }`}
                      >
                        <Check className="w-3 h-3" strokeWidth={3} />
                      </div>
                      <span
                        className={`text-sm leading-relaxed ${
                          isHighlight ? "text-slate-200" : "text-slate-600"
                        }`}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {tier.cta.external ? (
                  <a
                    href={tier.cta.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handleSubscribeClick(tier)}
                    className={`block w-full text-center px-6 py-3.5 rounded-2xl font-bold transition-all ${
                      isHighlight
                        ? "bg-emerald-500 text-white hover:bg-emerald-400 shadow-lg shadow-emerald-500/30"
                        : tier.id === "b2b"
                          ? "bg-slate-900 text-white hover:bg-slate-800"
                          : "bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg shadow-emerald-200"
                    }`}
                  >
                    {tier.cta.label}
                  </a>
                ) : (
                  <a
                    href={tier.cta.href}
                    className={`block w-full text-center px-6 py-3.5 rounded-2xl font-bold transition-all border-2 ${
                      isHighlight
                        ? "border-emerald-400 text-white hover:bg-emerald-500/10"
                        : "border-slate-200 text-slate-700 hover:border-emerald-500 hover:text-emerald-600"
                    }`}
                  >
                    {tier.cta.label}
                  </a>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-10 text-center text-sm text-slate-500 max-w-2xl mx-auto">
          <p>
            💡 <strong className="text-slate-700">Obuna uchun:</strong> To'lovdan
            so'ng kvitansiya skrinshotini{" "}
            <a
              href={TELEGRAM_ADMIN}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-600 font-bold hover:underline"
            >
              @AbdulazizAlimov
            </a>{" "}
            Telegram'ga yuboring. Hisobingiz 24 soat ichida faollashadi.
          </p>
        </div>
      </div>

      {toastVisible && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white px-6 py-4 rounded-2xl shadow-2xl max-w-md w-[calc(100%-2rem)] animate-[fade-in-up_0.3s_ease-out]">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
              <Check className="w-4 h-4 text-emerald-400" strokeWidth={3} />
            </div>
            <div className="text-sm">
              <p className="font-bold mb-1">Tirikchilik sahifasi ochildi</p>
              <p className="text-slate-300">
                To'lovdan so'ng kvitansiyani{" "}
                <a
                  href={TELEGRAM_ADMIN}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 font-bold hover:underline"
                >
                  @AbdulazizAlimov
                </a>
                'ga yuboring — 24 soat ichida faollashadi.
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Pricing;
