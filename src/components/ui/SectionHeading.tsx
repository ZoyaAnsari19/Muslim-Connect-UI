'use client';

import { motion } from 'framer-motion';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  light?: boolean;
}

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  light = false,
}: SectionHeadingProps) {
  const alignment = align === 'center' ? 'text-center mx-auto items-center' : 'text-left items-start';
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
      className={`flex max-w-2xl flex-col gap-3 ${alignment}`}
    >
      {eyebrow && (
        <span
          className={`inline-flex w-fit items-center gap-2 rounded-full px-4 py-1 text-xs font-semibold uppercase tracking-widest ${
            light ? 'bg-white/10 text-gold-light' : 'bg-gold-soft text-gold-dark'
          }`}
        >
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-gold" aria-hidden />
          {eyebrow}
        </span>
      )}
      <h2
        className={`text-balance font-heading text-3xl font-bold leading-tight sm:text-4xl ${
          light ? 'text-white' : 'text-heading'
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={`text-base leading-relaxed ${light ? 'text-white/70' : 'text-body'}`}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
