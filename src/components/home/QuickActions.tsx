'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { MapPin, Clock, HeartHandshake, HandCoins } from 'lucide-react';
import { useToast } from '@/context/ToastContext';

const ACTIONS = [
  {
    label: 'Find Nearby Masjid',
    description: 'Locate verified masjids in your area',
    icon: MapPin,
    type: 'scroll' as const,
    target: '#featured-directory',
  },
  {
    label: 'Prayer Times',
    description: 'Accurate salah timings for your city',
    icon: Clock,
    type: 'toast' as const,
    message: 'Prayer times feature arrives with your dashboard in Part 2, inshaAllah!',
  },
  {
    label: 'Community Services',
    description: 'Nikah, counselling, education & more',
    icon: HeartHandshake,
    type: 'scroll' as const,
    target: '#featured-directory',
  },
  {
    label: 'Donation & Charity',
    description: 'Give sadaqah to verified causes',
    icon: HandCoins,
    type: 'link' as const,
    href: '/donate',
  },
];

export default function QuickActions() {
  const { toast } = useToast();

  return (
    <section className="bg-ivory py-16 sm:py-20" aria-label="Quick actions">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.ul
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.09 } } }}
          className="grid grid-cols-1 gap-5 xs:grid-cols-2 lg:grid-cols-4"
        >
          {ACTIONS.map((action) => {
            const inner = (
              <motion.div
                whileHover={{ y: -5, scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 320, damping: 24 }}
                className="group flex h-full flex-col items-center gap-3 rounded-2xl border border-card-border bg-white p-6 text-center shadow-card transition-shadow hover:shadow-card-hover"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-50 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                  <action.icon className="h-6 w-6" aria-hidden />
                </span>
                <span className="font-heading text-base font-semibold text-heading">
                  {action.label}
                </span>
                <span className="text-xs leading-relaxed text-body">{action.description}</span>
              </motion.div>
            );

            return (
              <motion.li
                key={action.label}
                variants={{
                  hidden: { opacity: 0, y: 28 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
                }}
              >
                {action.type === 'link' ? (
                  <Link href={action.href} className="block h-full" aria-label={action.label}>
                    {inner}
                  </Link>
                ) : (
                  <button
                    className="block h-full w-full"
                    aria-label={action.label}
                    onClick={() => {
                      if (action.type === 'toast') toast(action.message, 'info');
                      else
                        document
                          .querySelector(action.target)
                          ?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    {inner}
                  </button>
                )}
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </section>
  );
}
