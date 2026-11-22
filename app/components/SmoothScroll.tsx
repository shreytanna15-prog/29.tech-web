'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Lenis from 'lenis';

/**
 * Wheel smoothing via Lenis: ease-out so velocity decays instead of a hard stop.
 * Touch stays native (syncTouch off).
 */
function scrollLocked() {
  const root = document.documentElement;
  if (root.classList.contains('loader-active')) return true;
  const inline = root.style.overflow;
  if (inline === 'hidden' || inline === 'clip') return true;
  if (document.body.style.overflow === 'hidden') return true;
  return false;
}

export default function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      autoRaf: true,
      gestureOrientation: 'vertical',
      anchors: true,
    });

    const sync = () => {
      if (scrollLocked()) lenis.stop();
      else lenis.start();
    };

    sync();

    const observer = new MutationObserver(sync);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class', 'style'],
    });
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['style'],
    });

    return () => {
      observer.disconnect();
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;
    // Content height changes on client navigations; Lenis keeps its own limit.
    window.dispatchEvent(new Event('resize'));
  }, [pathname]);

  return null;
}
