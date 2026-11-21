'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

const MIN_MS = 1600;
const COVER_MS = 1000;
const HOLD_MS = 500;
/** Must stay ≥ CSS exit transition (transform 1s) */
const EXIT_MS = 1050;

type Phase = 'below' | 'covering' | 'exiting';

function isContactPath(path: string) {
  return path === '/contact' || path.startsWith('/contact/');
}

function involvesContact(from: string, to: string) {
  return isContactPath(from) !== isContactPath(to);
}

export default function PageLoader() {
  const router = useRouter();
  const pathname = usePathname();
  const [phase, setPhase] = useState<Phase>('covering');
  const [visible, setVisible] = useState(true);
  const [markKey, setMarkKey] = useState(0);
  const transitioning = useRef(false);
  const pathnameRef = useRef(pathname);
  pathnameRef.current = pathname;

  // Fresh SVG URL on every mount so the logo loop restarts (incl. hard reload)
  useEffect(() => {
    setMarkKey(Date.now());
  }, []);

  // Initial load curtain
  useEffect(() => {
    let active = true;
    const timers: number[] = [];
    const delay = (ms: number) =>
      new Promise<void>((resolve) => {
        timers.push(window.setTimeout(resolve, ms));
      });

    const dismiss = () => {
      if (!active) return;
      active = false;
      setPhase('exiting');
      // Unlock scroll mid-exit so removing overflow doesn't snap with the curtain
      window.setTimeout(() => {
        document.documentElement.classList.remove('loader-active');
      }, 350);
      window.setTimeout(() => {
        setVisible(false);
      }, EXIT_MS);
    };

    const dismissNow = () => {
      active = false;
      setVisible(false);
      document.documentElement.classList.remove('loader-active');
    };

    document.documentElement.classList.add('loader-active');

    // Absolute failsafe — never leave the user stranded on the loader
    timers.push(window.setTimeout(dismissNow, 5000));

    (async () => {
      const started = Date.now();
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      await new Promise<void>((resolve) => {
        if (document.readyState === 'complete') {
          resolve();
          return;
        }
        const onLoad = () => resolve();
        window.addEventListener('load', onLoad, { once: true });
        timers.push(
          window.setTimeout(() => {
            window.removeEventListener('load', onLoad);
            resolve();
          }, 2500),
        );
      });

      if (!active) return;

      const remain = Math.max(0, MIN_MS - (Date.now() - started));
      await delay(remain);
      if (!active) return;

      if (reduce) {
        dismissNow();
        return;
      }

      dismiss();
    })();

    return () => {
      active = false;
      timers.forEach((id) => window.clearTimeout(id));
      document.documentElement.classList.remove('loader-active');
    };
  }, []);

  // Contact in/out curtain
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      if (transitioning.current) {
        event.preventDefault();
        return;
      }

      const anchor = (event.target as Element | null)?.closest?.('a');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) {
        return;
      }
      if (anchor.target === '_blank' || anchor.hasAttribute('download')) return;

      let url: URL;
      try {
        url = new URL(href, window.location.href);
      } catch {
        return;
      }
      if (url.origin !== window.location.origin) return;

      const nextPath = url.pathname;
      const currentPath = pathnameRef.current;
      if (nextPath === currentPath && url.search === window.location.search) return;
      if (!involvesContact(currentPath, nextPath)) return;

      event.preventDefault();
      event.stopPropagation();

      const target = `${nextPath}${url.search}${url.hash}`;
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      transitioning.current = true;
      document.documentElement.classList.add('loader-active');

      if (reduce) {
        router.push(target);
        transitioning.current = false;
        document.documentElement.classList.remove('loader-active');
        return;
      }

      setMarkKey(Date.now());
      setVisible(true);
      setPhase('below');

      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          setPhase('covering');
        });
      });

      window.setTimeout(() => {
        router.push(target);
        window.setTimeout(() => {
          setPhase('exiting');
          window.setTimeout(() => {
            document.documentElement.classList.remove('loader-active');
          }, 350);
          window.setTimeout(() => {
            setVisible(false);
            transitioning.current = false;
          }, EXIT_MS);
        }, HOLD_MS);
      }, COVER_MS);
    };

    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, [router]);

  if (!visible) return null;

  const className = [
    'page-loader',
    phase === 'below' && 'is-below',
    phase === 'covering' && 'is-covering',
    phase === 'exiting' && 'is-exiting',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={className}
      role="status"
      aria-live="polite"
      aria-busy={phase !== 'exiting'}
      aria-label="Loading 29.tech"
    >
      <div className="page-loader-mark">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          key={markKey}
          src={`/29-loader-loop.svg?r=${markKey}`}
          alt=""
          width={140}
          height={140}
          decoding="async"
        />
      </div>
    </div>
  );
}
