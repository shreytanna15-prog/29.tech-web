'use client';

import { useEffect, useRef } from 'react';
import { CAL_BOOKING_URL, CAL_EMBED } from '../lib/cal';

type CalApi = ((...args: unknown[]) => void) & {
  loaded?: boolean;
  ns?: Record<string, CalApi>;
  q?: unknown[];
  config?: { forwardQueryParams?: boolean };
};

declare global {
  interface Window {
    Cal?: CalApi;
  }
}

function ensureCalLoader() {
  if (typeof window === 'undefined' || window.Cal) return;

  const scriptSrc = 'https://app.cal.com/embed/embed.js';

  (function (C: Window, A: string, L: string) {
    const push = (api: CalApi, args: unknown[]) => {
      api.q = api.q || [];
      api.q.push(args);
    };

    C.Cal =
      C.Cal ||
      function (...args: unknown[]) {
        const cal = C.Cal!;
        if (!cal.loaded) {
          cal.ns = {};
          cal.q = cal.q || [];
          const script = C.document.createElement('script');
          script.src = A;
          script.async = true;
          C.document.head.appendChild(script);
          cal.loaded = true;
        }

        if (args[0] === L) {
          const api = function (...inner: unknown[]) {
            push(api as CalApi, inner);
          } as CalApi;
          const namespace = args[1];
          api.q = api.q || [];
          if (typeof namespace === 'string') {
            cal.ns = cal.ns || {};
            cal.ns[namespace] = cal.ns[namespace] || api;
            push(cal.ns[namespace], args);
            push(cal, ['initNamespace', namespace]);
          } else {
            push(cal, args);
          }
          return;
        }

        push(cal, args);
      } as CalApi;
  })(window, scriptSrc, 'init');
}

export default function CalEmbed() {
  const { namespace, elementId, calLink } = CAL_EMBED;
  const containerRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || initialized.current) return;

    // Dots in the Cal-provided id break CSS selectors (#…29.tech → id + .tech class).
    // Pass the mounted element instead of a "#id" string.
    ensureCalLoader();

    const Cal = window.Cal;
    if (!Cal) return;

    Cal('init', namespace, { origin: 'https://app.cal.com' });
    Cal.config = Cal.config || {};
    Cal.config.forwardQueryParams = true;

    const ns = Cal.ns?.[namespace];
    if (!ns) return;

    initialized.current = true;

    ns('inline', {
      elementOrSelector: el,
      config: {
        layout: 'month_view',
        useSlotsViewOnSmallScreen: 'true',
      },
      calLink,
    });

    ns('ui', {
      hideEventTypeDetails: false,
      layout: 'month_view',
      styles: {
        branding: { brandColor: '#1a1d1f' },
      },
    });

    return () => {
      // Allow re-init after React Strict Mode remount / client navigation.
      initialized.current = false;
      el.replaceChildren();
    };
  }, [calLink, namespace]);

  return (
    <div className="cal-embed-wrap">
      <div
        ref={containerRef}
        id={elementId}
        className="cal-embed-frame"
        style={{ width: '100%', height: '100%', overflow: 'scroll' }}
      />
      <p className="cal-embed-fallback mono-meta">
        Prefer a full-page booking flow?{' '}
        <a href={CAL_BOOKING_URL} target="_blank" rel="noopener noreferrer">
          Open Cal.com
        </a>
      </p>
    </div>
  );
}
