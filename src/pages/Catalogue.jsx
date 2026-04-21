import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { CT } from '../catalogueTranslations.js';
import { ArrowLeft } from 'lucide-react';

export default function Catalogue({ lang = 'fr' }) {
  const t = CT[lang] || CT.fr;
  const finRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="darbox-catalogue-root bg-[#F5F0E8] print:bg-white pt-[76px] print:pt-0">
      <style>{`
        /* ═══ TOKENS ═══ */
        .darbox-catalogue-root {
          font-family: 'Outfit', sans-serif;
          font-weight: 400;
          color: #0D1117;
          line-height: 1.6;
          --primary: #1A7A4A;
          --accent: #E0563B;
          --cream: #F5F0E8;
          --dark: #0D1117;
          --white: #FFFFFF;
          --text-muted: #5a5a5a;
          --border: #ebebeb;
          --green-glow: #22a663;
          --page-w: 900px;
          --page-px: 60px;
        }

        .darbox-catalogue-root * {
          box-sizing: border-box;
        }

        /* ═══ SECTION / PAGE SYSTEM ═══ */
        .dc-page {
          width: var(--page-w);
          max-width: 100%;
          margin: 0 auto;
          min-height: 100vh;
          padding: var(--page-px);
          display: flex;
          flex-direction: column;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }

        /* ═══ 1. COVER ═══ */
        .dc-cover {
          background: var(--dark);
          text-align: center;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 40px;
          padding-top: 40px;
        }
        .dc-cover::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 800px 600px at 70% 40%, rgba(26,122,74,0.18) 0%, transparent 70%),
            radial-gradient(ellipse 400px 300px at 20% 80%, rgba(224,86,59,0.10) 0%, transparent 60%);
          pointer-events: none;
          z-index: 0;
        }
        .dc-cover-watermark {
          position: absolute;
          bottom: -20px;
          right: -10px;
          font-family: 'Outfit', sans-serif;
          font-weight: 900;
          font-size: clamp(120px, 18vw, 200px);
          color: rgba(255,255,255,0.03);
          letter-spacing: -8px;
          user-select: none;
          pointer-events: none;
          z-index: 0;
          line-height: 1;
        }
        .dc-cover-badge {
          display: inline-block;
          padding: 6px 18px;
          border-radius: 999px;
          background: rgba(26,122,74,0.15);
          border: 1px solid rgba(26,122,74,0.35);
          color: var(--green-glow);
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          margin-bottom: 32px;
          position: relative; z-index: 1;
        }
        .dc-cover h1 {
          font-size: clamp(1.6rem, 4vw, 2.8rem);
          font-weight: 700;
          color: var(--white);
          line-height: 1.15;
          letter-spacing: -0.03em;
          margin-bottom: 20px;
          position: relative;
          z-index: 1;
        }
        .dc-cover-slogan {
          font-size: 1.05rem;
          font-weight: 600;
          color: rgba(255,255,255,0.45);
          margin-bottom: 0;
          position: relative; z-index: 1;
        }
        .dc-cover-footer {
          font-size: 0.82rem;
          color: rgba(255,255,255,0.3);
          margin-top: auto;
          padding-top: 40px;
          position: relative; z-index: 1;
          text-align: center;
        }
        .dc-cover-wa {
          display: inline-block;
          color: var(--green-glow);
          font-weight: 700;
          font-size: 1.15rem;
          margin-top: 6px;
        }
        
        /* ── Flow line ── */
        .dc-flow-line {
          width: 560px;
          max-width: 100%;
          margin: 40px auto 0;
          display: flex;
          align-items: center;
          gap: 0;
          position: relative;
          z-index: 1;
        }
        .dc-flow-card {
          width: 140px;
          padding: 16px 12px;
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 12px;
          background: rgba(255,255,255,0.04);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          text-align: center;
          flex-shrink: 0;
        }
        .dc-flow-card.center {
          width: 160px;
          padding: 20px 16px;
          background: linear-gradient(135deg, #1A7A4A 0%, #145e38 100%);
          border: none;
          border-radius: 16px;
          box-shadow: 0 0 40px rgba(26,122,74,0.4), 0 0 80px rgba(26,122,74,0.15);
        }
        .dc-flow-card .fc-icon { margin-bottom: 8px; display: flex; justify-content: center; }
        .dc-flow-card .fc-title {
          font-size: 11px;
          color: rgba(255,255,255,0.6);
          font-weight: 400;
        }
        .dc-flow-card.center .fc-title {
          font-size: 15px;
          color: #fff;
          font-weight: 800;
        }
        .dc-flow-card .fc-sub {
          font-size: 9px;
          color: rgba(255,255,255,0.35);
          margin-top: 4px;
          line-height: 1.35;
        }
        .dc-flow-card.center .fc-sub {
          color: rgba(255,255,255,0.6);
          font-size: 10px;
        }
        .dc-flow-connector {
          flex: 1;
          min-width: 30px;
          height: 1px;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .dc-flow-connector svg { width: 100%; height: 20px; overflow: visible; }
        .dc-flow-connector .flow-arrow {
          stroke: rgba(255,255,255,0.2);
          stroke-width: 1;
          fill: none;
          stroke-dasharray: 6 4;
          animation: flow 2s linear infinite;
        }
        .dc-flow-connector .flow-head {
          fill: rgba(255,255,255,0.25);
        }
        @keyframes flow {
          from { stroke-dashoffset: 20; }
          to { stroke-dashoffset: 0; }
        }
        
        .dc-dot-active {
          display: inline-block;
          width: 6px; height: 6px;
          border-radius: 50%;
          background: var(--green-glow);
          margin-right: 4px;
          vertical-align: middle;
          animation: pulse 2s ease-in-out infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(34,166,99,0.5); }
          50% { opacity: 0.6; box-shadow: 0 0 0 6px rgba(34,166,99,0); }
        }
        
        .dc-flow-note {
          font-size: 10px;
          color: rgba(255,255,255,0.3);
          text-align: center;
          margin-top: 12px;
          letter-spacing: 0.5px;
          position: relative; z-index: 1;
        }
        
        /* ── Stats bar ── */
        .dc-stats-bar {
          width: 100%;
          max-width: 500px;
          margin: 36px auto 0;
          display: grid;
          grid-template-columns: 1fr auto 1fr auto 1fr;
          align-items: center;
          position: relative; z-index: 1;
        }
        .dc-stat-item { text-align: center; }
        .dc-stat-label { font-size: 10px; color: rgba(255,255,255,0.4); margin-bottom: 2px; }
        .dc-stat-number { font-family: 'Outfit', sans-serif; font-weight: 800; font-size: 28px; line-height: 1.1; }
        .dc-stat-sub { font-size: 9px; color: rgba(255,255,255,0.35); margin-top: 2px; }
        .dc-stat-sep { width: 1px; height: 40px; background: rgba(255,255,255,0.1); }
        
        /* ═══ 2. PROBLEM ═══ */
        .dc-problem { background: var(--cream); }
        .dc-section-label {
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--accent);
          margin-bottom: 12px;
        }
        .dc-section-label--green { color: var(--primary); }
        .dc-problem h2 {
          font-size: clamp(1.6rem, 3.5vw, 2.6rem);
          font-weight: 700;
          color: var(--dark);
          line-height: 1.1;
          letter-spacing: -0.03em;
          margin-bottom: 8px;
        }
        .dc-problem h2 span { color: var(--accent); }
        .dc-problem-intro { font-size: 0.92rem; color: var(--text-muted); margin-bottom: 40px; max-width: 540px; }
        .dc-pain-grid { display: grid; grid-template-columns: 1fr; gap: 24px; }
        .dc-pain-card { display: flex; gap: 16px; align-items: flex-start; }
        .dc-pain-icon { width: 52px; height: 52px; border-radius: 16px; background: rgba(224,86,59,0.1); display: flex; align-items: center; justify-content: center; font-size: 1.5rem; flex-shrink: 0; }
        .dc-pain-card h3 { font-size: 1rem; font-weight: 700; color: var(--dark); margin-bottom: 4px; }
        .dc-pain-card p { font-size: 0.85rem; color: var(--text-muted); line-height: 1.55; }
        .dc-solution-box { margin-top: 40px; background: var(--white); border-radius: 20px; padding: 32px; border-left: 4px solid var(--primary); box-shadow: 0 8px 40px rgba(0,0,0,0.05); }
        .dc-solution-box p { font-size: 0.92rem; color: var(--dark); line-height: 1.6; }
        .dc-solution-box strong { color: var(--primary); }
        
        /* ═══ 3. HOW IT WORKS ═══ */
        .dc-how { background: var(--white); }
        .dc-how h2 { font-size: clamp(1.6rem, 3.5vw, 2.6rem); font-weight: 700; color: var(--dark); line-height: 1.1; letter-spacing: -0.03em; margin-bottom: 8px; }
        .dc-how-sub { font-size: 0.92rem; color: var(--text-muted); margin-bottom: 48px; }
        .dc-steps { display: flex; flex-direction: column; gap: 36px; counter-reset: step; }
        .dc-step { display: flex; gap: 20px; align-items: flex-start; }
        .dc-step-num { width: 48px; height: 48px; border-radius: 14px; background: var(--dark); color: var(--green-glow); font-weight: 900; font-size: 0.95rem; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .dc-step-content h3 { font-size: 1.05rem; font-weight: 700; color: var(--dark); margin-bottom: 4px; }
        .dc-step-content h3 .emoji { margin-right: 6px; }
        .dc-step-content p { font-size: 0.85rem; color: var(--text-muted); line-height: 1.6; }
        .dc-step-divider { width: 2px; height: 24px; background: var(--border); margin-left: 23px; }
        .dc-compat-bar { margin-top: 32px; padding: 12px 20px; background: rgba(26,122,74,0.08); border-radius: 12px; text-align: center; font-size: 0.82rem; font-weight: 600; color: var(--primary); }
        
        /* ═══ 4. OFFERS ═══ */
        .dc-offers { background: var(--cream); }
        .dc-offers h2 { font-size: clamp(1.6rem, 3.5vw, 2.6rem); font-weight: 700; color: var(--dark); line-height: 1.1; letter-spacing: -0.03em; margin-bottom: 8px; text-align: center; }
        .dc-offers-sub { font-size: 0.92rem; color: var(--text-muted); text-align: center; margin-bottom: 40px; }
        .dc-offers-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .dc-offer-card { background: var(--white); border-radius: 20px; padding: 28px; border: 1.5px solid var(--border); border-left: 4px solid var(--primary); position: relative; display: flex; flex-direction: column; transition: transform 0.25s ease, box-shadow 0.25s ease; }
        .dc-offer-card:hover { transform: translateY(-4px); box-shadow: 0 12px 48px rgba(0,0,0,0.1); }
        .dc-offer-card.featured { background: var(--dark); border-color: var(--primary); color: var(--white); }
        .dc-offer-badge { position: absolute; top: -12px; left: 50%; transform: translateX(-50%); background: var(--accent); color: var(--white); padding: 4px 14px; border-radius: 999px; font-size: 0.68rem; font-weight: 700; letter-spacing: 0.04em; white-space: nowrap; }
        .dc-offer-icon { font-size: 1.8rem; margin-bottom: 12px; }
        .dc-offer-name { font-size: 1.1rem; font-weight: 700; margin-bottom: 2px; }
        .dc-offer-tagline { font-size: 0.78rem; color: var(--text-muted); font-style: italic; margin-bottom: 12px; }
        .featured .dc-offer-tagline { color: rgba(255,255,255,0.45); }
        .dc-offer-price { font-size: 2rem; font-weight: 900; margin-bottom: 2px; }
        .dc-offer-pay { font-size: 0.72rem; color: #9a9a9a; margin-bottom: 16px; }
        .featured .dc-offer-pay { color: rgba(255,255,255,0.35); }
        .dc-offer-features { list-style: none; flex: 1; margin-bottom: 0; padding-left: 0; }
        .dc-offer-features li { font-size: 0.82rem; color: var(--text-muted); margin-bottom: 8px; display: flex; align-items: flex-start; gap: 8px; }
        .featured .dc-offer-features li { color: rgba(255,255,255,0.75); }
        .dc-offer-features li .check { color: var(--primary); font-weight: 700; flex-shrink: 0; }
        .featured .dc-offer-features li .check { color: var(--green-glow); }
        
        /* ═══ 5. SERVICE CONFIG ═══ */
        .dc-service { background: var(--white); }
        .dc-service h2 { font-size: clamp(1.6rem, 3.5vw, 2.4rem); font-weight: 700; color: var(--dark); line-height: 1.1; letter-spacing: -0.03em; margin-bottom: 12px; text-align: center; }
        .dc-service-desc { font-size: 0.88rem; color: var(--text-muted); text-align: center; max-width: 560px; margin: 0 auto 44px; line-height: 1.6; }
        .dc-service-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        .dc-service-card { background: var(--cream); border-radius: 20px; padding: 28px; position: relative; transition: transform 0.25s ease, box-shadow 0.25s ease; }
        .dc-service-card:hover { transform: translateY(-3px); box-shadow: 0 8px 32px rgba(0,0,0,0.08); }
        .dc-service-card .badge { position: absolute; top: -10px; right: 16px; background: var(--primary); color: var(--white); padding: 4px 12px; border-radius: 999px; font-size: 0.68rem; font-weight: 700; }
        .dc-service-card .icon { font-size: 1.8rem; margin-bottom: 12px; }
        .dc-service-card h3 { font-size: 1.05rem; font-weight: 700; color: var(--dark); margin-bottom: 4px; }
        .dc-service-card .price { font-size: 1.6rem; font-weight: 900; color: var(--primary); margin-bottom: 10px; }
        .dc-service-card p { font-size: 0.82rem; color: var(--text-muted); line-height: 1.55; }
        
        /* ═══ 6. CTA ═══ */
        .dc-cta { background: var(--primary); text-align: center; align-items: center; }
        .dc-cta::before { content: ''; position: absolute; top: -100px; right: -100px; width: 400px; height: 400px; border-radius: 50%; background: radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 60%); pointer-events: none; }
        .dc-cta h2 { font-size: clamp(2rem, 5vw, 3.5rem); font-weight: 900; color: var(--white); line-height: 1.08; letter-spacing: -0.04em; margin-bottom: 32px; position: relative; z-index: 1; }
        .dc-cta h2 span { color: var(--accent); }
        .dc-cta-ready { font-size: 1.1rem; font-weight: 700; color: var(--white); margin-bottom: 8px; }
        .dc-cta-wa-label { font-size: 0.88rem; color: rgba(255,255,255,0.6); margin-bottom: 12px; }
        .dc-cta-phone { display: inline-block; font-size: 2rem; font-weight: 900; color: var(--accent); margin-bottom: 8px; position: relative; z-index: 1; text-decoration: none; }
        .dc-cta-phone:hover { opacity: 0.85; }
        .dc-cta-delivery { font-size: 0.85rem; color: rgba(255,255,255,0.45); margin-bottom: 40px; }
        .dc-cta-guide-box { background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.15); border-radius: 20px; padding: 28px; max-width: 440px; margin: 0 auto 40px; position: relative; z-index: 1; text-align: left; }
        .dc-cta-guide-box .label { font-size: 0.88rem; font-weight: 600; color: rgba(255,255,255,0.7); margin-bottom: 8px; }
        .dc-cta-guide-box .intro { font-size: 0.82rem; color: rgba(255,255,255,0.5); margin-bottom: 8px; }
        .dc-cta-guide-box .title { font-size: 1rem; font-weight: 700; font-style: italic; color: var(--white); margin-bottom: 6px; }
        .dc-cta-guide-box .note { font-size: 0.75rem; color: rgba(255,255,255,0.35); }
        .dc-cta-quote { font-size: 0.85rem; font-style: italic; color: rgba(255,255,255,0.35); max-width: 420px; margin: 0 auto; position: relative; z-index: 1; }
        
        /* ═══ PDF BUTTON ═══ */
        .dc-pdf-btn { position: fixed; bottom: 32px; right: 32px; z-index: 999; background: var(--accent); color: var(--white); border: none; padding: 14px 28px; border-radius: 999px; font-family: 'Outfit', sans-serif; font-size: 0.9rem; font-weight: 700; cursor: pointer; box-shadow: 0 8px 32px rgba(224,86,59,0.35); transition: transform 0.2s ease, box-shadow 0.2s ease; display: flex; align-items: center; gap: 8px; text-decoration: none; }
        .dc-pdf-btn:hover { transform: translateY(-2px); box-shadow: 0 12px 40px rgba(224,86,59,0.45); }
        .dc-pdf-btn svg { width: 18px; height: 18px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
        
        /* ═══ RESPONSIVE ═══ */
        @media (max-width: 768px) {
          .dc-page { padding: 40px 24px; }
          .dc-offers-grid { grid-template-columns: 1fr; }
          .dc-service-grid { grid-template-columns: 1fr; }
        }
        
        /* ═══ PRINT ═══ */
        @media print {
          .dc-page { page-break-after: always; page-break-inside: avoid; height: 100vh; padding-top: 0 !important; }
          .dc-page:last-of-type { page-break-after: auto; }
          .dc-problem, .dc-how, .dc-offers, .dc-service { display: flex; flex-direction: column; justify-content: center; min-height: 100vh; }
          .dc-offer-card, .dc-step, .dc-service-card, .dc-pain-card { page-break-inside: avoid; }
          .dc-offers-grid { display: grid; grid-template-columns: 1fr 1fr; page-break-inside: avoid; }
          .dc-pdf-btn { display: none !important; }
          .darbox-catalogue-root { background: white; padding-top: 0; }
          .darbox-catalogue-root * { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .dc-cover { padding-top: 40px !important; }
        }
      `}</style>
      
      {/* 1. COUVERTURE */}
      <section className="dc-page dc-cover" style={{ minHeight: 'calc(100vh - 76px)' }}>
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.04, pointerEvents: 'none', zIndex: 0 }}>
          <filter id="grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#grain)" />
        </svg>

        <div className="dc-cover-watermark" aria-hidden="true">FAMILLE</div>

        <div className="dc-cover-badge">{t.heroSub1 || 'CATALOGUE 2026'}</div>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ textAlign: 'center', marginBottom: '8px' }}>
            <img src="/assets/Darbox_Logo.png" alt="DarBox Icon" style={{ height: '96px', width: 'auto', display: 'block', margin: '0 auto 16px' }} />
            <span style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 900, fontSize: '72px', letterSpacing: '-2px', lineHeight: 1 }}>
              <span style={{ color: '#E0563B' }}>D</span><span style={{ color: '#ffffff' }}>arBox</span>
            </span>
          </div>
        </div>
        
        <h1>
          {t.heroTag1}<br />{t.heroTag2} {t.heroTag3}<br />{t.heroTag4}
        </h1>
        <p className="dc-cover-slogan">{t.heroSlogan}</p>

        <div className="dc-flow-line">
          <div className="dc-flow-card">
            <span className="fc-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
            </span>
            <div className="fc-title" style={{ fontSize: '15px' }}>Votre box</div>
            <div className="fc-sub" style={{ fontSize: '11px' }}>Maroc Telecom · Orange · Inwi</div>
          </div>

          <div className="dc-flow-connector">
            <svg viewBox="0 0 60 20"><line x1="0" y1="10" x2="52" y2="10" className="flow-arrow"/><polygon points="50,6 60,10 50,14" className="flow-head"/></svg>
          </div>

          <div className="dc-flow-card center">
            <span className="fc-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            </span>
            <div className="fc-title" style={{ fontSize: '15px' }}>DarBox</div>
            <div className="fc-sub" style={{ fontSize: '11px' }}><span className="dc-dot-active"></span> Bouclier actif</div>
          </div>

          <div className="dc-flow-connector">
            <svg viewBox="0 0 60 20"><line x1="0" y1="10" x2="52" y2="10" className="flow-arrow"/><polygon points="50,6 60,10 50,14" className="flow-head"/></svg>
          </div>

          <div className="dc-flow-card">
            <span className="fc-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            </span>
            <div className="fc-title" style={{ fontSize: '15px' }}>Vos enfants</div>
            <div className="fc-sub" style={{ fontSize: '11px' }}>Protégés · 24h/24</div>
          </div>
        </div>

        <p className="dc-flow-note" style={{ fontSize: '12px' }}>Câble RJ45 · Configuration incluse · Aucune compétence requise</p>

        <div className="dc-stats-bar">
          <div className="dc-stat-item">
            <div className="dc-stat-label" style={{ fontSize: '12px' }}>dès</div>
            <div className="dc-stat-number" style={{ color: '#E0563B', fontSize: '38px' }}>400 DH</div>
            <div className="dc-stat-sub" style={{ fontSize: '12px' }}>paiement unique</div>
          </div>
          <div className="dc-stat-sep"></div>
          <div className="dc-stat-item">
            <div className="dc-stat-label" style={{ fontSize: '12px' }}>&nbsp;</div>
            <div className="dc-stat-number" style={{ color: '#fff', fontSize: '38px' }}>5 min</div>
            <div className="dc-stat-sub" style={{ fontSize: '12px' }}>installation</div>
          </div>
          <div className="dc-stat-sep"></div>
          <div className="dc-stat-item">
            <div className="dc-stat-label" style={{ fontSize: '12px' }}>&nbsp;</div>
            <div className="dc-stat-number" style={{ color: '#1A7A4A', textShadow: '0 0 20px rgba(26,122,74,0.6)', fontSize: '38px' }}>0</div>
            <div className="dc-stat-sub" style={{ fontSize: '12px' }}>abonnement</div>
          </div>
        </div>

        <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: '12px', color: 'rgba(255,255,255,0.35)', textAlign: 'center', letterSpacing: '1px', textTransform: 'uppercase', margin: '20px 0 0 0', position: 'relative', zIndex: 1 }}>
          {t.heroCredit || 'Merouan El Hattaki · Fondateur'}
        </p>

        <p className="dc-cover-footer">
          {t.heroFooter}<br />
          <a className="dc-cover-wa" href="https://wa.me/212621429030">+212 621 429 030</a>
        </p>
      </section>

      {/* 2. PROBLÈME */}
      <section className="dc-page dc-problem">
        <p className="dc-section-label">● {t.probTitle}</p>
        <h2>{t.probSub}<br /><span>{t.probQ}</span></h2>
        <p className="dc-problem-intro"></p>

        <div className="dc-pain-grid">
          <div className="dc-pain-card">
            <div className="dc-pain-icon">{t.prob1Icon}</div>
            <div>
              <h3>{t.prob1T}</h3>
              <p>{t.prob1D}</p>
            </div>
          </div>
          <div className="dc-pain-card">
            <div className="dc-pain-icon">{t.prob2Icon}</div>
            <div>
              <h3>{t.prob2T}</h3>
              <p>{t.prob2D}</p>
            </div>
          </div>
          <div className="dc-pain-card">
            <div className="dc-pain-icon">{t.prob3Icon}</div>
            <div>
              <h3>{t.prob3T}</h3>
              <p>{t.prob3D}</p>
            </div>
          </div>
        </div>

        <div className="dc-solution-box">
          <p dangerouslySetInnerHTML={{ __html: t.probSolution.replace('DarBox', '<strong>DarBox</strong>') }}></p>
        </div>
      </section>

      {/* 3. COMMENT ÇA MARCHE */}
      <section className="dc-page dc-how">
        <p className="dc-section-label dc-section-label--green">● {t.howTitle}</p>
        <h2>{t.howSub}</h2>
        <p className="dc-how-sub"></p>

        <div className="dc-steps">
          <div className="dc-step">
            <div className="dc-step-num">{t.how1N}</div>
            <div className="dc-step-content">
              <h3><span className="emoji">{t.how1Icon}</span> {t.how1T}</h3>
              <p>{t.how1D}</p>
            </div>
          </div>
          <div className="dc-step-divider"></div>
          <div className="dc-step">
            <div className="dc-step-num">{t.how2N}</div>
            <div className="dc-step-content">
              <h3><span className="emoji">{t.how2Icon}</span> {t.how2T}</h3>
              <p>{t.how2D}</p>
            </div>
          </div>
          <div className="dc-step-divider"></div>
          <div className="dc-step">
            <div className="dc-step-num">{t.how3N}</div>
            <div className="dc-step-content">
              <h3><span className="emoji">{t.how3Icon}</span> {t.how3T}</h3>
              <p>{t.how3D}</p>
            </div>
          </div>
        </div>

        <div className="dc-compat-bar">
          {t.howCompat}
        </div>
      </section>

      {/* 4. OFFERS & TARIFS */}
      <section className="dc-page dc-offers">
        <p className="dc-section-label dc-section-label--green">● {t.offTitle}</p>
        <h2>{t.offSub}</h2>
        <p className="dc-offers-sub"></p>

        <div className="dc-offers-grid">
          {/* Essentiel */}
          <div className="dc-offer-card">
            <div className="dc-offer-icon">{t.off1Icon}</div>
            <div className="dc-offer-name">{t.off1N}</div>
            <div className="dc-offer-tagline">{t.off1S}</div>
            <div className="dc-offer-price">{t.off1P}</div>
            <div className="dc-offer-pay">{t.off1Pay}</div>
            <ul className="dc-offer-features">
              {t.off1F && t.off1F.map((f, i) => (
                <li key={i}><span className="check">✓</span> {f}</li>
              ))}
            </ul>
          </div>

          {/* Couvre-feu (FEATURED) */}
          <div className="dc-offer-card featured">
            <div className="dc-offer-badge">{t.off2Badge}</div>
            <div className="dc-offer-icon">{t.off2Icon}</div>
            <div className="dc-offer-name">{t.off2N}</div>
            <div className="dc-offer-tagline">{t.off2S}</div>
            <div className="dc-offer-price">{t.off2P}</div>
            <div className="dc-offer-pay">{t.off2Pay}</div>
            <ul className="dc-offer-features">
              {t.off2F && t.off2F.map((f, i) => (
                <li key={i}><span className="check">✓</span> {f}</li>
              ))}
            </ul>
          </div>

          {/* Anti-Distraction */}
          <div className="dc-offer-card">
            <div className="dc-offer-icon">{t.off3Icon}</div>
            <div className="dc-offer-name">{t.off3N}</div>
            <div className="dc-offer-tagline">{t.off3S}</div>
            <div className="dc-offer-price">{t.off3P}</div>
            <div className="dc-offer-pay">{t.off3Pay}</div>
            <ul className="dc-offer-features">
              {t.off3F && t.off3F.map((f, i) => (
                <li key={i}><span className="check">✓</span> {f}</li>
              ))}
            </ul>
          </div>

          {/* Pack Maison */}
          <div className="dc-offer-card">
            <div className="dc-offer-icon">{t.off4Icon}</div>
            <div className="dc-offer-name">{t.off4N}</div>
            <div className="dc-offer-tagline">{t.off4S}</div>
            <div className="dc-offer-price">{t.off4P}</div>
            <div className="dc-offer-pay">{t.off4Pay}</div>
            <ul className="dc-offer-features">
              {t.off4F && t.off4F.map((f, i) => (
                <li key={i}><span className="check">✓</span> {f}</li>
              ))}
            </ul>
          </div>
        </div>

        <div style={{ background: 'rgba(26,122,74,0.08)', borderLeft: '3px solid #1A7A4A', padding: '12px 16px', borderRadius: '0 8px 8px 0', fontSize: '13px', color: '#0D1117', marginTop: '24px' }}>
          {t.offNewService}
        </div>
      </section>

      {/* 5. SERVICE CONFIG */}
      <section className="dc-page dc-service">
        <p className="dc-section-label">● {t.svcTitle}</p>
        <h2>{t.svcSub1}<br />{t.svcSub2}</h2>
        <p className="dc-service-desc">
          {t.svcDesc}
        </p>

        <div className="dc-service-grid">
          <div className="dc-service-card">
            <span className="badge">{t.svc1Badge || 'Recommandé'}</span>
            <div className="icon">{t.svc1Icon}</div>
            <h3>{t.svc1T}</h3>
            <div className="price">{t.svc1P}</div>
            <p>{t.svc1D}</p>
          </div>

          <div className="dc-service-card">
            <div className="icon">{t.svc2Icon}</div>
            <h3>{t.svc2T}</h3>
            <div className="price">{t.svc2P}</div>
            <p>{t.svc2D}</p>
          </div>

          <div className="dc-service-card">
            <div className="icon">{t.svc3Icon}</div>
            <h3>{t.svc3T}</h3>
            <div className="price">{t.svc3P}</div>
            <p>{t.svc3D}</p>
          </div>
        </div>
      </section>

      {/* 6. CTA FINAL */}
      <section className="dc-page dc-cta">
        <h2>{t.ctaT1}<br />{t.ctaT2}<br /><span>{t.ctaT3}</span></h2>
        <p className="dc-cta-ready">{t.ctaReady}</p>
        <p className="dc-cta-wa-label">{t.ctaWa}</p>
        <a className="dc-cta-phone" href="https://wa.me/212621429030">{t.ctaPhone}</a>
        <p className="dc-cta-delivery">{t.ctaDelivery}</p>

        <div className="dc-cta-guide-box">
          <p className="label">{t.ctaQTitle}</p>
          <p className="intro">{t.ctaGuideIntro}</p>
          <p className="title">{t.ctaGuide}</p>
          <p className="note">{t.ctaGuideNote}</p>
        </div>

        <p className="dc-cta-quote">{t.ctaQuote}</p>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginTop: '32px', paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.15)' }}>
          <img src="/assets/Darbox_Logo.svg" alt="DarBox" style={{ height: '32px', width: 'auto', filter: 'brightness(0) invert(1)', opacity: 0.9 }} />
          <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: '11px', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.8px', textTransform: 'uppercase' }}>
            {t.heroCredit || 'Merouan El Hattaki · Fondateur · +212 621 429 030'}
          </span>
        </div>
      </section>

      {/* ═══ PDF BUTTON ═══ */}
      <a 
        href="/assets/DarBox%20%E2%80%94%20Catalogue%202026.pdf" 
        download="DarBox — Catalogue 2026.pdf" 
        className="dc-pdf-btn"
      >
        <svg viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
        {t.printBtn || 'Télécharger PDF'}
      </a>

    </div>
  );
}
