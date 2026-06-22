'use client';

// ─── /employment/employer-dashboard — full employer hub (Part 2) ─────────────

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Briefcase,
  FileX2,
  Users,
  MessageSquare,
  PlusCircle,
  BarChart3,
  Building2,
  Download,
  RotateCcw,
  XCircle,
  MapPin,
} from 'lucide-react';
import ProtectedRoute from '@/components/ProtectedRoute';
import { DashboardShell, PageHeader } from '@/components/dashboard/DashboardShell';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import CountUp from '@/components/ui/CountUp';
import EmptyState from '@/components/ui/EmptyState';
import ConfirmDialog from '@/components/ui/ConfirmDialog';
import { Skeleton } from '@/components/ui/Skeleton';
import { useToast } from '@/context/ToastContext';
import { useAuth } from '@/context/AuthContext';
import { usePostedJobs } from '@/lib/store';
import { MOCK_APPLICANTS, EMPLOYER_ANALYTICS } from '@/lib/mock-data';
import type { PostedJob } from '@/lib/types';
import { staggerContainer, fadeInUp } from '@/components/PageTransition';

type ModalKind = 'applicants' | 'analytics' | 'company' | null;

function EmployerDashboardContent() {
  const { user } = useAuth();
  const { toast } = useToast();
  const { items: jobs, setItems: setJobs, hydrated } = usePostedJobs();
  const [open, setOpen] = useState<ModalKind>(null);
  const [closing, setClosing] = useState<PostedJob | null>(null);

  const myJobs = jobs.filter((j) => j.postedByUser);
  const activeJobs = myJobs.filter((j) => j.status === 'Active');
  const closedJobs = myJobs.filter((j) => j.status === 'Closed');
  const totalApplicants = myJobs.reduce((sum, j) => sum + j.applicants, 0);

  const STATS = [
    { label: 'Active Jobs', value: activeJobs.length, icon: Briefcase },
    { label: 'Closed Jobs', value: closedJobs.length, icon: FileX2 },
    { label: 'Total Applicants', value: totalApplicants, icon: Users },
    { label: 'Messages', value: 7, icon: MessageSquare },
  ];

  const maxViews = Math.max(...EMPLOYER_ANALYTICS.map((d) => d.views));

  const confirmClose = () => {
    if (!closing) return;
    setJobs((prev) =>
      prev.map((j) => (j.id === closing.id ? { ...j, status: 'Closed' as const } : j))
    );
    toast(`"${closing.title}" closed — no longer accepting applications`, 'success');
    setClosing(null);
  };

  const repostJob = (job: PostedJob) => {
    setJobs((prev) =>
      prev.map((j) =>
        j.id === job.id ? { ...j, status: 'Active' as const, postedDaysAgo: 0 } : j
      )
    );
    toast(`"${job.title}" reposted and live again`, 'success');
  };

  return (
    <DashboardShell width="max-w-5xl">
      <PageHeader
        title="Employer Dashboard"
        subtitle="Manage your job posts and connect with talented candidates"
        backHref="/dashboard"
        backLabel="Back to Dashboard"
        eyebrow="MCEN · Employer"
        actions={
          <Link href="/employment/post-job">
            <Button size="sm">
              <PlusCircle className="h-4 w-4" aria-hidden />
              Post a Job
            </Button>
          </Link>
        }
      />

      {/* Stats */}
      {!hydrated ? (
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-28 w-full" />
          ))}
        </div>
      ) : (
        <motion.ul
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4"
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

      {/* Action cards */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-40px' }}
        className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4"
      >
        {[
          { title: 'Post a Job', desc: 'Create a new job listing', icon: PlusCircle, href: '/employment/post-job' },
          { title: 'View Applicants', desc: 'Review candidate applications', icon: Users, onClick: () => setOpen('applicants') },
          { title: 'Analytics', desc: 'Job views & application trends', icon: BarChart3, onClick: () => setOpen('analytics') },
          { title: 'Company Profile', desc: 'Your organization details', icon: Building2, onClick: () => setOpen('company') },
        ].map((card) => (
          <motion.div key={card.title} variants={fadeInUp}>
            {card.href ? (
              <Link
                href={card.href}
                className="group flex h-full flex-col rounded-2xl border border-card-border bg-white p-5 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                  <card.icon className="h-5 w-5" aria-hidden />
                </span>
                <h3 className="mt-3.5 text-sm font-bold text-heading">{card.title}</h3>
                <p className="mt-1 text-xs text-body">{card.desc}</p>
              </Link>
            ) : (
              <button
                onClick={card.onClick}
                className="group flex h-full w-full flex-col rounded-2xl border border-card-border bg-white p-5 text-left shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                  <card.icon className="h-5 w-5" aria-hidden />
                </span>
                <h3 className="mt-3.5 text-sm font-bold text-heading">{card.title}</h3>
                <p className="mt-1 text-xs text-body">{card.desc}</p>
              </button>
            )}
          </motion.div>
        ))}
      </motion.div>

      {/* My job posts */}
      <section className="mt-10" aria-labelledby="my-jobs-heading">
        <h2 id="my-jobs-heading" className="font-heading text-lg font-bold text-heading sm:text-xl">
          My Job Posts
        </h2>
        {!hydrated ? (
          <div className="mt-4 space-y-4">
            {Array.from({ length: 2 }).map((_, i) => (
              <Skeleton key={i} className="h-32 w-full" />
            ))}
          </div>
        ) : myJobs.length === 0 ? (
          <div className="mt-4">
            <EmptyState
              icon={<Briefcase className="h-8 w-8" aria-hidden />}
              title="No Job Posts Yet"
              description="Post your first job to start receiving applications from the community."
              action={
                <Link href="/employment/post-job">
                  <Button>
                    <PlusCircle className="h-4 w-4" aria-hidden />
                    Post a Job
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
            className="mt-4 space-y-4"
          >
            <AnimatePresence mode="popLayout">
              {myJobs.map((job) => (
                <motion.li
                  key={job.id}
                  layout
                  variants={fadeInUp}
                  exit={{ opacity: 0, scale: 0.97 }}
                  className="rounded-2xl border border-card-border bg-white p-5 shadow-card transition-shadow duration-300 hover:shadow-card-hover sm:p-6"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-heading text-base font-bold text-heading">{job.title}</h3>
                        <Badge variant={job.status === 'Active' ? 'success' : 'neutral'}>
                          {job.status}
                        </Badge>
                      </div>
                      <p className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-body">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3.5 w-3.5 text-gold-dark" aria-hidden />
                          {job.location}
                        </span>
                        <span>{job.salary}</span>
                        <span>
                          Posted {job.postedDaysAgo === 0 ? 'today' : `${job.postedDaysAgo}d ago`}
                        </span>
                      </p>
                      <p className="mt-2 flex items-center gap-1.5 text-sm font-semibold text-primary">
                        <Users className="h-4 w-4" aria-hidden />
                        {job.applicants} applicants
                      </p>
                    </div>
                    <div className="flex shrink-0 flex-wrap items-center gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setOpen('applicants')}
                        aria-label={`View applicants for ${job.title}`}
                      >
                        <Users className="h-4 w-4" aria-hidden />
                        Applicants
                      </Button>
                      {job.status === 'Active' ? (
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-danger"
                          onClick={() => setClosing(job)}
                          aria-label={`Close ${job.title}`}
                        >
                          <XCircle className="h-4 w-4" aria-hidden />
                          Close
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => repostJob(job)}
                          aria-label={`Repost ${job.title}`}
                        >
                          <RotateCcw className="h-4 w-4" aria-hidden />
                          Repost
                        </Button>
                      )}
                    </div>
                  </div>
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
        )}
      </section>

      {/* ── Applicants modal ── */}
      <Modal open={open === 'applicants'} onClose={() => setOpen(null)} label="Applicants">
        <div className="p-6 sm:p-8">
          <h3 className="font-heading text-xl font-bold text-heading">Recent Applicants</h3>
          <p className="mt-1 text-sm text-body">Candidates who applied to your job posts</p>
          <ul className="mt-5 space-y-3">
            {MOCK_APPLICANTS.map((a) => (
              <li
                key={a.id}
                className="flex flex-col gap-3 rounded-xl border border-card-border bg-ivory/60 p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-center gap-3">
                  <Image
                    src={a.avatar}
                    alt={`Avatar of ${a.name}`}
                    width={44}
                    height={44}
                    className="h-11 w-11 rounded-full object-cover"
                  />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-heading">{a.name}</p>
                    <p className="truncate text-xs text-body">
                      {a.jobTitle} · {a.experience} exp · {a.location}
                    </p>
                    <p className="text-[11px] text-body/70">Applied {a.appliedDaysAgo}d ago</p>
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => toast(`Downloading ${a.name.split(' ')[0]}'s resume… (demo)`, 'info')}
                  aria-label={`Download resume of ${a.name}`}
                >
                  <Download className="h-4 w-4" aria-hidden />
                  Resume
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </Modal>

      {/* ── Analytics modal ── */}
      <Modal open={open === 'analytics'} onClose={() => setOpen(null)} maxWidth="max-w-lg" label="Analytics">
        <div className="p-6 sm:p-8">
          <h3 className="font-heading text-xl font-bold text-heading">This Week&apos;s Performance</h3>
          <p className="mt-1 text-sm text-body">Job post views and applications received</p>
          <div className="mt-6 flex items-end justify-between gap-2" role="img" aria-label="Bar chart of weekly job views">
            {EMPLOYER_ANALYTICS.map((d, i) => (
              <div key={d.label} className="flex flex-1 flex-col items-center gap-1.5">
                <span className="text-[10px] font-bold text-primary">{d.views}</span>
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${(d.views / maxViews) * 120}px` }}
                  transition={{ duration: 0.6, delay: i * 0.07, ease: 'easeOut' }}
                  className="w-full max-w-[28px] rounded-t-lg bg-emerald-gradient"
                />
                <span className="text-[10px] font-medium text-body">{d.label}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-primary-50 p-4 text-center">
              <p className="font-heading text-2xl font-bold text-primary">
                {EMPLOYER_ANALYTICS.reduce((s, d) => s + d.views, 0)}
              </p>
              <p className="text-xs font-medium text-body">Total Views</p>
            </div>
            <div className="rounded-xl bg-gold-soft p-4 text-center">
              <p className="font-heading text-2xl font-bold text-gold-dark">
                {EMPLOYER_ANALYTICS.reduce((s, d) => s + d.applications, 0)}
              </p>
              <p className="text-xs font-medium text-body">Applications</p>
            </div>
          </div>
        </div>
      </Modal>

      {/* ── Company profile modal ── */}
      <Modal open={open === 'company'} onClose={() => setOpen(null)} maxWidth="max-w-lg" label="Company profile">
        <div className="p-6 sm:p-8">
          <div className="flex items-center gap-4">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-gradient font-heading text-xl font-bold text-white">
              {(user?.fullName ?? 'M').charAt(0)}
            </span>
            <div>
              <h3 className="font-heading text-xl font-bold text-heading">
                {user?.fullName ?? 'Your'}&apos;s Organization
              </h3>
              <p className="text-sm text-body">{user?.city}, {user?.state}</p>
            </div>
          </div>
          <dl className="mt-6 space-y-3 text-sm">
            {[
              ['Industry', 'Community Services'],
              ['Team Size', '10 – 50 employees'],
              ['Active Since', '2024'],
              ['Verified', 'Yes — MCEN verified employer'],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between gap-4 rounded-xl bg-ivory/70 px-4 py-3">
                <dt className="font-medium text-body">{label}</dt>
                <dd className="text-right font-semibold text-heading">{value}</dd>
              </div>
            ))}
          </dl>
          <Button
            className="mt-6 w-full"
            variant="secondary"
            onClick={() => toast('Company profile editor — coming soon', 'info')}
          >
            Edit Company Profile
          </Button>
        </div>
      </Modal>

      <ConfirmDialog
        open={!!closing}
        title={`Close "${closing?.title}"?`}
        message="The job will stop accepting new applications. You can repost it later."
        confirmLabel="Close Job"
        tone="primary"
        onConfirm={confirmClose}
        onCancel={() => setClosing(null)}
      />
    </DashboardShell>
  );
}

export default function EmployerDashboardPage() {
  return (
    <ProtectedRoute>
      <EmployerDashboardContent />
    </ProtectedRoute>
  );
}
