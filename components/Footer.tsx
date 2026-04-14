import React from "react";
import { Link } from "react-router-dom";
import { Send, Mail, MapPin } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block mb-4">
              <span className="font-black text-2xl text-white tracking-tight font-serif">
                Ko'rg'on <span className="text-emerald-400">Ai</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-5">
              O'zbek fermerlari uchun sun'iy intellekt yordamchi. Hosilingiz uchun mustahkam himoya.
            </p>
            <div className="flex gap-3">
              <a
                href="https://t.me/AbdulazizAlimov"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-slate-800 text-slate-400 hover:bg-emerald-600 hover:text-white flex items-center justify-center transition-all"
                aria-label="Telegram"
              >
                <Send className="w-4 h-4" />
              </a>
              <a
                href="mailto:olimovbadulaziz464@gmail.com"
                className="w-10 h-10 rounded-xl bg-slate-800 text-slate-400 hover:bg-emerald-600 hover:text-white flex items-center justify-center transition-all"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-black text-white text-sm uppercase tracking-wider mb-5">
              Mahsulot
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/analyzer" className="hover:text-emerald-400 transition-colors">
                  AI Skaner
                </Link>
              </li>
              <li>
                <Link to="/agronom" className="hover:text-emerald-400 transition-colors">
                  AI Agronom
                </Link>
              </li>
              <li>
                <Link to="/database" className="hover:text-emerald-400 transition-colors">
                  Entsiklopediya
                </Link>
              </li>
              <li>
                <Link to="/pharmacy" className="hover:text-emerald-400 transition-colors">
                  Agro Dorixona
                </Link>
              </li>
              <li>
                <Link to="/map" className="hover:text-emerald-400 transition-colors">
                  Yashil Xarita
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-black text-white text-sm uppercase tracking-wider mb-5">
              Kompaniya
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="/#pricing" className="hover:text-emerald-400 transition-colors">
                  Narxlar
                </a>
              </li>
              <li>
                <a href="/#roadmap" className="hover:text-emerald-400 transition-colors">
                  Yo'l xaritasi
                </a>
              </li>
              <li>
                <a
                  href="https://t.me/AbdulazizAlimov"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Hamkorlik
                </a>
              </li>
              <li>
                <a
                  href="https://t.me/AbdulazizAlimov"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Bog'lanish
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-black text-white text-sm uppercase tracking-wider mb-5">
              Aloqa
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                <span>Toshkent shahri, O'zbekiston</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                <a
                  href="mailto:olimovbadulaziz464@gmail.com"
                  className="hover:text-emerald-400 transition-colors break-all"
                >
                  olimovbadulaziz464@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Send className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                <a
                  href="https://t.me/AbdulazizAlimov"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition-colors"
                >
                  @AbdulazizAlimov
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} Ko'rg'on AI. Barcha huquqlar himoyalangan.
          </p>
          <div className="flex gap-6 text-xs text-slate-500">
            <span className="hover:text-slate-300 cursor-pointer transition-colors">
              Maxfiylik siyosati
            </span>
            <span className="hover:text-slate-300 cursor-pointer transition-colors">
              Foydalanish shartlari
            </span>
            <span className="hover:text-slate-300 cursor-pointer transition-colors">
              Ofertalar
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
