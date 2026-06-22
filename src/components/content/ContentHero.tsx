'use client';

import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';

interface ContentHeroProps {
  icon: LucideIcon;
  eyebrow: string;
  title: string;
  highlight: string;
  subtitle: string;
  arabic?: string;
  arabicTranslation?: string;
}

/** Shared hero band for Islamic content pages */
export default function ContentHero({
  icon: Icon,
  eyebrow,
  title,
  highlight,
  subtitle,
  arabic,
  arabicTranslation,
}: ContentHeroProps) {
  return (
    <section className="pattern-overlay-light relative bg-emerald-gradient px-4 pb-16 pt-36 text-center sm:pb-20 sm:pt-44">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative mx-auto max-w-3xl"
      >
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-gold/15 text-gold-light">
          <Icon className="h-8 w-8" aria-hidden />
        </span>
        <span className="mt-5 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-gold-light">
          {eyebrow}
        </span>
        <h1 className="mt-4 text-balance font-heading text-4xl font-bold leading-tight text-white sm:text-5xl">
          {title} <span className="text-gold-light">{highlight}</span>
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/75">{subtitle}</p>
        {arabic && (
          <>
            <p className="arabic-text mx-auto mt-6 max-w-lg !text-center !text-xl text-gold-light/90" lang="ar">
              {arabic}
            </p>
            {arabicTranslation && (
              <p className="mt-2 text-xs italic text-white/50">{arabicTranslation}</p>
            )}
          </>
        )}
      </motion.div>
    </section>
  );
}
