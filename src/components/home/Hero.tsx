'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { HERO_SLIDES, PLATFORM_STATS } from '@/lib/mock-data';
import StatCounter from '@/components/ui/StatCounter';

interface HeroProps {
  search: string;
  onSearchChange: (value: string) => void;
  onSearchSubmit: () => void;
}

const SLIDE_INTERVAL = 5000;

export default function Hero({ search, onSearchChange, onSearchSubmit }: HeroProps) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const goTo = useCallback((i: number) => {
    setIndex(((i % HERO_SLIDES.length) + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % HERO_SLIDES.length), SLIDE_INTERVAL);
    return () => clearInterval(t);
  }, [paused]);

  return (
    <section
      id="hero-section"
      className="relative flex min-h-[92vh] items-center overflow-hidden bg-dark-emerald"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-label="Welcome to Muslim Connect"
    >
      {/* Slides */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={HERO_SLIDES[index].id}
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.1, ease: 'easeOut' }}
          className="absolute inset-0"
          // swipe support
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.12}
          onDragEnd={(_, info) => {
            if (info.offset.x < -70) goTo(index + 1);
            else if (info.offset.x > 70) goTo(index - 1);
          }}
        >
          <Image
            src={HERO_SLIDES[index].image}
            alt={HERO_SLIDES[index].alt}
            fill
            priority={index === 0}
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* Gradient + pattern overlay */}
      <div className="absolute inset-0 bg-hero-gradient" aria-hidden />
      <div className="pattern-overlay-light absolute inset-0" aria-hidden />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-24 pt-32 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-gold-light backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden />
            Assalamu Alaikum
          </span>
          <h1 className="mt-6 text-balance font-heading text-4xl font-bold leading-tight text-white xs:text-5xl md:text-6xl">
            Connecting the Global{' '}
            <span className="relative inline-block text-gold-light">
              Muslim Community
              <svg
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 200 8"
                preserveAspectRatio="none"
                aria-hidden
              >
                <path d="M2 6 Q100 -2 198 6" stroke="#C9A227" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              </svg>
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
            Discover masjids, dargahs &amp; madrasas near you, network with Muslim professionals,
            and grow together — one Ummah, one platform.
          </p>

          {/* Search bar */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            onSubmit={(e) => {
              e.preventDefault();
              onSearchSubmit();
            }}
            className="mx-auto mt-8 flex max-w-xl overflow-hidden rounded-full border border-white/20 bg-white/95 p-1.5 shadow-card-hover backdrop-blur"
            role="search"
          >
            <label htmlFor="hero-search" className="sr-only">
              Search masjids, madrasas, professionals
            </label>
            <input
              id="hero-search"
              type="search"
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search masjids, madrasas, professionals…"
              className="min-h-[44px] w-full bg-transparent px-4 text-sm text-heading placeholder:text-body/60 focus:outline-none"
            />
            <button
              type="submit"
              className="flex min-h-[44px] shrink-0 items-center gap-2 rounded-full bg-primary px-5 text-sm font-medium text-white transition-colors hover:bg-primary-hover sm:px-7"
            >
              <Search className="h-4 w-4" aria-hidden />
              <span className="hidden sm:inline">Search</span>
            </button>
          </motion.form>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mx-auto mt-14 grid max-w-4xl grid-cols-2 gap-x-4 gap-y-8 border-t border-white/10 pt-10 sm:grid-cols-3 lg:grid-cols-5"
        >
          {PLATFORM_STATS.map((stat) => (
            <StatCounter key={stat.label} value={stat.value} label={stat.label} />
          ))}
        </motion.div>
      </div>

      {/* Dot indicators */}
      <div
        className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-2.5"
        role="tablist"
        aria-label="Hero slides"
      >
        {HERO_SLIDES.map((slide, i) => (
          <button
            key={slide.id}
            role="tab"
            aria-selected={i === index}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => goTo(i)}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              i === index ? 'w-8 bg-gold' : 'w-2.5 bg-white/40 hover:bg-white/70'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
