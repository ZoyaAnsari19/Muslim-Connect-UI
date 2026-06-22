'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

interface StatCounterProps {
  value: number;
  label: string;
  suffix?: string;
  light?: boolean;
  duration?: number;
}

export default function StatCounter({
  value,
  label,
  suffix = '',
  light = true,
  duration = 1.6,
}: StatCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let frame: number;
    const start = performance.now();
    const total = duration * 1000;
    const tick = (now: number) => {
      const progress = Math.min((now - start) / total, 1);
      // easeOutExpo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setDisplay(Math.round(eased * value));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value, duration]);

  return (
    <div ref={ref} className="flex flex-col items-center gap-1 text-center">
      <span
        className={`font-heading text-3xl font-bold tabular-nums sm:text-4xl ${
          light ? 'text-gold-light' : 'text-primary'
        }`}
      >
        {display}
        {suffix}
      </span>
      <span
        className={`text-xs font-medium uppercase tracking-wider sm:text-sm ${
          light ? 'text-white/70' : 'text-body'
        }`}
      >
        {label}
      </span>
    </div>
  );
}
