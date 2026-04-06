import { useEffect, useRef, useCallback } from 'react';

/**
 * useScrollReveal — cinematic fade-up / stagger / scale-in animations
 * 
 * Usage:
 *   const revealRef = useScrollReveal();
 *   <div ref={revealRef} className="sr" data-sr-delay="200">...</div>
 * 
 * CSS classes applied:
 *   .sr          → base hidden state
 *   .sr-visible  → animated-in state
 * 
 * data-sr-delay="<ms>"  → stagger delay
 */
export function useScrollReveal(options = {}) {
  const { threshold = 0.1, rootMargin = '0px 0px -40px 0px' } = options;
  const observerRef = useRef(null);
  const elementsRef = useRef(new Set());

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const delay = parseInt(el.dataset.srDelay || '0', 10);
            if (delay > 0) {
              setTimeout(() => el.classList.add('sr-visible'), delay);
            } else {
              el.classList.add('sr-visible');
            }
            observerRef.current?.unobserve(el);
          }
        });
      },
      { threshold, rootMargin }
    );

    // Observe any elements already registered
    elementsRef.current.forEach((el) => {
      observerRef.current?.observe(el);
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, [threshold, rootMargin]);

  const ref = useCallback((node) => {
    if (!node) return;
    // Find all .sr children + node itself
    const targets = node.querySelectorAll('.sr');
    if (node.classList.contains('sr')) {
      elementsRef.current.add(node);
      observerRef.current?.observe(node);
    }
    targets.forEach((el) => {
      elementsRef.current.add(el);
      observerRef.current?.observe(el);
    });
  }, []);

  return ref;
}

/**
 * useScrollRevealAll — observe ALL .sr elements in the entire document.
 * Call once in the page-level component.
 */
export function useScrollRevealAll(deps = []) {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const delay = parseInt(el.dataset.srDelay || '0', 10);
            if (delay > 0) {
              setTimeout(() => el.classList.add('sr-visible'), delay);
            } else {
              el.classList.add('sr-visible');
            }
            obs.unobserve(el);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      document.querySelectorAll('.sr').forEach((el) => obs.observe(el));
    }, 100);

    return () => {
      clearTimeout(timer);
      obs.disconnect();
    };
  }, deps);
}
