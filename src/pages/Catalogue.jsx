import React, { useState, useEffect, useRef } from 'react';
import { Printer } from 'lucide-react';
import { CT } from '../catalogueTranslations.js';
import { useScrollRevealAll } from '../hooks/useScrollReveal.js';
import DarBoxLogo from '../components/DarBoxLogo.jsx';

export default function Catalogue({ lang }) {
  const t = CT[lang] || CT.fr;
  const [metVis, setMetVis] = useState(false);
  const finRef = useRef(null);

  useScrollRevealAll([lang]);

  useEffect(() => {
    if (!finRef.current) return;
    const obs = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) setMetVis(true); }),
      { threshold: 0.3 }
    );
    obs.observe(finRef.current);
    return () => obs.disconnect();
  }, [lang]);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const rateToWidth = (r) => parseInt(r) || 0;

  return (
    <div className="catalogue-page print:bg-white print:text-black">

      {/* ── PRINT BUTTON (sticky) ── */}
      <button
        onClick={() => window.print()}
        className="fixed bottom-8 right-24 z-50 bg-[#0d1117] text-white px-6 py-3.5 rounded-full font-bold text-[.88rem] flex items-center gap-2.5 shadow-[0_8px_32px_rgba(0,0,0,.3)] hover:bg-[#1a7a4a] transition-all print:hidden"
      >
        <Printer className="w-5 h-5" /> {t.printBtn}
      </button>

      {/* ═══ 1. HERO SLIDE ═══ */}
      <section className="min-h-screen bg-[#0d1117] flex flex-col justify-center items-center text-center px-6 pt-32 pb-20 relative overflow-x-hidden print:min-h-0 print:py-12">
        <div className="absolute -top-[200px] -right-[200px] w-[600px] h-[600px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(26,122,74,0.15) 0%, transparent 70%)' }} />
        <div className="absolute top-[60%] -left-[100px] w-[300px] h-[300px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(224,86,59,0.08) 0%, transparent 70%)' }} />

        <div className="sr" data-sr-delay="0">
          <div className="flex items-center justify-center mb-12">
            <DarBoxLogo variant="dark" size="lg" />
          </div>
        </div>
        <div className="sr" data-sr-delay="200">
          <h1 className="text-[clamp(2.5rem,5vw,4.5rem)] font-extrabold text-white leading-[1.05] tracking-[-0.04em] mt-4 mb-6">
            {t.heroSub1}
          </h1>
        </div>
        <div className="sr" data-sr-delay="400">
          <p className="text-[clamp(1.5rem,3vw,2.5rem)] font-extrabold text-white/90 leading-[1.15] tracking-[-0.03em] max-w-[600px]">
            {t.heroTag1}<br />{t.heroTag2}<br />{t.heroTag3}<br />{t.heroTag4 && <>{t.heroTag4}</>}
          </p>
        </div>
        <div className="sr" data-sr-delay="600">
          <p className="text-white/50 text-lg mt-8 font-medium">{t.heroSlogan}</p>
        </div>
        <div className="sr" data-sr-delay="800">
          <div className="flex flex-wrap justify-center gap-4 mt-10">
            <span className="px-4 py-2 rounded-full bg-[#1a7a4a]/20 border border-[#1a7a4a]/40 text-[#22a663] text-sm font-semibold">{t.heroBadge}</span>
          </div>
        </div>
        <div className="sr" data-sr-delay="1000">
          <p className="text-white/30 text-sm mt-12">{t.heroFooter}</p>
          <p className="text-white/20 text-xs mt-2">{t.heroCredit}</p>
        </div>
      </section>

      {/* ═══ 2. PROBLEM / SOLUTION (Split Screen) ═══ */}
      <section className="min-h-screen grid grid-cols-1 lg:grid-cols-2 print:min-h-0">
        {/* Problem side */}
        <div className="bg-[#0d1117] px-8 lg:px-14 py-20 flex flex-col justify-center">
          <div className="sr">
            <p className="text-[#E0563B] text-xs font-bold tracking-[0.15em] uppercase mb-4">● {t.probTitle}</p>
            <h2 className="text-[clamp(1.6rem,3vw,2.4rem)] font-extrabold text-white leading-[1.1] tracking-[-0.03em] mb-4">
              {t.probSub}<br /><span className="text-[#E0563B]">{t.probQ}</span>
            </h2>
          </div>
          <div className="space-y-6 mt-8">
            {[
              { icon: t.prob1Icon, title: t.prob1T, desc: t.prob1D },
              { icon: t.prob2Icon, title: t.prob2T, desc: t.prob2D },
              { icon: t.prob3Icon, title: t.prob3T, desc: t.prob3D },
            ].map((p, i) => (
              <div key={i} className="sr flex gap-4 items-start" data-sr-delay={i * 150}>
                <div className="w-12 h-12 bg-[#E0563B]/15 rounded-2xl flex items-center justify-center text-2xl shrink-0">{p.icon}</div>
                <div>
                  <div className="text-white font-bold text-base mb-1">{p.title}</div>
                  <p className="text-white/50 text-sm leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Solution side */}
        <div className="bg-[#e8f5ee] px-8 lg:px-14 py-20 flex flex-col justify-center">
          <div className="sr">
            <p className="text-[#1a7a4a] text-xs font-bold tracking-[0.15em] uppercase mb-4">● DarBox</p>
            <h2 className="text-[clamp(1.4rem,2.5vw,2rem)] font-extrabold text-[#0d1117] leading-[1.15] tracking-[-0.03em] mb-6">
              {t.probSolution}
            </h2>
          </div>
          <div className="sr" data-sr-delay="200">
            <div className="bg-white rounded-2xl p-8 shadow-[0_8px_40px_rgba(0,0,0,.06)]">
              <p className="text-xs font-bold text-[#1a7a4a] tracking-[0.12em] uppercase mb-6">{t.howTitle}</p>
              <p className="text-[#5a5a5a] text-sm mb-6 font-medium">{t.howSub}</p>
              {[
                { n: t.how1N, ic: t.how1Icon, ti: t.how1T, de: t.how1D },
                { n: t.how2N, ic: t.how2Icon, ti: t.how2T, de: t.how2D },
                { n: t.how3N, ic: t.how3Icon, ti: t.how3T, de: t.how3D },
              ].map((s, i) => (
                <div key={i} className={`flex gap-4 items-start py-4 ${i < 2 ? 'border-b border-[#ebebeb]' : ''}`}>
                  <div className="w-10 h-10 bg-[#0d1117] rounded-xl flex items-center justify-center text-[#22a663] font-extrabold text-sm shrink-0">{s.n}</div>
                  <div>
                    <div className="font-bold text-[#0d1117] text-sm mb-1">{s.ic} {s.ti}</div>
                    <p className="text-[#5a5a5a] text-xs leading-relaxed">{s.de}</p>
                  </div>
                </div>
              ))}
              <p className="text-xs text-[#1a7a4a] font-semibold mt-4 px-2 py-2 bg-[#e8f5ee] rounded-lg text-center">{t.howCompat}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 3. OFFERS (Pricing Cards) ═══ */}
      <section className="py-24 px-6 lg:px-[60px] bg-[#f5f0e8] print:py-12">
        <div className="max-w-6xl mx-auto">
          <div className="sr text-center mb-16">
            <p className="text-[#1a7a4a] text-xs font-bold tracking-[0.15em] uppercase mb-3">● {t.offTitle}</p>
            <h2 className="text-[clamp(1.8rem,3.5vw,3rem)] font-extrabold text-[#0d1117] tracking-[-0.04em]">{t.offSub}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { ic: t.off1Icon, n: t.off1N, s: t.off1S, p: t.off1P, pay: t.off1Pay, f: t.off1F, feat: false },
              { ic: t.off2Icon, n: t.off2N, s: t.off2S, p: t.off2P, pay: t.off2Pay, f: t.off2F, feat: true, badge: t.off2Badge },
              { ic: t.off3Icon, n: t.off3N, s: t.off3S, p: t.off3P, pay: t.off3Pay, f: t.off3F, feat: false },
              { ic: t.off4Icon, n: t.off4N, s: t.off4S, p: t.off4P, pay: t.off4Pay, f: t.off4F, feat: false },
            ].map((pl, i) => (
              <div
                key={i}
                className={`sr rounded-[20px] p-7 border-[1.5px] relative flex flex-col hover:-translate-y-1 hover:shadow-[0_12px_48px_rgba(0,0,0,.12)] transition-all backdrop-blur-sm print:hover:translate-y-0 print:shadow-none ${
                  pl.feat
                    ? 'bg-[#0d1117] border-[#1a7a4a] text-white'
                    : 'bg-white/80 border-[#ebebeb] text-[#0d1117]'
                }`}
                data-sr-delay={i * 100}
              >
                {pl.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#e8a020] text-[#0d1117] px-3.5 py-1 rounded-full text-[.72rem] font-bold tracking-wide whitespace-nowrap">{pl.badge}</div>
                )}
                <div className="text-3xl mb-4">{pl.ic}</div>
                <div className="text-[1.1rem] font-bold mb-1">{pl.n}</div>
                <div className={`text-[.8rem] mb-3 ${pl.feat ? 'text-white/50' : 'text-[#5a5a5a]'} italic`}>{pl.s}</div>
                <div className="text-[2rem] font-extrabold mb-1">{pl.p}</div>
                <div className={`text-[.75rem] mb-5 ${pl.feat ? 'text-white/40' : 'text-[#9a9a9a]'}`}>{pl.pay}</div>
                <div className="flex-1 space-y-2.5 mb-5">
                  {pl.f.map((f, j) => (
                    <div key={j} className={`flex items-start gap-2 text-[.84rem] ${pl.feat ? 'text-white/80' : 'text-[#5a5a5a]'}`}>
                      <span className={`font-bold shrink-0 ${pl.feat ? 'text-[#22a663]' : 'text-[#1a7a4a]'}`}>✓</span>{f}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="sr mt-6 text-center">
            <div className="inline-block bg-[#E0563B]/10 border border-[#E0563B]/25 border-l-4 border-l-[#E0563B] rounded-xl px-6 py-4">
              <p className="text-[#0d1117] text-sm font-semibold">{t.offNewService}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 3.5 SERVICE EXCLUSIF ═══ */}
      <section className="py-24 px-6 lg:px-[60px] bg-white print:py-12">
        <div className="max-w-4xl mx-auto">
          <div className="sr text-center mb-14">
            <p className="text-[#E0563B] text-xs font-bold tracking-[0.15em] uppercase mb-3">● {t.svcTitle}</p>
            <h2 className="text-[clamp(1.8rem,3.5vw,2.8rem)] font-extrabold text-[#0d1117] tracking-[-0.04em] mb-4">
              {t.svcSub1}<br />{t.svcSub2}
            </h2>
            <p className="text-[#5a5a5a] text-base max-w-xl mx-auto leading-relaxed">{t.svcDesc}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { ic: t.svc1Icon, ti: t.svc1T, p: t.svc1P, de: t.svc1D, badge: t.svc1Badge },
              { ic: t.svc2Icon, ti: t.svc2T, p: t.svc2P, de: t.svc2D },
              { ic: t.svc3Icon, ti: t.svc3T, p: t.svc3P, de: t.svc3D },
            ].map((s, i) => (
              <div key={i} className="sr bg-[#f5f0e8] rounded-2xl p-7 relative" data-sr-delay={i * 100}>
                {s.badge && (
                  <span className="absolute -top-2.5 right-4 bg-[#1a7a4a] text-white px-3 py-1 rounded-full text-[.7rem] font-bold">{s.badge}</span>
                )}
                <div className="text-3xl mb-4">{s.ic}</div>
                <div className="font-bold text-[#0d1117] text-lg mb-1">{s.ti}</div>
                <div className="text-[#1a7a4a] font-extrabold text-2xl mb-3">{s.p}</div>
                <p className="text-[#5a5a5a] text-sm leading-relaxed">{s.de}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 4. FINANCIAL DASHBOARD (NO TABLES) ═══ */}
      <section ref={finRef} className="py-24 px-6 lg:px-[60px] bg-[#0d1117] print:py-12 print:bg-white print:text-black">
        <div className="max-w-5xl mx-auto">
          <div className="sr text-center mb-16">
            <p className="text-[#22a663] text-xs font-bold tracking-[0.15em] uppercase mb-3">● {t.finTitle}</p>
            <h2 className="text-[clamp(1.8rem,3.5vw,3rem)] font-extrabold text-white print:text-[#0d1117] tracking-[-0.04em]">{t.finSub}</h2>
          </div>

          {/* Stat callouts */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
            {[
              { v: t.finStat1V, l: t.finStat1L, d: t.finStat1D },
              { v: t.finStat2V, l: t.finStat2L, d: t.finStat2D },
              { v: t.finStat3V, l: t.finStat3L, d: t.finStat3D },
              { v: t.finStat4V, l: t.finStat4L, d: t.finStat4D },
            ].map((s, i) => (
              <div key={i} className="sr bg-white/5 border border-white/10 rounded-2xl p-6 text-center print:border-[#ebebeb] print:bg-[#f5f0e8]" data-sr-delay={i * 100}>
                <div className="text-[clamp(1.8rem,4vw,2.8rem)] font-extrabold text-[#22a663] leading-none mb-2">{s.v}</div>
                <div className="text-white font-bold text-sm mb-1 print:text-[#0d1117]">{s.l}</div>
                <div className="text-white/40 text-xs print:text-[#5a5a5a]">{s.d}</div>
              </div>
            ))}
          </div>

          {/* Margin bars per offer */}
          <div className="space-y-6">
            {t.finRows.map((row, i) => (
              <div key={i} className="sr" data-sr-delay={i * 80}>
                <div className="flex justify-between items-baseline mb-2">
                  <span className="text-white font-bold text-sm print:text-[#0d1117]">{row.name}</span>
                  <div className="flex gap-4 text-xs">
                    <span className="text-white/40 print:text-[#5a5a5a]">{row.price} → {row.cost}</span>
                    <span className="text-[#22a663] font-bold">{row.margin}</span>
                  </div>
                </div>
                <div className="bg-white/10 rounded-full h-3 overflow-hidden print:bg-[#ebebeb]">
                  <div
                    className="h-full rounded-full transition-all duration-[1.5s] ease-out"
                    style={{
                      width: metVis ? `${rateToWidth(row.rate)}%` : '0%',
                      background: row.rate === '87%' ? '#E0563B' : '#1a7a4a',
                    }}
                  />
                </div>
                <div className="text-right mt-1">
                  <span className={`font-extrabold text-lg ${row.rate === '87%' ? 'text-[#E0563B]' : 'text-[#22a663]'}`}>{row.rate}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="sr mt-12">
            <p className="text-white/40 text-sm leading-relaxed text-center italic max-w-2xl mx-auto print:text-[#5a5a5a]">{t.finStrategy}</p>
          </div>
        </div>
      </section>

      {/* ═══ 5. BUYER PERSONA ("Khadija") ═══ */}
      <section className="py-24 px-6 lg:px-[60px] bg-[#f5f0e8] print:py-12">
        <div className="max-w-4xl mx-auto">
          <div className="sr text-center mb-14">
            <p className="text-[#1a7a4a] text-xs font-bold tracking-[0.15em] uppercase mb-3">● {t.personaTitle}</p>
            <h2 className="text-[clamp(1.8rem,3.5vw,2.8rem)] font-extrabold text-[#0d1117] tracking-[-0.04em]">{t.personaSub}</h2>
          </div>

          <div className="sr bg-white rounded-3xl shadow-[0_12px_60px_rgba(0,0,0,.08)] overflow-hidden">
            {/* Profile header */}
            <div className="bg-[#0d1117] px-8 py-8 flex flex-col sm:flex-row items-center gap-6">
              <div className="w-20 h-20 rounded-full bg-[#1a7a4a] flex items-center justify-center shrink-0">
                <span className="text-white font-extrabold text-3xl">{t.personaInit}</span>
              </div>
              <div className="text-center sm:text-left">
                <div className="text-white font-extrabold text-xl mb-1">{t.personaName}</div>
                <div className="text-white/50 text-sm mb-2">{t.personaInfo}</div>
                <span className="inline-block bg-[#1a7a4a]/20 border border-[#1a7a4a]/40 text-[#22a663] px-3 py-1 rounded-full text-xs font-semibold">{t.personaCity}</span>
              </div>
            </div>

            {/* 2x2 Empathy map */}
            <div className="grid grid-cols-1 sm:grid-cols-2">
              {[
                { label: t.personaSays, text: t.personaSaysQ, bg: 'bg-[#e8f5ee]', border: 'border-[#1a7a4a]/20' },
                { label: t.personaThinks, text: t.personaThinksQ, bg: 'bg-[#fef3dc]', border: 'border-[#e8a020]/20' },
                { label: t.personaDoes, text: t.personaDoesQ, bg: 'bg-white', border: 'border-[#ebebeb]' },
                { label: t.personaFeels, text: t.personaFeelsQ, bg: 'bg-[#fde8e8]', border: 'border-[#E0563B]/20' },
              ].map((q, i) => (
                <div key={i} className={`${q.bg} border ${q.border} p-7`}>
                  <div className="font-bold text-[#0d1117] text-sm mb-3">{q.label}</div>
                  <p className="text-[#5a5a5a] text-sm leading-relaxed italic">{q.text}</p>
                </div>
              ))}
            </div>

            {/* Trigger */}
            <div className="bg-[#0d1117] px-8 py-5">
              <p className="text-[#22a663] text-sm font-semibold text-center">{t.personaTrigger}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 6. CTA ═══ */}
      <section className="min-h-[80vh] bg-[#0d1117] flex flex-col justify-center items-center text-center px-6 py-20 relative overflow-hidden print:min-h-0 print:py-12 print:bg-white">
        <div className="absolute -top-[150px] -right-[150px] w-[400px] h-[400px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(26,122,74,0.12) 0%, transparent 65%)' }} />
        <div className="sr">
          <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-extrabold text-white leading-[1.05] tracking-[-0.04em] mb-8 print:text-[#0d1117]">
            {t.ctaT1}<br />{t.ctaT2}<br /><span className="text-[#E0563B]">{t.ctaT3}</span>
          </h2>
        </div>
        <div className="sr" data-sr-delay="200">
          <div className="max-w-lg mx-auto">
            <p className="text-white/80 font-bold text-lg mb-2 print:text-[#0d1117]">{t.ctaReady}</p>
            <p className="text-white/50 text-sm mb-3 print:text-[#5a5a5a]">{t.ctaWa}</p>
            <a href="https://wa.me/212621429030" className="inline-block text-[#22a663] font-extrabold text-3xl mb-4 no-underline hover:text-[#1a7a4a] transition-colors">{t.ctaPhone}</a>
            <p className="text-white/30 text-sm mb-10 print:text-[#5a5a5a]">{t.ctaDelivery}</p>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-10 print:border-[#ebebeb] print:bg-[#f5f0e8]">
              <p className="text-white/60 font-medium text-sm mb-2 print:text-[#5a5a5a]">{t.ctaQTitle}</p>
              <p className="text-white/40 text-sm mb-2 print:text-[#5a5a5a]">{t.ctaGuideIntro}</p>
              <p className="text-white font-bold italic text-base print:text-[#0d1117]">{t.ctaGuide}</p>
              <p className="text-white/30 text-xs mt-2 print:text-[#5a5a5a]">{t.ctaGuideNote}</p>
            </div>

            <p className="text-white/25 text-sm italic max-w-md mx-auto print:text-[#5a5a5a]">{t.ctaQuote}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
