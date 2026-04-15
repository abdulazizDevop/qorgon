import React from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles, Check, Zap, Clock, ArrowRight, RotateCcw } from "lucide-react";
import { FREE_SCAN_LIMIT, resetScanCount } from "../services/usageTracker";

interface PaywallProps {
  onReset?: () => void;
}

const TIRIKCHILIK_URL = "https://tirikchilik.uz/lazik";

const Paywall: React.FC<PaywallProps> = ({ onReset }) => {
  const navigate = useNavigate();

  const goToPricing = () => {
    navigate("/");
    window.setTimeout(() => {
      const el = document.getElementById("pricing");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  const handleDemoReset = () => {
    resetScanCount();
    if (onReset) onReset();
    else navigate("/analyzer");
  };

  return (
    <div className="max-w-3xl mx-auto py-12 px-4 pb-24">
      <div className="relative bg-white rounded-[3rem] overflow-hidden shadow-2xl shadow-emerald-100/50 border border-slate-100">
        {/* Top accent bar */}
        <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-emerald-400 via-emerald-500 to-teal-500"></div>

        {/* Hero header */}
        <div className="relative bg-gradient-to-br from-emerald-50 via-white to-teal-50 px-8 md:px-12 pt-14 pb-10 text-center overflow-hidden">
          <div className="absolute -top-16 -right-16 w-48 h-48 bg-emerald-300/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-teal-300/20 rounded-full blur-3xl"></div>

          <div className="relative z-10">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-[2rem] shadow-2xl shadow-emerald-300/50 mb-6 rotate-3">
              <Sparkles className="w-10 h-10 text-white" strokeWidth={2.5} />
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-black uppercase tracking-wider mb-4 border border-emerald-200">
              <Clock className="w-3 h-3" />
              Bepul limit tugadi
            </div>

            <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-4 font-serif tracking-tight">
              Ko'rg'on AI sizga <br className="hidden md:block" />
              <span className="text-emerald-600 italic">yoqdimi?</span>
            </h1>

            <p className="text-slate-600 text-base md:text-lg font-light max-w-xl mx-auto leading-relaxed">
              Siz bepul {FREE_SCAN_LIMIT} ta tahlildan foydalandingiz.
              Cheksiz tahlil, AI Agronom chat va premium funksiyalar uchun
              Basic yoki Pro tarifga obuna bo'ling.
            </p>
          </div>
        </div>

        {/* Benefits grid */}
        <div className="px-8 md:px-12 py-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
            {[
              { icon: <Zap className="w-5 h-5" />, text: "Kuniga 15 ta (Basic) yoki cheksiz tahlil (Pro)" },
              { icon: <Check className="w-5 h-5" />, text: "AI Agronom bilan cheksiz suhbat" },
              { icon: <Check className="w-5 h-5" />, text: "Davolash tavsiyalari va kasallik prognozi" },
              { icon: <Check className="w-5 h-5" />, text: "Reklama yo'q, tezkor javob" },
            ].map((b, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50/60 border border-slate-100"
              >
                <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                  {b.icon}
                </div>
                <p className="text-sm text-slate-700 leading-relaxed pt-1.5">{b.text}</p>
              </div>
            ))}
          </div>

          {/* Pricing highlight */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-[2rem] p-6 md:p-8 mb-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-500/20 rounded-full blur-3xl"></div>
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <p className="text-emerald-400 font-bold uppercase tracking-wider text-xs mb-2">
                  Eng mashhur
                </p>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-4xl md:text-5xl font-black text-white font-serif">19 900</span>
                  <span className="text-slate-400 font-medium">so'm / oy</span>
                </div>
                <p className="text-slate-400 text-sm">Basic tarif — kuniga 15 ta tahlil</p>
              </div>
              <a
                href={TIRIKCHILIK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-emerald-500 hover:bg-emerald-400 text-white font-black rounded-2xl shadow-lg shadow-emerald-500/30 transition-all whitespace-nowrap"
              >
                Obuna bo'lish
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Secondary actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={goToPricing}
              className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 bg-white border-2 border-slate-200 hover:border-emerald-500 hover:text-emerald-600 text-slate-700 font-bold rounded-2xl transition-all"
            >
              Barcha tariflarni ko'rish
            </button>
            <button
              onClick={handleDemoReset}
              className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-slate-50 hover:bg-slate-100 text-slate-500 font-medium rounded-2xl transition-all text-sm"
              title="Demo uchun hisoblagichni nolga qaytarish"
            >
              <RotateCcw className="w-4 h-4" />
              Demo reset
            </button>
          </div>

          <p className="text-center text-xs text-slate-400 mt-6">
            To'lov Tirikchilik.uz orqali · Click / Payme qabul qilinadi · 24 soat ichida faollashadi
          </p>
        </div>
      </div>
    </div>
  );
};

export default Paywall;
