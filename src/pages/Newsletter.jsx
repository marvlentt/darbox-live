import React, { useEffect } from 'react';
import { NT } from '../newsletterTranslations.js';
import { useScrollRevealAll } from '../hooks/useScrollReveal.js';
import DarBoxLogo from '../components/DarBoxLogo.jsx';

/* Router SVG from the newsletter HTML — exact copy */
const RouterSVG = () => (
  <svg className="newsletter-router-float" width="180" height="160" viewBox="0 0 180 160" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="30" y="95" width="120" height="48" rx="10" fill="#1a2a1e" stroke="rgba(26,122,74,0.3)" strokeWidth="1"/>
    <circle cx="52" cy="115" r="5" fill="#22A663"/>
    <circle cx="52" cy="115" r="8" fill="#22A663" opacity="0.2" className="led-pulse"/>
    <circle cx="70" cy="115" r="4" fill="#22A663" opacity="0.5"/>
    <circle cx="86" cy="115" r="4" fill="#E0563B" opacity="0.7" className="led-pulse-orange"/>
    <rect x="110" y="111" width="28" height="8" rx="2" fill="rgba(255,255,255,0.06)"/>
    <rect x="44" y="60" width="6" height="38" rx="3" fill="rgba(255,255,255,0.15)"/>
    <rect x="130" y="54" width="6" height="44" rx="3" fill="rgba(255,255,255,0.15)"/>
    <path d="M70 82 Q90 62 110 82" stroke="#22A663" strokeWidth="3" strokeLinecap="round" fill="none"/>
    <path d="M58 72 Q90 48 122 72" stroke="#22A663" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.5"/>
    <path d="M46 62 Q90 32 134 62" stroke="#22A663" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.25"/>
    <circle cx="90" cy="88" r="5" fill="#22A663"/>
    <circle cx="90" cy="88" r="9" fill="#22A663" opacity="0.15" className="led-pulse"/>
    <path d="M140 18 L168 30 V50 C168 66 155 78 140 83 C125 78 112 66 112 50 V30 Z" fill="rgba(26,122,74,0.08)" stroke="rgba(26,122,74,0.3)" strokeWidth="1"/>
    <path d="M133 51 L138 57 L148 45" stroke="#22A663" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const WaSvg = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
);

export default function Newsletter({ lang }) {
  const t = NT[lang] || NT.fr;
  useScrollRevealAll([lang]);
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="newsletter-page min-h-screen bg-[#EDEAE2] pt-[80px]">
      <div className="max-w-[680px] mx-auto px-4 pb-20">

        {/* Preheader */}
        <p className="text-center text-[11px] text-[#9E9A91] mb-5 tracking-wide">
          {t.preheader} &nbsp;·&nbsp; <a href="#" className="text-[#1a7a4a] no-underline">{t.unsub}</a> &nbsp;·&nbsp; <a href="#" className="text-[#1a7a4a] no-underline">{t.viewBrowser}</a>
        </p>

        {/* ═══ COVER ═══ */}
        <div className="bg-[#0d1117] rounded-t-[20px] relative overflow-hidden min-h-[380px] flex flex-col justify-end">
          {/* Background circles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute w-[400px] h-[400px] -top-[120px] -right-[80px] rounded-full border border-[rgba(26,122,74,0.2)]" />
            <div className="absolute w-[260px] h-[260px] -top-[50px] right-[40px] rounded-full border border-[rgba(26,122,74,0.12)]" />
            <div className="absolute w-[160px] h-[160px] top-[20px] right-[120px] rounded-full border border-[rgba(26,122,74,0.08)]" />
            <div className="absolute w-[500px] h-[300px] -top-[100px] -right-[150px]" style={{ background: 'radial-gradient(ellipse at center, rgba(26,122,74,0.18) 0%, transparent 65%)' }} />
          </div>

          {/* Router illustration */}
          <div className="absolute top-8 right-8 opacity-90 hidden sm:block">
            <RouterSVG />
          </div>

          {/* Logo row */}
          <div className="flex items-center gap-3 px-6 sm:px-10 pt-7 relative z-10">
            <DarBoxLogo variant="dark" size="md" />
            <span className="ml-auto bg-[rgba(26,122,74,0.2)] border border-[rgba(26,122,74,0.35)] text-[#22a663] text-[10px] font-semibold px-2.5 py-1 rounded-full tracking-wider uppercase">{t.badge}</span>
          </div>

          {/* Cover content */}
          <div className="relative z-10 px-6 sm:px-10 pb-9 mt-auto">
            <p className="sr text-[#22a663] text-[11px] font-semibold tracking-[0.1em] uppercase mb-3.5">{t.coverIssue}</p>
            <h1 className="sr text-[clamp(1.8rem,5vw,2.4rem)] font-extrabold text-white leading-[1.08] tracking-[-0.03em] mb-4" data-sr-delay="100">
              {t.coverH1}<br />{t.coverH2}<br /><em className="not-italic text-[#22a663]">{t.coverH3}</em> {t.coverH4}
            </h1>
            <p className="sr text-white/50 text-sm leading-relaxed max-w-[380px]" data-sr-delay="200">{t.coverSub}</p>
          </div>
        </div>

        {/* ═══ STAT BAR ═══ */}
        <div className="bg-[#1a7a4a] grid grid-cols-3">
          {[
            { v: t.stat1V, l: t.stat1L },
            { v: t.stat2V, l: t.stat2L },
            { v: t.stat3V, l: t.stat3L },
          ].map((s, i) => (
            <div key={i} className={`sr py-5 px-4 text-center ${i < 2 ? 'border-r border-white/[.12]' : ''}`} data-sr-delay={i * 100}>
              <span className="block font-extrabold text-[clamp(1.2rem,3vw,1.6rem)] text-white tracking-[-0.02em]">{s.v}</span>
              <span className="block text-[10px] text-white/65 mt-0.5 tracking-wide">{s.l}</span>
            </div>
          ))}
        </div>

        {/* ═══ HOOK ═══ */}
        <div className="bg-[#F5F0E8] border-l-[5px] border-[#0d1117] px-6 sm:px-10 py-10">
          <div className="sr inline-flex items-center gap-2 text-[10px] font-bold text-[#1a7a4a] tracking-[0.1em] uppercase mb-5">
            <span className="w-1.5 h-1.5 bg-[#1a7a4a] rounded-full" />{t.hookKicker}
          </div>
          <h2 className="sr text-[clamp(1.3rem,3.5vw,1.7rem)] font-extrabold text-[#0d1117] leading-[1.15] tracking-[-0.02em] mb-5 scale-in" data-sr-delay="100">
            {t.hookQ}
          </h2>
          <div className="sr inline-flex items-baseline gap-2.5 bg-[#0d1117] text-white px-5 py-3 rounded-xl mb-5" data-sr-delay="200">
            <span className="font-extrabold text-[1.4rem] text-[#22a663]">{t.hookA}</span>
            <span className="text-[13px] text-white/70">{t.hookALabel}</span>
          </div>
          <p className="sr text-sm text-[#5a5a5a] leading-[1.75]" data-sr-delay="300">
            {t.hookBody1} <strong className="text-[#0d1117]">{t.hookStrong1}</strong> {t.hookBody2}<br /><br />
            {t.hookBody3} <strong className="text-[#0d1117]">{t.hookStrong2}</strong> {t.hookBody4}
          </p>
        </div>

        {/* ═══ PROBLEM / SOLUTION ═══ */}
        <div className="grid grid-cols-1 sm:grid-cols-2">
          <div className="bg-[#1A0A07] border-t-4 border-[#E0563B] px-6 sm:px-7 py-8">
            <p className="sr text-[9px] font-bold tracking-[0.12em] uppercase text-[#E0563B] mb-2.5">{t.psProbLabel}</p>
            <p className="sr font-extrabold text-white text-base leading-[1.2] mb-4" data-sr-delay="100">{t.psProbTitle}</p>
            <div className="space-y-2.5">
              {t.psProb.map((item, i) => (
                <div key={i} className="sr flex items-start gap-2.5 text-white/65 text-[12.5px] leading-relaxed" data-sr-delay={150 + i * 80}>
                  <span className="text-[#E0563B] shrink-0 text-xs mt-0.5">✗</span>{item}
                </div>
              ))}
            </div>
          </div>
          <div className="bg-[#071A0E] border-t-4 border-[#1a7a4a] px-6 sm:px-7 py-8">
            <p className="sr text-[9px] font-bold tracking-[0.12em] uppercase text-[#22a663] mb-2.5">{t.psSolLabel}</p>
            <p className="sr font-extrabold text-white text-base leading-[1.2] mb-4" data-sr-delay="100">{t.psSolTitle}</p>
            <div className="space-y-2.5">
              {t.psSol.map((item, i) => (
                <div key={i} className="sr flex items-start gap-2.5 text-white/65 text-[12.5px] leading-relaxed" data-sr-delay={150 + i * 80}>
                  <span className="text-[#22a663] shrink-0 text-xs mt-0.5">✓</span>{item}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ═══ OFFERS ═══ */}
        <div className="bg-[#0d1117] px-6 sm:px-10 py-10">
          <p className="sr text-[10px] font-bold tracking-[0.12em] uppercase text-[#22a663] mb-1.5">{t.offEyebrow}</p>
          <h2 className="sr font-extrabold text-[1.35rem] text-white tracking-[-0.02em] mb-7">{t.offTitle}</h2>

          {[
            { ic: '🛡️', n: t.off1N, p: t.off1P, s: t.off1S, perks: t.off1Perks, feat: false },
            { ic: '⏰', n: t.off2N, p: t.off2P, s: t.off2S, perks: t.off2Perks, feat: true, badge: t.off2Badge },
            { ic: '📚', n: t.off3N, p: t.off3P, s: t.off3S, perks: t.off3Perks, feat: false },
            { ic: '🏠', n: t.off4N, p: t.off4P, s: t.off4S, perks: t.off4Perks, feat: false },
          ].map((o, i) => (
            <div key={i} className={`sr rounded-[14px] p-5 mb-3 flex items-start gap-4 border ${o.feat ? 'bg-[rgba(26,122,74,0.15)] border-[rgba(26,122,74,0.35)]' : 'bg-white/[.04] border-white/[.08]'}`} data-sr-delay={i * 80}>
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0 ${o.feat ? 'bg-[rgba(26,122,74,0.3)]' : 'bg-[rgba(26,122,74,0.15)]'}`}>{o.ic}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline justify-between gap-2 mb-1">
                  <span className="font-extrabold text-sm text-white">{o.n}</span>
                  {o.badge && <span className="bg-[#E0563B] text-white text-[9px] font-bold px-2 py-0.5 rounded-full tracking-wide uppercase whitespace-nowrap">{o.badge}</span>}
                  <span className="font-extrabold text-lg text-[#22a663] ml-auto whitespace-nowrap">{o.p}</span>
                </div>
                <p className="text-white/40 text-[11px] italic mb-2.5">{o.s}</p>
                <div className="flex flex-wrap gap-1.5">
                  {o.perks.map((pk, j) => (
                    <span key={j} className={`rounded-full px-2.5 py-0.5 text-[10.5px] ${o.feat ? 'bg-[rgba(26,122,74,0.2)] text-[#22a663]' : 'bg-white/[.06] text-white/55'}`}>{pk}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {/* Service callout */}
          <div className="sr mt-5 bg-[rgba(224,86,59,0.1)] border border-[rgba(224,86,59,0.25)] border-l-4 border-l-[#E0563B] rounded-xl px-5 py-4">
            <p className="text-[9px] font-bold tracking-[0.1em] uppercase text-[#E0563B] mb-1.5">{t.svcCalloutLabel}</p>
            <p className="text-[13px] text-white/70 leading-relaxed">
              <strong className="text-white">{t.svcCalloutText1}</strong> {t.svcCalloutText2} <strong className="text-white">{t.svcCalloutP1}</strong> {t.svcCalloutSep} <strong className="text-white">{t.svcCalloutP2}</strong>
            </p>
          </div>
        </div>

        {/* ═══ HOW IT WORKS ═══ */}
        <div className="bg-[#F5F0E8] px-6 sm:px-10 py-10">
          <p className="sr text-[10px] font-bold tracking-[0.12em] uppercase text-[#1a7a4a] mb-1.5">{t.howEyebrow}</p>
          <h2 className="sr font-extrabold text-xl text-[#0d1117] tracking-[-0.02em] mb-2">{t.howTitle}</h2>
          <div className="mt-2">
            {[
              { n: t.how1N, ti: t.how1T, de: t.how1D, tag: t.how1Tag },
              { n: t.how2N, ti: t.how2T, de: t.how2D, tag: t.how2Tag },
              { n: t.how3N, ti: t.how3T, de: t.how3D, tag: t.how3Tag },
            ].map((s, i) => (
              <div key={i} className={`sr flex gap-5 py-5 items-start ${i < 2 ? 'border-b border-black/[.07]' : ''}`} data-sr-delay={i * 100}>
                <div className="w-10 h-10 bg-[#0d1117] rounded-[10px] flex items-center justify-center font-extrabold text-[15px] text-[#22a663] shrink-0">{s.n}</div>
                <div>
                  <p className="font-extrabold text-sm text-[#0d1117] mb-1">{s.ti}</p>
                  <p className="text-[12.5px] text-[#6B7280] leading-relaxed">{s.de}</p>
                  <span className="inline-block mt-1.5 bg-[#e8f5ee] text-[#1a7a4a] text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full">{s.tag}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ═══ TESTIMONIAL ═══ */}
        <div className="bg-[#0d1117] border-t-4 border-[#1a7a4a] px-6 sm:px-10 py-9">
          <div className="sr relative pl-5 mb-5">
            <span className="absolute left-0 -top-1 text-[40px] text-[#1a7a4a] font-serif leading-none">"</span>
            <p className="text-[17px] italic text-white/75 leading-relaxed">
              {t.testiQuote1} <strong className="text-[#22a663] not-italic">{t.testiQuoteStrong}</strong> {t.testiQuote2}
            </p>
          </div>
          <div className="sr flex items-center gap-3" data-sr-delay="100">
            <div className="w-10 h-10 rounded-full bg-[#1a7a4a] flex items-center justify-center font-extrabold text-sm text-white shrink-0">{t.testiInit}</div>
            <div>
              <p className="font-semibold text-[13px] text-white">{t.testiName}</p>
              <p className="text-[11px] text-white/35">{t.testiRole}</p>
            </div>
            <span className="ml-auto text-[#E0563B] text-sm">★★★★★</span>
          </div>
        </div>

        {/* ═══ CTA ═══ */}
        <div className="bg-[#1a7a4a] px-6 sm:px-10 py-12 text-center relative overflow-hidden">
          <div className="absolute -top-[80px] -right-[80px] w-[280px] h-[280px] border-[60px] border-white/5 rounded-full pointer-events-none" />
          <p className="sr text-[10px] font-bold tracking-[0.12em] uppercase text-white/60 mb-3">{t.ctaEyebrow}</p>
          <h2 className="sr font-extrabold text-[clamp(1.5rem,4vw,1.8rem)] text-white leading-[1.1] tracking-[-0.02em] mb-3" data-sr-delay="100">
            {t.ctaTitle1}<br />{t.ctaTitle2}
          </h2>
          <p className="sr text-sm text-white/70 leading-relaxed mb-7 max-w-[360px] mx-auto" data-sr-delay="200">{t.ctaSub}</p>
          <div className="sr flex flex-wrap justify-center gap-3 mb-5" data-sr-delay="300">
            <a href="https://darbox.ma" className="inline-block bg-[#0d1117] text-white font-extrabold text-sm px-8 py-4 rounded-full no-underline tracking-wide">{t.ctaBtn}</a>
            <a href="https://wa.me/212621429030" className="inline-flex items-center gap-2 bg-[#25D366] text-white font-bold text-[13px] px-6 py-3 rounded-full no-underline">
              <WaSvg />{t.ctaWa}
            </a>
          </div>
          {/* Price pills */}
          <div className="sr flex flex-wrap justify-center gap-3 mt-5" data-sr-delay="400">
            {[
              { l: t.off1N, v: t.off1P },
              { l: t.off2N, v: t.off2P },
              { l: t.off3N, v: t.off3P },
              { l: t.off4N, v: t.off4P },
            ].map((p, i) => (
              <div key={i} className="bg-white/10 rounded-lg px-3.5 py-2 text-center">
                <span className="block text-[9px] text-white/50 tracking-wider uppercase">{p.l}</span>
                <span className="block font-extrabold text-white">{p.v}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ═══ SLOGANS ═══ */}
        <div className="bg-[#0d1117] px-6 sm:px-10 py-5 flex flex-col sm:flex-row justify-between items-center gap-2">
          <span className="text-[11px] text-white/35 italic text-center flex-1">🇫🇷 <span className="text-white/60">Branchez. Protégez. Respirez.</span></span>
          <span className="text-[11px] text-white/35 italic text-center flex-1">🇬🇧 <span className="text-white/60">Plug, play, protect.</span></span>
          <span className="text-[11px] text-white/35 italic text-center flex-1" dir="rtl">🇲🇦 <span className="text-white/60">ركّب، حْمي وليداتك، وارتاح.</span></span>
        </div>

        {/* ═══ FOOTER ═══ */}
        <div className="bg-[#06090D] rounded-b-[20px] px-6 sm:px-10 py-7">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 mb-4 border-b border-white/[.07] gap-3">
            <DarBoxLogo variant="dark" size="sm" />
            <div className="flex gap-4">
              <a href="https://darbox.ma" className="text-[11px] text-white/30 no-underline">{t.footerSiteWeb}</a>
              <a href="https://wa.me/212621429030" className="text-[11px] text-white/30 no-underline">WhatsApp</a>
              <a href="#" className="text-[11px] text-white/30 no-underline">{t.unsub}</a>
            </div>
          </div>
          <p className="text-[11px] text-white/25 leading-[1.9]">
            <strong className="text-white/45">{t.footerContact}</strong> · {t.footerRole}<br />
            {t.footerSchool}<br />
            {t.footerPhone} · {t.footerEmail}
          </p>
          <p className="text-[10px] text-white/15 leading-relaxed mt-3.5">
            © 2025 DarBox · {t.badge}
          </p>
        </div>
      </div>
    </div>
  );
}
