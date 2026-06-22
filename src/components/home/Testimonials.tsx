'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { TESTIMONIALS } from '@/lib/mock-data';
import StarRating from '@/components/ui/StarRating';
import SectionHeading from '@/components/ui/SectionHeading';

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);

  const go = useCallback((dir: number) => {
    setDirection(dir);
    setIndex((i) => (i + dir + TESTIMONIALS.length) % TESTIMONIALS.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => go(1), 6000);
    return () => clearInterval(t);
  }, [go, paused]);

  const t = TESTIMONIALS[index];

  return (
    <section
      className="pattern-overlay relative bg-ivory py-20 sm:py-24"
      aria-label="Community testimonials"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Voices of the Community"
          title="Loved by the Ummah"
          subtitle="Real stories from members who found connection, opportunity, and barakah."
        />

        <div className="relative mt-12">
          <div className="overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.figure
                key={t.id}
                custom={direction}
                initial={{ opacity: 0, x: direction * 64 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -64 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.15}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -60) go(1);
                  else if (info.offset.x > 60) go(-1);
                }}
                className="rounded-3xl border border-card-border bg-white p-8 text-center shadow-card sm:p-12"
              >
                <Quote className="mx-auto h-9 w-9 rotate-180 text-gold/50" aria-hidden />
                <blockquote className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-heading sm:text-lg">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-7 flex flex-col items-center gap-2">
                  <Image
                    src={t.avatar}
                    alt={`Portrait of ${t.name}`}
                    width={56}
                    height={56}
                    className="rounded-full border-2 border-gold/40 object-cover"
                  />
                  <div>
                    <p className="font-heading text-sm font-bold text-heading">{t.name}</p>
                    <p className="text-xs text-body">
                      {t.role} · {t.city}
                    </p>
                  </div>
                  <StarRating rating={t.rating} showValue={false} />
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="mt-7 flex items-center justify-center gap-4">
            <button
              onClick={() => go(-1)}
              aria-label="Previous testimonial"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-card-border bg-white text-heading shadow-card transition-all hover:scale-105 hover:border-primary hover:text-primary"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden />
            </button>
            <div className="flex gap-2" role="tablist" aria-label="Testimonials">
              {TESTIMONIALS.map((item, i) => (
                <button
                  key={item.id}
                  role="tab"
                  aria-selected={i === index}
                  aria-label={`Testimonial ${i + 1}`}
                  onClick={() => {
                    setDirection(i > index ? 1 : -1);
                    setIndex(i);
                  }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === index ? 'w-7 bg-primary' : 'w-2 bg-card-border hover:bg-primary/40'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={() => go(1)}
              aria-label="Next testimonial"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-card-border bg-white text-heading shadow-card transition-all hover:scale-105 hover:border-primary hover:text-primary"
            >
              <ChevronRight className="h-5 w-5" aria-hidden />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
