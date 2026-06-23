'use client';

// ─── /employment/job-seeker-dashboard — full job seeker hub (Part 2) ─────────

import { useEffect, useRef, useState, type FormEvent } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import {
  Search,
  FileUp,
  UserRoundPen,
  Send,
  Eye,
  Bookmark,
  CalendarCheck2,
  FileText,
  Briefcase,
} from 'lucide-react';
import ProtectedRoute from '@/components/ProtectedRoute';
import { DashboardShell, PageHeader } from '@/components/dashboard/DashboardShell';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Input, { Textarea } from '@/components/ui/Input';
import CountUp from '@/components/ui/CountUp';
import EmptyState from '@/components/ui/EmptyState';
import { Skeleton } from '@/components/ui/Skeleton';
import { useToast } from '@/context/ToastContext';
import { useAuth } from '@/context/AuthContext';
import { useJobApplications, useSavedJobs } from '@/lib/store';
import type { ApplicationStatus } from '@/lib/types';
import { staggerContainer, fadeInUp } from '@/components/PageTransition';

const STATUS_VARIANT: Record<ApplicationStatus, 'blue' | 'gold' | 'emerald' | 'red'> = {
  Applied: 'blue',
  Shortlisted: 'gold',
  Interview: 'emerald',
  Rejected: 'red',
};

const PROFILE_COMPLETION = 70;

/** Animated circular progress meter */
function CompletionMeter() {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true });
  const [display, setDisplay] = useState(0);

  const r = 52;
  const circumference = 2 * Math.PI * r;

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const duration = 1400;
    let raf: number;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(2, -10 * t); // easeOutExpo
      setDisplay(Math.round(eased * PROFILE_COMPLETION));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView]);

  return (
    <div ref={ref} className="relative h-32 w-32 shrink-0" role="img" aria-label={`Profile ${PROFILE_COMPLETION}% complete`}>
      <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
        <circle cx="60" cy="60" r={r} fill="none" stroke="#E8E4DA" strokeWidth="10" />
        <motion.circle
          cx="60"
          cy="60"
          r={r}
          fill="none"
          stroke="url(#meter-gradient)"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={
            inView
              ? { strokeDashoffset: circumference * (1 - PROFILE_COMPLETION / 100) }
              : undefined
          }
          transition={{ duration: 1.4, ease: 'easeOut' }}
        />
        <defs>
          <linearGradient id="meter-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0B6E4F" />
            <stop offset="100%" stopColor="#C9A227" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-heading text-3xl font-bold text-heading">{display}%</span>
        <span className="text-[10px] font-medium uppercase tracking-wide text-body">Complete</span>
      </div>
    </div>
  );
}

function BuildProfileModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [form, setForm] = useState({
    headline: '',
    experience: '',
    skills: '',
    expectedSalary: '',
    summary: '',
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.headline.trim() || !form.experience.trim()) {
      toast('Headline and experience are required', 'error');
      return;
    }
    toast('Career profile saved — recruiters can now find you', 'success');
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} maxWidth="max-w-lg" label="Build career profile">
      <form onSubmit={handleSubmit} className="p-6 sm:p-8" noValidate>
        <h2 className="font-heading text-xl font-bold text-heading">Build Your Career Profile</h2>
        <p className="mt-1 text-sm text-body">
          {user?.fullName} · A complete profile gets 3× more recruiter views
        </p>
        <div className="mt-5 space-y-4">
          <Input
            id="bp-headline"
            label="Professional Headline"
            required
            placeholder="e.g. Hafiz & Quran Teacher with 8 years experience"
            value={form.headline}
            onChange={(e) => setForm((f) => ({ ...f, headline: e.target.value }))}
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Input
              id="bp-exp"
              label="Years of Experience"
              required
              type="number"
              min={0}
              placeholder="e.g. 5"
              value={form.experience}
              onChange={(e) => setForm((f) => ({ ...f, experience: e.target.value }))}
            />
            <Input
              id="bp-salary"
              label="Expected Salary"
              placeholder="e.g. ₹30,000 / month"
              value={form.expectedSalary}
              onChange={(e) => setForm((f) => ({ ...f, expectedSalary: e.target.value }))}
            />
          </div>
          <Input
            id="bp-skills"
            label="Key Skills"
            placeholder="e.g. Tajweed, Teaching, Arabic (comma separated)"
            value={form.skills}
            onChange={(e) => setForm((f) => ({ ...f, skills: e.target.value }))}
          />
          <Textarea
            id="bp-summary"
            label="Professional Summary"
            placeholder="Briefly describe your background and what you're looking for…"
            value={form.summary}
            onChange={(e) => setForm((f) => ({ ...f, summary: e.target.value }))}
          />
        </div>
        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row">
          <Button type="button" variant="ghost" className="flex-1" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" className="flex-1">
            Save Profile
          </Button>
        </div>
      </form>
    </Modal>
  );
}

function JobSeekerDashboardContent() {
  const { toast } = useToast();
  const { items: applications, hydrated } = useJobApplications();
  const { items: savedJobs } = useSavedJobs();
  const [buildOpen, setBuildOpen] = useState(false);
  const [resumeName, setResumeName] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);

  const STATS = [
    { label: 'Applications', value: applications.length, icon: Send },
    { label: 'Profile Views', value: 48, icon: Eye },
    { label: 'Saved Jobs', value: savedJobs.length, icon: Bookmark },
    { label: 'Interviews', value: applications.filter((a) => a.status === 'Interview').length, icon: CalendarCheck2 },
  ];

  return (
    <DashboardShell width="max-w-5xl" flushTop>
      <PageHeader
        title="Job Seeker Dashboard"
        subtitle="Track applications and discover opportunities within the community"
        backHref="/employment-network"
        backLabel="Back"
        eyebrow="MCEN · Job Seeker"
        actions={
          <Link href="/employment/jobs">
            <Button size="sm">
              <Search className="h-4 w-4" aria-hidden />
              Search Jobs
            </Button>
          </Link>
        }
      />

      {/* Completion meter + stats */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="flex items-center gap-5 rounded-2xl border border-card-border bg-white p-5 shadow-card sm:p-6"
        >
          <CompletionMeter />
          <div>
            <h2 className="font-heading text-base font-bold text-heading">Profile Strength</h2>
            <p className="mt-1 text-xs leading-relaxed text-body">
              Add your resume and skills to reach 100% and unlock priority visibility.
            </p>
            <button
              onClick={() => setBuildOpen(true)}
              className="mt-2.5 text-xs font-semibold text-primary hover:text-primary-hover"
            >
              Complete Profile →
            </button>
          </div>
        </motion.div>

        {!hydrated ? (
          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:col-span-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-28 w-full" />
            ))}
          </div>
        ) : (
          <motion.ul
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="grid grid-cols-2 gap-3 sm:gap-4 lg:col-span-2"
          >
            {STATS.map((stat) => (
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
      </div>

      {/* Action cards */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-40px' }}
        className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4"
      >
        <motion.div variants={fadeInUp}>
          <Link
            href="/employment/jobs"
            className="group flex h-full flex-col rounded-2xl border border-card-border bg-white p-5 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
              <Search className="h-5 w-5" aria-hidden />
            </span>
            <h3 className="mt-3.5 text-sm font-bold text-heading">Search Jobs</h3>
            <p className="mt-1 text-xs text-body">Browse all openings with filters for category, type and location.</p>
          </Link>
        </motion.div>

        <motion.div variants={fadeInUp}>
          <button
            onClick={() => fileRef.current?.click()}
            className="group flex h-full w-full flex-col rounded-2xl border border-card-border bg-white p-5 text-left shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
              <FileUp className="h-5 w-5" aria-hidden />
            </span>
            <h3 className="mt-3.5 text-sm font-bold text-heading">Upload Resume</h3>
            <p className="mt-1 text-xs text-body">
              {resumeName ? (
                <span className="flex items-center gap-1 font-medium text-primary">
                  <FileText className="h-3.5 w-3.5" aria-hidden />
                  {resumeName}
                </span>
              ) : (
                'PDF or DOC — used when you apply with one click.'
              )}
            </p>
          </button>
          <input
            ref={fileRef}
            type="file"
            accept=".pdf,.doc,.docx"
            className="hidden"
            aria-label="Upload resume"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                setResumeName(file.name);
                toast(`Resume "${file.name}" uploaded`, 'success');
              }
              e.target.value = '';
            }}
          />
        </motion.div>

        <motion.div variants={fadeInUp}>
          <button
            onClick={() => setBuildOpen(true)}
            className="group flex h-full w-full flex-col rounded-2xl border border-card-border bg-white p-5 text-left shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
              <UserRoundPen className="h-5 w-5" aria-hidden />
            </span>
            <h3 className="mt-3.5 text-sm font-bold text-heading">Build Profile</h3>
            <p className="mt-1 text-xs text-body">Headline, skills and summary that recruiters see first.</p>
          </button>
        </motion.div>
      </motion.div>

      {/* My applications */}
      <section className="mt-10" aria-labelledby="applications-heading">
        <h2 id="applications-heading" className="font-heading text-lg font-bold text-heading sm:text-xl">
          My Applications
        </h2>
        {!hydrated ? (
          <div className="mt-4 space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-20 w-full" />
            ))}
          </div>
        ) : applications.length === 0 ? (
          <div className="mt-4">
            <EmptyState
              icon={<Briefcase className="h-8 w-8" aria-hidden />}
              title="No Applications Yet"
              description="Start applying to jobs — your applications and their status will appear here."
              action={
                <Link href="/employment/jobs">
                  <Button>
                    <Search className="h-4 w-4" aria-hidden />
                    Browse Jobs
                  </Button>
                </Link>
              }
            />
          </div>
        ) : (
          <motion.ul
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="mt-4 space-y-3"
          >
            {applications.map((app) => (
              <motion.li
                key={app.id}
                variants={fadeInUp}
                className="flex flex-col gap-3 rounded-2xl border border-card-border bg-white p-4 shadow-card transition-shadow duration-300 hover:shadow-card-hover sm:flex-row sm:items-center sm:justify-between sm:p-5"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-heading">{app.jobTitle}</p>
                  <p className="mt-0.5 truncate text-xs text-body">
                    {app.organization} · Applied{' '}
                    {new Date(app.appliedDate).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </p>
                </div>
                <Badge variant={STATUS_VARIANT[app.status]} className="self-start sm:self-auto">
                  {app.status}
                </Badge>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </section>

      <BuildProfileModal open={buildOpen} onClose={() => setBuildOpen(false)} />
    </DashboardShell>
  );
}

export default function JobSeekerDashboardPage() {
  return (
    <ProtectedRoute>
      <JobSeekerDashboardContent />
    </ProtectedRoute>
  );
}
