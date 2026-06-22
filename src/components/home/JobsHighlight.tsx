'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Briefcase, ArrowRight, Building, Users, FileText } from 'lucide-react';
import { MCEN_STATS } from '@/lib/mock-data';

export default function JobsHighlight() {
  return (
    <section className="bg-white py-20 sm:py-24" aria-label="Employment network highlight">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
          className="pattern-overlay-light relative overflow-hidden rounded-3xl bg-emerald-gradient shadow-card-hover"
        >
          {/* Gold accent edge */}
          <div className="absolute inset-x-0 top-0 h-1.5 bg-gold-gradient" aria-hidden />

          <div className="relative grid grid-cols-1 gap-10 p-8 sm:p-12 lg:grid-cols-2 lg:items-center lg:p-16">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-gold-light">
                <Briefcase className="h-3.5 w-3.5" aria-hidden />
                MCEN
              </span>
              <h2 className="mt-5 text-balance font-heading text-3xl font-bold leading-tight text-white sm:text-4xl">
                Muslim Connect{' '}
                <span className="text-gold-light">Employment Network</span>
              </h2>
              <p className="mt-4 max-w-md text-base leading-relaxed text-white/75">
                Halal opportunities for every talent — from Imams and Madrasa teachers to
                engineers and entrepreneurs. Connect with employers who share your values.
              </p>
              <Link
                href="/employment-network"
                className="group mt-7 inline-flex min-h-[48px] items-center gap-2 rounded-full bg-gold px-7 text-sm font-semibold text-dark-emerald shadow-gold transition-all hover:scale-[1.03] hover:shadow-glow"
              >
                Explore Opportunities
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
              </Link>
            </div>

            {/* Stat tiles */}
            <div className="grid grid-cols-2 gap-4">
              {MCEN_STATS.map((stat, i) => {
                const icons = [Briefcase, Building, FileText, Users];
                const Icon = icons[i % icons.length];
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 * i }}
                    className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm"
                  >
                    <Icon className="h-6 w-6 text-gold-light" aria-hidden />
                    <p className="mt-3 font-heading text-3xl font-bold text-white">{stat.value}</p>
                    <p className="mt-1 text-xs font-medium uppercase tracking-wider text-white/60">
                      {stat.label}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
