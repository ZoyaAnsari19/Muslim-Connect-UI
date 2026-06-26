'use client';

import { useState, type FormEvent } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Globe,
  ShieldCheck,
  LayoutGrid,
  Users,
  GraduationCap,
  HeartPulse,
  Coins,
  HandHeart,
  Wrench,
  BellRing,
  HandCoins,
  type LucideIcon,
} from 'lucide-react';
import { DONATION_PILLARS, DONATION_CATEGORIES } from '@/lib/mock-data';
import SectionHeading from '@/components/ui/SectionHeading';
import PageTransition from '@/components/PageTransition';
import BackToFeed from '@/components/BackToFeed';
import { useToast } from '@/context/ToastContext';

const ICONS: Record<string, LucideIcon> = {
  Globe,
  ShieldCheck,
  LayoutGrid,
  Users,
  GraduationCap,
  HeartPulse,
  Coins,
  HandHeart,
  Wrench,
};

export default function DonatePage() {
  const { toast } = useToast();
  const [email, setEmail] = useState('');

  const onNotify = (e: FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast('Please enter a valid email address', 'error');
      return;
    }
    setEmail('');
    toast('You will be notified when donations launch, inshaAllah!');
  };

  return (
    <PageTransition>
      <BackToFeed />
      {/* Hero */}
      <section className="pattern-overlay-light relative overflow-hidden bg-emerald-gradient px-4 pb-20 pt-20 text-center sm:pb-24 sm:pt-24">
        <div className="absolute -right-20 top-20 h-72 w-72 rounded-full bg-gold/15 blur-3xl" aria-hidden />
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative mx-auto max-w-3xl"
        >
          <motion.span
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-gold/15 text-gold-light"
          >
            <HandCoins className="h-8 w-8" aria-hidden />
          </motion.span>
          <h1 className="mt-6 text-balance font-heading text-4xl font-bold leading-tight text-white sm:text-5xl">
            Give Sadaqah with <span className="text-gold-light">Complete Trust</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/75">
            A verified, transparent donation platform for the Ummah is on its way. Every rupee
            tracked, every cause vetted, every impact reported.
          </p>
          <p className="arabic-text mx-auto mt-6 max-w-md !text-xl text-gold-light/90" lang="ar">
            مَثَلُ الَّذِينَ يُنفِقُونَ أَمْوَالَهُمْ فِي سَبِيلِ اللَّهِ كَمَثَلِ حَبَّةٍ أَنبَتَتْ سَبْعَ سَنَابِلَ
          </p>
          <p className="mt-2 text-xs italic text-white/50">
            &ldquo;The example of those who spend in the way of Allah is like a seed which grows seven ears&rdquo; — 2:261
          </p>
        </motion.div>
      </section>

      {/* Pillars */}
      <section className="bg-ivory py-20 sm:py-24" aria-label="Our donation pillars">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Built on Trust"
            title="The Four Pillars of Our Donation System"
          />
          <motion.ul
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
            className="mt-12 grid grid-cols-1 gap-6 xs:grid-cols-2 lg:grid-cols-4"
          >
            {DONATION_PILLARS.map((pillar) => {
              const Icon = ICONS[pillar.icon] ?? Globe;
              return (
                <motion.li
                  key={pillar.title}
                  variants={{
                    hidden: { opacity: 0, y: 28 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.55 } },
                  }}
                >
                  <motion.div
                    whileHover={{ y: -5, scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                    className="flex h-full flex-col items-center gap-3 rounded-2xl border border-card-border bg-white p-6 text-center shadow-card hover:shadow-card-hover"
                  >
                    <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gold-soft text-gold-dark">
                      <Icon className="h-6 w-6" aria-hidden />
                    </span>
                    <h3 className="font-heading text-base font-bold text-heading">{pillar.title}</h3>
                    <p className="text-xs leading-relaxed text-body">{pillar.description}</p>
                  </motion.div>
                </motion.li>
              );
            })}
          </motion.ul>
        </div>
      </section>

      {/* Categories with Coming Soon ribbons */}
      <section className="bg-white py-20 sm:py-24" aria-label="Donation categories">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Where Your Sadaqah Will Go"
            title="Donation Categories"
            subtitle="Five carefully structured causes — launching soon with full transparency and verified beneficiaries."
          />
          <motion.ul
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.09 } } }}
            className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {DONATION_CATEGORIES.map((cat) => {
              const Icon = ICONS[cat.icon] ?? HandHeart;
              return (
                <motion.li
                  key={cat.id}
                  variants={{
                    hidden: { opacity: 0, y: 28 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.55 } },
                  }}
                >
                  <motion.article
                    whileHover={{ y: -5, scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                    className="group relative h-full overflow-hidden rounded-2xl border border-card-border bg-white shadow-card hover:shadow-card-hover"
                  >
                    {/* Gold Coming Soon ribbon */}
                    <div
                      className="absolute -right-12 top-6 z-10 rotate-45 bg-gold-gradient px-12 py-1 text-[10px] font-bold uppercase tracking-widest text-dark-emerald shadow-gold"
                      aria-hidden
                    >
                      Coming Soon
                    </div>
                    <div className="relative h-44 overflow-hidden">
                      <Image
                        src={cat.image}
                        alt={`${cat.title} donation category`}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-dark-emerald/70 to-transparent" aria-hidden />
                      <span className="absolute bottom-3 left-4 flex h-10 w-10 items-center justify-center rounded-xl bg-white/95 text-primary shadow-card backdrop-blur">
                        <Icon className="h-5 w-5" aria-hidden />
                      </span>
                    </div>
                    <div className="p-5">
                      <h3 className="font-heading text-lg font-bold text-heading">{cat.title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-body">{cat.description}</p>
                    </div>
                  </motion.article>
                </motion.li>
              );
            })}
          </motion.ul>
        </div>
      </section>

      {/* Notify band */}
      <section className="pattern-overlay-light relative bg-dark-emerald py-20" aria-label="Get notified">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="relative mx-auto max-w-xl px-4 text-center"
        >
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gold/15 text-gold-light">
            <BellRing className="h-7 w-7" aria-hidden />
          </span>
          <h2 className="mt-5 font-heading text-3xl font-bold text-white">Be the First to Give</h2>
          <p className="mt-3 text-sm leading-relaxed text-white/70">
            Leave your email and we&rsquo;ll notify you the moment donations go live.
          </p>
          <form
            onSubmit={onNotify}
            className="mx-auto mt-7 flex max-w-md overflow-hidden rounded-full border border-white/15 bg-white/10 p-1.5 backdrop-blur focus-within:border-gold/60"
          >
            <label htmlFor="notify-email" className="sr-only">
              Email for donation launch notification
            </label>
            <input
              id="notify-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="min-h-[44px] w-full bg-transparent px-4 text-sm text-white placeholder:text-white/40 focus:outline-none"
            />
            <button
              type="submit"
              className="min-h-[44px] shrink-0 rounded-full bg-gold px-6 text-sm font-semibold text-dark-emerald transition-all hover:scale-[1.03] hover:bg-gold-light"
            >
              Notify Me
            </button>
          </form>
        </motion.div>
      </section>
    </PageTransition>
  );
}
