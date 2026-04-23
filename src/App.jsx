import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { Globe, Menu, FileText, Mail } from 'lucide-react';
import { T } from './translations.js';
import Home from './pages/Home.jsx';
import DarBoxLogo from './components/DarBoxLogo.jsx';
import MobileDrawer from './components/MobileDrawer.jsx';
import CGV from './pages/CGV.jsx';
import Confidentialite from './pages/Confidentialite.jsx';
import Garantie from './pages/Garantie.jsx';

const WA = () => (<svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>);

export default function App() {
  const [lang, setLang] = useState(null);
  const [showLM, setShowLM] = useState(true);
  const [mob, setMob] = useState(false);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const t = lang ? T[lang] : T.fr;
  const rtl = lang === 'ar';
  const isHome = location.pathname === '/';

  const pick = (l) => { setLang(l); setShowLM(false); };
  const go = (id) => { setMob(false); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); };

  // Navigation styling handled directly in the new UI containers

  // Detect if we're on dark pages (catalogue, newsletter have their own bg)
  const isDarkNav = location.pathname === '/catalogue';

  // ── LANG MODAL FIRST ──
  if (!lang) return (
    <div className="lang-overlay"><div className="lang-modal">
      <div className="text-4xl mb-4">🌐</div>
      <h2 className="text-2xl font-extrabold tracking-tight text-[#0d1117] mb-2">{T.fr.langTitle}</h2>
      <p className="text-sm text-[#6b7280] mb-6">{T.fr.langSub}</p>
      <button className="lang-btn" onClick={() => pick('fr')}>🇫🇷 Français</button>
      <button className="lang-btn" onClick={() => pick('en')}>🇬🇧 English</button>
      <button className="lang-btn" onClick={() => pick('ar')}>🇲🇦 العربية</button>
    </div></div>
  );

  return (
    <div dir={rtl ? 'rtl' : 'ltr'} className="min-h-screen bg-[#f5f0e8] text-[#0d1117] overflow-x-hidden">

      {/* LANG MODAL RE-OPEN */}
      {showLM && (<div className="lang-overlay" onClick={() => setShowLM(false)}><div className="lang-modal" onClick={e => e.stopPropagation()}>
        <div className="text-4xl mb-4">🌐</div>
        <h2 className="text-2xl font-extrabold text-[#0d1117] mb-2">{t.langTitle}</h2>
        <p className="text-sm text-[#6b7280] mb-6">{t.langSub}</p>
        <button className="lang-btn" onClick={() => pick('fr')}>🇫🇷 Français</button>
        <button className="lang-btn" onClick={() => pick('en')}>🇬🇧 English</button>
        <button className="lang-btn" onClick={() => pick('ar')}>🇲🇦 العربية</button>
      </div></div>)}

      {/* ═══ NAV ═══ */}
      <nav className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-6 lg:px-[60px] py-[18px] bg-[#f5f0e8]/90 backdrop-blur-[12px] border-b border-black/[.06] print:hidden">
        <Link to="/" className="no-underline"><DarBoxLogo variant="light" size="md" /></Link>
        {/* ═══ DESKTOP NAVBAR ═══ */}
        <div className="hidden lg:flex items-center gap-6">
          
          {/* Primary Nav Container */}
          <div className="flex items-center bg-black/[0.04] p-[5px] rounded-full ring-1 ring-black/[0.03]">
            {isHome ? (
              <>
                <a href="#how" onClick={e => { e.preventDefault(); go('how'); }} className="px-4 py-1.5 rounded-full text-[.85rem] font-bold text-[#5a5a5a] hover:text-[#0d1117] hover:bg-white hover:shadow-sm hover:-translate-y-[1px] transition-all duration-200">{t.navHow}</a>
                <a href="#offres" onClick={e => { e.preventDefault(); go('offres'); }} className="px-4 py-1.5 rounded-full text-[.85rem] font-bold text-[#5a5a5a] hover:text-[#0d1117] hover:bg-white hover:shadow-sm hover:-translate-y-[1px] transition-all duration-200">{t.navPlans}</a>
                <a href="#avis" onClick={e => { e.preventDefault(); go('avis'); }} className="px-4 py-1.5 rounded-full text-[.85rem] font-bold text-[#5a5a5a] hover:text-[#0d1117] hover:bg-white hover:shadow-sm hover:-translate-y-[1px] transition-all duration-200">{t.navReviews}</a>
                <a href="#faq" onClick={e => { e.preventDefault(); go('faq'); }} className="px-4 py-1.5 rounded-full text-[.85rem] font-bold text-[#5a5a5a] hover:text-[#0d1117] hover:bg-white hover:shadow-sm hover:-translate-y-[1px] transition-all duration-200">{t.navFaq}</a>
              </>
            ) : (
              <Link to="/" className="px-4 py-1.5 rounded-full text-[.85rem] font-bold text-[#5a5a5a] hover:text-[#0d1117] hover:bg-white hover:shadow-sm hover:-translate-y-[1px] transition-all duration-200">{t.navHow}</Link>
            )}
          </div>

          <div className="w-[1px] h-6 bg-black/10"></div>

          {/* Secondary & Actions */}
          <div className="flex items-center gap-3">
            <a 
              href="/assets/DarBox%20—%20Catalogue%202026.pdf" target="_blank" rel="noopener noreferrer" download
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-[.85rem] font-bold transition-all duration-300 bg-white shadow-sm border border-black/[0.08] text-[#0d1117] hover:border-[#1a7a4a]/40 hover:text-[#1a7a4a] hover:-translate-y-[1px] hover:shadow-md`}
            >
              <FileText className="w-[15px] h-[15px]" /> {t.navCatalogue}
            </a>
            
            <div className="flex items-center gap-1.5 ml-2">
              <button onClick={() => setShowLM(true)} className="p-2 rounded-full border border-transparent hover:border-black/[0.08] hover:bg-black/[0.03] transition-all">
                <Globe className="w-[18px] h-[18px] text-[#0d1117]/70" />
              </button>
              {isHome && (
                <a href="#offres" onClick={e => { e.preventDefault(); go('offres'); }} className="bg-[#0d1117] text-white px-5 py-2 rounded-full text-[.85rem] font-bold no-underline hover:bg-[#1a7a4a] hover:-translate-y-[1px] hover:shadow-[0_6px_16px_rgba(26,122,74,0.3)] transition-all duration-300 ml-1">
                  {t.navCta}
                </a>
              )}
            </div>
          </div>
        </div>
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={() => setMob(true)}
            aria-label="Open menu"
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#e8f5ee] transition-colors"
          >
            <Menu className="w-5 h-5 text-[#0d1117]" />
          </button>
        </div>
      </nav>

      {/* ═══ PREMIUM MOBILE DRAWER ═══ */}
      <MobileDrawer
        open={mob}
        onClose={() => setMob(false)}
        onLang={() => setShowLM(true)}
        go={go}
        t={t}
        isHome={isHome}
      />

      {/* ═══ ROUTES ═══ */}
      <Routes>
        <Route path="/" element={<Home t={t} lang={lang} go={go} />} />
        <Route path="/cgv" element={<CGV />} />
        <Route path="/confidentialite" element={<Confidentialite />} />
        <Route path="/garantie" element={<Garantie />} />
      </Routes>

      {/* ═══ FOOTER ═══ */}
      <footer className="bg-[#0d1117] text-white pt-[60px] pb-8 px-6 lg:px-[60px] print:hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div><Link to="/" className="no-underline mb-4 inline-block"><DarBoxLogo variant="dark" size="md" /></Link><p className="text-[.85rem] text-white/50 leading-relaxed max-w-[260px]">{t.ftDesc}</p></div>
          <div>
            <h5 className="text-[.8rem] font-bold tracking-widest uppercase text-white/40 mb-4">{t.ftProd}</h5>
            <ul className="list-none space-y-2.5">
              <li><Link to="/" className="text-white/65 no-underline text-[.88rem] hover:text-white transition-colors">{t.navHow}</Link></li>
              <li><Link to="/" className="text-white/65 no-underline text-[.88rem] hover:text-white transition-colors">{t.navPlans}</Link></li>
              <li><a href="/assets/DarBox%20—%20Catalogue%202026.pdf" target="_blank" rel="noopener noreferrer" download className="text-white/65 no-underline text-[.88rem] hover:text-white transition-colors">{t.navCatalogue}</a></li>
            </ul>
          </div>
          <div>
            <h5 className="text-[.8rem] font-bold tracking-widest uppercase text-white/40 mb-4">{t.ftContact}</h5>
            <ul className="list-none space-y-2.5">
              <li><a href="https://wa.me/212621429030" target="_blank" rel="noopener noreferrer" className="text-white/65 no-underline text-[.88rem] hover:text-white transition-colors">WhatsApp</a></li>
            </ul>
            <div className="mt-4">
              <a href="mailto:merouan@darbox.live" className="text-sm opacity-60 text-white hover:opacity-100 transition-opacity">merouan@darbox.live</a>
            </div>
          </div>
          <div>
            <h5 className="text-[.8rem] font-bold tracking-widest uppercase text-white/40 mb-4">{t.ftLegal}</h5>
            <ul className="list-none space-y-2.5">
              <li><Link to="/cgv" className="text-white/65 no-underline text-[.88rem] hover:text-white transition-colors">{t.ftCond}</Link></li>
              <li><Link to="/confidentialite" className="text-white/65 no-underline text-[.88rem] hover:text-white transition-colors">{t.ftPriv}</Link></li>
              <li><Link to="/garantie" className="text-white/65 no-underline text-[.88rem] hover:text-white transition-colors">{t.ftWar}</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 pt-6 pb-4 text-center text-white/40 text-sm space-y-0.5">
          <div>🇫🇷 {t.sloganFr} · 🇬🇧 {t.sloganEn} · <span dir="rtl">🇲🇦 {t.sloganAr}</span></div>
        </div>
        <div className="border-t border-white/10 pt-4 flex flex-col md:flex-row justify-between items-center text-[.8rem] text-white/35 gap-2">
          <div>{t.ftCopy}</div><div>{t.ftMade}</div>
        </div>
      </footer>
    </div>
  );
}
