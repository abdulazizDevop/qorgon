
import React, { useState, useCallback } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Navigation from './components/Navigation';
import Landing from './components/Landing';
import UploadZone from './components/UploadZone';
import Loading from './components/Loading';
import AnalysisResultView from './components/AnalysisResult';
import ErrorView from './components/ErrorView';
import GreenMap from './components/GreenMap';
import Dashboard from './components/Dashboard';
import Database from './components/Database';
import AgroPharmacy from './components/AgroPharmacy';
import AIAgronom from './components/AIAgronom';
import { AnalysisResult, UserRole } from './types';
import { analyzePlantImage } from './services/geminiService';

const AppContent: React.FC = () => {
  const [userRole, setUserRole] = useState<UserRole | null>(UserRole.FARMER);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string>('');
  const [currentImageUrl, setCurrentImageUrl] = useState<string>('');
  const navigate = useNavigate();

  const handleStart = useCallback(() => {
    navigate('/analyzer');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [navigate]);

  const handleImageSelected = async (base64: string) => {
    setCurrentImageUrl(`data:image/jpeg;base64,${base64}`);
    navigate('/analyzer/loading');
    
    try {
      const analysisResult = await analyzePlantImage(base64);
      setResult(analysisResult);
      navigate('/analyzer/result');
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Tizimda xatolik yuz berdi. Iltimos, internet aloqasini tekshiring.");
      navigate('/analyzer/error');
    }
  };

  const handleReset = useCallback(() => {
    setResult(null);
    setError('');
    navigate('/analyzer');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [navigate]);

  const handleLogout = () => {
    setUserRole(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navigation 
        userRole={userRole} 
        onLogout={handleLogout} 
      />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Landing onStart={handleStart} />} />
          <Route path="/analyzer" element={result ? <Navigate to="/analyzer/result" replace /> : <UploadZone onImageSelected={handleImageSelected} />} />
          <Route path="/analyzer/loading" element={<Loading />} />
          <Route path="/analyzer/result" element={result ? <AnalysisResultView result={result} imageUrl={currentImageUrl} onReset={handleReset} /> : <UploadZone onImageSelected={handleImageSelected} />} />
          <Route path="/analyzer/error" element={<ErrorView message={error} onRetry={() => navigate('/analyzer')} />} />
          <Route path="/map" element={<GreenMap />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/database" element={<Database />} />
          <Route path="/pharmacy" element={<AgroPharmacy />} />
          <Route path="/agronom" element={<AIAgronom />} />
          <Route path="/auth" element={
            <div className="max-w-md mx-auto py-24 px-6">
              <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl border border-slate-100 text-center">
                 <h2 className="text-3xl font-black mb-8 font-serif">Platformaga <span className="text-emerald-600">Kirish</span></h2>
                 <button 
                    onClick={() => {setUserRole(UserRole.FARMER); navigate('/dashboard');}}
                    className="w-full py-4 bg-emerald-600 text-white font-black rounded-2xl shadow-lg shadow-emerald-200 hover:bg-emerald-700 transition-all font-sans tracking-wide"
                  >
                    Kirish (Demo)
                 </button>
              </div>
            </div>
          } />
          <Route path="*" element={<Landing onStart={handleStart} />} />
        </Routes>
      </main>
      <footer className="bg-slate-900 text-slate-300 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-sans">&copy; {new Date().getFullYear()} Ko'rg'on Ai Platform. Barcha huquqlar himoyalangan.</p>
        </div>
      </footer>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <AppContent />
    </BrowserRouter>
  );
};

export default App;
