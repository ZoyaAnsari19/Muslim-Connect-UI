'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Eye,
  Target,
  ShieldCheck,
  HeartHandshake,
  Sparkles,
  Handshake,
  ArrowRight,
  type LucideIcon,
} from 'lucide-react';
import { TIMELINE, VALUES } from '@/lib/mock-data';
import SectionHeading from '@/components/ui/SectionHeading';
import PageTransition from '@/components/PageTransition';

const VALUE_ICONS: Record<string, LucideIcon> = {
  ShieldCheck,
  HeartHandshake,
  Sparkles,
  Handshake,
};

const COMMUNITY_PHOTOS = [
  {
    src: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?q=80&w=600&auto=format&fit=crop',
    alt: 'Illuminated mosque domes at dusk',
  },
  {
    src: 'https://images.unsplash.com/photo-1542816417-0983c9c9ad53?q=80&w=600&auto=format&fit=crop',
    alt: 'Grand mosque marble courtyard',
  },
  {
    src: 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?q=80&w=600&auto=format&fit=crop',
    alt: 'Student reading the Quran',
  },
  {
    src: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?q=80&w=600&auto=format&fit=crop',
    alt: 'Mosque silhouette at golden sunset',
  },
  {
    src: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=600&auto=format&fit=crop',
    alt: 'Professionals collaborating together',
  },
  {
    src: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?q=80&w=600&auto=format&fit=crop',
    alt: 'Historic Makkah Masjid architecture',
  },
];

export default function AboutUsPage() {
  return (
    <PageTransition>
      {/* Page hero */}
      <section className="pattern-overlay-light relative bg-emerald-gradient px-4 pb-20 pt-36 text-center sm:pb-24 sm:pt-44">
        <div className="relative mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-gold-light">
              Our Story
            </span>
            <h1 className="mt-5 text-balance font-heading text-4xl font-bold leading-tight text-white sm:text-5xl">
              Serving the Ummah, <span className="text-gold-light">Digitally</span>
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/75">
              Muslim Connect was born from a simple belief — that technology, built with ikhlas,
              can strengthen the bonds of our global community.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Vision */}
      <section className="bg-ivory py-20 sm:py-24" aria-label="Our vision">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.65 }}
            className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-card-hover"
          >
            <Image
              src="https://images.unsplash.com/photo-1564769625905-50e93615e769?q=80&w=1000&auto=format&fit=crop"
              alt="Mosque glowing at dusk, symbolizing our vision"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.65 }}
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-50 text-primary">
              <Eye className="h-7 w-7" aria-hidden />
            </span>
            <h2 className="mt-5 font-heading text-3xl font-bold text-heading sm:text-4xl">
              Our Vision
            </h2>
            <p className="mt-4 text-base leading-relaxed text-body">
              A world where every Muslim — wherever they live — can instantly find their nearest
              masjid, a trusted scholar, a qualified doctor, or a barakah-filled career
              opportunity within their own community.
            </p>
            <p className="mt-3 text-base leading-relaxed text-body">
              We envision a digitally united Ummah: connected not by algorithms that divide, but
              by shared values, mutual trust, and the spirit of khidmah.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission (reversed) */}
      <section className="bg-white py-20 sm:py-24" aria-label="Our mission">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.65 }}
            className="order-2 lg:order-1"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gold-soft text-gold-dark">
              <Target className="h-7 w-7" aria-hidden />
            </span>
            <h2 className="mt-5 font-heading text-3xl font-bold text-heading sm:text-4xl">
              Our Mission
            </h2>
            <p className="mt-4 text-base leading-relaxed text-body">
              To build the most trusted digital directory of Islamic institutions and Muslim
              professionals — verified with care, designed with excellence, and offered freely to
              the community.
            </p>
            <ul className="mt-5 space-y-3 text-sm leading-relaxed text-body">
              <li className="flex gap-3">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-gold" aria-hidden />
                Map and verify every masjid, dargah, and madrasa — starting locally, growing globally.
              </li>
              <li className="flex gap-3">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-gold" aria-hidden />
                Empower Muslim professionals with visibility and halal opportunities through MCEN.
              </li>
              <li className="flex gap-3">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-gold" aria-hidden />
                Make authentic Islamic knowledge — duas, darood, hadees — beautifully accessible.
              </li>
            </ul>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.65 }}
            className="order-1 aspect-[4/3] overflow-hidden rounded-3xl shadow-card-hover lg:order-2"
          >
            <div className="relative h-full w-full">
              <Image
                src="https://images.unsplash.com/photo-1609599006353-e629aaabfeae?q=80&w=1000&auto=format&fit=crop"
                alt="Student studying the Quran, symbolizing our mission of knowledge"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="pattern-overlay relative bg-ivory py-20 sm:py-24" aria-label="Our values">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="What Guides Us"
            title="Values Rooted in Deen"
            subtitle="Four principles shape every decision we make and every feature we build."
          />
          <motion.ul
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
            className="mt-12 grid grid-cols-1 gap-6 xs:grid-cols-2 lg:grid-cols-4"
          >
            {VALUES.map((value) => {
              const Icon = VALUE_ICONS[value.icon] ?? Sparkles;
              return (
                <motion.li
                  key={value.title}
                  variants={{
                    hidden: { opacity: 0, y: 28 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.55 } },
                  }}
                >
                  <motion.div
                    whileHover={{ y: -5, scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                    className="flex h-full flex-col gap-3 rounded-2xl border border-card-border bg-white p-6 shadow-card hover:shadow-card-hover"
                  >
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary">
                      <Icon className="h-6 w-6" aria-hidden />
                    </span>
                    <h3 className="font-heading text-lg font-bold text-heading">{value.title}</h3>
                    <p className="text-sm leading-relaxed text-body">{value.description}</p>
                  </motion.div>
                </motion.li>
              );
            })}
          </motion.ul>
        </div>
      </section>

      {/* Journey timeline */}
      <section className="bg-white py-20 sm:py-24" aria-label="Our journey">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Our Journey"
            title="From a Local Idea to a Global Vision"
          />
          <ol className="relative mt-14 space-y-12 before:absolute before:bottom-2 before:left-[19px] before:top-2 before:w-0.5 before:bg-gradient-to-b before:from-primary before:via-gold before:to-primary-200 sm:before:left-1/2 sm:before:-translate-x-1/2">
            {TIMELINE.map((event, i) => {
              const left = i % 2 === 0;
              return (
                <motion.li
                  key={event.year}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.6, delay: 0.05 * i }}
                  className={`relative flex gap-6 pl-14 sm:w-1/2 sm:pl-0 ${
                    left ? 'sm:pr-12 sm:text-right' : 'sm:ml-auto sm:pl-12'
                  }`}
                >
                  {/* Node */}
                  <span
                    className={`absolute left-0 top-1 flex h-10 w-10 items-center justify-center rounded-full border-4 border-ivory bg-primary font-heading text-[10px] font-bold text-gold-light shadow-card sm:left-auto ${
                      left ? 'sm:-right-5' : 'sm:-left-5'
                    }`}
                    aria-hidden
                  >
                    {event.year.slice(2)}
                  </span>
                  <div className="rounded-2xl border border-card-border bg-ivory/60 p-5 shadow-card">
                    <span className="text-xs font-bold uppercase tracking-widest text-gold-dark">
                      {event.year}
                    </span>
                    <h3 className="mt-1 font-heading text-lg font-bold text-heading">
                      {event.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-body">{event.description}</p>
                  </div>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* Community photos */}
      <section className="bg-ivory py-20 sm:py-24" aria-label="Community photos">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Moments"
            title="The Community We Serve"
          />
          <motion.ul
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
            className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3"
          >
            {COMMUNITY_PHOTOS.map((photo) => (
              <motion.li
                key={photo.src}
                variants={{
                  hidden: { opacity: 0, scale: 0.94 },
                  show: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
                }}
                className="group relative aspect-square overflow-hidden rounded-2xl shadow-card"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 640px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </motion.li>
            ))}
          </motion.ul>

          <div className="mt-14 text-center">
            <Link
              href="/onboarding"
              className="group inline-flex min-h-[52px] items-center gap-2 rounded-full bg-primary px-8 text-base font-medium text-white shadow-card transition-all hover:bg-primary-hover hover:shadow-card-hover"
            >
              Become Part of Our Story
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden />
            </Link>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
