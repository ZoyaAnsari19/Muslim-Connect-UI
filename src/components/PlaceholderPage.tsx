'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Hammer, type LucideIcon } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

interface PlaceholderPageProps {
  icon: LucideIcon;
  badge: string;
  title: string;
  description: string;
  showGreeting?: boolean;
}

/** Premium "coming soon" placeholder used for Part-2 routes. */
export default function PlaceholderPage({
  icon: Icon,
  badge,
  title,
  description,
  showGreeting = false,
}: PlaceholderPageProps) {
  const { user, isHydrated } = useAuth();

  return (
    <div className="pattern-overlay-light relative flex min-h-screen items-center justify-center bg-dark-emerald px-4 py-28">
      {/* Glow accents */}
      <div className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-primary/25 blur-3xl" aria-hidden />
      <div className="absolute bottom-1/4 right-1/4 h-64 w-64 rounded-full bg-gold/15 blur-3xl" aria-hidden />

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative w-full max-w-lg rounded-3xl border border-white/10 bg-white/5 p-10 text-center backdrop-blur-md sm:p-12"
      >
        <motion.span
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-gold/15 text-gold-light"
        >
          <Icon className="h-9 w-9" aria-hidden />
        </motion.span>

        <span className="mt-6 inline-flex items-center gap-1.5 rounded-full border border-gold/40 bg-gold/10 px-4 py-1 text-[11px] font-semibold uppercase tracking-widest text-gold-light">
          <Hammer className="h-3 w-3" aria-hidden />
          {badge}
        </span>

        <h1 className="mt-4 font-heading text-3xl font-bold text-white">{title}</h1>

        {showGreeting && isHydrated && user && (
          <p className="mt-2 text-sm font-medium text-gold-light">
            Assalamu Alaikum, {user.fullName.split(' ')[0]}!
          </p>
        )}

        <p className="mt-3 text-sm leading-relaxed text-white/70">{description}</p>

        <Link
          href="/"
          className="group mt-8 inline-flex min-h-[48px] items-center gap-2 rounded-full bg-gold px-7 text-sm font-semibold text-dark-emerald shadow-gold transition-all hover:scale-[1.03]"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" aria-hidden />
          Back to Home
        </Link>
      </motion.div>
    </div>
  );
}
