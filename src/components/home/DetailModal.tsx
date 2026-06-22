'use client';

import Image from 'next/image';
import {
  MapPin,
  Phone,
  BadgeCheck,
  Clock,
  CheckCircle2,
  CalendarDays,
  Users,
} from 'lucide-react';
import type { FeaturedItem } from '@/lib/types';
import Modal from '@/components/ui/Modal';
import Badge from '@/components/ui/Badge';
import StarRating from '@/components/ui/StarRating';
import Button from '@/components/ui/Button';
import { useToast } from '@/context/ToastContext';

interface DetailModalProps {
  item: FeaturedItem | null;
  onClose: () => void;
}

export default function DetailModal({ item, onClose }: DetailModalProps) {
  const { toast } = useToast();

  return (
    <Modal open={!!item} onClose={onClose} label={item ? `Details of ${item.name}` : 'Details'}>
      {item && (
        <article>
          {/* Header image */}
          <div className="relative h-52 w-full overflow-hidden bg-emerald-gradient sm:h-60">
            {item.category === 'professional' ? (
              <div className="flex h-full flex-col items-center justify-center gap-3">
                <Image
                  src={item.avatar}
                  alt={`Portrait of ${item.name}`}
                  width={104}
                  height={104}
                  className="rounded-full border-4 border-white/80 object-cover shadow-card"
                />
                <Badge variant="gold">{item.profession}</Badge>
              </div>
            ) : (
              <>
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 672px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-emerald/80 to-transparent" aria-hidden />
              </>
            )}
          </div>

          <div className="p-6 sm:p-8">
            {/* Title row */}
            <header>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="font-heading text-2xl font-bold text-heading">{item.name}</h2>
                {item.verified && (
                  <span className="flex items-center gap-1 rounded-full bg-primary-50 px-2.5 py-1 text-xs font-semibold text-primary">
                    <BadgeCheck className="h-3.5 w-3.5 text-gold-dark" aria-hidden />
                    Verified
                  </span>
                )}
              </div>
              <p className="mt-2 flex items-center gap-1.5 text-sm text-body">
                <MapPin className="h-4 w-4 text-gold-dark" aria-hidden />
                {item.area}, {item.city}, {item.state}
              </p>
              <div className="mt-2">
                <StarRating rating={item.rating} size={16} />
                <span className="ml-2 text-xs text-body">({item.reviews.length} reviews)</span>
              </div>
            </header>

            {/* Quick facts */}
            <div className="mt-4 flex flex-wrap gap-2">
              {item.category === 'masjid' && (
                <>
                  <Badge variant="emerald">
                    <Clock className="h-3 w-3" aria-hidden />
                    Next: {item.nextPrayer.name} {item.nextPrayer.time}
                  </Badge>
                  {item.capacity && (
                    <Badge variant="neutral">
                      <Users className="h-3 w-3" aria-hidden />
                      Capacity {item.capacity.toLocaleString()}
                    </Badge>
                  )}
                </>
              )}
              {item.category === 'dargah' && (
                <>
                  <Badge variant="gold">{item.saintName}</Badge>
                  {item.ursDate && (
                    <Badge variant="neutral">
                      <CalendarDays className="h-3 w-3" aria-hidden />
                      Urs: {item.ursDate}
                    </Badge>
                  )}
                </>
              )}
              {item.category === 'madrasa' &&
                item.courses.map((c) => (
                  <Badge key={c} variant="emerald">
                    {c}
                  </Badge>
                ))}
              {item.category === 'professional' && (
                <Badge variant="gold">{item.experienceYears}+ years experience</Badge>
              )}
            </div>

            {/* Description */}
            <p className="mt-5 text-sm leading-relaxed text-body">{item.description}</p>

            {/* Services */}
            <section className="mt-6" aria-label="Services offered">
              <h3 className="font-heading text-base font-semibold text-heading">Services</h3>
              <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {item.services.map((s) => (
                  <li key={s} className="flex items-center gap-2 text-sm text-body">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" aria-hidden />
                    {s}
                  </li>
                ))}
              </ul>
            </section>

            {/* Reviews */}
            <section className="mt-6" aria-label="Community reviews">
              <h3 className="font-heading text-base font-semibold text-heading">
                Community Reviews
              </h3>
              <ul className="mt-3 space-y-3">
                {item.reviews.map((r) => (
                  <li key={r.id} className="rounded-xl border border-card-border bg-ivory/60 p-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-sm font-semibold text-heading">{r.author}</span>
                      <StarRating rating={r.rating} showValue={false} />
                    </div>
                    <p className="mt-1.5 text-sm leading-relaxed text-body">{r.comment}</p>
                    <time className="mt-1.5 block text-xs text-body/60" dateTime={r.date}>
                      {new Date(r.date).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </time>
                  </li>
                ))}
              </ul>
            </section>

            {/* Actions */}
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              {'phone' in item && item.phone && (
                <Button
                  variant="primary"
                  className="flex-1"
                  onClick={() => toast(`Calling ${item.phone}… (demo)`, 'info')}
                >
                  <Phone className="h-4 w-4" aria-hidden />
                  Contact
                </Button>
              )}
              <Button
                variant="secondary"
                className="flex-1"
                onClick={() => toast('Saved to your favourites! (demo)')}
              >
                Save to Favourites
              </Button>
            </div>
          </div>
        </article>
      )}
    </Modal>
  );
}
