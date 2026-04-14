import React, { useState } from "react";
import { UserRole } from "../types";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

interface NavigationProps {
  userRole: UserRole | null;
  onLogout: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ userRole, onLogout }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleHashNav = (e: React.MouseEvent, path: string) => {
    if (!path.includes("#")) return;
    e.preventDefault();
    const [base, hash] = path.split("#");
    setIsMobileMenuOpen(false);
    const scrollToAnchor = () => {
      const el = document.getElementById(hash);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    if (location.pathname !== (base || "/")) {
      navigate(base || "/");
      window.setTimeout(scrollToAnchor, 80);
    } else {
      scrollToAnchor();
    }
  };

  const navItems: { path: string; label: string; roles: UserRole[] | "all" }[] =
    [
      { path: "/", label: "Bosh sahifa", roles: "all" },
      { path: "/analyzer", label: "AI Skaner", roles: "all" },
      { path: "/agronom", label: "AI Agronom", roles: "all" },
      { path: "/pharmacy", label: "Agro Dorixona", roles: "all" },
      { path: "/database", label: "Entsiklopediya", roles: "all" },
      {
        path: "/map",
        label: "Yashil Xarita",
        roles: [UserRole.FARMER, UserRole.ADMIN],
      },
      {
        path: "/dashboard",
        label: "Statistika",
        roles: [UserRole.FARMER, UserRole.ADMIN],
      },
    ];

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-slate-200 shadow-sm relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <Link
            to="/"
            className="flex items-center gap-3 group shrink-0"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <div>
              <span className="font-black text-2xl text-slate-900 tracking-tight font-serif">
                Ko'rg'on <span className="text-emerald-600">Ai</span>
              </span>
            </div>
          </Link>

          <nav className="hidden xl:flex items-center gap-1">
            {navItems.map((item) => {
              if (
                item.roles !== "all" &&
                (!userRole || !item.roles.includes(userRole))
              )
                return null;

              const isActive =
                location.pathname === item.path ||
                (location.pathname.startsWith("/analyzer") &&
                  item.path === "/analyzer");

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={(e) => handleHashNav(e, item.path)}
                  className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                    isActive
                      ? "bg-emerald-50 text-emerald-700"
                      : "text-slate-600 hover:text-emerald-600 hover:bg-slate-50"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-4">
            <div className="hidden xl:flex items-center gap-4">
              {userRole ? (
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      onLogout();
                      navigate("/");
                    }}
                    className="p-2.5 rounded-xl bg-slate-100 text-slate-600 hover:bg-red-50 hover:text-red-600 transition-all shadow-sm"
                    title="Chiqish"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
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

            {/* Mobile menu button */}
            <div className="xl:hidden flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
                aria-label="Menyu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isMobileMenuOpen && (
        <div className="xl:hidden absolute top-20 left-0 right-0 bg-white border-b border-slate-200 shadow-lg z-50 animate-in slide-in-from-top-2 duration-200">
          <div className="px-4 pt-2 pb-6 space-y-1">
            {navItems.map((item) => {
              if (
                item.roles !== "all" &&
                (!userRole || !item.roles.includes(userRole))
              )
                return null;

              const isActive =
                location.pathname === item.path ||
                (location.pathname.startsWith("/analyzer") &&
                  item.path === "/analyzer");

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={(e) => {
                    if (item.path.includes("#")) {
                      handleHashNav(e, item.path);
                    } else {
                      setIsMobileMenuOpen(false);
                    }
                  }}
                  className={`block px-4 py-3 rounded-xl text-base font-bold transition-all ${
                    isActive
                      ? "bg-emerald-50 text-emerald-700"
                      : "text-slate-600 hover:text-emerald-600 hover:bg-slate-50"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}

            <div className="pt-4 mt-2 border-t border-slate-100">
              {userRole ? (
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onLogout();
                    navigate("/");
                  }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-red-50 text-red-600 font-bold hover:bg-red-100 transition-all"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  Chiqish
                </button>
              ) : (
                <Link
                  to="/auth"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full text-center bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-emerald-200 hover:bg-emerald-700 transition-all"
                >
                  Kirish
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navigation;
