
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  onNavigateHome: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, onNavigateHome }) => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div 
            className="flex items-center gap-2 cursor-pointer group"
            onClick={onNavigateHome}
          >
            <div className="bg-emerald-600 p-2 rounded-lg group-hover:bg-emerald-700 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-800 font-serif">Ko'rg'on <span className="text-emerald-600">Ai</span></span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#" onClick={(e) => {e.preventDefault(); onNavigateHome();}} className="text-slate-600 hover:text-emerald-600 font-medium transition-colors">Bosh sahifa</a>
            <a href="#" className="text-slate-600 hover:text-emerald-600 font-medium transition-colors">Biz haqimizda</a>
          </nav>
          <button 
            onClick={onNavigateHome}
            className="md:hidden p-2 rounded-md text-slate-600 hover:bg-slate-100"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </header>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-slate-900 text-slate-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-emerald-600 p-1.5 rounded text-white">
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <span className="font-bold text-lg text-white font-serif">Ko'rg'on Ai</span>
              </div>
              <p className="text-sm leading-relaxed max-w-xs">
                Zamonaviy dehqonlar uchun AI-ga asoslangan eng yaxshi yordamchi. O'simliklaringiz sog'lig'ini bir soniyada aniqlang.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4 uppercase tracking-wider text-xs">Platforma</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Tahlil qilish</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Statistika</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Kasalliklar bazasi</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4 uppercase tracking-wider text-xs">Aloqa</h4>
              <ul className="space-y-2 text-sm">
                <li>Email: olimovabdulaziz464@gmail.com</li>
                <li>Tel: +998 94 419 06 77</li>
                <li>Manzil: Toshkent sh., Furqat k., Blok B05</li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
            &copy; {new Date().getFullYear()} Ko'rg'on Ai. Barcha huquqlar himoyalangan.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
