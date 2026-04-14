import React, { useState } from 'react';
import { AnalysisResult, HealthStatus, RiskLevel } from '../types';
import { ShieldCheck, ShieldAlert, ArrowLeft, Printer, Share2, Activity, Leaf, Droplets, ThermometerSun, AlertTriangle, CheckCircle2, Factory, Bug, ImageOff, Camera, Check } from 'lucide-react';

interface AnalysisResultProps {
  result: AnalysisResult;
  imageUrl: string;
  onReset: () => void;
}

const AnalysisResultView: React.FC<AnalysisResultProps> = ({ result, imageUrl, onReset }) => {
  const [shareStatus, setShareStatus] = useState<'idle' | 'copied'>('idle');

  const handleShare = async () => {
    const shareText = result.status === HealthStatus.HEALTHY
      ? `Ko'rg'on AI tahlili: "${result.plant}" — sog'lom holat ✅`
      : `Ko'rg'on AI tahlili: "${result.plant}" — ${result.disease_name} (${result.confidence} ishonch)`;
    const shareData = {
      title: "Ko'rg'on AI — Tahlil natijasi",
      text: shareText,
      url: typeof window !== 'undefined' ? window.location.origin : '',
    };
    try {
      if (typeof navigator !== 'undefined' && (navigator as any).share) {
        await (navigator as any).share(shareData);
        return;
      }
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        await navigator.clipboard.writeText(`${shareText}\n${shareData.url}`);
        setShareStatus('copied');
        window.setTimeout(() => setShareStatus('idle'), 2500);
      }
    } catch {
      // User cancelled share dialog — silent
    }
  };

  const handlePrint = () => {
    if (typeof window !== 'undefined') window.print();
  };

  const isHealthy = result.status === HealthStatus.HEALTHY;
  const isNotPlant = result.status === HealthStatus.NOT_PLANT || result.plant?.toLowerCase().includes("emas") || result.plant?.toLowerCase().includes("noma");

  // Theme configuration based on health status and risk level
  const theme = isHealthy 
    ? {
        primary: 'emerald',
        bg: 'bg-emerald-50',
        text: 'text-emerald-600',
        border: 'border-emerald-200',
        gradient: 'from-emerald-400 to-teal-500',
        shadow: 'shadow-emerald-500/20',
        icon: <ShieldCheck className="w-8 h-8 text-white" />,
        badge: 'bg-emerald-500 text-white',
        statusText: "Ekingiz butunlay sog'lom!"
      }
    : result.risk_level === RiskLevel.HIGH
      ? {
          primary: 'red',
          bg: 'bg-red-50',
          text: 'text-red-600',
          border: 'border-red-200',
          gradient: 'from-red-500 to-rose-600',
          shadow: 'shadow-red-500/20',
          icon: <ShieldAlert className="w-8 h-8 text-white" />,
          badge: 'bg-red-500 text-white animate-pulse',
          statusText: "Zudlik bilan chora ko'ring!"
        }
      : {
          primary: 'amber',
          bg: 'bg-amber-50',
          text: 'text-amber-600',
          border: 'border-amber-200',
          gradient: 'from-amber-400 to-orange-500',
          shadow: 'shadow-amber-500/20',
          icon: <AlertTriangle className="w-8 h-8 text-white" />,
          badge: 'bg-amber-500 text-white',
          statusText: "Kasallik alomatlari aniqlandi"
        };

  // NOT A PLANT — show special error page early
  if (isNotPlant) {
    return (
      <div className="max-w-2xl mx-auto py-10 px-6 font-sans text-center">
        {/* Top Navbar Actions */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
          <button 
            onClick={onReset}
            className="group flex items-center gap-3 text-slate-500 hover:text-slate-900 font-bold transition-all bg-white px-5 py-3 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Ortga
          </button>
          <div className="flex w-full sm:w-auto gap-3">
            <button
              onClick={handleShare}
              className="flex-1 sm:flex-none px-5 py-3 bg-white border border-slate-200 rounded-2xl text-slate-700 font-bold text-sm shadow-sm flex items-center justify-center gap-2 hover:bg-slate-50 hover:border-emerald-300 transition-all"
            >
              {shareStatus === 'copied' ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" /> Nusxa olindi
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4" /> Ulashish
                </>
              )}
            </button>
          </div>
        </div>

        <div className="bg-white rounded-[3rem] p-12 shadow-xl border border-slate-100 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-blue-50/30 pointer-events-none"></div>

          <div className="relative z-10">
            {/* Image preview with error overlay */}
            <div className="relative w-40 h-40 mx-auto mb-8">
              <div className="absolute inset-0 rounded-full overflow-hidden border-4 border-slate-200">
                <img src={imageUrl} alt="Uploaded" className="w-full h-full object-cover opacity-40" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 bg-slate-800/80 backdrop-blur rounded-2xl flex items-center justify-center">
                  <ImageOff className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>

            <div className="mb-8">
              <span className="inline-block px-4 py-1.5 bg-slate-100 text-slate-500 rounded-full text-xs font-black uppercase tracking-widest mb-5 border border-slate-200">Tahlil Natijasi</span>
              <h1 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">O'simlik Aniqlanmadi</h1>
              <p className="text-lg text-slate-500 leading-relaxed font-medium max-w-md mx-auto">
                Yuklangan rasmda <strong className="text-slate-700">o'simlik, barg yoki ekin topilmadi</strong>. AI faqat o'simliklar rasmini tahlil qila oladi.
              </p>
            </div>

            {/* Tips */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10 text-left">
              <div className="p-5 bg-emerald-50 rounded-2xl border border-emerald-100">
                <Camera className="w-6 h-6 text-emerald-600 mb-3" />
                <p className="font-bold text-slate-800 text-sm mb-1">Barg yoki poya</p>
                <p className="text-xs text-slate-500">O'simlikning barg yoki poya qismini yaqindan surating</p>
              </div>
              <div className="p-5 bg-blue-50 rounded-2xl border border-blue-100">
                <Leaf className="w-6 h-6 text-blue-600 mb-3" />
                <p className="font-bold text-slate-800 text-sm mb-1">Yaxshi yorug'lik</p>
                <p className="text-xs text-slate-500">Yorug' joyda, aniq va fokusda bo'lgan rasmdan foydalaning</p>
              </div>
              <div className="p-5 bg-amber-50 rounded-2xl border border-amber-100">
                <CheckCircle2 className="w-6 h-6 text-amber-600 mb-3" />
                <p className="font-bold text-slate-800 text-sm mb-1">Bitta o'simlik</p>
                <p className="text-xs text-slate-500">Rasmda faqat bitta o'simlik barg yoki qismi ko'rinishi kerak</p>
              </div>
            </div>

            <button
              onClick={onReset}
              className="w-full sm:w-auto px-10 py-5 bg-emerald-600 text-white font-black rounded-2xl shadow-lg shadow-emerald-200 hover:bg-emerald-700 hover:-translate-y-0.5 transition-all text-sm"
            >
              Qaytadan Yuklash
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-12 px-6 font-sans pb-24">
      
      {/* Top Navbar Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
        <button 
          onClick={onReset}
          className="group flex items-center gap-3 text-slate-500 hover:text-slate-900 font-bold transition-all bg-white px-5 py-3 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Yangi diagnostika
        </button>
        <div className="flex w-full sm:w-auto gap-3">
          <button
            onClick={handlePrint}
            className="flex-1 sm:flex-none px-5 py-3 bg-white border border-slate-200 rounded-2xl text-slate-700 font-bold text-sm shadow-sm flex items-center justify-center gap-2 hover:bg-slate-50 hover:border-emerald-300 transition-all"
          >
            <Printer className="w-4 h-4" /> Chop etish
          </button>
          <button
            onClick={handleShare}
            className="flex-1 sm:flex-none px-5 py-3 bg-white border border-slate-200 rounded-2xl text-slate-700 font-bold text-sm shadow-sm flex items-center justify-center gap-2 hover:bg-slate-50 hover:border-emerald-300 transition-all"
          >
            {shareStatus === 'copied' ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" /> Nusxa olindi
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4" /> Ulashish
              </>
            )}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column - Image & Confidence */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Main Image Card */}
          <div className="bg-white p-4 rounded-[3rem] shadow-2xl flex-shrink-0 shadow-slate-200/50 border border-slate-100 overflow-hidden relative group">
            <div className="relative rounded-[2.5rem] overflow-hidden aspect-[4/5]">
               <img src={imageUrl} alt="Analysis Result" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
               <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent"></div>
               
               {/* Badges on Image */}
               <div className="absolute top-6 left-6">
                 <div className={`px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-widest shadow-xl backdrop-blur-md flex items-center gap-2 ${theme.badge}`}>
                   {theme.icon}
                   <span className="hidden xl:inline">{theme.statusText}</span>
                 </div>
               </div>
               
               <div className="absolute bottom-6 left-6 right-6">
                 <h2 className="text-3xl font-black text-white font-serif tracking-tight drop-shadow-md mb-1">{result.plant}</h2>
                 <p className="text-white/80 font-medium flex items-center gap-2">
                   {isHealthy ? <CheckCircle2 className="w-4 h-4" /> : <Bug className="w-4 h-4" />}
                   {isHealthy ? 'Sog\'lom holat' : result.disease_name}
                 </p>
               </div>
            </div>
          </div>

          {/* AI Confidence Card */}
          <div className={`p-8 rounded-[2.5rem] border ${theme.bg} ${theme.border} relative overflow-hidden`}>
             <div className={`absolute top-0 right-0 w-32 h-32 bg-${theme.primary}-500/10 rounded-full blur-3xl`}></div>
             
             <div className="flex justify-between items-end mb-6 relative z-10">
               <div>
                 <div className="flex items-center gap-2 mb-2">
                   <Activity className={`w-5 h-5 ${theme.text}`} />
                   <h4 className={`text-xs font-black ${theme.text} uppercase tracking-widest`}>AI Ishonchi</h4>
                 </div>
                 <p className="text-4xl md:text-5xl font-black text-slate-900 font-serif tracking-tighter">
                   {result.confidence}
                 </p>
               </div>
               <div className="text-right">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Xavf darajasi</p>
                  {isHealthy ? (
                     <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-700 font-black rounded-lg text-sm border border-emerald-200">XAVFSIZ</span>
                  ) : (
                     <span className={`inline-block px-3 py-1 font-black rounded-lg text-sm border uppercase ${result.risk_level === RiskLevel.HIGH ? 'bg-red-100 text-red-700 border-red-200 animate-pulse' : 'bg-amber-100 text-amber-700 border-amber-200'}`}>
                       {result.risk_level === 'High' ? 'YUQORI XAVF' : 'O\'RTACHA'}
                     </span>
                  )}
               </div>
             </div>
             
             {/* Progress Bar styled by theme */}
             <div className="w-full bg-white/50 h-3 rounded-full overflow-hidden relative z-10 p-0.5 border border-white shadow-inner">
               <div className={`bg-gradient-to-r ${theme.gradient} h-full rounded-full transition-all duration-1000 ease-out shadow-sm`} style={{ width: result.confidence }}></div>
             </div>
             
             {/* Dynamic message based on confidence & health */}
             {!isHealthy && parseInt(result.confidence) > 85 && (
               <p className={`mt-5 text-xs font-bold ${theme.text} flex gap-2 items-start opacity-90`}>
                 <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" /> 
                 Monitoringga ko'ra, xavf aniqlik darajasi juda yuqori. O'simlikni saqlab qolish uchun zudlik bilan profilaktikani boshlang!
               </p>
             )}
          </div>
        </div>

        {/* Right Column - Details & Recommendations */}
        <div className="lg:col-span-8 space-y-8 flex flex-col h-full">
          
          <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-slate-100 flex-grow relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 p-10 opacity-[0.02] pointer-events-none">
              <Leaf className="w-64 h-64" />
            </div>

            {isHealthy ? (
              // HEALTHY STATE LAYOUT
              <div className="h-full flex flex-col justify-center text-center max-w-lg mx-auto py-10">
                <div className="w-24 h-24 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner ring-8 ring-emerald-50">
                  <ShieldCheck className="w-12 h-12" />
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 font-serif">Ajoyib natija!</h2>
                <p className="text-lg text-slate-500 leading-relaxed mb-10 font-medium">
                  Ekingiz butunlay sog'lom va me'yorda rivojlanmoqda. Hozirgi kunda hech qanday kasallik yoki zararkunanda alomatlari topilmadi.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100 text-left hover:bg-emerald-50 hover:border-emerald-100 transition-colors group cursor-default">
                     <ThermometerSun className="w-8 h-8 text-emerald-500 mb-4 group-hover:scale-110 transition-transform" />
                     <p className="font-black text-slate-800 text-lg mb-1">Ozuqa & Namlik</p>
                     <p className="text-sm text-slate-500 font-medium">Hozirgi optimal rejimni saqlab qoling.</p>
                  </div>
                  <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100 text-left hover:bg-emerald-50 hover:border-emerald-100 transition-colors group cursor-default">
                     <Factory className="w-8 h-8 text-emerald-500 mb-4 group-hover:scale-110 transition-transform" />
                     <p className="font-black text-slate-800 text-lg mb-1">Profilaktika</p>
                     <p className="text-sm text-slate-500 font-medium">Odatdagi haftalik monitoringda davom eting.</p>
                  </div>
                </div>
              </div>
            ) : (
              // UNHEALTHY / DISEASE STATE LAYOUT
              <>
                <div className="mb-12 relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
                  <div>
                    <span className={`inline-block px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-4 bg-slate-100 text-slate-500 border border-slate-200`}>A.I Diagnostika Hisoboti</span>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-3 tracking-tight font-serif leading-none">{result.disease_name}</h1>
                    <p className="text-lg text-slate-500 font-medium max-w-lg">Ushbu holat ekinlar hosildorligiga jiddiy xavf solishi mumkin, e'tibor qarating.</p>
                  </div>
                </div>

                <div className="space-y-12 relative z-10">
                  
                  {/* Symptoms Section */}
                  <section>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center font-black shadow-sm">
                        <AlertTriangle className="w-6 h-6" />
                      </div>
                      <h3 className="text-2xl font-black text-slate-800 tracking-tight font-serif">Asosiy belgilar</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {result.symptoms.map((s, i) => (
                        <div key={i} className="flex gap-4 p-5 bg-slate-50/80 rounded-2xl text-slate-700 text-sm font-semibold border border-transparent hover:border-amber-200 hover:bg-white transition-all shadow-sm">
                          <span className="text-amber-500 mt-0.5 shrink-0 w-2 h-2 rounded-full bg-amber-500"></span> 
                          <span className="leading-snug">{s}</span>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* Treatment Section */}
                  <section>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center font-black shadow-sm">
                         <Droplets className="w-6 h-6" />
                      </div>
                      <h3 className="text-2xl font-black text-slate-800 tracking-tight font-serif">Muolaja va Davolash</h3>
                    </div>
                    <div className="space-y-4">
                      {result.treatment.map((t, i) => (
                        <div key={i} className="flex items-start gap-5 p-6 border border-emerald-100 bg-emerald-50/50 rounded-[1.5rem] shadow-sm hover:shadow-md transition-all">
                          <div className="w-8 h-8 rounded-full bg-emerald-200 text-emerald-800 flex items-center justify-center font-black text-sm shrink-0 shadow-inner">
                            {i+1}
                          </div>
                          <p className="text-slate-800 leading-relaxed font-semibold mt-1">{t}</p>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* Prevention Section */}
                  <section className="pt-10 border-t border-slate-100">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center font-black shadow-sm">
                        <ShieldCheck className="w-6 h-6" />
                      </div>
                      <h3 className="text-2xl font-black text-slate-800 tracking-tight font-serif">Kelajakda oldini olish</h3>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {result.prevention.map((p, i) => (
                        <div key={i} className="bg-blue-50/50 px-5 py-3.5 rounded-2xl text-sm font-bold text-blue-800 border border-blue-100/50 hover:bg-blue-50 transition-colors">
                          {p}
                        </div>
                      ))}
                    </div>
                  </section>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisResultView;
