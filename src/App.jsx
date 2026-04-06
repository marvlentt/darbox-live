import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Globe, Menu, X } from 'lucide-react';
import { T } from './translations.js';
import Home from './pages/Home.jsx';
import Catalogue from './pages/Catalogue.jsx';
import Newsletter from './pages/Newsletter.jsx';
import DarBoxLogo from './components/DarBoxLogo.jsx';

const WA = () => (<svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>);

export default function App() {
  const [lang, setLang] = useState(null);
  const [showLM, setShowLM] = useState(true);
  const [mob, setMob] = useState(false);
  const location = useLocation();

  const t = lang ? T[lang] : T.fr;
  const rtl = lang === 'ar';
  const isHome = location.pathname === '/';

  const pick = (l) => { setLang(l); setShowLM(false); };
  const go = (id) => { setMob(false); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); };

  // Navigation link helper
  const navLinkClass = "text-[.9rem] font-medium text-[#5a5a5a] hover:text-[#0d1117] no-underline transition-colors";
  const navLinkClassDark = "text-[.9rem] font-medium text-white/60 hover:text-white no-underline transition-colors";

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
        <div className="hidden lg:flex items-center gap-6">
          {isHome ? (
            <>
              <a href="#how" onClick={e => { e.preventDefault(); go('how'); }} className={navLinkClass}>{t.navHow}</a>
              <a href="#offres" onClick={e => { e.preventDefault(); go('offres'); }} className={navLinkClass}>{t.navPlans}</a>
              <a href="#avis" onClick={e => { e.preventDefault(); go('avis'); }} className={navLinkClass}>{t.navReviews}</a>
              <a href="#faq" onClick={e => { e.preventDefault(); go('faq'); }} className={navLinkClass}>{t.navFaq}</a>
            </>
          ) : (
            <Link to="/" className={navLinkClass}>{t.navHow}</Link>
          )}
          <Link to="/catalogue" className={`text-[.85rem] font-semibold hover:text-[#0d1117] border px-4 py-1.5 rounded-full no-underline transition-colors ${location.pathname === '/catalogue' ? 'border-[#1a7a4a] text-[#1a7a4a] bg-[#e8f5ee]' : 'border-[#ebebeb] text-[#5a5a5a]'}`}>{t.navCatalogue}</Link>
          <Link to="/newsletter" className={`text-[.85rem] font-semibold hover:text-[#0d1117] border px-4 py-1.5 rounded-full no-underline transition-colors ${location.pathname === '/newsletter' ? 'border-[#1a7a4a] text-[#1a7a4a] bg-[#e8f5ee]' : 'border-[#ebebeb] text-[#5a5a5a]'}`}>📰 Newsletter</Link>
          <button onClick={() => setShowLM(true)} className="p-2 rounded-full hover:bg-[#e8f5ee] transition-colors"><Globe className="w-5 h-5 text-[#5a5a5a]" /></button>
          {isHome && (
            <a href="#offres" onClick={e => { e.preventDefault(); go('offres'); }} className="bg-[#0d1117] text-white px-5 py-2.5 rounded-full text-[.88rem] font-semibold no-underline hover:bg-[#1a7a4a] transition-colors">{t.navCta}</a>
          )}
        </div>
        <div className="flex lg:hidden items-center gap-2">
          <button onClick={() => setShowLM(true)} className="p-2"><Globe className="w-5 h-5 text-[#5a5a5a]" /></button>
          <button onClick={() => setMob(!mob)} className="p-2">{mob ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}</button>
        </div>
      </nav>
      {mob && <div className="fixed top-[60px] left-0 right-0 z-[99] bg-white shadow-xl border-t border-[#ebebeb] p-4 flex flex-col gap-3 lg:hidden print:hidden">
        {isHome && <>
          <button onClick={() => go('how')} className="text-left py-2 font-medium text-[#5a5a5a]">{t.navHow}</button>
          <button onClick={() => go('offres')} className="text-left py-2 font-medium text-[#5a5a5a]">{t.navPlans}</button>
          <button onClick={() => go('avis')} className="text-left py-2 font-medium text-[#5a5a5a]">{t.navReviews}</button>
          <button onClick={() => go('faq')} className="text-left py-2 font-medium text-[#5a5a5a]">{t.navFaq}</button>
        </>}
        <Link to="/catalogue" onClick={() => setMob(false)} className="py-2 font-medium text-[#5a5a5a] no-underline">{t.navCatalogue}</Link>
        <Link to="/newsletter" onClick={() => setMob(false)} className="py-2 font-medium text-[#5a5a5a] no-underline">📰 Newsletter</Link>
        {isHome && <button onClick={() => go('offres')} className="w-full py-3 bg-[#0d1117] text-white font-semibold rounded-full mt-1">{t.navCta}</button>}
      </div>}

      {/* ═══ ROUTES ═══ */}
      <Routes>
        <Route path="/" element={<Home t={t} lang={lang} go={go} />} />
        <Route path="/catalogue" element={<Catalogue lang={lang} />} />
        <Route path="/newsletter" element={<Newsletter lang={lang} />} />
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
              <li><Link to="/catalogue" className="text-white/65 no-underline text-[.88rem] hover:text-white transition-colors">{t.navCatalogue}</Link></li>
              <li><Link to="/newsletter" className="text-white/65 no-underline text-[.88rem] hover:text-white transition-colors">Newsletter</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="text-[.8rem] font-bold tracking-widest uppercase text-white/40 mb-4">{t.ftContact}</h5>
            <ul className="list-none space-y-2.5">
              {['WhatsApp', 'Instagram', 'Facebook', 'Email'].map(s => (<li key={s}><a href={s === 'WhatsApp' ? 'https://wa.me/212600000000' : '#'} className="text-white/65 no-underline text-[.88rem] hover:text-white transition-colors">{s}</a></li>))}
            </ul>
          </div>
          <div>
            <h5 className="text-[.8rem] font-bold tracking-widest uppercase text-white/40 mb-4">{t.ftLegal}</h5>
            <ul className="list-none space-y-2.5">
              {[t.ftCond, t.ftPriv, t.ftWar].map(s => (<li key={s}><a href="#" className="text-white/65 no-underline text-[.88rem] hover:text-white transition-colors">{s}</a></li>))}
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

      {/* ═══ WHATSAPP FLOAT ═══ */}
      <a href="https://wa.me/212600000000" target="_blank" rel="noopener noreferrer" className="wa-float print:hidden" title="WhatsApp"><WA /></a>
    </div>
  );
}
