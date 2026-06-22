'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';

const POINTS = [
  'Verified listings you can trust — every masjid, dargah & madrasa is reviewed',
  'A growing network of Muslim professionals across every field',
  'Halal employment opportunities through MCEN',
  'Authentic Islamic content — duas, darood & hadees at your fingertips',
];

export default function AboutTeaser() {
  return (
    <section id="about" className="bg-white py-20 sm:py-24" aria-label="About Muslim Connect">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        {/* Image collage */}
        <motion.div
          initial={{ opacity: 0, x: -32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="relative"
        >
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-card-hover">
            <Image
              src="https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?q=80&w=1000&auto=format&fit=crop"
              alt="Community gathered at a historic masjid"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="absolute -bottom-8 -right-2 hidden w-52 overflow-hidden rounded-2xl border-4 border-white shadow-card-hover sm:block lg:-right-8"
          >
            <Image
              src="https://images.unsplash.com/photo-1542816417-0983c9c9ad53?q=80&w=600&auto=format&fit=crop"
              alt="Marble courtyard of a grand mosque"
              width={400}
              height={280}
              className="object-cover"
            />
          </motion.div>
          {/* Gold decorative ring */}
          <div
            className="absolute -left-5 -top-5 -z-10 h-28 w-28 rounded-full border-[6px] border-gold/30"
            aria-hidden
          />
        </motion.div>

        {/* Copy */}
        <div>
          <SectionHeading
            align="left"
            eyebrow="Why Muslim Connect"
            title="One Platform, One Ummah"
            subtitle="We are building the digital infrastructure of the Muslim community — making it effortless to find places of worship, trusted professionals, and barakah-filled livelihoods."
          />
          <motion.ul
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
            className="mt-7 space-y-3.5"
          >
            {POINTS.map((point) => (
              <motion.li
                key={point}
                variants={{
                  hidden: { opacity: 0, x: 24 },
                  show: { opacity: 1, x: 0, transition: { duration: 0.5 } },
                }}
                className="flex items-start gap-3 text-sm leading-relaxed text-body"
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
                {point}
              </motion.li>
            ))}
          </motion.ul>
          <Link
            href="/about-us"
            className="group mt-8 inline-flex min-h-[48px] items-center gap-2 rounded-full bg-primary px-7 text-sm font-medium text-white shadow-card transition-all hover:bg-primary-hover hover:shadow-card-hover"
          >
            Learn More About Us
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
