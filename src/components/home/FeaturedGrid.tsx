'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Building2,
  MapPin,
  Clock,
  BadgeCheck,
  GraduationCap,
  Landmark,
  Users,
  SearchX,
} from 'lucide-react';
import { FEATURED_ITEMS } from '@/lib/mock-data';
import type { FeaturedItem, ListingCategory } from '@/lib/types';
import Badge from '@/components/ui/Badge';
import StarRating from '@/components/ui/StarRating';
import SectionHeading from '@/components/ui/SectionHeading';
import EmptyState from '@/components/ui/EmptyState';
import { CardSkeleton } from '@/components/ui/Skeleton';
import DetailModal from './DetailModal';

type FilterValue = 'all' | ListingCategory;

const FILTERS: { value: FilterValue; label: string; icon: typeof Building2 }[] = [
  { value: 'all', label: 'All', icon: Users },
  { value: 'masjid', label: 'Masjids', icon: Building2 },
  { value: 'dargah', label: 'Dargahs', icon: Landmark },
  { value: 'madrasa', label: 'Madrasas', icon: GraduationCap },
  { value: 'professional', label: 'Professionals', icon: Users },
];

interface FeaturedGridProps {
  search: string;
}

export default function FeaturedGrid({ search }: FeaturedGridProps) {
  const [filter, setFilter] = useState<FilterValue>('all');
  const [selected, setSelected] = useState<FeaturedItem | null>(null);
  const [loading, setLoading] = useState(true);

  // Simulate initial data load for skeleton showcase
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(t);
  }, []);

  const items = useMemo(() => {
    const q = search.trim().toLowerCase();
    return FEATURED_ITEMS.filter((item) => {
      if (filter !== 'all' && item.category !== filter) return false;
      if (!q) return true;
      const haystack =
        item.category === 'professional'
          ? `${item.name} ${item.profession} ${item.city} ${item.area}`
          : `${item.name} ${item.city} ${item.area}`;
      return haystack.toLowerCase().includes(q);
    });
  }, [filter, search]);

  return (
    <section id="featured-directory" className="bg-ivory py-20 sm:py-24" aria-label="Featured directory">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Explore the Directory"
          title="Discover Your Community"
          subtitle="Verified masjids, dargahs, madrasas, and trusted Muslim professionals — all in one place."
        />

        {/* Filter pills */}
        <div
          className="mt-10 flex flex-wrap justify-center gap-2.5"
          role="tablist"
          aria-label="Filter directory by category"
        >
          {FILTERS.map((f) => {
            const active = filter === f.value;
            return (
              <button
                key={f.value}
                role="tab"
                aria-selected={active}
                onClick={() => setFilter(f.value)}
                className={`relative flex min-h-[44px] items-center gap-2 rounded-full px-5 text-sm font-medium transition-colors ${
                  active
                    ? 'text-white'
                    : 'border border-card-border bg-white text-body hover:border-primary/40 hover:text-primary'
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="filter-pill"
                    className="absolute inset-0 rounded-full bg-primary shadow-card"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    aria-hidden
                  />
                )}
                <f.icon className="relative z-10 h-4 w-4" aria-hidden />
                <span className="relative z-10">{f.label}</span>
              </button>
            );
          })}
        </div>

        {/* Grid */}
        {loading ? (
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        ) : items.length === 0 ? (
          <div className="mt-12">
            <EmptyState
              icon={<SearchX className="h-8 w-8" aria-hidden />}
              title="Nothing found here"
              description={`No results match "${search}" in this category. Try a different search or category.`}
            />
          </div>
        ) : (
          <motion.ul
            layout
            className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            <AnimatePresence mode="popLayout">
              {items.map((item) => (
                <motion.li
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                >
                  <FeaturedCard item={item} onClick={() => setSelected(item)} />
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
        )}
      </div>

      <DetailModal item={selected} onClose={() => setSelected(null)} />
    </section>
  );
}

// ─── Card ─────────────────────────────────────────────────────────────────────

function FeaturedCard({ item, onClick }: { item: FeaturedItem; onClick: () => void }) {
  const isProfessional = item.category === 'professional';

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ y: -5, scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      className="group block h-full w-full overflow-hidden rounded-2xl border border-card-border bg-white text-left shadow-card transition-shadow duration-300 hover:shadow-card-hover"
      aria-label={`View details of ${item.name}`}
    >
      {/* Image */}
      <div className="relative h-44 w-full overflow-hidden bg-primary-50">
        {isProfessional ? (
          <div className="flex h-full items-center justify-center bg-emerald-gradient">
            <Image
              src={item.avatar}
              alt={`Portrait of ${item.name}`}
              width={88}
              height={88}
              className="rounded-full border-4 border-white/80 object-cover shadow-card"
            />
          </div>
        ) : (
          <Image
            src={item.image}
            alt={item.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
        {item.verified && (
          <span className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-xs font-semibold text-primary shadow-card backdrop-blur">
            <BadgeCheck className="h-3.5 w-3.5 text-gold-dark" aria-hidden />
            Verified
          </span>
        )}
        <span className="absolute right-3 top-3 rounded-full bg-dark-emerald/80 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-gold-light backdrop-blur">
          {item.category}
        </span>
      </div>

      {/* Body */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-heading text-base font-bold leading-snug text-heading">
            {item.name}
          </h3>
        </div>
        {isProfessional && (
          <p className="mt-0.5 text-sm font-medium text-primary">{item.profession}</p>
        )}
        <p className="mt-1.5 flex items-center gap-1.5 text-xs text-body">
          <MapPin className="h-3.5 w-3.5 shrink-0 text-gold-dark" aria-hidden />
          {item.area}, {item.city}
        </p>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <StarRating rating={item.rating} />
        </div>

        {/* Category-specific chips */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {item.category === 'masjid' && (
            <Badge variant="emerald">
              <Clock className="h-3 w-3" aria-hidden />
              {item.nextPrayer.name} {item.nextPrayer.time}
            </Badge>
          )}
          {item.category === 'dargah' && <Badge variant="gold">{item.saintName}</Badge>}
          {item.category === 'madrasa' &&
            item.courses.slice(0, 2).map((c) => (
              <Badge key={c} variant="emerald">
                {c}
              </Badge>
            ))}
          {item.category === 'madrasa' && item.courses.length > 2 && (
            <Badge variant="neutral">+{item.courses.length - 2} more</Badge>
          )}
          {isProfessional && (
            <Badge variant="gold">{item.experienceYears}+ yrs experience</Badge>
          )}
        </div>
      </div>
    </motion.button>
  );
}
