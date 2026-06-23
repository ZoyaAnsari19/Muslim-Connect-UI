'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  MapPin,
  Clock,
  BadgeCheck,
  CalendarDays,
  Users,
  GraduationCap,
  Eye,
} from 'lucide-react';
import type { FeaturedItem } from '@/lib/types';
import Badge from '@/components/ui/Badge';
import StarRating from '@/components/ui/StarRating';
import DetailModal from '@/components/home/DetailModal';

interface RegistryViewProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  /** Plural noun shown next to the count, e.g. "Masjids" */
  unit: string;
  items: FeaturedItem[];
}

export default function RegistryView({ eyebrow, title, subtitle, unit, items }: RegistryViewProps) {
  const [selected, setSelected] = useState<FeaturedItem | null>(null);

  return (
    <div className="min-h-screen bg-ivory">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-card-border bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-2.5 sm:px-6 lg:px-8">
          <Link
            href="/feed"
            className="inline-flex min-h-[40px] shrink-0 items-center gap-1.5 rounded-full border border-card-border bg-white px-4 text-sm font-medium text-heading transition-colors hover:border-primary hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Back to Feed
          </Link>
          <div className="min-w-0 flex-1 text-center">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-primary">
              {eyebrow}
            </p>
            <h1 className="font-heading text-lg font-bold text-heading sm:text-xl">{title}</h1>
          </div>
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-primary/20 bg-primary-50 px-3.5 py-1.5 text-sm font-medium text-primary">
            <span className="font-heading text-base font-bold leading-none">{items.length}</span>
            {unit}
          </span>
        </div>
      </header>

      {/* Grid */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <p className="mb-6 max-w-2xl text-sm leading-relaxed text-body">{subtitle}</p>

        <motion.ul
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {items.map((item) => (
            <motion.li
              key={item.id}
              variants={{
                hidden: { opacity: 0, y: 24 },
                show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
              }}
            >
              <RegistryCard item={item} onView={() => setSelected(item)} />
            </motion.li>
          ))}
        </motion.ul>
      </main>

      <DetailModal item={selected} onClose={() => setSelected(null)} />
    </div>
  );
}

function RegistryCard({ item, onView }: { item: FeaturedItem; onView: () => void }) {
  const isProfessional = item.category === 'professional';

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-card-border bg-white shadow-card transition-shadow duration-300 hover:shadow-card-hover">
      {/* Media */}
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
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
        {item.verified && (
          <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-primary/95 px-2.5 py-1 text-xs font-semibold text-white shadow-card backdrop-blur">
            <BadgeCheck className="h-3.5 w-3.5" aria-hidden />
            Verified
          </span>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-heading text-base font-bold leading-snug text-heading">{item.name}</h3>
        {isProfessional && (
          <p className="mt-0.5 text-sm font-medium text-primary">{item.profession}</p>
        )}

        <p className="mt-2 flex items-center gap-1.5 text-xs text-body">
          <MapPin className="h-3.5 w-3.5 shrink-0 text-gold-dark" aria-hidden />
          {item.area}, {item.city}
        </p>

        {/* Category-specific meta */}
        <div className="mt-3 space-y-2 text-xs text-body">
          {item.category === 'masjid' && (
            <p className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 shrink-0 text-gold-dark" aria-hidden />
              Next: {item.nextPrayer.name} {item.nextPrayer.time}
            </p>
          )}
          {item.category === 'dargah' && (
            <>
              <p className="flex items-center gap-1.5">
                <Users className="h-3.5 w-3.5 shrink-0 text-gold-dark" aria-hidden />
                {item.saintName}
              </p>
              {item.ursDate && (
                <p className="flex items-center gap-1.5">
                  <CalendarDays className="h-3.5 w-3.5 shrink-0 text-gold-dark" aria-hidden />
                  Urs: {item.ursDate}
                </p>
              )}
            </>
          )}
          {item.category === 'madrasa' && (
            <>
              <p className="flex items-center gap-1.5">
                <GraduationCap className="h-3.5 w-3.5 shrink-0 text-gold-dark" aria-hidden />
                {item.courses.length} courses offered
              </p>
              {item.students && (
                <p className="flex items-center gap-1.5">
                  <Users className="h-3.5 w-3.5 shrink-0 text-gold-dark" aria-hidden />
                  {item.students} students
                </p>
              )}
            </>
          )}
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <StarRating rating={item.rating} />
          {isProfessional && <Badge variant="gold">{item.experienceYears}+ yrs</Badge>}
        </div>

        {/* View Profile */}
        <button
          onClick={onView}
          className="mt-5 inline-flex min-h-[42px] w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-semibold text-white transition-all hover:bg-primary-hover hover:shadow-card-hover"
        >
          <Eye className="h-4 w-4" aria-hidden />
          View Profile
        </button>
      </div>
    </article>
  );
}
