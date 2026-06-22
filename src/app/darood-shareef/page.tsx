'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Gift, Star, RotateCcw, Plus, type LucideIcon } from 'lucide-react';
import { DAROODS, DAROOD_BENEFITS } from '@/lib/mock-data';
import type { Darood } from '@/lib/types';
import ContentHero from '@/components/content/ContentHero';
import ShareActions from '@/components/content/ShareActions';
import SectionHeading from '@/components/ui/SectionHeading';
import PageTransition from '@/components/PageTransition';

const BENEFIT_ICONS: Record<string, LucideIcon> = { Gift, Heart, Star };
const COUNTER_KEY = 'muslim-connect-darood-counts';

type Counts = Record<string, number>;

function loadCounts(): Counts {
  try {
    return JSON.parse(localStorage.getItem(COUNTER_KEY) ?? '{}') as Counts;
  } catch {
    return {};
  }
}

export default function DaroodShareefPage() {
  const [counts, setCounts] = useState<Counts>({});
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setCounts(loadCounts());
    setHydrated(true);
  }, []);

  const increment = (id: string) => {
    setCounts((prev) => {
      const next = { ...prev, [id]: (prev[id] ?? 0) + 1 };
      localStorage.setItem(COUNTER_KEY, JSON.stringify(next));
      return next;
    });
  };

  const reset = (id: string) => {
    setCounts((prev) => {
      const next = { ...prev, [id]: 0 };
      localStorage.setItem(COUNTER_KEY, JSON.stringify(next));
      return next;
    });
  };

  const total = Object.values(counts).reduce((a, b) => a + b, 0);

  return (
    <PageTransition>
      <ContentHero
        icon={Heart}
        eyebrow="Darood Shareef"
        title="Salutations Upon"
        highlight="the Prophet ﷺ"
        subtitle="Send abundant blessings upon the Messenger of Allah ﷺ — and watch your recitation count grow."
        arabic="إِنَّ اللَّهَ وَمَلَائِكَتَهُ يُصَلُّونَ عَلَى النَّبِيِّ"
        arabicTranslation="&ldquo;Indeed, Allah and His angels send blessings upon the Prophet&rdquo; — 33:56"
      />

      {/* Benefits row */}
      <section className="bg-ivory py-16 sm:py-20" aria-label="Benefits of Darood">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <motion.ul
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
            className="grid grid-cols-1 gap-5 sm:grid-cols-3"
          >
            {DAROOD_BENEFITS.map((benefit) => {
              const Icon = BENEFIT_ICONS[benefit.icon] ?? Star;
              return (
                <motion.li
                  key={benefit.title}
                  variants={{
                    hidden: { opacity: 0, y: 28 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.55 } },
                  }}
                >
                  <motion.div
                    whileHover={{ y: -4, scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                    className="flex h-full flex-col items-center gap-3 rounded-2xl border border-card-border bg-white p-6 text-center shadow-card hover:shadow-card-hover"
                  >
                    <span className="flex h-13 w-13 items-center justify-center rounded-2xl bg-gold-soft p-3 text-gold-dark">
                      <Icon className="h-6 w-6" aria-hidden />
                    </span>
                    <h2 className="font-heading text-base font-bold text-heading">{benefit.title}</h2>
                    <p className="text-xs leading-relaxed text-body">{benefit.description}</p>
                  </motion.div>
                </motion.li>
              );
            })}
          </motion.ul>

          {/* Total counter */}
          {hydrated && total > 0 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-8 text-center text-sm text-body"
            >
              Your total recitations on this device:{' '}
              <span className="font-heading text-lg font-bold text-primary tabular-nums">{total}</span>{' '}
              — may Allah accept them all.
            </motion.p>
          )}
        </div>
      </section>

      {/* Darood cards */}
      <section className="bg-white py-16 sm:py-20" aria-label="Darood collection">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="Recite & Count"
            title="The Blessed Collection"
            subtitle="Tap the counter chip after each recitation — your count is saved on this device."
          />
          <div className="mt-12 space-y-6">
            {DAROODS.map((darood, i) => (
              <DaroodCard
                key={darood.id}
                darood={darood}
                index={i}
                count={hydrated ? (counts[darood.id] ?? 0) : 0}
                onCount={() => increment(darood.id)}
                onReset={() => reset(darood.id)}
              />
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}

function DaroodCard({
  darood,
  index,
  count,
  onCount,
  onReset,
}: {
  darood: Darood;
  index: number;
  count: number;
  onCount: () => void;
  onReset: () => void;
}) {
  const shareText = `${darood.title}\n\n${darood.arabic}\n\n${darood.transliteration}\n\n${darood.translation}\n\n— via Muslim Connect`;

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: (index % 2) * 0.08 }}
      className="overflow-hidden rounded-2xl border border-card-border bg-white shadow-card"
    >
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-card-border bg-ivory/60 px-6 py-4">
        <h3 className="font-heading text-lg font-bold text-heading">{darood.title}</h3>
        <ShareActions text={shareText} title={darood.title} />
      </header>

      <div className="space-y-5 p-6">
        <p className="arabic-text rounded-xl bg-primary-50/50 px-5 py-4 text-heading" lang="ar">
          {darood.arabic}
        </p>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-widest text-gold-dark">
            Transliteration
          </h4>
          <p className="mt-1 text-sm italic leading-relaxed text-body">{darood.transliteration}</p>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-widest text-primary">
            Translation
          </h4>
          <p className="mt-1 text-sm leading-relaxed text-body">{darood.translation}</p>
        </div>

        {darood.virtue && (
          <p className="rounded-xl border border-gold/25 bg-gold-soft/50 px-4 py-3 text-xs leading-relaxed text-gold-dark">
            <Star className="mr-1.5 inline h-3.5 w-3.5 fill-gold text-gold" aria-hidden />
            {darood.virtue}
          </p>
        )}

        {/* Tap-to-count */}
        <div className="flex items-center gap-3 border-t border-card-border pt-5">
          <motion.button
            onClick={onCount}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.92 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            className="flex min-h-[48px] items-center gap-2.5 rounded-full bg-primary px-6 text-sm font-semibold text-white shadow-card hover:bg-primary-hover"
            aria-label={`Count one recitation of ${darood.title}. Current count: ${count}`}
          >
            <Plus className="h-4 w-4" aria-hidden />
            Recited
            <motion.span
              key={count}
              initial={{ scale: 1.5, color: '#E5C75D' }}
              animate={{ scale: 1, color: '#FFFFFF' }}
              transition={{ duration: 0.35 }}
              className="rounded-full bg-white/15 px-3 py-0.5 font-heading text-base font-bold tabular-nums"
            >
              {count}
            </motion.span>
          </motion.button>
          {count > 0 && (
            <button
              onClick={onReset}
              aria-label={`Reset counter for ${darood.title}`}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-card-border text-body transition-colors hover:border-danger hover:text-danger"
            >
              <RotateCcw className="h-4 w-4" aria-hidden />
            </button>
          )}
        </div>
      </div>
    </motion.article>
  );
}
