
import React, { useState, useRef } from 'react';
import { Upload, Camera, ImageIcon, Sparkles, Info } from 'lucide-react';

interface UploadZoneProps {
  onImageSelected: (base64: string) => void;
}

const SAMPLE_IMAGES = [
  {
    label: "Pomidor — fitoftoroz",
    url: "/demo-samples/tomato-blight.jpg",
    hint: "Qora dog'lar, barg qurishi",
  },
  {
    label: "Uzum — oidium",
    url: "/demo-samples/grape-mildew.jpg",
    hint: "Oq kukun qatlami",
  },
  {
    label: "Sog'lom barg",
    url: "/demo-samples/healthy-leaf.jpg",
    hint: "Sog'lom yashil barg",
  },
  {
    label: "Olma — parsha",
    url: "/demo-samples/apple-scab.jpg",
    hint: "Qo'ng'ir dog'lar",
  },
];

const UploadZone: React.FC<UploadZoneProps> = ({ onImageSelected }) => {
  const [dragActive, setDragActive] = useState(false);
  const [loadingSample, setLoadingSample] = useState<string | null>(null);
  const [failedSamples, setFailedSamples] = useState<Set<string>>(new Set());
  const inputRef = useRef<HTMLInputElement>(null);
  const cameraRef = useRef<HTMLInputElement>(null);

  const availableSamples = SAMPLE_IMAGES.filter((s) => !failedSamples.has(s.url));

  const handleFiles = (files: FileList) => {
    if (files.length === 0) return;
    const file = files[0];

    if (!file.type.startsWith('image/')) {
      alert("Iltimos, faqat rasm yuklang.");
      return;
    }
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

  const handleSampleClick = async (url: string, label: string) => {
    try {
      setLoadingSample(url);
      const response = await fetch(url);
      const blob = await response.blob();
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64 = e.target?.result as string;
        const cleanBase64 = base64.split(',')[1];
        onImageSelected(cleanBase64);
      };
      reader.readAsDataURL(blob);
    } catch (err) {
      console.error(err);
      alert(`Namuna rasm yuklanmadi (${label}). Iltimos, internet aloqasini tekshiring.`);
      setLoadingSample(null);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) handleFiles(e.dataTransfer.files);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) handleFiles(e.target.files);
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 pb-24">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100/80 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-5 border border-emerald-200/50">
          <Sparkles className="w-3 h-3" />
          AI Skaner
        </div>
        <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 font-serif tracking-tight">
          O'simlik rasmini <span className="text-emerald-600 italic">yuklang</span>
        </h2>
        <p className="text-slate-500 text-lg font-light">
          Bargning yaqindan olingan, tiniq rasmini tanlang — 10 soniyada natija olasiz.
        </p>
      </div>

      <div
        className={`relative border-2 border-dashed rounded-[2.5rem] p-10 md:p-14 text-center transition-all ${
          dragActive
            ? 'border-emerald-500 bg-emerald-50 scale-[1.01]'
            : 'border-slate-300 bg-white hover:border-emerald-400 hover:bg-slate-50/50'
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
        <input
          ref={cameraRef}
          type="file"
          accept="image/*"
          capture="environment"
          className="hidden"
          onChange={handleChange}
        />

        <div className="flex flex-col items-center">
          <div className="relative mb-6">
            <div className="w-24 h-24 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-[2rem] flex items-center justify-center shadow-2xl shadow-emerald-200/50 rotate-3">
              <Upload className="h-11 w-11 text-white" strokeWidth={2.5} />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></div>
            </div>
          </div>
          <h3 className="text-2xl font-black text-slate-800 mb-2 font-serif">
            Rasmni bu yerga tashlang
          </h3>
          <p className="text-slate-400 mb-7 text-sm font-medium">yoki quyidagi tugmalardan birini tanlang</p>
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => inputRef.current?.click()}
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl transition-all shadow-lg shadow-emerald-200 hover:-translate-y-0.5"
            >
              <ImageIcon className="w-4 h-4" />
              Faylni tanlash
            </button>
            <button
              onClick={() => cameraRef.current?.click()}
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-white border-2 border-slate-200 hover:border-emerald-500 text-slate-700 hover:text-emerald-600 font-bold rounded-2xl transition-all"
            >
              <Camera className="w-4 h-4" />
              Kamerani ochish
            </button>
          </div>
        </div>
      </div>

      {/* Sample Images */}
      {availableSamples.length > 0 && (
        <div className="mt-10">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-lg font-black text-slate-900 font-serif">
                Namuna rasmlar bilan sinang
              </h3>
              <p className="text-sm text-slate-500 font-light">
                Tezkor demo uchun tayyor rasmlardan birini tanlang
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {availableSamples.map((sample) => {
              const isLoading = loadingSample === sample.url;
              return (
                <button
                  key={sample.url}
                  onClick={() => handleSampleClick(sample.url, sample.label)}
                  disabled={loadingSample !== null}
                  className="group relative text-left bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="aspect-square overflow-hidden bg-slate-100">
                    <img
                      src={sample.url}
                      alt={sample.label}
                      onError={() => setFailedSamples((prev) => new Set(prev).add(sample.url))}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                    />
                    {isLoading && (
                      <div className="absolute inset-0 bg-slate-900/50 flex items-center justify-center">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-75"></div>
                          <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-150"></div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="p-3">
                    <p className="font-bold text-xs text-slate-900 mb-0.5 truncate">
                      {sample.label}
                    </p>
                    <p className="text-[10px] text-slate-500 truncate">{sample.hint}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div className="mt-8 bg-gradient-to-br from-blue-50 to-emerald-50/50 border border-blue-100 rounded-2xl p-5 flex gap-4">
        <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
          <Info className="w-5 h-5" />
        </div>
        <div className="text-sm text-slate-700 leading-relaxed">
          <p className="font-bold mb-1 text-slate-900">Yaxshi natija uchun maslahat</p>
          Rasmda faqat bitta barg bo'lsa va yorug'lik yetarli bo'lsa — tahlil aniqligi sezilarli oshadi.
          Xira yoki uzoqdan olingan rasmlar natijani buzishi mumkin.
        </div>
      </div>
    </div>
  );
};

export default UploadZone;
