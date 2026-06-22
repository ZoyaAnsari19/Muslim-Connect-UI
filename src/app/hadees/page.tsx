'use client';

import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ScrollText, Search, BookMarked, SearchX, X } from 'lucide-react';
import { HADEES_LIST, HADEES_CATEGORIES, HADEES_NARRATORS } from '@/lib/mock-data';
import type { Hadees } from '@/lib/types';
import ContentHero from '@/components/content/ContentHero';
import ShareActions from '@/components/content/ShareActions';
import EmptyState from '@/components/ui/EmptyState';
import Badge from '@/components/ui/Badge';
import PageTransition from '@/components/PageTransition';

export default function HadeesPage() {
  const [query, setQuery] = useState('');
  const [debounced, setDebounced] = useState('');
  const [category, setCategory] = useState('All');
  const [narrator, setNarrator] = useState('All');

  // Debounce search input (300ms)
  useEffect(() => {
    const t = setTimeout(() => setDebounced(query), 300);
    return () => clearTimeout(t);
  }, [query]);

  const filtered = useMemo(() => {
    const q = debounced.trim().toLowerCase();
    return HADEES_LIST.filter((h) => {
      if (category !== 'All' && h.category !== category) return false;
      if (narrator !== 'All' && h.narrator !== narrator) return false;
      if (!q) return true;
      return `${h.translation} ${h.narrator} ${h.book} ${h.reference} ${h.category}`
        .toLowerCase()
        .includes(q);
    });
  }, [debounced, category, narrator]);

  const hasFilters = debounced.trim() !== '' || category !== 'All' || narrator !== 'All';

  const clearFilters = () => {
    setQuery('');
    setCategory('All');
    setNarrator('All');
  };

  return (
    <PageTransition>
      <ContentHero
        icon={ScrollText}
        eyebrow="Hadees Collection"
        title="Wisdom of"
        highlight="the Prophet ﷺ"
        subtitle="Search and explore authentic sayings of the Messenger of Allah ﷺ — filtered by topic and narrator."
        arabic="مَنْ يُرِدِ اللَّهُ بِهِ خَيْرًا يُفَقِّهْهُ فِي الدِّينِ"
        arabicTranslation="&ldquo;When Allah wishes good for someone, He grants him understanding of the religion&rdquo; — Bukhari 71"
      />

      <section className="bg-ivory py-14 sm:py-16" aria-label="Hadees search and list">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          {/* Search + filters */}
          <div className="rounded-2xl border border-card-border bg-white p-5 shadow-card sm:p-6">
            <div className="relative">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-body/50" aria-hidden />
              <label htmlFor="hadees-search" className="sr-only">
                Search hadees
              </label>
              <input
                id="hadees-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by keyword, e.g. intention, charity, knowledge…"
                className="min-h-[48px] w-full rounded-xl border border-card-border bg-ivory/50 pl-11 pr-4 text-sm text-heading placeholder:text-body/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <label htmlFor="filter-category" className="mb-1 block text-xs font-medium text-body">
                  Category
                </label>
                <select
                  id="filter-category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="min-h-[44px] w-full rounded-xl border border-card-border bg-white px-3 text-sm text-heading focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <option>All</option>
                  {HADEES_CATEGORIES.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="filter-narrator" className="mb-1 block text-xs font-medium text-body">
                  Narrator
                </label>
                <select
                  id="filter-narrator"
                  value={narrator}
                  onChange={(e) => setNarrator(e.target.value)}
                  className="min-h-[44px] w-full rounded-xl border border-card-border bg-white px-3 text-sm text-heading focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <option>All</option>
                  {HADEES_NARRATORS.map((n) => (
                    <option key={n}>{n}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Results meta */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-2">
            <p className="text-sm text-body" aria-live="polite">
              Showing{' '}
              <span className="font-semibold text-heading">{filtered.length}</span> of{' '}
              <span className="font-semibold text-heading">{HADEES_LIST.length}</span> hadees
            </p>
            {hasFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1 text-xs font-medium text-primary hover:underline"
              >
                <X className="h-3.5 w-3.5" aria-hidden />
                Clear filters
              </button>
            )}
          </div>

          {/* List */}
          <div className="mt-5 space-y-5">
            {filtered.length === 0 ? (
              <EmptyState
                icon={<SearchX className="h-8 w-8" aria-hidden />}
                title="No hadees found"
                description="Try different keywords or remove some filters — knowledge awaits."
                action={
                  <button
                    onClick={clearFilters}
                    className="min-h-[44px] rounded-full bg-primary px-6 text-sm font-medium text-white transition-colors hover:bg-primary-hover"
                  >
                    Clear All Filters
                  </button>
                }
              />
            ) : (
              <AnimatePresence mode="popLayout">
                {filtered.map((h) => (
                  <motion.div
                    key={h.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.35 }}
                  >
                    <HadeesCard hadees={h} />
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}

function HadeesCard({ hadees }: { hadees: Hadees }) {
  const shareText = `${hadees.arabic}\n\n"${hadees.translation}"\n\n— Narrated by ${hadees.narrator}\n${hadees.book}, ${hadees.reference}\n\nvia Muslim Connect`;

  return (
    <article className="overflow-hidden rounded-2xl border border-card-border bg-white shadow-card transition-shadow hover:shadow-card-hover">
      <div className="space-y-4 p-6">
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-wrap gap-1.5">
            <Badge variant="emerald">{hadees.category}</Badge>
            <Badge variant="gold">
              <BookMarked className="h-3 w-3" aria-hidden />
              {hadees.reference}
            </Badge>
          </div>
          <ShareActions text={shareText} title={`Hadees — ${hadees.reference}`} />
        </div>

        <p className="arabic-text rounded-xl bg-primary-50/50 px-5 py-4 text-heading" lang="ar">
          {hadees.arabic}
        </p>

        <blockquote className="text-base leading-relaxed text-heading">
          &ldquo;{hadees.translation}&rdquo;
        </blockquote>

        <footer className="flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-card-border pt-4 text-xs text-body">
          <span>
            Narrated by <span className="font-semibold text-heading">{hadees.narrator}</span>
          </span>
          <span aria-hidden>·</span>
          <span className="italic">{hadees.book}</span>
        </footer>
      </div>
    </article>
  );
}
