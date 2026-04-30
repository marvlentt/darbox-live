import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Download, Mail, Globe, Shield, UserPlus, ChevronUp, Check, MessageCircle, Search, ShieldCheck, BookOpen } from 'lucide-react';
import { drawerData } from '../drawerData.js';
import emailjs from '@emailjs/browser';

const RSvg = () => (<svg className="w-40 h-[120px]" viewBox="0 0 160 120" fill="none"><rect x="30" y="65" width="100" height="40" rx="8" fill="#1a1a2e"/><rect x="40" y="73" width="12" height="12" rx="3" fill="#22a663"/><rect x="58" y="73" width="8" height="8" rx="2" fill="#22a663" opacity=".5"/><rect x="72" y="73" width="8" height="8" rx="2" fill="#e8a020" opacity=".7"/><rect x="45" y="40" width="5" height="28" rx="2.5" fill="#333"/><rect x="110" y="35" width="5" height="33" rx="2.5" fill="#333"/><path d="M60 55Q80 35 100 55" stroke="#22a663" strokeWidth="3" strokeLinecap="round" fill="none" opacity=".8"/><path d="M52 62Q80 28 108 62" stroke="#22a663" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity=".5"/><circle cx="80" cy="60" r="4" fill="#22a663"/><rect x="74" y="105" width="12" height="10" rx="2" fill="#555"/></svg>);

function OfferDrawer({ data, open, onClose, t }) {
  if (!data) return null;
  const getWaLink = (id) => {
    if (id === 'config') return "https://wa.me/212621429030?text=Bonjour%2C+je+veux+configurer+mon+routeur+existant.";
    const msgs = {
      'essentiel': "Essentiel+%28400+DH%29.",
      'couvrefeu': "Couvre-feu+%28480+DH%29.",
      'anti': "Anti-Distraction+%28530+DH%29.",
      'maison': "Pack+Maison+%28750+DH%29."
    };
    return `https://wa.me/212621429030?text=Bonjour%2C+je+souhaite+commander+DarBox+${msgs[id] || ''}`;
  };
  return (<>
    <div className={`drawer-overlay ${open ? 'open' : ''}`} onClick={onClose} />
    <div className={`drawer-panel ${open ? 'open' : ''}`}>
      <div className="flex-1 p-8 space-y-8">
        <div className="flex items-center gap-4">
          <span className="text-4xl">{data.icon}</span>
          <div>
            <div className="text-xl font-extrabold">{data.name}</div>
            <div className="text-[#22a663] font-bold text-lg">{data.price}</div>
          </div>
        </div>
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#22a663] mb-3">{t.storyTitle}</h3>
          <p className="text-white/80 leading-relaxed text-[.92rem]">{data.story}</p>
        </div>
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#22a663] mb-3">{data.stepsTitle}</h3>
          <ol className="space-y-3">{data.steps.map((s, i) => (
            <li key={i} className="flex items-start gap-3 text-white/75 text-[.88rem]">
              <span className="w-6 h-6 rounded-full bg-[#1a7a4a] text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>{s}
            </li>
          ))}</ol>
        </div>
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#22a663] mb-3">{data.checkTitle}</h3>
          <ul className="space-y-2">{data.checklist.map((c, i) => (
            <li key={i} className="flex items-start gap-2 text-white/75 text-[.85rem]"><Check className="w-4 h-4 text-[#22a663] shrink-0 mt-0.5" />{c}</li>
          ))}</ul>
        </div>
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#e8a020] mb-3">{data.idealTitle}</h3>
          <ul className="space-y-1.5">{data.ideal.map((d, i) => (
            <li key={i} className="text-white/70 text-[.85rem]">→ {d}</li>
          ))}</ul>
        </div>
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#E0563B] mb-3">{data.limitsTitle}</h3>
          <ul className="space-y-1.5">{data.limits.map((l, i) => (
            <li key={i} className="text-white/60 text-[.85rem]">✕ {l}</li>
          ))}</ul>
        </div>
      </div>
      <div className="sticky bottom-0 p-6 bg-[#0d1117] border-t border-white/10 flex gap-3">
        <a href={getWaLink(data.id)} target="_blank" rel="noopener noreferrer" className="flex-1 py-3.5 bg-[#1a7a4a] text-white rounded-full font-bold text-center no-underline hover:bg-[#22a663] transition-colors">{data.cta}</a>
        <button onClick={onClose} className="px-6 py-3.5 bg-white/10 text-white/70 rounded-full font-semibold hover:bg-white/20 transition-colors">{data.close}</button>
      </div>
    </div>
  </>);
}

export default function Home({ t, lang, go }) {
  const rtl = lang === 'ar';
  const getWaLinkPlan = (idx) => {
    const msgs = [
      "Essentiel+%28400+DH%29.",
      "Couvre-feu+%28480+DH%29.",
      "Anti-Distraction+%28530+DH%29.",
      "Pack+Maison+%28750+DH%29."
    ];
    return `https://wa.me/212621429030?text=Bonjour%2C+je+souhaite+commander+DarBox+${msgs[idx]}`;
  };
  const dd = lang ? drawerData[lang] : drawerData.fr;
  const [faq, setFaq] = useState(null);
  const [drawer, setDrawer] = useState(null);
  const metRef = useRef(null);
  const [metVis, setMetVis] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          subscriber_email: email,
          to_email: 'merouan@darbox.live',
          reply_to: email,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      setIsSubscribed(true);
    } catch (err) {
      setError("Une erreur est survenue. Réessayez ou contactez-nous sur WhatsApp.");
      console.error('EmailJS error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const obs = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }), { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, [lang]);

  useEffect(() => {
    if (!metRef.current) return;
    const obs = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) setMetVis(true); }), { threshold: 0.3 });
    obs.observe(metRef.current);
    return () => obs.disconnect();
  }, [lang]);

  useEffect(() => { document.body.style.overflow = drawer !== null ? 'hidden' : ''; }, [drawer]);

  const ticks = [t.tk1, t.tk2, t.tk3, t.tk4, t.tk5, t.tk6];
  const mw = [97, 99, 100, 95];
  const icons = ['🛡️', '⏰', '📚', '🏠'];

  return (
    <>
      <OfferDrawer data={drawer !== null ? dd[drawer] : null} open={drawer !== null} onClose={() => setDrawer(null)} t={t} />

      {/* ═══ HERO ═══ */}
      <section id="hero" className="min-h-screen pt-[120px] px-6 lg:px-[60px] pb-20 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-[60px] items-center relative overflow-hidden">
        <div className="absolute -top-[200px] -right-[200px] w-[700px] h-[700px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(26,122,74,0.12) 0%, transparent 70%)' }} />
        <div className="reveal">
          <div className="inline-flex items-center gap-2 bg-[#e8f5ee] text-[#1a7a4a] px-3.5 py-1.5 rounded-full text-[.8rem] font-semibold tracking-wide mb-6">
            <span className="w-[7px] h-[7px] bg-[#22a663] rounded-full" style={{ animation: 'pulse 1.8s ease-in-out infinite' }} />{t.heroBadge}
          </div>
          <h1 className="text-[clamp(2.8rem,4.5vw,4rem)] font-extrabold leading-[1.08] text-[#0d1117] mb-5 tracking-tight">
            {t.heroT1}<br />{t.heroT2}<br /><span className="text-[#1a7a4a]">{t.heroT3}</span>
          </h1>
          <p className="text-[1.05rem] leading-relaxed text-[#5a5a5a] max-w-[460px] mb-10">{t.heroSub}</p>
          <div className="flex gap-3.5 items-center flex-wrap">
            <a href="#offres" onClick={e => { e.preventDefault(); go('offres'); }} className="bg-[#1a7a4a] text-white px-7 py-3.5 rounded-full font-semibold text-[.95rem] no-underline inline-flex items-center gap-2 shadow-[0_4px_20px_rgba(26,122,74,.3)] hover:-translate-y-0.5 transition-all">{t.heroCta1} <ArrowRight className="w-4 h-4" /></a>
            <a href="#how" onClick={e => { e.preventDefault(); go('how'); }} className="ring-2 ring-inset ring-[#d4d4d4] text-[#0d1117] px-6 py-3.5 rounded-full font-semibold text-[.95rem] no-underline hover:ring-[#1a7a4a] hover:bg-[#e8f5ee] hover:text-[#1a7a4a] transition-all">{t.heroCta2}</a>
            <a
              href="/assets/DarBox_Catalogue_2026.pdf"
              download="DarBox_Catalogue_2026.pdf"
              className="ring-2 ring-inset ring-[#d4d4d4] text-[#5a5a5a] px-5 py-3.5 rounded-full font-semibold text-[.88rem] no-underline inline-flex items-center gap-2 hover:ring-[#1a7a4a] hover:text-[#1a7a4a] hover:bg-[#e8f5ee] transition-all"
            >
              {t.catBtn || 'Télécharger le Catalogue (PDF)'}
            </a>
          </div>
          <div className="flex gap-8 mt-12">
            {[[t.s1N, t.s1L], [t.s2N, t.s2L], [t.s3N, t.s3L]].map(([n, l], i) => (
              <div key={i}><div className="text-[1.6rem] font-extrabold">{n}</div><div className="text-[.8rem] text-[#9a9a9a] mt-0.5">{l}</div></div>
            ))}
          </div>
        </div>
        <div className="hidden lg:flex relative justify-center items-center">
          <div className="float-badge" style={{ top: '-20px', left: '-30px' }}><div className="w-2 h-2 rounded-full bg-[#22a663]" />{t.fb1}</div>
          <div className="float-badge" style={{ bottom: '20px', right: '-30px', animationDelay: '1s' }}><div className="w-2 h-2 rounded-full bg-[#e8a020]" />{t.fb2}</div>
          <div className="bg-white rounded-[28px] p-10 shadow-[0_12px_48px_rgba(0,0,0,.12)] w-full max-w-[420px] relative">
            <div className="absolute -inset-0.5 rounded-[30px] -z-10" style={{ background: 'linear-gradient(135deg, rgba(26,122,74,.2), transparent, rgba(232,160,32,.2))' }} />
            <div className="bg-[#f7f7f5] rounded-[20px] h-[200px] flex items-center justify-center mb-7 relative overflow-hidden">
              <div className="wifi-ring" /><div className="wifi-ring" /><div className="wifi-ring" /><RSvg />
            </div>
            <div className="flex flex-wrap gap-2 mb-5">
              <span className="px-3.5 py-1.5 rounded-full text-[.78rem] font-semibold bg-[#e8f5ee] text-[#1a7a4a]">{t.tagDns}</span>
              <span className="px-3.5 py-1.5 rounded-full text-[.78rem] font-semibold bg-[#e8f5ee] text-[#1a7a4a]">{t.tagFw}</span>
              <span className="px-3.5 py-1.5 rounded-full text-[.78rem] font-semibold bg-[#fef3dc] text-[#e8a020]">{t.tagCu}</span>
              <span className="px-3.5 py-1.5 rounded-full text-[.78rem] font-semibold bg-[#eee] text-[#5a5a5a]">{t.tagKid}</span>
            </div>
            <div className="flex justify-between items-baseline border-t border-[#ebebeb] pt-5">
              <div><div className="text-[2rem] font-extrabold">{t.rPrice} <span className="text-base font-normal text-[#9a9a9a]">{t.rCur}</span></div><div className="text-[.78rem] text-[#9a9a9a]">{t.rSub}</div></div>
              <a href={getWaLinkPlan(0)} target="_blank" rel="noopener noreferrer" className="bg-[#1a7a4a] text-white px-5 py-3 rounded-full font-semibold text-[.88rem] border-none cursor-pointer hover:bg-[#22a663] transition-colors no-underline block">{t.rBuy}</a>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SLOGANS BANNER ═══ */}
      <div className="bg-[#0d1117] py-10 text-center">
        <div className="max-w-3xl mx-auto px-6 space-y-2">
          <p className="text-xl md:text-2xl text-white font-bold italic">🇫🇷 {t.sloganFr}</p>
          <p className="text-xl md:text-2xl text-white/80 font-bold italic">🇬🇧 {t.sloganEn}</p>
          <p className="text-xl md:text-2xl text-white/70 font-bold italic" dir="rtl">🇲🇦 {t.sloganAr}</p>
        </div>
      </div>

      {/* ═══ TICKER ═══ */}
      <div className="bg-[#0d1117] text-white py-4 overflow-hidden border-t border-white/10">
        <div className="ticker-track">
          {[...ticks, ...ticks].map((it, i) => (
            <span key={i} className="inline-flex items-center gap-3 px-8 text-[.88rem] font-medium text-white/80" style={{ borderRight: '1px solid rgba(255,255,255,.15)' }}><strong className="text-white">{it}</strong></span>
          ))}
        </div>
      </div>

      {/* ═══ HOW IT WORKS ═══ */}
      <section id="how" className="py-[100px] px-6 lg:px-[60px] bg-white">
        <div className="mb-14 reveal">
          <div className="inline-flex items-center gap-1.5 bg-[#e8f5ee] text-[#1a7a4a] px-3 py-1 rounded-full text-[.75rem] font-bold tracking-wider uppercase mb-4">● {t.howTag}</div>
          <h2 className="text-[clamp(2rem,3.2vw,3rem)] font-extrabold leading-[1.1] mb-4">{t.howTitle}</h2>
          <p className="text-base text-[#5a5a5a] leading-relaxed max-w-[540px]">{t.howSub}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0.5 bg-[#ebebeb] rounded-[14px] overflow-hidden border border-[#ebebeb] reveal">
          {[{ n: '01', ic: '🔌', ti: t.st1T, de: t.st1D }, { n: '02', ic: '⚙️', ti: t.st2T, de: t.st2D }, { n: '03', ic: '😌', ti: t.st3T, de: t.st3D }].map((s, i) => (
            <div key={i} className="bg-white p-8 lg:p-11 group hover:bg-[#e8f5ee] transition-colors">
              <div className="text-7xl font-black text-[#1A7A4A] leading-none mb-5 transition-colors">{s.n}</div>
              <div className="w-[52px] h-[52px] bg-[#e8f5ee] rounded-[14px] flex items-center justify-center mb-5 text-2xl">{s.ic}</div>
              <div className="text-[1.15rem] font-bold mb-2.5">{s.ti}</div>
              <p className="text-[.9rem] text-[#5a5a5a] leading-relaxed">{s.de}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ PLANS ═══ */}
      <section id="offres" className="py-[100px] px-6 lg:px-[60px] bg-[#0d1117]">
        <div className="mb-14 reveal">
          <div className="inline-flex items-center gap-1.5 bg-[rgba(26,122,74,.3)] text-[#22a663] px-3 py-1 rounded-full text-[.75rem] font-bold tracking-wider uppercase mb-4">● {t.plTag}</div>
          <h2 className="text-[clamp(2rem,3.2vw,3rem)] font-extrabold leading-[1.1] text-white mb-4">{t.plTitle}</h2>
          <p className="text-base text-white/60 leading-relaxed max-w-[540px]">{t.plSub}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 reveal">
          {[
            { i: 0, ic: '🛡️', n: t.p1N, p: t.p1P, s: t.p1S, f: t.p1F, feat: false },
            { i: 1, ic: '⏰', n: t.p2N, p: t.p2P, s: t.p2S, f: t.p2F, feat: true },
            { i: 2, ic: '📚', n: t.p3N, p: t.p3P, s: t.p3S, f: t.p3F, feat: false },
            { i: 3, ic: '🏠', n: t.p4N, p: t.p4P, s: t.p4S, f: t.p4F, feat: false },
          ].map(pl => (
            <div key={pl.i} className={`rounded-[20px] p-7 border-[1.5px] relative flex flex-col hover:-translate-y-1 hover:shadow-[0_12px_48px_rgba(0,0,0,.12)] transition-all ${pl.feat ? 'bg-[#1a7a4a] border-[#1a7a4a] text-white' : 'bg-white border-[#ebebeb] text-[#0d1117]'}`}>
              {pl.feat && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#e8a020] text-[#0d1117] px-3.5 py-1 rounded-full text-[.72rem] font-bold tracking-wide whitespace-nowrap">{t.plBadge}</div>}
              <div className="text-3xl mb-4">{pl.ic}</div>
              <div className="text-[1.1rem] font-bold mb-1">{pl.n}</div>
              <div className="text-[.8rem] mb-3 opacity-60">{pl.s}</div>
              <div className={`text-[2rem] font-extrabold mb-4 ${pl.feat ? 'text-white' : ''}`}>{pl.p} <sub className={`text-[.9rem] font-normal ${pl.feat ? 'text-white/50' : 'text-[#9a9a9a]'}`}>DH</sub></div>
              <ul className="list-none flex-1 mb-5 space-y-2">{pl.f.map((f, j) => (
                <li key={j} className={`flex items-start gap-2 text-[.84rem] ${pl.feat ? 'text-white/80' : 'text-[#5a5a5a]'}`}><span className={`font-bold shrink-0 ${pl.feat ? 'text-[#e8a020]' : 'text-[#1a7a4a]'}`}>✓</span>{f}</li>
              ))}</ul>
              <a href={getWaLinkPlan(pl.i)} target="_blank" rel="noopener noreferrer" className={`block w-full text-center py-3 rounded-full font-semibold text-[.88rem] border-[1.5px] transition-all mb-2 no-underline ${pl.feat ? 'bg-white text-[#0d1117] border-white hover:bg-[#e8f5ee]' : 'border-[#ebebeb] text-[#0d1117] hover:bg-[#e8f5ee] hover:border-[#1a7a4a]'}`}>{t.plCta}</a>
              <button onClick={() => setDrawer(pl.i)} className={`text-[.82rem] font-medium underline underline-offset-4 group flex items-center gap-1 mx-auto ${pl.feat ? 'text-white/70 hover:text-white decoration-white/30' : 'text-[#5a5a5a] hover:text-[#1a7a4a] decoration-[#ebebeb]'}`}>
                {t.plDetails} <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          ))}
        </div>
        {/* SERVICE CONFIG CARD */}
        {/* SERVICE CONFIG CARD */}
        <div className="mt-12 bg-white rounded-[20px] p-8 md:p-10 border border-[#ebebeb] shadow-sm reveal">
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-extrabold text-[#0d1117] mb-3">Vous avez déjà un routeur ? On le configure.</h3>
            <p className="text-[#5a5a5a]">Pas besoin d'acheter du matériel.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="flex flex-col items-center text-center">
              <div className="w-14 h-14 bg-[#e8f5ee] text-[#1a7a4a] rounded-full flex items-center justify-center mb-4">
                <MessageCircle className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-[#0d1117] mb-2">1 · Contactez-nous</h4>
              <p className="text-sm text-[#5a5a5a]">Envoyez-nous la marque et le modèle de votre routeur sur WhatsApp. On vérifie la compatibilité gratuitement.</p>
            </div>
            <div className="flex flex-col items-center text-center relative">
              <div className="hidden md:block absolute top-7 -left-1/2 w-full h-[2px] bg-[#e8f5ee] -z-10" />
              <div className="w-14 h-14 bg-[#e8f5ee] text-[#1a7a4a] rounded-full flex items-center justify-center mb-4">
                <Search className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-[#0d1117] mb-2">2 · Diagnostic & devis</h4>
              <p className="text-sm text-[#5a5a5a]">On évalue si la config peut se faire à distance ou nécessite un déplacement. Réponse sous 2h.</p>
            </div>
            <div className="flex flex-col items-center text-center relative">
              <div className="hidden md:block absolute top-7 -left-1/2 w-full h-[2px] bg-[#e8f5ee] -z-10" />
              <div className="w-14 h-14 bg-[#e8f5ee] text-[#1a7a4a] rounded-full flex items-center justify-center mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-[#0d1117] mb-2">3 · Configuration & test</h4>
              <p className="text-sm text-[#5a5a5a]">On applique DNS, filtres et couvre-feux. Vous testez en direct, on valide ensemble.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            <div className="bg-[#f5f0e8] p-5 rounded-2xl border border-[#ebebeb]">
              <div className="text-xl mb-2">📡</div>
              <h5 className="font-bold text-[#0d1117] mb-1">À distance</h5>
              <div className="text-[#1a7a4a] font-black text-xl mb-2">150 DH</div>
              <p className="text-xs text-[#5a5a5a]">Votre routeur reste chez vous</p>
            </div>
            <div className="bg-[#f5f0e8] p-5 rounded-2xl border border-[#ebebeb]">
              <div className="text-xl mb-2">🏠</div>
              <h5 className="font-bold text-[#0d1117] mb-1">Sur site</h5>
              <div className="text-[#1a7a4a] font-black text-xl mb-2">200 DH</div>
              <p className="text-xs text-[#5a5a5a]">Déplacement à Tanger (30 km max)</p>
            </div>
            <div className="bg-[#f5f0e8] p-5 rounded-2xl border border-[#ebebeb]">
              <div className="text-xl mb-2">🔧</div>
              <h5 className="font-bold text-[#0d1117] mb-1">Mise à jour</h5>
              <div className="text-[#1a7a4a] font-black text-xl mb-2">80 DH</div>
              <p className="text-xs text-[#5a5a5a]">Modifier vos règles après achat</p>
            </div>
          </div>

          <div className="text-center flex justify-center gap-4 flex-wrap">
            <a href="https://wa.me/212621429030?text=Bonjour%2C+je+veux+configurer+mon+routeur+existant." target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-8 py-4 bg-[#1a7a4a] hover:bg-[#22a663] text-white rounded-full font-bold transition-colors no-underline">
              Demander un devis sur WhatsApp →
            </a>
          </div>
        </div>
      </section>

      {/* ═══ CATALOGUE DOWNLOAD BLOCK ═══ */}
      <div className="bg-[#0d1117] py-16 px-6 lg:px-[60px] border-t border-white/5">
        <div className="max-w-2xl mx-auto text-center reveal">
          <h3 className="text-2xl font-extrabold text-white mb-3">{t.catTitle || "Besoin d'en discuter en famille ?"}</h3>
          <p className="text-white/50 text-base mb-8 max-w-md mx-auto leading-relaxed">{t.catSub || 'Gardez nos offres sous la main.'}</p>
          <a
            href="/assets/DarBox_Catalogue_2026.pdf"
            download="DarBox_Catalogue_2026.pdf"
            className="inline-flex items-center gap-3 px-8 py-4 bg-white text-[#0d1117] rounded-full font-bold text-[.95rem] no-underline hover:bg-[#e8f5ee] hover:scale-[1.03] transition-all shadow-[0_4px_24px_rgba(255,255,255,.1)] group"
          >
            {t.catBtn || 'Télécharger le Catalogue (PDF)'}
          </a>
        </div>
      </div>

      {/* ═══ TESTIMONIALS ═══ */}
      <section id="avis" className="py-[100px] px-6 lg:px-[60px] bg-[#0d1117] overflow-hidden">
        <div className="max-w-[700px] mx-auto text-center reveal">
          <div className="inline-flex items-center gap-1.5 bg-[rgba(26,122,74,.3)] text-[#22a663] px-3 py-1 rounded-full text-[.75rem] font-bold tracking-wider uppercase mb-6">● {t.teTag}</div>
          <h2 className="text-[clamp(2rem,3.2vw,3rem)] font-extrabold leading-[1.1] text-white mb-6">Rejoignez les premières familles protégées à Tanger.</h2>
          <p className="text-lg text-white/60 mx-auto mb-10">DarBox est en phase de lancement. Soyez parmi les premiers.</p>
          <a href="https://wa.me/212621429030?text=Bonjour%2C+je+souhaite+commander+DarBox." target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-10 py-5 bg-[#1a7a4a] hover:bg-[#22a663] text-white rounded-full font-bold text-lg transition-colors no-underline shadow-lg">Commander maintenant →</a>
        </div>
      </section>

      {/* ═══ WHY US ═══ */}
      <section id="pourquoi" className="py-[100px] px-6 lg:px-[60px] bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[60px] items-start">
          <div className="reveal">
            <div className="inline-flex items-center gap-1.5 bg-[#e8f5ee] text-[#1a7a4a] px-3 py-1 rounded-full text-[.75rem] font-bold tracking-wider uppercase mb-4">● {t.whyTag}</div>
            <h2 className="text-[clamp(2rem,3.2vw,3rem)] font-extrabold leading-[1.1] mb-8">{t.whyTitle}</h2>
            {[{ ic: '🔒', bg: '#e8f5ee', ti: t.w1T, de: t.w1D }, { ic: '📵', bg: '#fef3dc', ti: t.w2T, de: t.w2D }, { ic: '🔐', bg: '#e8f5ee', ti: t.w3T, de: t.w3D }, { ic: '👨‍💻', bg: '#f0f0ff', ti: t.w4T, de: t.w4D }].map((w, i) => (
              <div key={i} className={`flex gap-5 items-start py-7 ${i < 3 ? 'border-b border-[#ebebeb]' : ''}`}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0" style={{ background: w.bg }}>{w.ic}</div>
                <div><div className="text-base font-bold mb-1">{w.ti}</div><p className="text-[.85rem] text-[#5a5a5a] leading-relaxed">{w.de}</p></div>
              </div>
            ))}
          </div>
          <div className="reveal">
            <div ref={metRef} className="bg-[#1a7a4a] rounded-3xl p-10 text-white relative overflow-hidden sticky top-[100px]">
              <div className="absolute -top-[100px] -right-[100px] w-[300px] h-[300px] bg-white/[.07] rounded-full" />
              <div className="text-2xl font-extrabold mb-3">{t.wvT}</div>
              <div className="text-[.9rem] opacity-70 leading-relaxed mb-8">{t.wvS}</div>
              {[t.m1, t.m2, t.m3, t.m4].map((lb, i) => (
                <div key={i} className="mb-4">
                  <div className="text-[.75rem] opacity-70 mb-1.5 uppercase tracking-wide">{lb}</div>
                  <div className="bg-white/20 rounded-full h-2 overflow-hidden"><div className="metric-fill" style={{ width: metVis ? `${mw[i]}%` : '0%' }} /></div>
                  <div className="font-bold text-xl mt-1">{[t.m1V, t.m2V, t.m3V, t.m4V][i]}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section id="faq" className="py-[100px] px-6 lg:px-[60px] bg-[#f5f0e8]">
        <div className="mb-14 reveal">
          <div className="inline-flex items-center gap-1.5 bg-[#e8f5ee] text-[#1a7a4a] px-3 py-1 rounded-full text-[.75rem] font-bold tracking-wider uppercase mb-4">● {t.faqTag}</div>
          <h2 className="text-[clamp(2rem,3.2vw,3rem)] font-extrabold leading-[1.1] mb-4">{t.faqTitle}</h2>
          <p className="text-base text-[#5a5a5a] max-w-[540px]">{t.faqSub}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 reveal">
          {[1, 2, 3, 4, 5, 6].map(n => (
            <div key={n} className="bg-white rounded-[14px] border-[1.5px] border-[#ebebeb] overflow-hidden">
              <div className="flex justify-between items-center px-6 py-[22px] cursor-pointer font-semibold text-[.92rem] gap-3 select-none hover:bg-[#e8f5ee] transition-colors" onClick={() => setFaq(faq === n ? null : n)}>
                {t[`f${n}Q`]}
                <span className={`w-7 h-7 bg-[#f7f7f5] rounded-full flex items-center justify-center text-lg shrink-0 text-[#5a5a5a] faq-toggle-icon ${faq === n ? 'open bg-[#e8f5ee] !text-[#1a7a4a]' : ''}`}>+</span>
              </div>
              <div className={`faq-answer text-[.87rem] text-[#5a5a5a] leading-relaxed ${faq === n ? 'open' : ''}`}>{t[`f${n}A`]}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ NEWSLETTER ═══ */}
      <section id="newsletter" className="py-[100px] px-6 lg:px-[60px] bg-white">
        <div className="max-w-[900px] mx-auto bg-gradient-to-r from-blue-50 to-slate-50 border border-blue-100 rounded-3xl p-10 md:p-14 text-center shadow-xl reveal">
          <div className="w-20 h-20 bg-white shadow-md text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-8 -rotate-6"><Mail className="w-10 h-10" /></div>
          <h2 className="text-3xl font-extrabold text-[#0d1117] mb-4">{t.nlT}</h2>
          <p className="text-lg text-[#5a5a5a] mb-10 max-w-2xl mx-auto">{t.nlS}</p>
          {isSubscribed ? (
            <div className="max-w-xl mx-auto bg-[#e8f5ee] border border-[#1a7a4a]/20 rounded-2xl px-8 py-7 flex flex-col items-center gap-3" style={{ animation: 'modalIn .5s ease' }}>
              <div className="w-14 h-14 bg-[#1a7a4a] rounded-full flex items-center justify-center">
                <Check className="w-7 h-7 text-white" />
              </div>
              <p className="text-[#1a7a4a] font-bold text-lg">✅ Merci ! Votre adresse a bien été ajoutée.</p>
              <p className="text-[#5a5a5a] text-sm">Bienvenue ! Vous recevrez nos prochains conseils à {email}.</p>
            </div>
          ) : (
            <>
              <form className="flex flex-col sm:flex-row max-w-xl mx-auto gap-4" onSubmit={handleSubmit}>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder={t.nlP} className="flex-1 px-6 py-4 rounded-full border border-[#ebebeb] focus:outline-none focus:ring-2 focus:ring-[#1a7a4a] transition-all text-lg" required disabled={isLoading} />
                <button type="submit" disabled={isLoading} className="px-8 py-4 bg-[#0d1117] hover:bg-[#1a7a4a] text-white rounded-full font-bold text-lg transition-colors whitespace-nowrap disabled:opacity-50">
                  {isLoading ? 'Envoi...' : t.nlB}
                </button>
              </form>
              {error && <p className="text-red-500 mt-3 text-sm">{error}</p>}
            </>
          )}
        </div>
      </section>

      {/* ═══ CONTACT ═══ */}
      <section id="contact" className="py-[100px] px-6 lg:px-[60px] bg-[#f5f0e8]">
        <div className="max-w-[400px] mx-auto text-center reveal">
          <div className="bg-[#0d1117] text-white rounded-[2rem] p-8 shadow-2xl flex flex-col items-center">
            <h3 className="text-2xl font-bold mb-1">Merouan El Hattaki</h3>
            <p className="text-[#e8a020] font-medium text-[.9rem] mb-6">Fondateur, DarBox</p>
            <p className="flex items-center gap-2 text-slate-300 text-[.9rem] mb-2"><Globe className="w-4 h-4 text-slate-500" />Tanger, Maroc</p>
            <p className="flex items-center gap-2 text-slate-300 text-[.9rem] mb-8"><Globe className="w-4 h-4 text-slate-500" />darbox.live</p>
            
            <div className="w-full flex flex-col gap-3">
              <button 
                onClick={() => {
                  const vcf = `BEGIN:VCARD\nVERSION:3.0\nFN:Merouan El Hattaki\nORG:DarBox\nTITLE:Fondateur\nEMAIL;TYPE=INTERNET:merouan@darbox.live\nTEL;TYPE=CELL:+212621429030\nURL:https://darbox.live\nADR;TYPE=HOME:;;Tanger;;;MA\nEND:VCARD`;
                  const blob = new Blob([vcf], { type: 'text/vcard' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url; a.download = 'DarBox-Merouan.vcf'; a.click();
                }} 
                className="w-full px-6 py-3.5 bg-[#e8f5ee] hover:bg-[#d1ecd0] text-[#1a7a4a] rounded-full font-bold transition-colors flex items-center justify-center gap-2 border border-[#1a7a4a]/20"
              >
                <UserPlus className="w-4 h-4" /> Enregistrer le contact
              </button>
              
              <a 
                href="https://wa.me/212621429030?text=Bonjour+DarBox%2C+j%27ai+une+question." 
                target="_blank" rel="noopener noreferrer" 
                className="w-full px-6 py-3.5 bg-[#1a7a4a] hover:bg-[#22a663] text-white rounded-full font-bold transition-colors flex items-center justify-center gap-2 no-underline"
              >
                <MessageCircle className="w-4 h-4" /> Nous contacter sur WhatsApp
              </a>
            </div>
            
            <a 
              href="mailto:merouan@darbox.live"
              className="text-sm text-[#F5F0E8] opacity-70 hover:opacity-100 underline underline-offset-4 transition-opacity mt-6 inline-block"
            >
              merouan@darbox.live
            </a>
          </div>
          <div className="mt-8">
            <button onClick={() => go('hero')} className="text-sm opacity-50 hover:opacity-100 transition-opacity">↑ Revenir en haut</button>
          </div>
        </div>
      </section>
    </>
  );
}
