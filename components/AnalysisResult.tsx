
import React from 'react';
import { AnalysisResult, HealthStatus, RiskLevel } from '../types';

interface AnalysisResultProps {
  result: AnalysisResult;
  imageUrl: string;
  onReset: () => void;
}

const AnalysisResultView: React.FC<AnalysisResultProps> = ({ result, imageUrl, onReset }) => {
  const isHealthy = result.status === HealthStatus.HEALTHY;
  const confidenceValue = parseInt(result.confidence);

  return (
    <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-12">
        <button 
          onClick={onReset}
          className="group flex items-center gap-3 text-slate-500 hover:text-emerald-600 font-bold transition-all"
        >
          <div className="w-10 h-10 bg-white border border-slate-200 rounded-xl flex items-center justify-center group-hover:border-emerald-200 group-hover:bg-emerald-50 transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </div>
          Yangi tahlilga qaytish
        </button>
        <div className="flex gap-3">
          <button className="px-5 py-3 bg-white border border-slate-200 rounded-2xl text-slate-700 font-bold text-xs shadow-sm flex items-center gap-2 hover:bg-slate-50 transition-all">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
            Ulashish
          </button>
          <button className="px-5 py-3 bg-slate-900 text-white rounded-2xl font-bold text-xs shadow-xl flex items-center gap-2 hover:bg-slate-800 transition-all">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
            Tahlilni PDF yuklash
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-5 rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden relative group">
            <img src={imageUrl} alt="Analysis" className="w-full h-auto aspect-square object-cover rounded-[2rem] group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute top-10 left-10">
              <div className={`px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest shadow-2xl backdrop-blur-md ${
                isHealthy ? 'bg-emerald-500/90 text-white' : 'bg-red-500/90 text-white'
              }`}>
                {isHealthy ? '✅ Sog\'lom' : '⚠️ Kasallangan'}
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl">
             <div className="flex justify-between items-center mb-6">
               <div>
                 <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">AI Ishonchi</h4>
                 <p className="text-2xl font-black text-emerald-600">{result.confidence}</p>
               </div>
               <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center">
                 <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
               </div>
             </div>
             <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
               <div className="bg-gradient-to-r from-emerald-400 to-emerald-600 h-full transition-all duration-1000" style={{ width: result.confidence }}></div>
             </div>
             <p className="mt-4 text-[10px] text-slate-400 font-bold uppercase text-center italic tracking-wider font-serif">Ko'rg'on Intelligence Engine v2.4</p>
          </div>

          {!isHealthy && (
            <div className={`p-8 rounded-[2.5rem] border-2 shadow-xl animate-pulse ${
              result.risk_level === RiskLevel.HIGH ? 'bg-red-50 border-red-100' : 'bg-orange-50 border-orange-100'
            }`}>
              <h4 className="text-xs font-black uppercase text-slate-500 mb-2">Xavf darajasi</h4>
              <div className="flex items-center gap-5">
                <span className={`text-4xl font-black ${
                  result.risk_level === RiskLevel.HIGH ? 'text-red-600' : 'text-orange-600'
                }`}>{result.risk_level === 'High' ? 'YUQORI' : 'O\'RTACHA'}</span>
                <div className="flex gap-1.5">
                  {[1,2,3].map(i => (
                    <div key={i} className={`w-3 h-10 rounded-full ${
                      (result.risk_level === RiskLevel.HIGH) || (result.risk_level === RiskLevel.MEDIUM && i <= 2) || (result.risk_level === RiskLevel.LOW && i === 1)
                      ? (result.risk_level === RiskLevel.HIGH ? 'bg-red-500' : 'bg-orange-500') : 'bg-slate-200'
                    }`}></div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="lg:col-span-8 space-y-8">
          <div className="bg-white rounded-[3rem] p-10 shadow-2xl border border-slate-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-10 opacity-[0.03] pointer-events-none">
              <svg className="w-64 h-64" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z"/></svg>
            </div>

            <div className="mb-12">
              <span className="text-emerald-600 font-bold uppercase tracking-[0.4em] text-[10px] mb-3 block">Agro-Diagnostika Hisoboti</span>
              <h1 className="text-6xl font-black text-slate-900 mb-2 tracking-tight">{result.plant}</h1>
              <p className="text-3xl font-bold text-slate-400">{isHealthy ? "Sog'lom rivojlanish" : result.disease_name}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
              <section>
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center font-black text-xl shadow-sm">01</div>
                  <h3 className="text-2xl font-black text-slate-800 tracking-tight">Ko'rinadigan belgilar</h3>
                </div>
                <ul className="space-y-4">
                  {result.symptoms.map((s, i) => (
                    <li key={i} className="flex gap-4 p-5 bg-slate-50/80 backdrop-blur rounded-2xl text-slate-600 text-sm font-semibold leading-relaxed border border-slate-100 hover:border-emerald-200 transition-all">
                      <span className="text-emerald-500 bg-emerald-100 w-6 h-6 flex items-center justify-center rounded-full text-[10px] shrink-0">✓</span> {s}
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center font-black text-xl shadow-sm">02</div>
                  <h3 className="text-2xl font-black text-slate-800 tracking-tight">Tavsiya etilgan muolaja</h3>
                </div>
                <div className="space-y-4">
                  {result.treatment.map((t, i) => (
                    <div key={i} className="p-6 border-2 border-slate-50 bg-white rounded-3xl hover:border-emerald-200 hover:bg-emerald-50/30 transition-all shadow-sm">
                      <p className="text-sm text-slate-700 leading-relaxed font-medium">"{t}"</p>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            <section className="mt-12 pt-12 border-t border-slate-100">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center font-black text-xl shadow-sm">03</div>
                <h3 className="text-2xl font-black text-slate-800 tracking-tight">Profilaktika rejasini tuzish</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {result.prevention.map((p, i) => (
                  <div key={i} className="bg-blue-50/40 p-5 rounded-[2rem] text-xs font-bold text-blue-800 border border-blue-100/50 hover:bg-blue-50 transition-all">
                    {p}
                  </div>
                ))}
              </div>
            </section>
          </div>
          
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-[3rem] p-10 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-emerald-600/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="text-center md:text-left relative z-10">
              <h4 className="text-2xl font-black mb-2">Ekspert agronom yordami</h4>
              <p className="text-slate-400 font-medium">Diagnostika natijalari bo'yicha onlayn maslahat oling.</p>
            </div>
            <button className="px-10 py-5 bg-emerald-600 text-white font-black rounded-2xl shadow-xl shadow-emerald-500/20 hover:bg-emerald-500 hover:-translate-y-1 transition-all text-sm relative z-10">
              Mutaxassis bilan bog'lanish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisResultView;
