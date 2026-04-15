import React from "react";
import { useNavigate } from "react-router-dom";
import {
  AlertTriangle,
  WifiOff,
  ImageOff,
  Clock,
  Home,
  RotateCcw,
  Sparkles,
} from "lucide-react";

interface ErrorViewProps {
  message: string;
  onRetry: () => void;
}

interface ParsedError {
  title: string;
  description: string;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  showUpgrade?: boolean;
  showRetry?: boolean;
}

function parseError(rawMessage: string): ParsedError {
  const lower = rawMessage.toLowerCase();

  // Try to extract structured JSON error
  let code: number | null = null;
  let status: string = "";
  try {
    const match = rawMessage.match(/\{.*\}/s);
    if (match) {
      const parsed = JSON.parse(match[0]);
      code = parsed?.error?.code ?? null;
      status = (parsed?.error?.status ?? "").toUpperCase();
    }
  } catch {
    // not JSON
  }

  // Quota / rate limit / billing exhausted
  if (
    code === 429 ||
    status === "RESOURCE_EXHAUSTED" ||
    lower.includes("quota") ||
    lower.includes("rate limit") ||
    lower.includes("credits are depleted") ||
    lower.includes("prepayment")
  ) {
    return {
      title: "Servis vaqtincha band",
      description:
        "Bepul sinov kvotasi tugagan. Cheksiz tahlil uchun Premium yoki Pro tarifga obuna bo'ling — 24 soat ichida faollashtiramiz.",
      icon: <Clock className="w-10 h-10" />,
      iconBg: "bg-amber-100",
      iconColor: "text-amber-600",
      showUpgrade: true,
      showRetry: false,
    };
  }

  // Network / offline
  if (
    lower.includes("network") ||
    lower.includes("fetch") ||
    lower.includes("internet") ||
    lower.includes("offline") ||
    lower.includes("connection")
  ) {
    return {
      title: "Internet aloqasi yo'q",
      description:
        "Serverga ulanib bo'lmadi. Iltimos, internet aloqangizni tekshiring va qayta urinib ko'ring.",
      icon: <WifiOff className="w-10 h-10" />,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      showRetry: true,
    };
  }

  // Invalid image / not a plant
  if (
    lower.includes("invalid") ||
    lower.includes("image") ||
    lower.includes("unsupported") ||
    lower.includes("rasm")
  ) {
    return {
      title: "Rasm tahlil qilinmadi",
      description:
        "Yuklangan rasmni tahlil qilib bo'lmadi. Iltimos, aniq va yorug' joyda olingan bitta barg rasmini yuklang.",
      icon: <ImageOff className="w-10 h-10" />,
      iconBg: "bg-slate-100",
      iconColor: "text-slate-600",
      showRetry: true,
    };
  }

  // Generic fallback
  return {
    title: "Nimadir xato ketdi",
    description:
      "Tahlil jarayonida texnik xatolik yuz berdi. Iltimos, bir ozdan keyin qayta urinib ko'ring.",
    icon: <AlertTriangle className="w-10 h-10" />,
    iconBg: "bg-red-100",
    iconColor: "text-red-600",
    showRetry: true,
  };
}

const TIRIKCHILIK_URL = "https://tirikchilik.uz/lazik";

const ErrorView: React.FC<ErrorViewProps> = ({ message, onRetry }) => {
  const navigate = useNavigate();
  const err = parseError(message || "");

  const goHome = () => {
    navigate("/");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goToPricing = () => {
    navigate("/");
    window.setTimeout(() => {
      const el = document.getElementById("pricing");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  return (
    <div className="max-w-2xl mx-auto py-12 px-4 pb-20">
      <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-xl shadow-slate-100/60 border border-slate-100">
        {/* Icon header */}
        <div className="relative px-8 pt-12 pb-8 text-center bg-gradient-to-b from-slate-50 to-white">
          <div
            className={`inline-flex items-center justify-center w-24 h-24 ${err.iconBg} ${err.iconColor} rounded-[2rem] shadow-sm mb-6`}
          >
            {err.icon}
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-3 font-serif tracking-tight">
            {err.title}
          </h2>
          <p className="text-slate-600 leading-relaxed max-w-md mx-auto">
            {err.description}
          </p>
        </div>

        {/* Actions */}
        <div className="px-8 pb-10 pt-2 space-y-3">
          {err.showUpgrade && (
            <>
              <a
                href={TIRIKCHILIK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full px-6 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-2xl shadow-lg shadow-emerald-200 transition-all"
              >
                <Sparkles className="w-4 h-4" />
                Premium'ga o'tish
              </a>
              <button
                onClick={goToPricing}
                className="flex items-center justify-center gap-2 w-full px-6 py-4 bg-white border-2 border-slate-200 hover:border-emerald-500 hover:text-emerald-600 text-slate-700 font-bold rounded-2xl transition-all"
              >
                Tariflarni ko'rish
              </button>
            </>
          )}

          {err.showRetry && (
            <button
              onClick={onRetry}
              className="flex items-center justify-center gap-2 w-full px-6 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-2xl shadow-lg shadow-emerald-200 transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              Qayta urinish
            </button>
          )}

          <button
            onClick={goHome}
            className="flex items-center justify-center gap-2 w-full px-6 py-4 bg-slate-50 hover:bg-slate-100 text-slate-600 font-bold rounded-2xl transition-all text-sm"
          >
            <Home className="w-4 h-4" />
            Bosh sahifaga qaytish
          </button>
        </div>

        {/* Debug details (collapsed) */}
        {message && (
          <details className="px-8 pb-6 group">
            <summary className="cursor-pointer text-xs text-slate-400 hover:text-slate-600 text-center font-medium select-none">
              Texnik tafsilotlar
            </summary>
            <pre className="mt-3 p-3 bg-slate-50 rounded-xl text-[10px] text-slate-500 overflow-x-auto break-all whitespace-pre-wrap border border-slate-100">
              {message}
            </pre>
          </details>
        )}
      </div>
    </div>
  );
};

export default ErrorView;
