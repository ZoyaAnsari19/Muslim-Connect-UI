'use client';

// ─── Dashboard quick actions — every card opens a modal or toast ─────────────

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  MapPin,
  Heart,
  HandHeart,
  Siren,
  HandCoins,
  Clock,
  Phone,
  Navigation,
  BadgeCheck,
} from 'lucide-react';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { useToast } from '@/context/ToastContext';
import { MASJIDS, DARGAHS, PRAYER_TIMES_TODAY } from '@/lib/mock-data';
import { staggerContainer, fadeInUp } from '@/components/PageTransition';

type ModalKind = 'nearby' | 'follow' | 'services' | 'emergency' | 'prayer' | null;

const COMMUNITY_SERVICES = [
  { title: 'Nikah Services', desc: 'Connect with qualified Qazis for nikah ceremonies' },
  { title: 'Janazah Assistance', desc: 'Burial arrangements and ghusl services, 24/7 helpline' },
  { title: 'Zakat Guidance', desc: 'Calculate and distribute zakat with verified scholars' },
  { title: 'Halal Certification', desc: 'Verify halal businesses and food outlets near you' },
];

const EMERGENCY_CONTACTS = [
  { title: 'Janazah Helpline', phone: '+91 98200 00001' },
  { title: 'Medical Emergency (Muslim Doctors Network)', phone: '+91 98200 00002' },
  { title: 'Legal Aid Helpline', phone: '+91 98200 00003' },
  { title: 'Community Crisis Support', phone: '+91 98200 00004' },
];

export default function QuickActionsGrid() {
  const { toast } = useToast();
  const [open, setOpen] = useState<ModalKind>(null);
  const [followed, setFollowed] = useState<string[]>([]);

  const ACTIONS = [
    { id: 'nearby', label: 'Find Nearby Masjid', icon: MapPin, onClick: () => setOpen('nearby') },
    { id: 'follow', label: 'Follow Masjid / Dargah', icon: Heart, onClick: () => setOpen('follow') },
    { id: 'services', label: 'Community Services', icon: HandHeart, onClick: () => setOpen('services') },
    { id: 'emergency', label: 'Emergency Help', icon: Siren, onClick: () => setOpen('emergency') },
    { id: 'donate', label: 'Donation & Charity', icon: HandCoins, href: '/donate' },
    { id: 'prayer', label: 'Prayer Times', icon: Clock, onClick: () => setOpen('prayer') },
  ];

  const toggleFollow = (id: string, name: string) => {
    setFollowed((prev) => {
      const isFollowing = prev.includes(id);
      toast(isFollowing ? `Unfollowed ${name}` : `Following ${name} — you'll get their updates`, isFollowing ? 'info' : 'success');
      return isFollowing ? prev.filter((f) => f !== id) : [...prev, id];
    });
  };

  return (
    <section aria-labelledby="quick-actions-heading">
      <h2 id="quick-actions-heading" className="font-heading text-lg font-bold text-heading sm:text-xl">
        Quick Actions
      </h2>
      <motion.ul
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-40px' }}
        className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6"
      >
        {ACTIONS.map((action) => (
          <motion.li key={action.id} variants={fadeInUp}>
            {action.href ? (
              <Link
                href={action.href}
                className="group flex min-h-[110px] flex-col items-center justify-center gap-2.5 rounded-2xl border border-card-border bg-white p-4 text-center shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                  <action.icon className="h-5 w-5" aria-hidden />
                </span>
                <span className="text-xs font-semibold leading-snug text-heading">{action.label}</span>
              </Link>
            ) : (
              <button
                onClick={action.onClick}
                className="group flex min-h-[110px] w-full flex-col items-center justify-center gap-2.5 rounded-2xl border border-card-border bg-white p-4 text-center shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                  <action.icon className="h-5 w-5" aria-hidden />
                </span>
                <span className="text-xs font-semibold leading-snug text-heading">{action.label}</span>
              </button>
            )}
          </motion.li>
        ))}
      </motion.ul>

      {/* ── Nearby Masjid modal ── */}
      <Modal open={open === 'nearby'} onClose={() => setOpen(null)} label="Nearby masjids">
        <div className="p-6 sm:p-8">
          <h3 className="font-heading text-xl font-bold text-heading">Masjids Near You</h3>
          <p className="mt-1 text-sm text-body">Based on your registered area (demo data)</p>
          <ul className="mt-5 space-y-3">
            {MASJIDS.slice(0, 4).map((m, i) => (
              <li
                key={m.id}
                className="flex items-center justify-between gap-3 rounded-xl border border-card-border bg-ivory/60 p-4"
              >
                <div className="min-w-0">
                  <p className="flex items-center gap-1.5 truncate text-sm font-semibold text-heading">
                    {m.name}
                    {m.verified && <BadgeCheck className="h-4 w-4 shrink-0 text-gold-dark" aria-hidden />}
                  </p>
                  <p className="mt-0.5 text-xs text-body">
                    {m.area}, {m.city} · {(i + 1) * 0.8} km away
                  </p>
                  <p className="mt-1 text-xs font-medium text-primary">
                    Next: {m.nextPrayer.name} at {m.nextPrayer.time}
                  </p>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => toast(`Opening directions to ${m.name}… (demo)`, 'info')}
                >
                  <Navigation className="h-4 w-4" aria-hidden />
                  Directions
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </Modal>

      {/* ── Follow modal ── */}
      <Modal open={open === 'follow'} onClose={() => setOpen(null)} label="Follow masjids and dargahs">
        <div className="p-6 sm:p-8">
          <h3 className="font-heading text-xl font-bold text-heading">Follow Masjids & Dargahs</h3>
          <p className="mt-1 text-sm text-body">Get announcements and event updates in your feed</p>
          <ul className="mt-5 space-y-3">
            {[...MASJIDS.slice(0, 3), ...DARGAHS].map((item) => {
              const isFollowing = followed.includes(item.id);
              return (
                <li
                  key={item.id}
                  className="flex items-center justify-between gap-3 rounded-xl border border-card-border bg-ivory/60 p-4"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-heading">{item.name}</p>
                    <p className="mt-0.5 flex items-center gap-1 text-xs text-body">
                      <Badge variant={item.category === 'masjid' ? 'emerald' : 'gold'}>
                        {item.category === 'masjid' ? 'Masjid' : 'Dargah'}
                      </Badge>
                      {item.city}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant={isFollowing ? 'ghost' : 'primary'}
                    onClick={() => toggleFollow(item.id, item.name)}
                  >
                    <Heart className={`h-4 w-4 ${isFollowing ? 'fill-danger text-danger' : ''}`} aria-hidden />
                    {isFollowing ? 'Following' : 'Follow'}
                  </Button>
                </li>
              );
            })}
          </ul>
        </div>
      </Modal>

      {/* ── Community services modal ── */}
      <Modal open={open === 'services'} onClose={() => setOpen(null)} label="Community services">
        <div className="p-6 sm:p-8">
          <h3 className="font-heading text-xl font-bold text-heading">Community Services</h3>
          <p className="mt-1 text-sm text-body">Trusted services offered through the platform</p>
          <ul className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {COMMUNITY_SERVICES.map((s) => (
              <li key={s.title} className="rounded-xl border border-card-border bg-ivory/60 p-4">
                <p className="text-sm font-semibold text-heading">{s.title}</p>
                <p className="mt-1 text-xs leading-relaxed text-body">{s.desc}</p>
                <button
                  onClick={() => toast(`${s.title} request submitted — our team will reach out (demo)`, 'success')}
                  className="mt-2.5 text-xs font-semibold text-primary hover:text-primary-hover"
                >
                  Request Service →
                </button>
              </li>
            ))}
          </ul>
        </div>
      </Modal>

      {/* ── Emergency modal ── */}
      <Modal open={open === 'emergency'} onClose={() => setOpen(null)} maxWidth="max-w-lg" label="Emergency help">
        <div className="p-6 sm:p-8">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-danger">
              <Siren className="h-5 w-5" aria-hidden />
            </span>
            <div>
              <h3 className="font-heading text-xl font-bold text-heading">Emergency Help</h3>
              <p className="text-xs text-body">24/7 community helplines</p>
            </div>
          </div>
          <ul className="mt-5 space-y-3">
            {EMERGENCY_CONTACTS.map((c) => (
              <li
                key={c.title}
                className="flex items-center justify-between gap-3 rounded-xl border border-card-border bg-ivory/60 p-4"
              >
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-heading">{c.title}</p>
                  <p className="mt-0.5 text-xs text-body">{c.phone}</p>
                </div>
                <Button size="sm" variant="danger" onClick={() => toast(`Calling ${c.phone}… (demo)`, 'info')}>
                  <Phone className="h-4 w-4" aria-hidden />
                  Call
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </Modal>

      {/* ── Prayer times modal ── */}
      <Modal open={open === 'prayer'} onClose={() => setOpen(null)} maxWidth="max-w-md" label="Prayer times">
        <div className="p-6 sm:p-8">
          <h3 className="font-heading text-xl font-bold text-heading">Today&apos;s Prayer Times</h3>
          <p className="mt-1 text-sm text-body">Mumbai, Maharashtra (demo)</p>
          <ul className="mt-5 space-y-2">
            {PRAYER_TIMES_TODAY.map((p, i) => (
              <motion.li
                key={p.name}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                className={`flex items-center justify-between rounded-xl px-4 py-3 ${
                  i === 2 ? 'bg-primary text-white' : 'bg-ivory/70 text-heading'
                }`}
              >
                <span className="text-sm font-semibold">{p.name}</span>
                <span className={`text-sm font-medium ${i === 2 ? 'text-gold-light' : 'text-body'}`}>
                  {p.time}
                  {i === 2 && <span className="ml-2 text-[10px] font-bold uppercase tracking-wide">Next</span>}
                </span>
              </motion.li>
            ))}
          </ul>
        </div>
      </Modal>
    </section>
  );
}
