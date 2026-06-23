'use client';

// ─── /dashboard — main authenticated hub (Part 2) ────────────────────────────

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Landmark,
  Sparkles,
  GraduationCap,
  Users,
  Briefcase,
  Clock,
  HandCoins,
  FolderKanban,
  ShieldCheck,
  ChevronRight,
  ArrowLeft,
} from 'lucide-react';
import ProtectedRoute from '@/components/ProtectedRoute';
import { DashboardShell } from '@/components/dashboard/DashboardShell';
import QuickActionsGrid from '@/components/dashboard/QuickActionsGrid';
import CommunityFeed from '@/components/dashboard/CommunityFeed';
import CountUp from '@/components/ui/CountUp';
import Badge from '@/components/ui/Badge';
import { Skeleton } from '@/components/ui/Skeleton';
import { useAuth } from '@/context/AuthContext';
import { checkReligiousRole, formatINR } from '@/lib/store';
import {
  PRAYER_TIMES_TODAY,
  DONATION_SUMMARY,
  RECENT_DONATION_PROJECTS,
} from '@/lib/mock-data';
import { staggerContainer, fadeInUp } from '@/components/PageTransition';

const STAT_CARDS = [
  { label: 'Masjids Registered', value: 6, icon: Landmark },
  { label: 'Dargahs', value: 2, icon: Sparkles },
  { label: 'Madrasas', value: 3, icon: GraduationCap },
  { label: 'Muslim Professionals', value: 48, icon: Users },
  { label: 'Jobs Active', value: 12, icon: Briefcase },
];

const MGMT_CARDS = [
  {
    href: '/create-masjid-profile',
    title: 'Register a New Masjid',
    desc: 'Add your masjid with prayer times, services and community verification.',
    icon: Landmark,
  },
  {
    href: '/create-dargah-profile',
    title: 'Register a New Dargah',
    desc: 'Document the history, Urs dates and caretaker details of a dargah.',
    icon: Sparkles,
  },
  {
    href: '/create-madrasa-profile',
    title: 'Register a New Madrasa',
    desc: 'List courses, student capacity and hostel facilities of a madrasa.',
    icon: GraduationCap,
  },
  {
    href: '/manage-profiles',
    title: 'Manage Existing Profiles',
    desc: 'Edit details, manage events and donation campaigns of your profiles.',
    icon: FolderKanban,
  },
];

function DashboardContent() {
  const { user } = useAuth();
  const isReligious = checkReligiousRole(user);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(t);
  }, []);

  const firstName = user?.fullName.split(' ')[0] ?? 'Friend';
  const today = new Date().toLocaleDateString('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <DashboardShell>
      <Link
        href="/feed"
        className="mb-4 inline-flex min-h-[44px] items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-primary-hover"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden />
        Back to Feed
      </Link>

      {/* ── Welcome header ── */}
      <motion.header
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="font-heading text-2xl font-bold text-heading sm:text-3xl">
              Assalamu Alaikum, {firstName} 👋
            </h1>
            <p className="mt-1.5 text-sm text-body">{today}</p>
          </div>
          {/* Prayer-time strip */}
          <div
            className="scrollbar-none flex gap-2 overflow-x-auto rounded-2xl border border-card-border bg-white p-2 shadow-card"
            role="list"
            aria-label="Today's prayer times"
          >
            {PRAYER_TIMES_TODAY.map((p, i) => (
              <div
                key={p.name}
                role="listitem"
                className={`flex min-w-[78px] flex-col items-center rounded-xl px-3 py-2 ${
                  i === 2 ? 'bg-primary text-white' : 'text-heading'
                }`}
              >
                <span className="flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wide">
                  {i === 2 && <Clock className="h-3 w-3" aria-hidden />}
                  {p.name}
                </span>
                <span className={`mt-0.5 whitespace-nowrap text-xs font-medium ${i === 2 ? 'text-gold-light' : 'text-body'}`}>
                  {p.time}
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.header>

      {/* ── Stat cards ── */}
      {loading ? (
        <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-28 w-full" />
          ))}
        </div>
      ) : (
        <motion.ul
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-5"
        >
          {STAT_CARDS.map((stat) => (
            <motion.li
              key={stat.label}
              variants={fadeInUp}
              className="rounded-2xl border border-card-border bg-white p-4 shadow-card transition-shadow duration-300 hover:shadow-card-hover sm:p-5"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-50 text-primary">
                <stat.icon className="h-[18px] w-[18px]" aria-hidden />
              </span>
              <p className="mt-3 font-heading text-2xl font-bold text-heading">
                <CountUp value={stat.value} />
              </p>
              <p className="mt-0.5 text-xs font-medium text-body">{stat.label}</p>
            </motion.li>
          ))}
        </motion.ul>
      )}

      {/* ── Quick actions ── */}
      <div className="mt-10">
        <QuickActionsGrid />
      </div>

      {/* ── Role-based: Masjid & Dargah Management ── */}
      {isReligious && (
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="mt-10"
          aria-labelledby="mgmt-heading"
        >
          <div className="rounded-2xl border border-gold/30 bg-gradient-to-br from-white to-gold-soft/40 p-5 shadow-card sm:p-7">
            <div className="flex flex-wrap items-center gap-3">
              <h2 id="mgmt-heading" className="font-heading text-lg font-bold text-heading sm:text-xl">
                Masjid &amp; Dargah Management
              </h2>
              <Badge variant="gold">
                <ShieldCheck className="h-3 w-3" aria-hidden />
                Religious Role
              </Badge>
            </div>
            <p className="mt-1.5 text-sm text-body">
              As a community religious figure, you can register and manage institution profiles.
            </p>
            <motion.ul
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4"
            >
              {MGMT_CARDS.map((card) => (
                <motion.li key={card.href} variants={fadeInUp}>
                  <Link
                    href={card.href}
                    className="group flex h-full flex-col rounded-2xl border border-card-border bg-white p-5 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-gold/40 hover:shadow-card-hover"
                  >
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold-soft text-gold-dark transition-colors group-hover:bg-gold group-hover:text-white">
                      <card.icon className="h-5 w-5" aria-hidden />
                    </span>
                    <h3 className="mt-3.5 text-sm font-bold text-heading">{card.title}</h3>
                    <p className="mt-1 flex-1 text-xs leading-relaxed text-body">{card.desc}</p>
                    <span className="mt-3 flex items-center gap-1 text-xs font-semibold text-primary">
                      Open <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
                    </span>
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </motion.section>
      )}

      {/* ── Donation summary + feed ── */}
      <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Donation summary panel */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          aria-labelledby="donation-heading"
          className="lg:order-2"
        >
          <h2 id="donation-heading" className="font-heading text-lg font-bold text-heading sm:text-xl">
            Donation Summary
          </h2>
          <div className="mt-4 overflow-hidden rounded-2xl border border-card-border bg-white shadow-card">
            <div className="bg-emerald-gradient p-5 text-white">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15">
                <HandCoins className="h-5 w-5" aria-hidden />
              </span>
              <p className="mt-3 font-heading text-3xl font-bold">
                {formatINR(DONATION_SUMMARY.totalCollected)}
              </p>
              <p className="mt-0.5 text-xs text-white/80">Total Donations Collected</p>
              <div className="mt-4 flex gap-6">
                <div>
                  <p className="font-heading text-lg font-bold">
                    <CountUp value={DONATION_SUMMARY.totalDonors} />
                  </p>
                  <p className="text-[11px] text-white/75">Total Donors</p>
                </div>
                <div>
                  <p className="font-heading text-lg font-bold">
                    <CountUp value={DONATION_SUMMARY.activeProjects} />
                  </p>
                  <p className="text-[11px] text-white/75">Active Projects</p>
                </div>
              </div>
            </div>
            <div className="space-y-4 p-5">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-body">
                Recent Donation Projects
              </h3>
              {RECENT_DONATION_PROJECTS.map((p) => {
                const pct = Math.min(100, Math.round((p.raised / p.target) * 100));
                return (
                  <div key={p.id}>
                    <div className="flex items-baseline justify-between gap-2">
                      <p className="text-sm font-semibold text-heading">{p.title}</p>
                      <span className="text-xs font-bold text-primary">{pct}%</span>
                    </div>
                    <div
                      className="mt-1.5 h-2 overflow-hidden rounded-full bg-ivory"
                      role="progressbar"
                      aria-valuenow={pct}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-label={`${p.title} funding progress`}
                    >
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${pct}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
                        className="h-full rounded-full bg-gold-gradient"
                      />
                    </div>
                    <p className="mt-1 text-[11px] text-body">
                      {formatINR(p.raised)} of {formatINR(p.target)} · {p.donors} donors
                    </p>
                  </div>
                );
              })}
              <Link
                href="/donate"
                className="block rounded-xl bg-primary-50 px-4 py-3 text-center text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-white"
              >
                View Donation Center →
              </Link>
            </div>
          </div>
        </motion.section>

        {/* Community feed */}
        <div className="lg:order-1 lg:col-span-2">
          {loading ? (
            <div className="space-y-5">
              <Skeleton className="h-6 w-44" />
              {Array.from({ length: 2 }).map((_, i) => (
                <Skeleton key={i} className="h-64 w-full" />
              ))}
            </div>
          ) : (
            <CommunityFeed />
          )}
        </div>
      </div>
    </DashboardShell>
  );
}

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}
