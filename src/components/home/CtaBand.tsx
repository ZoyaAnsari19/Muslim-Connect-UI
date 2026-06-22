'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function CtaBand() {
  return (
    <section
      className="pattern-overlay-light relative overflow-hidden bg-dark-emerald py-20 sm:py-24"
      aria-label="Join the community"
    >
      {/* Decorative glows */}
      <div
        className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-primary/30 blur-3xl"
        aria-hidden
      />
      <div
        className="absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-gold/20 blur-3xl"
        aria-hidden
      />

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.65, ease: 'easeOut' }}
        className="relative mx-auto max-w-3xl px-4 text-center sm:px-6"
      >
        <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-gold-light">
          <Sparkles className="h-3.5 w-3.5" aria-hidden />
          Free Forever for the Community
        </span>
        <h2 className="mt-6 text-balance font-heading text-3xl font-bold leading-tight text-white sm:text-5xl">
          Join the Community
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/75">
          Create your profile in under two minutes — connect with masjids, professionals, and
          opportunities across the global Ummah.
        </p>
        <Link
          href="/onboarding"
          className="group mt-8 inline-flex min-h-[52px] items-center gap-2 rounded-full bg-gold px-9 text-base font-semibold text-dark-emerald shadow-gold transition-all hover:scale-[1.04] hover:shadow-glow"
        >
          Get Started Now
          <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden />
        </Link>
      </motion.div>
    </section>
  );
}
