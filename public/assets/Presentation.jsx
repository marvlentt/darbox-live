import { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronDown, ChevronUp, Wifi, Shield, Clock, BookOpen, Home, Wrench, Phone, ExternalLink } from 'lucide-react';

// ─── Reveal animation CSS injected once ───────────────────────────────────────
const REVEAL_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;700;800;900&display=swap');

  .reveal {
    opacity: 0;
    transform: translateY(28px);
    transition: opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1),
                transform 0.65s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .slide-visible .reveal { opacity: 1; transform: translateY(0); }
  .reveal-left  { transform: translateX(-36px) !important; }
  .reveal-right { transform: translateX(36px) !important; }
  .slide-visible .reveal-left,
  .slide-visible .reveal-right { transform: translateX(0) !important; opacity: 1; }

  .reveal:nth-child(1) { transition-delay: 0.04s; }
  .reveal:nth-child(2) { transition-delay: 0.13s; }
  .reveal:nth-child(3) { transition-delay: 0.22s; }
  .reveal:nth-child(4) { transition-delay: 0.31s; }
  .reveal:nth-child(5) { transition-delay: 0.40s; }
  .reveal:nth-child(6) { transition-delay: 0.49s; }
  .reveal:nth-child(7) { transition-delay: 0.58s; }

  .bar-fill {
    height: 100%;
    border-radius: 9999px;
    transition: width 1.2s cubic-bezier(0.16, 1, 0.3, 1);
    background: #1A7A4A;
  }

  @media (prefers-reduced-motion: reduce) {
    .reveal { transition: opacity 0.3s ease; transform: none !important; }
  }
`;

// ─── DarBox Logo (inline SVG, no external PNG) ────────────────────────────────
function DarBoxLogo({ variant = 'dark', size = 'md' }) {
  const sizes = { sm: { icon: 22, font: '15px', gap: '6px' }, md: { icon: 30, font: '20px', gap: '8px' }, lg: { icon: 42, font: '28px', gap: '10px' } };
  const { icon: s, font: fs, gap } = sizes[size];
  const iconColor = variant === 'light' ? '#1A7A4A' : '#FFFFFF';
  const darColor  = variant === 'light' ? '#0D1117' : '#FFFFFF';
  const boxColor  = variant === 'light' ? '#1A7A4A' : '#22A663';
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap, userSelect: 'none' }}>
      <svg width={s} height={s} viewBox="0 0 40 40" fill="none" color={iconColor} style={{ flexShrink: 0 }}>
        <path d="M20 4L36 16V36H26V26H14V36H4V16L20 4Z" fill="currentColor" fillOpacity={0.12}/>
        <path d="M20 4L36 16V36H26V26H14V36H4V16L20 4Z" stroke="currentColor" strokeWidth={2} strokeLinejoin="round"/>
        <path d="M20 14L26 17V22C26 25.3 23.3 28 20 29C16.7 28 14 25.3 14 22V17L20 14Z" fill="currentColor" fillOpacity={0.15} stroke="currentColor" strokeWidth={1.5} strokeLinejoin="round"/>
        <path d="M17.5 21.5L19.5 23.5L23 19.5" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M14.5 11C16.2 9.3 17.9 8.5 20 8.5C22.1 8.5 23.8 9.3 25.5 11" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeOpacity={0.5}/>
      </svg>
      <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: fs, fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1 }}>
        <span style={{ color: darColor }}>Dar</span>
        <span style={{ color: boxColor }}>Box</span>
      </span>
    </div>
  );
}

// ─── Animated Counter hook ────────────────────────────────────────────────────
function useCounter(target, suffix = '', active = false) {
  const [display, setDisplay] = useState(`0${suffix}`);
  useEffect(() => {
    if (!active) return;
    const start = performance.now();
    const duration = 1400;
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(`${Math.floor(eased * target)}${suffix}`);
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [active, target, suffix]);
  return display;
}

// ─── KPI Card with animated counter ──────────────────────────────────────────
function KpiCard({ value, suffix = '', label, sub, highlight = false, active }) {
  const animated = useCounter(value, suffix, active);
  return (
    <div className={`rounded-2xl p-6 flex flex-col gap-1 ${highlight ? 'bg-[#1A7A4A] text-white' : 'bg-white border border-[#E5E7EB]'}`}
         style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}>
      <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 900, lineHeight: 1, letterSpacing: '-0.03em', color: highlight ? '#fff' : '#1A7A4A' }}>
        {animated}
      </span>
      <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: '0.95rem', fontWeight: 700, color: highlight ? '#D1FAE5' : '#0D1117' }}>
        {label}
      </span>
      <span style={{ fontSize: '0.8rem', opacity: 0.65, lineHeight: 1.4, color: highlight ? '#D1FAE5' : '#6B7280' }}>
        {sub}
      </span>
    </div>
  );
}

// ─── Offer Card ───────────────────────────────────────────────────────────────
function OfferCard({ icon: Icon, name, price, subtitle, perks, featured = false }) {
  return (
    <div className={`rounded-2xl p-5 flex flex-col gap-3 relative ${featured ? 'bg-[#1A7A4A] text-white' : 'bg-white border border-[#E5E7EB]'}`}
         style={{ boxShadow: featured ? '0 8px 32px rgba(26,122,74,0.3)' : '0 2px 12px rgba(0,0,0,0.06)' }}>
      {featured && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#E0563B] text-white text-[10px] font-bold px-3 py-1 rounded-full whitespace-nowrap tracking-wider uppercase">
          ⭐ Le Plus Populaire
        </div>
      )}
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${featured ? 'bg-white/20' : 'bg-[#E8F5EE]'}`}>
        <Icon className={`w-5 h-5 ${featured ? 'text-white' : 'text-[#1A7A4A]'}`} />
      </div>
      <div>
        <p style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: '1rem', color: featured ? '#fff' : '#0D1117' }}>{name}</p>
        <p style={{ fontSize: '0.75rem', opacity: 0.65, fontStyle: 'italic', color: featured ? '#D1FAE5' : '#6B7280' }}>{subtitle}</p>
      </div>
      <p style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 900, fontSize: '1.8rem', letterSpacing: '-0.03em', color: featured ? '#fff' : '#1A7A4A', lineHeight: 1 }}>
        {price} <span style={{ fontSize: '0.9rem', fontWeight: 400, opacity: 0.6 }}>DH</span>
      </p>
      <ul className="flex flex-col gap-1.5 flex-1">
        {perks.map((p, i) => (
          <li key={i} style={{ display: 'flex', gap: '7px', alignItems: 'flex-start', fontSize: '0.8rem', color: featured ? 'rgba(255,255,255,0.8)' : '#374151' }}>
            <span style={{ color: featured ? '#22A663' : '#1A7A4A', fontWeight: 700, flexShrink: 0, marginTop: '1px' }}>✓</span>
            {p}
          </li>
        ))}
      </ul>
    </div>
  );
}

// ─── Main Presentation Component ─────────────────────────────────────────────
export default function Presentation() {
  const SLIDES = 6;
  const [current, setCurrent]     = useState(0);
  const [visible, setVisible]     = useState(new Set());
  const [hintShown, setHintShown] = useState(true);
  const slideRefs = useRef([]);
  const containerRef = useRef(null);

  // Inject reveal CSS once
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = REVEAL_STYLES;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  // IntersectionObserver — marks slides visible, fires counter animations
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const idx = slideRefs.current.indexOf(entry.target);
          if (entry.isIntersecting) {
            entry.target.classList.add('slide-visible');
            setVisible((prev) => new Set([...prev, idx]));
            setCurrent(idx);
          }
        });
      },
      { threshold: 0.5 }
    );
    slideRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  // Keyboard navigation
  const goTo = useCallback((idx) => {
    const clamped = Math.max(0, Math.min(SLIDES - 1, idx));
    slideRefs.current[clamped]?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (['ArrowDown', 'ArrowRight', 'Space'].includes(e.code)) { e.preventDefault(); goTo(current + 1); }
      if (['ArrowUp', 'ArrowLeft'].includes(e.code))             { e.preventDefault(); goTo(current - 1); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [current, goTo]);

  // Touch / swipe
  useEffect(() => {
    let ty = 0;
    const onStart = (e) => { ty = e.touches[0].clientY; };
    const onEnd   = (e) => {
      const diff = ty - e.changedTouches[0].clientY;
      if (Math.abs(diff) > 40) goTo(current + (diff > 0 ? 1 : -1));
    };
    window.addEventListener('touchstart', onStart, { passive: true });
    window.addEventListener('touchend', onEnd);
    return () => { window.removeEventListener('touchstart', onStart); window.removeEventListener('touchend', onEnd); };
  }, [current, goTo]);

  // Hide key hint after 4 s
  useEffect(() => {
    const t = setTimeout(() => setHintShown(false), 4000);
    return () => clearTimeout(t);
  }, []);

  const progress = ((current + 1) / SLIDES) * 100;
  const isActive = (idx) => visible.has(idx);

  const setRef = (idx) => (el) => { slideRefs.current[idx] = el; };

  // ─── SLIDE BASE CLASS ──────────────────────────────────────────────────────
  const slide = 'relative h-dvh overflow-hidden flex flex-col justify-center snap-start';

  return (
    <>
      {/* Progress bar */}
      <div className="fixed top-0 left-0 z-50 h-[3px] bg-[#1A7A4A] transition-all duration-300 ease-out"
           style={{ width: `${progress}%` }} />

      {/* Nav dots */}
      <nav className="fixed right-5 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-2">
        {Array.from({ length: SLIDES }, (_, i) => (
          <button key={i} onClick={() => goTo(i)} aria-label={`Slide ${i + 1}`}
            className="w-2 h-2 rounded-full border-none p-0 cursor-pointer transition-all duration-200"
            style={{ background: current === i ? '#1A7A4A' : 'rgba(255,255,255,0.35)', transform: current === i ? 'scale(1.5)' : 'scale(1)', opacity: current === i ? 1 : 0.5 }} />
        ))}
      </nav>

      {/* Key hint */}
      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 text-[11px] text-white/40 pointer-events-none whitespace-nowrap transition-opacity duration-500 flex items-center gap-1.5"
           style={{ opacity: hintShown ? 1 : 0 }}>
        <ChevronDown className="w-3 h-3" /> Flèche bas pour avancer
      </div>

      {/* ── SCROLL CONTAINER ── */}
      <div ref={containerRef} className="overflow-y-scroll snap-y snap-mandatory h-dvh">

        {/* ══════════════════════════════════════════════════════════════════
            SLIDE 1 — COVER (Dark #0D1117)
        ════════════════════════════════════════════════════════════════════ */}
        <section ref={setRef(0)} className={slide} style={{ background: '#0D1117', padding: 'clamp(32px,6vw,80px) clamp(24px,8vw,120px)' }}>
          {/* Decorative circles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute rounded-full" style={{ width: 600, height: 600, top: -220, right: -180, border: '1px solid rgba(26,122,74,0.15)' }} />
            <div className="absolute rounded-full" style={{ width: 380, height: 380, top: -80, right: 80, border: '1px solid rgba(26,122,74,0.08)' }} />
            <div className="absolute rounded-full" style={{ width: 200, height: 200, top: 60, right: 220, background: 'rgba(26,122,74,0.06)', border: '1px solid rgba(26,122,74,0.12)' }} />
          </div>
          {/* Left accent bar */}
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#1A7A4A]" />

          <div className="reveal" style={{ marginBottom: '12px' }}>
            <DarBoxLogo variant="dark" size="md" />
          </div>

          <h1 className="reveal" style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 900, fontSize: 'clamp(2.4rem,6.5vw,5.5rem)', lineHeight: 1.05, letterSpacing: '-0.03em', color: '#fff', maxWidth: '820px', marginTop: '12px' }}>
            Votre famille mérite<br />
            <em style={{ color: '#22A663', fontStyle: 'normal' }}>un internet sûr.</em>
          </h1>

          <p className="reveal" style={{ fontSize: 'clamp(0.95rem,1.8vw,1.25rem)', color: 'rgba(255,255,255,0.55)', marginTop: '20px', maxWidth: '520px', lineHeight: 1.6 }}>
            Un routeur préconfiguré qui protège vos enfants dès le branchement — sans aucune compétence technique requise.
          </p>

          {/* Slogan pill */}
          <div className="reveal" style={{ marginTop: '32px', display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ background: '#1A7A4A', padding: '10px 22px', borderRadius: '50px', fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: '0.95rem', color: '#fff', letterSpacing: '0.01em' }}>
              Branchez. Protégez. Respirez.
            </div>
          </div>

          {/* Context badges */}
          <div className="reveal" style={{ marginTop: '48px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {['PIE · OFPPT ISMONTIC', 'Tanger 2025', 'Merouan El Hattaki'].map((b) => (
              <span key={b} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '5px 12px', fontSize: '0.78rem', color: 'rgba(255,255,255,0.45)', letterSpacing: '0.03em' }}>{b}</span>
            ))}
          </div>

          {/* Slide number */}
          <div className="absolute bottom-6 right-8 text-[11px] text-white/20 tracking-widest">01 / 06</div>
        </section>


        {/* ══════════════════════════════════════════════════════════════════
            SLIDE 2 — LE PROBLÈME (Cream #F5F0E8)
        ════════════════════════════════════════════════════════════════════ */}
        <section ref={setRef(1)} className={slide} style={{ background: '#F5F0E8', padding: 'clamp(32px,5vw,72px) clamp(24px,7vw,100px)' }}>
          <div className="reveal" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <div style={{ background: '#E8F5EE', borderRadius: '6px', padding: '4px 12px', fontSize: '0.72rem', fontWeight: 700, color: '#1A7A4A', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Le Problème
            </div>
          </div>

          <h2 className="reveal" style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: 'clamp(1.8rem,4vw,3.2rem)', color: '#0D1117', lineHeight: 1.1, letterSpacing: '-0.02em', maxWidth: '800px' }}>
            Les parents de Tanger sont<br /><em style={{ color: '#1A7A4A', fontStyle: 'normal' }}>démunis face aux dangers du web.</em>
          </h2>

          <div className="reveal" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginTop: '36px', maxWidth: '960px' }}>
            {[
              { icon: '😰', title: 'Accès libre', desc: 'Contenus adultes, malwares et jeux d\'argent accessibles dès la connexion — sans aucun filtre.' },
              { icon: '📱', title: 'Apps désinstallables', desc: 'Les logiciels de contrôle parental se contournent en 30 secondes. L\'enfant désinstalle, l\'accès revient.' },
              { icon: '🌙', title: 'Nuits sans règles', desc: 'Aucun outil simple n\'éteint internet automatiquement à l\'heure du coucher sans conflit familial.' },
            ].map((item) => (
              <div key={item.title} style={{ background: '#fff', borderRadius: '16px', padding: '24px 20px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <span style={{ fontSize: '1.8rem' }}>{item.icon}</span>
                <p style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: '1rem', color: '#0D1117' }}>{item.title}</p>
                <p style={{ fontSize: '0.83rem', color: '#6B7280', lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Quote bar */}
          <div className="reveal" style={{ marginTop: '28px', background: '#0D1117', borderRadius: '12px', padding: '14px 20px', maxWidth: '640px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '4px', height: '36px', background: '#1A7A4A', borderRadius: '2px', flexShrink: 0 }} />
            <p style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.75)', fontStyle: 'italic', lineHeight: 1.55 }}>
              «&nbsp;Je veux protéger mes enfants, mais je ne suis pas informaticienne.&nbsp;»
              <span style={{ color: 'rgba(255,255,255,0.35)', marginLeft: '8px' }}>— Khadija, mère de famille · Souani, Tanger</span>
            </p>
          </div>

          <div className="absolute bottom-6 right-8 text-[11px] tracking-widest" style={{ color: 'rgba(13,17,23,0.2)' }}>02 / 06</div>
        </section>


        {/* ══════════════════════════════════════════════════════════════════
            SLIDE 3 — LA SOLUTION + OFFRES (White)
        ════════════════════════════════════════════════════════════════════ */}
        <section ref={setRef(2)} className={slide} style={{ background: '#fff', padding: 'clamp(24px,4vw,56px) clamp(24px,7vw,100px)' }}>
          <div className="reveal" style={{ marginBottom: '8px' }}>
            <span style={{ background: '#E8F5EE', borderRadius: '6px', padding: '4px 12px', fontSize: '0.72rem', fontWeight: 700, color: '#1A7A4A', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Nos Offres</span>
          </div>
          <h2 className="reveal" style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: 'clamp(1.5rem,3vw,2.4rem)', color: '#0D1117', letterSpacing: '-0.02em', marginBottom: '4px' }}>
            4 niveaux de protection. 1 seul paiement. Zéro abonnement.
          </h2>

          <div className="reveal" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '14px', marginTop: '20px' }}>
            <OfferCard icon={Shield}   name="Essentiel"         price="400"  subtitle="Le bouclier de base"        perks={['Blocage DNS (adultes, malwares)', 'Réseau Wi-Fi enfants séparé', 'Tous appareils couverts']} />
            <OfferCard icon={Clock}    name="Couvre-feu"        price="480"  subtitle="Fini les batailles du soir" featured perks={['Tout Essentiel inclus', 'Wi-Fi éteint auto à 22h', 'Horaires devoirs configurés', 'Modifiable via WhatsApp']} />
            <OfferCard icon={BookOpen} name="Anti-Distraction"  price="530"  subtitle="Internet utile, sans le superflu" perks={['Tout Couvre-feu inclus', 'TikTok & Instagram bloqués', 'Google & Wikipédia ouverts']} />
            <OfferCard icon={Home}     name="Pack Maison"        price="750"  subtitle="Pour les grandes maisons"   perks={['Tout Anti-Distraction inclus', 'Routeur + répéteur mesh', 'Installation VIP à domicile']} />
          </div>

          {/* Config service */}
          <div className="reveal" style={{ marginTop: '14px', background: '#FEF3DC', border: '1px solid rgba(224,86,59,0.2)', borderLeft: '4px solid #E0563B', borderRadius: '12px', padding: '12px 18px', display: 'flex', alignItems: 'center', gap: '12px', maxWidth: '640px' }}>
            <Wrench className="w-4 h-4 text-[#E0563B] flex-shrink-0" />
            <p style={{ fontSize: '0.83rem', color: '#92400E', lineHeight: 1.5 }}>
              <strong>Nouveau :</strong> Configuration sur votre routeur existant — dès <strong>150 DH</strong>. Aucun achat matériel requis.
            </p>
          </div>

          <div className="absolute bottom-6 right-8 text-[11px] tracking-widest" style={{ color: 'rgba(13,17,23,0.2)' }}>03 / 06</div>
        </section>


        {/* ══════════════════════════════════════════════════════════════════
            SLIDE 4 — ÉTUDE FINANCIÈRE (Cream #F5F0E8)
        ════════════════════════════════════════════════════════════════════ */}
        <section ref={setRef(3)} className={slide} style={{ background: '#F5F0E8', padding: 'clamp(32px,5vw,72px) clamp(24px,7vw,100px)' }}>
          <div className="reveal" style={{ marginBottom: '12px' }}>
            <span style={{ background: '#E8F5EE', borderRadius: '6px', padding: '4px 12px', fontSize: '0.72rem', fontWeight: 700, color: '#1A7A4A', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Étude Financière</span>
          </div>
          <h2 className="reveal" style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: 'clamp(1.6rem,3.2vw,2.6rem)', color: '#0D1117', letterSpacing: '-0.02em', marginBottom: '28px' }}>
            Rentable dès la <em style={{ color: '#1A7A4A', fontStyle: 'normal' }}>1ère semaine.</em>
          </h2>

          <div className="reveal" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', maxWidth: '860px' }}>
            <KpiCard value={6}   suffix=" jours" label="Point Mort"          sub="Entreprise rentable dès la 1ère semaine d'activité" highlight active={isActive(3)} />
            <KpiCard value={2}   suffix=" ventes" label="Seuil de Rentabilité" sub="Ventes minimum pour couvrir les charges fixes mensuelles" active={isActive(3)} />
            <KpiCard value={235} suffix=" DH"    label="Marge brute moy."    sub="Par unité vendue (mix pondéré des 4 offres)" active={isActive(3)} />
            <KpiCard value={250} suffix=" DH"    label="Charges fixes/mois"  sub="Internet · Téléphone · Transport — charges très légères" active={isActive(3)} />
          </div>

          {/* Strategy note */}
          <div className="reveal" style={{ marginTop: '24px', background: '#0D1117', borderRadius: '12px', padding: '14px 20px', maxWidth: '720px', display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
            <div style={{ width: '4px', height: '40px', background: '#1A7A4A', borderRadius: '2px', flexShrink: 0, marginTop: '2px' }} />
            <div>
              <p style={{ fontSize: '0.82rem', fontWeight: 700, color: '#22A663', marginBottom: '4px', letterSpacing: '0.04em', textTransform: 'uppercase' }}>Stratégie de pénétration</p>
              <p style={{ fontSize: '0.83rem', color: 'rgba(255,255,255,0.65)', lineHeight: 1.6 }}>
                Prix d'entrée 400 DH pour créer la confiance → Upsells naturels vers les offres premium → Service de configuration à <strong style={{ color: '#22A663' }}>87 % de marge</strong>.
              </p>
            </div>
          </div>

          <div className="absolute bottom-6 right-8 text-[11px] tracking-widest" style={{ color: 'rgba(13,17,23,0.2)' }}>04 / 06</div>
        </section>


        {/* ══════════════════════════════════════════════════════════════════
            SLIDE 5 — MODÈLE & CHARTE (Dark #0D1117)
        ════════════════════════════════════════════════════════════════════ */}
        <section ref={setRef(4)} className={slide} style={{ background: '#0D1117', padding: 'clamp(32px,5vw,72px) clamp(24px,7vw,100px)' }}>
          <div className="reveal" style={{ marginBottom: '12px' }}>
            <span style={{ background: 'rgba(26,122,74,0.2)', borderRadius: '6px', padding: '4px 12px', fontSize: '0.72rem', fontWeight: 700, color: '#22A663', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Modèle & Engagements</span>
          </div>
          <h2 className="reveal" style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: 'clamp(1.6rem,3vw,2.6rem)', color: '#fff', letterSpacing: '-0.02em', marginBottom: '28px' }}>
            Un modèle <em style={{ color: '#22A663', fontStyle: 'normal' }}>simple, éthique et local.</em>
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', maxWidth: '960px' }}>
            {/* Revenue model */}
            <div className="reveal" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '22px' }}>
              <p style={{ fontSize: '0.72rem', fontWeight: 700, color: '#1A7A4A', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '14px' }}>Modèle de Revenus</p>
              {[
                { label: 'Vente directe hardware', sub: 'Essentiel à Pack Maison — 400–750 DH', color: '#1A7A4A' },
                { label: 'Service de configuration', sub: 'Config à distance ou domicile — 150–200 DH', color: '#1A7A4A' },
                { label: 'Mise à jour / SAV', sub: 'Reconfiguration et support — 80 DH', color: '#E0563B' },
              ].map((r) => (
                <div key={r.label} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: r.color, marginTop: '6px', flexShrink: 0 }} />
                  <div>
                    <p style={{ fontWeight: 600, color: '#fff', fontSize: '0.88rem' }}>{r.label}</p>
                    <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem', marginTop: '2px' }}>{r.sub}</p>
                  </div>
                </div>
              ))}
              <p style={{ fontSize: '0.75rem', color: '#E0563B', marginTop: '12px', fontWeight: 600 }}>⚠ Aucun abonnement mensuel — jamais.</p>
            </div>

            {/* Charte d'engagement */}
            <div className="reveal reveal-right" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '22px' }}>
              <p style={{ fontSize: '0.72rem', fontWeight: 700, color: '#1A7A4A', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '14px' }}>Charte d'Engagement</p>
              {[
                { icon: '🤲', cat: 'الله',    text: 'Intégrité technique · Jamais de fausse promesse' },
                { icon: '👨‍👩‍👧', cat: 'Clients',   text: 'Qualité garantie · Transparence des prix · SAV WhatsApp' },
                { icon: '🌍', cat: 'Planète',  text: 'Routeurs reconditionnés · Réduire l\'e-waste' },
                { icon: '🤝', cat: 'Fournisseurs', text: 'Paiement dans les délais · Relation professionnelle' },
              ].map((e) => (
                <div key={e.cat} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <span style={{ fontSize: '1rem', flexShrink: 0, marginTop: '1px' }}>{e.icon}</span>
                  <div>
                    <p style={{ fontWeight: 700, color: '#22A663', fontSize: '0.78rem' }}>{e.cat}</p>
                    <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem', marginTop: '1px', lineHeight: 1.4 }}>{e.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="absolute bottom-6 right-8 text-[11px] text-white/20 tracking-widest">05 / 06</div>
        </section>


        {/* ══════════════════════════════════════════════════════════════════
            SLIDE 6 — CONCLUSION / CTA (Green #1A7A4A)
        ════════════════════════════════════════════════════════════════════ */}
        <section ref={setRef(5)} className={slide} style={{ background: '#1A7A4A', padding: 'clamp(32px,6vw,80px) clamp(24px,8vw,120px)' }}>
          {/* Decorative circles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute rounded-full" style={{ width: 500, height: 500, top: -160, left: -140, background: 'rgba(34,166,99,0.35)' }} />
            <div className="absolute rounded-full" style={{ width: 320, height: 320, bottom: -100, right: -80, background: 'rgba(13,17,23,0.2)' }} />
          </div>

          <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto w-full">
            <div className="reveal" style={{ marginBottom: '20px' }}>
              <DarBoxLogo variant="dark" size="lg" />
            </div>

            <h1 className="reveal" style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 900, fontSize: 'clamp(2rem,5.5vw,4.5rem)', color: '#fff', lineHeight: 1.05, letterSpacing: '-0.03em' }}>
              Branchez. Protégez. Respirez.
            </h1>

            {/* Trilingual slogans */}
            <div className="reveal" style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.6)', fontStyle: 'italic' }}>🇬🇧 Plug, play, protect.</p>
              <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.6)', fontStyle: 'italic' }}>🇲🇦 ركّب، حْمي وليداتك، وارتاح.</p>
            </div>

            {/* Contact card */}
            <div className="reveal" style={{ marginTop: '36px', background: '#0D1117', borderRadius: '16px', padding: '20px 32px', display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center', alignItems: 'center', width: '100%', maxWidth: '560px', boxShadow: '0 8px 32px rgba(0,0,0,0.3)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Phone className="w-4 h-4 text-[#22A663]" />
                <span style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, color: '#fff', fontSize: '1rem' }}>+212 621 429 030</span>
              </div>
              <div style={{ width: '1px', height: '24px', background: 'rgba(255,255,255,0.1)' }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ExternalLink className="w-4 h-4 text-[#22A663]" />
                <span style={{ fontWeight: 700, color: '#fff', fontSize: '1rem' }}>darbox.ma</span>
              </div>
              <div style={{ width: '1px', height: '24px', background: 'rgba(255,255,255,0.1)' }} />
              <div>
                <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.82rem' }}>Livraison · Tanger & environs</span>
              </div>
            </div>

            <p className="reveal" style={{ marginTop: '24px', fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)' }}>
              Merouan El Hattaki · OFPPT ISMONTIC · PIE 2025 · <em>Merci pour votre attention.</em>
            </p>
          </div>

          <div className="absolute bottom-6 right-8 text-[11px] text-white/25 tracking-widest">06 / 06</div>
        </section>

      </div>{/* end scroll container */}

      {/* Keyboard shortcut reminder (bottom-left) */}
      <div className="fixed bottom-5 left-5 z-50 hidden md:flex items-center gap-1.5 text-[10px] text-white/20">
        <ChevronUp className="w-3 h-3" />
        <ChevronDown className="w-3 h-3" />
        <span>ou Espace</span>
      </div>
    </>
  );
}
