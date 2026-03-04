import React, { useState, useEffect } from 'react';
import { RiskLevel } from '../types';
import { MapContainer, TileLayer, CircleMarker, Popup, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Activity, ShieldAlert, ShieldCheck, TrendingUp, MapPin, AlertTriangle, CloudRain, Sun } from 'lucide-react';

const UZ_REGIONS = [
  { id: 'uz-qr', name: 'Qoraqalpogʻiston', risk: RiskLevel.LOW, count: 24, main: 'Shoʻrlanish', lat: 43.5, lng: 59.0, trend: 'stable' },
  { id: 'uz-kh', name: 'Xorazm', risk: RiskLevel.MEDIUM, count: 42, main: 'Shira', lat: 41.5, lng: 60.5, trend: 'up' },
  { id: 'uz-nw', name: 'Navoiy', risk: RiskLevel.LOW, count: 18, main: 'Qurgʻoqchilik', lat: 42.0, lng: 64.0, trend: 'down' },
  { id: 'uz-bu', name: 'Buxoro', risk: RiskLevel.LOW, count: 31, main: 'Pomidor kuyishi', lat: 40.0, lng: 63.5, trend: 'stable' },
  { id: 'uz-qa', name: 'Qashqadaryo', risk: RiskLevel.HIGH, count: 115, main: 'Paxta vilti', lat: 38.8, lng: 66.0, trend: 'up' },
  { id: 'uz-su', name: 'Surxondaryo', risk: RiskLevel.MEDIUM, count: 67, main: 'Termitlar', lat: 38.0, lng: 67.5, trend: 'up' },
  { id: 'uz-sa', name: 'Samarqand', risk: RiskLevel.HIGH, count: 89, main: 'Olma parshasi', lat: 39.7, lng: 66.8, trend: 'down' },
  { id: 'uz-ji', name: 'Jizzax', risk: RiskLevel.MEDIUM, count: 45, main: 'Chigirtka', lat: 40.2, lng: 67.8, trend: 'stable' },
  { id: 'uz-si', name: 'Sirdaryo', risk: RiskLevel.LOW, count: 12, main: 'Sogʻlom', lat: 40.5, lng: 68.7, trend: 'down' },
  { id: 'uz-to', name: 'Toshkent', risk: RiskLevel.LOW, count: 28, main: 'Issiqxona shirasi', lat: 41.2, lng: 69.8, trend: 'stable' },
  { id: 'uz-na', name: 'Namangan', risk: RiskLevel.HIGH, count: 94, main: 'Zang', lat: 41.0, lng: 71.5, trend: 'up' },
  { id: 'uz-fa', name: 'Fargʻona', risk: RiskLevel.MEDIUM, count: 72, main: 'Meva qurti', lat: 40.4, lng: 71.6, trend: 'down' },
  { id: 'uz-an', name: 'Andijon', risk: RiskLevel.HIGH, count: 108, main: 'Bakterial kuyish', lat: 40.8, lng: 72.3, trend: 'up' }
];

const GreenMap: React.FC = () => {
  const [isClient, setIsClient] = useState(false);
  const [activeTab, setActiveTab] = useState('umumiy');

  useEffect(() => {
    setIsClient(true);
  }, []);

  const getRiskColor = (risk: RiskLevel) => {
    switch (risk) {
      case RiskLevel.HIGH: return '#ef4444';
      case RiskLevel.MEDIUM: return '#f59e0b';
      case RiskLevel.LOW: return '#10b981';
      default: return '#64748b';
    }
  };

  const getRiskBgClass = (risk: RiskLevel) => {
    switch (risk) {
      case RiskLevel.HIGH: return 'bg-red-50 text-red-600 border-red-200';
      case RiskLevel.MEDIUM: return 'bg-amber-50 text-amber-600 border-amber-200';
      case RiskLevel.LOW: return 'bg-emerald-50 text-emerald-600 border-emerald-200';
      default: return 'bg-slate-50 text-slate-600 border-slate-200';
    }
  };

  const sortedRegions = [...UZ_REGIONS].sort((a,b) => b.count - a.count);

  return (
    <div className="max-w-7xl mx-auto py-12 px-6 pb-24 font-sans">
      
      {/* Header Section Matches Database & Landing Style */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-12">
        <div className="max-w-xl">
          <div className="flex items-center gap-2 mb-3">
             <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></span>
             <span className="text-emerald-600 font-bold uppercase tracking-[0.3em] text-[10px]">Jonli Monitoring 24/7</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-black text-slate-900 leading-none tracking-tight">
            Yashil <span className="text-emerald-600">Xarita</span>
          </h2>
          <p className="text-slate-500 mt-6 text-lg font-medium leading-relaxed">
            Sun'iy yo'ldosh va AI tahlillari asosida shakllanuvchi Oʻzbekiston florasi va ekinlar kasalliklari xaritasi.
          </p>
        </div>

        {/* Legend / Stats (Light Style) */}
        <div className="flex bg-white p-2 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/40">
           <div className="flex px-5 py-4 gap-4 items-center border-r border-slate-100 pr-8">
              <ShieldAlert className="w-8 h-8 text-red-400" />
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">Xavfli</p>
                <p className="text-slate-900 font-black text-lg leading-none">{UZ_REGIONS.filter(r => r.risk === RiskLevel.HIGH).length} ta hudud</p>
              </div>
           </div>
           <div className="flex px-8 py-4 gap-4 items-center">
              <ShieldCheck className="w-8 h-8 text-emerald-400" />
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">Xavfsiz / Barqaror</p>
                <p className="text-slate-900 font-black text-lg leading-none">{UZ_REGIONS.filter(r => r.risk === RiskLevel.LOW).length} ta hudud</p>
              </div>
           </div>
        </div>
      </div>

      {/* Navigation Tabs (Style matches Database) */}
      <div className="flex gap-4 mb-10 overflow-x-auto pb-4 custom-scrollbar">
         {['umumiy', 'kasalliklar', 'iqlim'].map(tab => (
           <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-8 py-3 rounded-2xl font-black text-sm capitalize transition-all whitespace-nowrap flex items-center gap-2 ${
              activeTab === tab ? 'bg-slate-900 text-white shadow-xl shadow-slate-200' : 'bg-white text-slate-500 border border-slate-100 hover:bg-slate-50'
            }`}
           >
             {tab === 'umumiy' && <MapPin className="w-4 h-4" />}
             {tab === 'kasalliklar' && <Activity className="w-4 h-4" />}
             {tab === 'iqlim' && <Sun className="w-4 h-4" />}
             {tab}
           </button>
         ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 xl:h-[700px]">
        
        {/* Main Map Container */}
        <div className="xl:col-span-2 flex flex-col h-[600px] xl:h-full">
          <div className="bg-white rounded-[3rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-slate-100 overflow-hidden relative group h-full">
            {/* Overlay Panel */}
            <div className="absolute top-6 left-6 z-10 bg-white/90 backdrop-blur-md px-6 py-4 rounded-2xl shadow-lg border border-white flex flex-col gap-3 pointer-events-none">
              <h3 className="text-sm font-black text-slate-800 font-serif mb-1">Xavf Darajalari</h3>
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]"></span>
                <span className="text-xs font-bold text-slate-600 uppercase">Yuqori Xavf</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]"></span>
                <span className="text-xs font-bold text-slate-600 uppercase">O'rtacha</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></span>
                <span className="text-xs font-bold text-slate-600 uppercase">Past / Xavfsiz</span>
              </div>
            </div>

            {isClient && (
              <MapContainer 
                center={[41.3775, 64.5853]} 
                zoom={6} 
                scrollWheelZoom={false} 
                style={{ height: '100%', width: '100%', background: '#f8fafc' }}
                className="z-0"
              >
                <TileLayer
                  url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                  attribution='&copy; OpenStreetMap'
                />
                {UZ_REGIONS.map((reg) => (
                  <CircleMarker 
                    key={reg.id}
                    center={[reg.lat, reg.lng]}
                    pathOptions={{ 
                      color: getRiskColor(reg.risk), 
                      fillColor: getRiskColor(reg.risk), 
                      fillOpacity: 0.6,
                      weight: 3
                    }}
                    radius={reg.risk === RiskLevel.HIGH ? 22 : reg.risk === RiskLevel.MEDIUM ? 16 : 12}
                  >
                    <Popup className="custom-popup rounded-2xl overflow-hidden border-0 shadow-2xl pb-0">
                      <div className="min-w-[220px]">
                        {/* Top Header of Popup */}
                        <div className={`p-4 ${
                          reg.risk === RiskLevel.HIGH ? 'bg-red-500' : 
                          reg.risk === RiskLevel.MEDIUM ? 'bg-amber-500' : 'bg-emerald-500'
                        }`}>
                           <h3 className="font-black text-lg text-white font-serif tracking-tight m-0">{reg.name}</h3>
                        </div>
                        {/* Body of Popup */}
                        <div className="p-4 bg-white">
                          <div className={`inline-block px-2 py-1 rounded text-[10px] font-black uppercase tracking-wider mb-4 border ${getRiskBgClass(reg.risk)}`}>
                            {reg.risk} Xavf
                          </div>
                          <div className="space-y-3 font-sans">
                            <div className="flex justify-between items-center border-b border-slate-50 pb-2">
                              <span className="text-slate-400 text-xs font-bold uppercase">Asosiy muammo:</span> 
                              <span className="font-bold text-slate-800 text-sm">{reg.main}</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-slate-400 text-xs font-bold uppercase">Qayd etilgan holat:</span> 
                              <span className="font-black text-rose-500 font-mono text-base">{reg.count}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Popup>
                    <Tooltip direction="top" offset={[0, -15]} opacity={1} className="!bg-slate-900 !text-white !border-0 !rounded-lg !px-3 !py-1 !font-bold !text-xs !font-sans">
                      {reg.name}
                    </Tooltip>
                  </CircleMarker>
                ))}
              </MapContainer>
            )}
          </div>
        </div>

        {/* Sidebar Data & Insights */}
        <div className="xl:col-span-1 space-y-6 flex flex-col h-auto xl:h-[700px]">
           
           {/* Hotspots Card */}
           <div className="bg-white rounded-[3rem] p-8 border border-slate-100 shadow-xl flex-grow overflow-hidden flex flex-col">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-red-50 rounded-2xl text-red-500">
                   <AlertTriangle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-black font-serif text-slate-900 tracking-tight">Qizil Hududlar</h3>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Top 5 kasallik o'choqlari</p>
                </div>
              </div>

              <div className="space-y-3 flex-grow overflow-y-auto pr-2 custom-scrollbar">
                 {sortedRegions.slice(0, 5).map((reg, i) => (
                   <div key={i} className="group flex items-center justify-between p-4 bg-slate-50 hover:bg-emerald-50 rounded-2xl border border-transparent hover:border-emerald-100 transition-all cursor-pointer">
                      <div className="flex items-center gap-4">
                         <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center font-black text-slate-300 group-hover:text-emerald-500 group-hover:shadow-md transition-all">
                           0{i+1}
                         </div>
                         <div>
                            <p className="font-black text-slate-800 text-[15px] font-sans mb-0.5 group-hover:text-emerald-900 transition-colors">{reg.name}</p>
                            <p className="text-[10px] text-slate-500 font-bold uppercase flex items-center gap-1">
                              {reg.trend === 'up' ? <TrendingUp className="w-3 h-3 text-red-400" /> : <TrendingUp className="w-3 h-3 text-emerald-400 rotate-180" />}
                              {reg.main}
                            </p>
                         </div>
                      </div>
                      <div className={`px-4 py-2 rounded-xl border font-black text-sm font-mono shadow-sm ${getRiskBgClass(reg.risk)}`}>
                        {reg.count}
                      </div>
                   </div>
                 ))}
              </div>
           </div>

           {/* AI Insights Card - Light Styled to match Database UI */}
           <div className="bg-emerald-50 border border-emerald-100/60 rounded-[3rem] p-8 text-slate-900 shadow-xl relative overflow-hidden group shrink-0">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-200/40 rounded-full blur-[40px] group-hover:scale-150 transition-transform duration-700"></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                    <CloudRain className="w-4 h-4" />
                  </span>
                  <span className="text-xs font-black uppercase tracking-widest text-emerald-600">AI Prognoz • Mart 2026</span>
                </div>
                <h3 className="text-2xl font-black mb-3 font-serif tracking-tight">Kutilyotgan o'zgarishlar</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-8 font-sans font-medium">
                  Kelasi oyda Farg'ona vodiysida havo namligi oshishi sababli "Zang" kasalligi tarqalish xavfi <strong className="text-emerald-700 font-black bg-emerald-200/50 px-1.5 rounded">30% ga</strong> ortishi kutilmoqda. 
                  Yengil targ'ibot va dori purkash tavsiya etiladi.
                </p>
                
                <button className="w-full py-4 bg-white text-emerald-700 hover:bg-emerald-600 hover:text-white border border-emerald-200 hover:border-emerald-600 font-black rounded-2xl text-sm transition-all duration-300 shadow-sm hover:shadow-lg">
                  Batafsil hisobot &rarr;
                </button>
              </div>
           </div>

        </div>
      </div>
    </div>
  );
};

export default GreenMap;
