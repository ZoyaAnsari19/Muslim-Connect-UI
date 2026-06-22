'use client';

// ─── Bare inline animated count-up number (Part 2) ────────────────────────────
// Unlike StatCounter (which renders its own label + layout), CountUp renders
// only the animated number so it can live inside any typography context.

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

interface CountUpProps {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  /** Format with en-IN thousand separators */
  format?: boolean;
}

export default function CountUp({
  value,
  suffix = '',
  prefix = '',
  duration = 1.4,
  format = false,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let frame: number;
    const start = performance.now();
    const total = duration * 1000;
    const tick = (now: number) => {
      const progress = Math.min((now - start) / total, 1);
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setDisplay(Math.round(eased * value));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {format ? display.toLocaleString('en-IN') : display}
      {suffix}
    </span>
  );
}
