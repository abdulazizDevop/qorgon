
import React, { useState, useRef } from 'react';

interface UploadZoneProps {
  onImageSelected: (base64: string) => void;
}

const UploadZone: React.FC<UploadZoneProps> = ({ onImageSelected }) => {
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (files: FileList) => {
    if (files.length === 0) return;
    const file = files[0];
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert("Iltimos, faqat rasm yuklang.");
      return;
    }

    // Validate size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("Rasm hajmi juda katta (maks 5MB).");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = e.target?.result as string;
      const cleanBase64 = base64.split(',')[1];
      onImageSelected(cleanBase64);
    };
    reader.readAsDataURL(file);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-slate-800 mb-4">O'simlik rasmini yuklang</h2>
        <p className="text-slate-500">Bargning yaqindan olingan, tiniq rasmini tanlang.</p>
      </div>

      <div 
        className={`relative border-2 border-dashed rounded-3xl p-12 text-center transition-all ${
          dragActive ? 'border-emerald-500 bg-emerald-50' : 'border-slate-300 bg-white hover:border-emerald-400 hover:bg-slate-50'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input 
          ref={inputRef}
          type="file" 
          accept="image/*" 
          className="hidden" 
          onChange={handleChange}
        />
        
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-slate-700 mb-2">Rasmni bu yerga tashlang</h3>
          <p className="text-slate-400 mb-8">yoki</p>
          <div className="flex flex-wrap justify-center gap-4">
            <button 
              onClick={() => inputRef.current?.click()}
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-all shadow-md"
            >
              Faylni tanlash
            </button>
            <button 
              onClick={() => inputRef.current?.click()}
              className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-all"
            >
              Kamerani ochish
            </button>
          </div>
        </div>
      </div>

      <div className="mt-12 bg-blue-50 border border-blue-100 rounded-2xl p-6 flex gap-4">
        <div className="text-blue-500 shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div className="text-sm text-blue-800 leading-relaxed">
          <p className="font-bold mb-1">Maslahat:</p>
          Rasmda faqat bitta barg bo'lishi va yorug'lik yetarli bo'lishi tahlil aniqligini oshiradi. Xira yoki uzoqdan olingan rasmlar xatolikka sabab bo'lishi mumkin.
        </div>
      </div>
    </div>
  );
};

export default UploadZone;
