import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { X, Globe, BookOpen, Newspaper, ChevronRight, ArrowRight } from 'lucide-react';
import DarBoxLogo from './DarBoxLogo.jsx';

/* ─────────────────────────────────────────
   Sub-components
   ───────────────────────────────────────── */

/** Primary nav item – bold, no icon, smooth hover */
function PrimaryItem({ label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="group w-full flex items-center justify-between px-5 py-[17px] text-left rounded-2xl
                 text-[#0d1117] font-semibold text-[1rem] leading-snug
                 hover:bg-[#f0faf4] hover:text-[#1a7a4a]
                 active:scale-[.98] transition-all duration-[160ms] ease-out"
    >
      <span>{label}</span>
      <ChevronRight
        className="w-4 h-4 text-[#d1d5db] group-hover:text-[#1a7a4a] group-hover:translate-x-0.5
                   transition-all duration-[160ms]"
      />
    </button>
  );
}

/** Secondary nav item – lighter weight, with an icon */
function SecondaryItem({ label, icon: Icon, onClick, active }) {
  return (
    <button
      onClick={onClick}
      className={`group w-full flex items-center gap-3 px-5 py-[15px] rounded-2xl text-left
                  text-[.9rem] font-medium leading-snug
                  active:scale-[.98] transition-all duration-[160ms] ease-out
                  ${active
                    ? 'bg-[#e8f5ee] text-[#1a7a4a]'
                    : 'text-[#5a5a5a] hover:bg-[#f7f7f5] hover:text-[#0d1117]'
                  }`}
    >
      {Icon && (
        <span className={`flex items-center justify-center w-8 h-8 rounded-xl shrink-0 transition-colors duration-[160ms]
                          ${active ? 'bg-[#c8edd9]' : 'bg-[#f0f0f0] group-hover:bg-[#e2f0ea]'}`}>
          <Icon className={`w-4 h-4 ${active ? 'text-[#1a7a4a]' : 'text-[#5a5a5a] group-hover:text-[#1a7a4a]'}`} />
        </span>
      )}
      <span className="flex-1">{label}</span>
      {active && (
        <span className="w-1.5 h-1.5 rounded-full bg-[#1a7a4a] shrink-0" />
      )}
    </button>
  );
}

/* ─────────────────────────────────────────
   Main Drawer
   ───────────────────────────────────────── */
export default function MobileDrawer({ open, onClose, onLang, go, t, isHome }) {
  const location = useLocation();
  const navigate = useNavigate();

  // Lock body scroll while the drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      {/* ── Backdrop ── */}
      <div
        onClick={onClose}
        aria-hidden="true"
        className={`fixed inset-0 z-[110] bg-[#0d1117]/40 backdrop-blur-[3px]
                    transition-opacity duration-300
                    ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      />

      {/* ── Drawer Panel ── */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={`fixed top-0 right-0 bottom-0 z-[120] w-[min(320px,90vw)]
                    bg-white flex flex-col
                    shadow-[−24px_0_48px_rgba(0,0,0,.12)]
                    transition-transform duration-300 ease-[cubic-bezier(.32,0,.67,0)]
                    print:hidden
                    ${open ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* ── Header ── */}
        <div className="flex items-center justify-between px-5 py-4 shrink-0">
          <Link to="/" onClick={onClose} className="no-underline">
            <DarBoxLogo variant="light" size="md" />
          </Link>
          <div className="flex items-center gap-2">
            <button
              onClick={() => { onClose(); onLang(); }}
              aria-label="Change language"
              className="w-9 h-9 flex items-center justify-center rounded-full
                         text-[#5a5a5a] hover:bg-[#f0faf4] hover:text-[#1a7a4a]
                         transition-colors duration-[160ms]"
            >
              <Globe className="w-[18px] h-[18px]" />
            </button>
            <button
              onClick={onClose}
              aria-label="Close menu"
              className="w-9 h-9 flex items-center justify-center rounded-full
                         text-[#5a5a5a] hover:bg-[#fef2f2] hover:text-[#dc2626]
                         transition-colors duration-[160ms]"
            >
              <X className="w-[18px] h-[18px]" />
            </button>
          </div>
        </div>

        {/* ── Divider ── */}
        <div className="h-px bg-[#f0f0f0] mx-5 shrink-0" />

        {/* ── Scrollable Content ── */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">

          {/* PRIMARY NAV */}
          {isHome ? (
            <>
              <PrimaryItem label={t.navHow}     onClick={() => go('how')}    />
              <PrimaryItem label={t.navPlans}   onClick={() => go('offres')} />
              <PrimaryItem label={t.navFaq}     onClick={() => go('faq')}    />
            </>
          ) : (
            <PrimaryItem
              label={t.navHow}
              onClick={() => { onClose(); }}
            />
          )}

          {/* ── Section divider ── */}
          <div className="pt-3 pb-1 px-2">
            <span className="text-[.68rem] font-bold tracking-[.1em] uppercase text-[#b0b0b0]">
              Ressources
            </span>
          </div>

          {/* SECONDARY NAV */}
          <SecondaryItem
            label={t.navCatalogue}
            onClick={() => { onClose(); window.open('/assets/DarBox_Catalogue_2026.pdf', '_blank'); }}
          />
        </nav>

        {/* ── Footer – CTA ── */}
        {isHome && (
          <div className="shrink-0 px-5 pb-8 pt-4 border-t border-[#f0f0f0]">
            <button
              onClick={() => go('offres')}
              className="group w-full flex items-center justify-center gap-2
                         py-3.5 rounded-full font-bold text-[.95rem] text-white
                         bg-gradient-to-r from-[#0d1117] to-[#1a3a28]
                         hover:from-[#1a7a4a] hover:to-[#22a663]
                         active:scale-[.97]
                         shadow-[0_4px_18px_rgba(0,0,0,.18)]
                         transition-all duration-200 ease-out"
            >
              {t.navCta}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-[160ms]" />
            </button>
            <p className="text-center text-[.73rem] text-[#b0b0b0] mt-3">
              Livraison · Tanger &amp; environs
            </p>
          </div>
        )}
      </aside>
    </>
  );
}
