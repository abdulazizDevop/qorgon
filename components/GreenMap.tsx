
import React, { useState, useEffect } from 'react';
import { RiskLevel } from '../types';
import { MapContainer, TileLayer, Marker, Popup, CircleMarker, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const UZ_REGIONS = [
  { id: 'uz-qr', name: 'Qoraqalpogʻiston', risk: RiskLevel.LOW, count: 24, main: 'Shoʻrlanish', lat: 43.5, lng: 59.0 },
  { id: 'uz-kh', name: 'Xorazm', risk: RiskLevel.MEDIUM, count: 42, main: 'Shira', lat: 41.5, lng: 60.5 },
  { id: 'uz-nw', name: 'Navoiy', risk: RiskLevel.LOW, count: 18, main: 'Qurgʻoqchilik', lat: 42.0, lng: 64.0 },
  { id: 'uz-bu', name: 'Buxoro', risk: RiskLevel.LOW, count: 31, main: 'Pomidor kuyishi', lat: 40.0, lng: 63.5 },
  { id: 'uz-qa', name: 'Qashqadaryo', risk: RiskLevel.HIGH, count: 115, main: 'Paxta vilti', lat: 38.8, lng: 66.0 },
  { id: 'uz-su', name: 'Surxondaryo', risk: RiskLevel.MEDIUM, count: 67, main: 'Termitlar', lat: 38.0, lng: 67.5 },
  { id: 'uz-sa', name: 'Samarqand', risk: RiskLevel.HIGH, count: 89, main: 'Olma parshasi', lat: 39.7, lng: 66.8 },
  { id: 'uz-ji', name: 'Jizzax', risk: RiskLevel.MEDIUM, count: 45, main: 'Chigirtka', lat: 40.2, lng: 67.8 },
  { id: 'uz-si', name: 'Sirdaryo', risk: RiskLevel.LOW, count: 12, main: 'Sogʻlom', lat: 40.5, lng: 68.7 },
  { id: 'uz-to', name: 'Toshkent', risk: RiskLevel.LOW, count: 28, main: 'Issiqxona shirasi', lat: 41.2, lng: 69.8 },
  { id: 'uz-na', name: 'Namangan', risk: RiskLevel.HIGH, count: 94, main: 'Zang', lat: 41.0, lng: 71.5 },
  { id: 'uz-fa', name: 'Fargʻona', risk: RiskLevel.MEDIUM, count: 72, main: 'Meva qurti', lat: 40.4, lng: 71.6 },
  { id: 'uz-an', name: 'Andijon', risk: RiskLevel.HIGH, count: 108, main: 'Bakterial kuyish', lat: 40.8, lng: 72.3 }
];

const GreenMap: React.FC = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const getRiskColor = (risk: RiskLevel) => {
    switch (risk) {
      case RiskLevel.HIGH: return '#ef4444'; // red-500
      case RiskLevel.MEDIUM: return '#f97316'; // orange-500
      case RiskLevel.LOW: return '#10b981'; // emerald-500
      default: return '#64748b';
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-6">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12">
        <div>
          <div className="flex items-center gap-2 mb-3">
             <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></span>
             <span className="text-emerald-600 font-bold uppercase tracking-widest text-xs font-sans">Jonli Monitoring</span>
          </div>
          <h2 className="text-5xl font-black text-slate-900 leading-tight font-serif">Ko'rg'on <span className="text-emerald-600">Radar</span> 24/7</h2>
          <p className="text-slate-500 mt-4 max-w-xl text-lg font-medium font-sans">Oʻzbekiston boʻylab oʻsimliklar salomatligi va iqlimiy xavflar xaritasi. Sunʻiy yoʻldosh va AI maʻlumotlari asosida.</p>
        </div>
        <div className="flex gap-4 mt-6 md:mt-0">
           <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span className="text-xs font-bold text-slate-600 uppercase font-sans">Xavfli</span>
           </div>
           <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
              <span className="text-xs font-bold text-slate-600 uppercase font-sans">Xavfsiz</span>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 bg-white rounded-[3rem] shadow-2xl overflow-hidden min-h-[600px] border-8 border-white relative z-0">
          {isClient && (
            <MapContainer 
              center={[41.3775, 64.5853]} 
              zoom={6} 
              scrollWheelZoom={false} 
              style={{ height: '100%', width: '100%', borderRadius: '2.5rem' }}
              className="z-0"
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {UZ_REGIONS.map((reg) => (
                <CircleMarker 
                  key={reg.id}
                  center={[reg.lat, reg.lng]}
                  pathOptions={{ 
                    color: getRiskColor(reg.risk), 
                    fillColor: getRiskColor(reg.risk), 
                    fillOpacity: 0.7,
                    weight: 2
                  }}
                  radius={15}
                >
                  <Popup className="custom-popup">
                    <div className="p-2">
                      <h3 className="font-bold text-lg font-serif mb-1">{reg.name}</h3>
                      <div className={`text-xs font-bold uppercase mb-2 ${
                        reg.risk === RiskLevel.HIGH ? 'text-red-600' : 
                        reg.risk === RiskLevel.MEDIUM ? 'text-orange-600' : 'text-emerald-600'
                      }`}>
                        {reg.risk} Xavf
                      </div>
                      <div className="space-y-1 text-sm font-sans">
                        <p><span className="text-slate-500">Muammo:</span> <span className="font-medium">{reg.main}</span></p>
                        <p><span className="text-slate-500">Holatlar:</span> <span className="font-medium">{reg.count}</span></p>
                      </div>
                    </div>
                  </Popup>
                  <Tooltip direction="top" offset={[0, -10]} opacity={1} permanent={false}>
                    <span className="font-bold font-sans">{reg.name}</span>
                  </Tooltip>
                </CircleMarker>
              ))}
            </MapContainer>
          )}
        </div>

        <div className="lg:col-span-4 space-y-6">
           <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-xl">
              <h3 className="text-xl font-black mb-6 font-serif">Mintaqalar Reytingi</h3>
              <div className="space-y-4">
                 {UZ_REGIONS.sort((a,b) => b.count - a.count).slice(0, 5).map((reg, i) => (
                   <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-transparent hover:border-emerald-200 transition-all cursor-pointer group">
                      <div className="flex items-center gap-4">
                         <span className="font-black text-slate-300 text-lg font-serif group-hover:text-emerald-400 transition-colors">0{i+1}</span>
                         <div>
                            <p className="font-bold text-slate-800 text-sm font-sans">{reg.name}</p>
                            <p className="text-[10px] text-slate-400 font-bold uppercase font-sans">{reg.main}</p>
                         </div>
                      </div>
                      <span className={`font-black text-sm font-mono ${reg.risk === RiskLevel.HIGH ? 'text-red-500' : 'text-emerald-600'}`}>{reg.count}</span>
                   </div>
                 ))}
              </div>
           </div>

           <div className="bg-emerald-700 rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden group">
              <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
              <h3 className="text-xl font-black mb-2 font-serif">Prognoz: Iyun</h3>
              <p className="text-emerald-100 text-sm leading-relaxed mb-6 font-sans font-light">Kelasi oyda vodiy viloyatlarida havo namligi oshishi sababli "Zang" kasalligi xavfi 30% ga ortadi.</p>
              <button className="px-6 py-3 bg-white text-emerald-800 font-bold rounded-xl text-xs hover:bg-emerald-50 transition-colors font-sans tracking-wide">Batafsil ko'rish</button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default GreenMap;
