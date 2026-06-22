'use client';

import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { BookOpen, BookOpenText } from 'lucide-react';
import { DUAS, DUA_CATEGORIES } from '@/lib/mock-data';
import type { Dua } from '@/lib/types';
import ContentHero from '@/components/content/ContentHero';
import ShareActions from '@/components/content/ShareActions';
import EmptyState from '@/components/ui/EmptyState';
import Badge from '@/components/ui/Badge';
import PageTransition from '@/components/PageTransition';

export default function DailyDuaPage() {
  const [category, setCategory] = useState<string>(DUA_CATEGORIES[0]);

  const duas = useMemo(() => DUAS.filter((d) => d.category === category), [category]);

  return (
    <PageTransition>
      <ContentHero
        icon={BookOpen}
        eyebrow="Daily Duas"
        title="Duas for"
        highlight="Every Moment"
        subtitle="Authentic supplications from the Quran and Sunnah — with Arabic, transliteration, and meanings in English and Hindi."
        arabic="ادْعُونِي أَسْتَجِبْ لَكُمْ"
        arabicTranslation="&ldquo;Call upon Me; I will respond to you&rdquo; — 40:60"
      />

      <section className="bg-ivory py-14 sm:py-16" aria-label="Dua categories and list">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          {/* Category tabs */}
          <div
            className="scrollbar-none -mx-4 flex gap-2 overflow-x-auto px-4 pb-2 sm:flex-wrap sm:justify-center sm:overflow-visible"
            role="tablist"
            aria-label="Dua categories"
          >
            {DUA_CATEGORIES.map((cat) => {
              const active = category === cat;
              return (
                <button
                  key={cat}
                  role="tab"
                  aria-selected={active}
                  onClick={() => setCategory(cat)}
                  className={`relative min-h-[44px] shrink-0 rounded-full px-5 text-sm font-medium transition-colors ${
                    active
                      ? 'text-white'
                      : 'border border-card-border bg-white text-body hover:border-primary/40 hover:text-primary'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="dua-tab"
                      className="absolute inset-0 rounded-full bg-primary shadow-card"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      aria-hidden
                    />
                  )}
                  <span className="relative z-10">{cat}</span>
                </button>
              );
            })}
          </div>

          {/* Dua cards */}
          <div className="mt-8 space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35 }}
                className="space-y-6"
              >
                {duas.length === 0 ? (
                  <EmptyState
                    icon={<BookOpenText className="h-8 w-8" aria-hidden />}
                    title="No duas in this category yet"
                    description="More authentic duas are being added regularly, inshaAllah."
                  />
                ) : (
                  duas.map((dua, i) => <DuaCard key={dua.id} dua={dua} index={i} />)
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}

function DuaCard({ dua, index }: { dua: Dua; index: number }) {
  const shareText = `${dua.title}\n\n${dua.arabic}\n\n${dua.transliteration}\n\nMeaning: ${dua.englishMeaning}\n\n— via Muslim Connect`;

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      className="overflow-hidden rounded-2xl border border-card-border bg-white shadow-card"
    >
      {/* Header */}
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-card-border bg-ivory/60 px-6 py-4">
        <div>
          <h2 className="font-heading text-lg font-bold text-heading">{dua.title}</h2>
          {dua.reference && (
            <Badge variant="gold" className="mt-1">
              {dua.reference}
            </Badge>
          )}
        </div>
        <ShareActions text={shareText} title={dua.title} />
      </header>

      <div className="space-y-5 p-6">
        {/* Arabic */}
        <p className="arabic-text rounded-xl bg-primary-50/50 px-5 py-4 text-heading" lang="ar">
          {dua.arabic}
        </p>

        {/* Transliteration */}
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-widest text-gold-dark">
            Transliteration
          </h3>
          <p className="mt-1 text-sm italic leading-relaxed text-body">{dua.transliteration}</p>
        </div>

        {/* Meanings */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-card-border bg-ivory/50 p-4">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-primary">
              English Meaning
            </h3>
            <p className="mt-1.5 text-sm leading-relaxed text-body">{dua.englishMeaning}</p>
          </div>
          <div className="rounded-xl border border-card-border bg-ivory/50 p-4">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-primary">
              हिंदी अर्थ
            </h3>
            <p className="mt-1.5 text-sm leading-relaxed text-body" lang="hi">
              {dua.hindiMeaning}
            </p>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
