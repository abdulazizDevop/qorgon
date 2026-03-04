
import React from 'react';
import { UserRole } from '../types';
import { Link, useLocation, useNavigate } from 'react-router-dom';

interface NavigationProps {
  userRole: UserRole | null;
  onLogout: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ userRole, onLogout }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems: { path: string; label: string; roles: UserRole[] | 'all' }[] = [
    { path: '/', label: 'Bosh sahifa', roles: 'all' },
    { path: '/about', label: 'Biz haqimizda', roles: 'all' },
    { path: '/analyzer', label: 'AI Skaner', roles: 'all' },
    { path: '/agronom', label: 'AI Agronom', roles: 'all' },
    { path: '/pharmacy', label: 'Agro Dorixona', roles: 'all' },
    { path: '/database', label: 'Entsiklopediya', roles: 'all' },
    { path: '/map', label: 'Yashil Xarita', roles: [UserRole.FARMER, UserRole.ADMIN] },
    { path: '/dashboard', label: 'Statistika', roles: [UserRole.FARMER, UserRole.ADMIN] },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <Link 
            to="/" 
            className="flex items-center gap-3 group shrink-0"
          >
            <div>
              <span className="font-black text-2xl text-slate-900 tracking-tight font-serif">Ko'rg'on <span className="text-emerald-600">Ai</span></span>
            </div>
          </Link>

          <nav className="hidden xl:flex items-center gap-1">
            {navItems.map((item) => {
              if (item.roles !== 'all' && (!userRole || !item.roles.includes(userRole))) return null;
              
              const isActive = location.pathname === item.path || (location.pathname.startsWith('/analyzer') && item.path === '/analyzer');
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-700' 
                      : 'text-slate-600 hover:text-emerald-600 hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-4">
            {userRole ? (
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => {
                     onLogout();
                     navigate('/');
                  }}
                  className="p-2.5 rounded-xl bg-slate-100 text-slate-600 hover:bg-red-50 hover:text-red-600 transition-all shadow-sm"
                  title="Chiqish"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </button>
              </div>
            ) : (
              <Link 
                to="/auth"
                className="bg-emerald-600 text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-emerald-200 hover:bg-emerald-700 transition-all"
              >
                Kirish
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navigation;
