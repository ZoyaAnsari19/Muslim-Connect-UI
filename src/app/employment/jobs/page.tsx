'use client';

// ─── MCEN: Browse Jobs (public) — search, filters, apply, save ───────────────

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Search,
  MapPin,
  Briefcase,
  IndianRupee,
  Bookmark,
  SlidersHorizontal,
  X,
  Users,
  Clock,
  Send,
  Upload,
  CheckCircle2,
} from 'lucide-react';
import { DashboardShell, PageHeader } from '@/components/dashboard/DashboardShell';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Modal from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import EmptyState from '@/components/ui/EmptyState';
import { JobCardSkeleton } from '@/components/ui/Skeleton';
import { useToast } from '@/context/ToastContext';
import { useAuth } from '@/context/AuthContext';
import { usePostedJobs, useJobApplications, useSavedJobs, uid } from '@/lib/store';
import type { JobCategory, JobTag, PostedJob } from '@/lib/types';

const TAG_VARIANTS: Record<JobTag, 'red' | 'emerald' | 'blue' | 'neutral'> = {
  Urgent: 'red',
  Religious: 'emerald',
  Remote: 'blue',
  'Full-time': 'neutral',
  'Part-time': 'neutral',
  'On-site': 'neutral',
};

const CATEGORY_OPTIONS: JobCategory[] = ['Religious', 'IT', 'Education', 'Healthcare', 'Business', 'Other'];
const TYPE_OPTIONS: JobTag[] = ['Full-time', 'Part-time', 'Remote', 'On-site'];
const TAG_OPTIONS: JobTag[] = ['Urgent', 'Religious', 'Remote'];

interface Filters {
  category: string;
  type: string;
  location: string;
  tags: JobTag[];
}

const EMPTY_FILTERS: Filters = { category: '', type: '', location: '', tags: [] };

function FilterPanel({
  filters,
  setFilters,
  activeCount,
}: {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  activeCount: number;
}) {
  const toggleTag = (tag: JobTag) =>
    setFilters((f) => ({
      ...f,
      tags: f.tags.includes(tag) ? f.tags.filter((t) => t !== tag) : [...f.tags, tag],
    }));

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="hidden text-sm font-bold uppercase tracking-wide text-heading lg:block">Filters</h3>
        {activeCount > 0 && (
          <button
            type="button"
            onClick={() => setFilters(EMPTY_FILTERS)}
            className="text-xs font-semibold text-primary transition-colors hover:text-primary-hover"
          >
            Clear all ({activeCount})
          </button>
        )}
      </div>

      <div>
        <label htmlFor="filter-category" className="mb-1.5 block text-sm font-medium text-heading">
          Category
        </label>
        <select
          id="filter-category"
          value={filters.category}
          onChange={(e) => setFilters((f) => ({ ...f, category: e.target.value }))}
          className="min-h-[44px] w-full rounded-xl border border-card-border bg-white px-3 py-2.5 text-sm text-heading focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        >
          <option value="">All Categories</option>
          {CATEGORY_OPTIONS.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="filter-type" className="mb-1.5 block text-sm font-medium text-heading">
          Job Type
        </label>
        <select
          id="filter-type"
          value={filters.type}
          onChange={(e) => setFilters((f) => ({ ...f, type: e.target.value }))}
          className="min-h-[44px] w-full rounded-xl border border-card-border bg-white px-3 py-2.5 text-sm text-heading focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        >
          <option value="">All Types</option>
          {TYPE_OPTIONS.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="filter-location" className="mb-1.5 block text-sm font-medium text-heading">
          Location
        </label>
        <div className="relative">
          <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-body/50" />
          <input
            id="filter-location"
            placeholder="e.g. Hyderabad"
            value={filters.location}
            onChange={(e) => setFilters((f) => ({ ...f, location: e.target.value }))}
            className="min-h-[44px] w-full rounded-xl border border-card-border bg-white py-2.5 pl-9 pr-3 text-sm text-heading focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>

      <div>
        <p className="mb-2 text-sm font-medium text-heading">Tags</p>
        <div className="flex flex-wrap gap-2">
          {TAG_OPTIONS.map((tag) => {
            const active = filters.tags.includes(tag);
            return (
              <button
                key={tag}
                type="button"
                onClick={() => toggleTag(tag)}
                aria-pressed={active}
                className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-all ${
                  active
                    ? tag === 'Urgent'
                      ? 'border-danger bg-danger text-white'
                      : tag === 'Remote'
                        ? 'border-info bg-info text-white'
                        : 'border-primary bg-primary text-white'
                    : 'border-card-border bg-white text-body hover:border-primary hover:text-primary'
                }`}
              >
                {tag}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function JobCard({
  job,
  index,
  saved,
  applied,
  onSave,
  onApply,
}: {
  job: PostedJob;
  index: number;
  saved: boolean;
  applied: boolean;
  onSave: () => void;
  onApply: () => void;
}) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.05, 0.3) }}
      className="rounded-2xl border border-card-border bg-white p-5 shadow-card transition-shadow hover:shadow-card-hover sm:p-6"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-base font-bold text-heading sm:text-lg">{job.title}</h3>
            {job.postedByUser && <Badge variant="gold">Posted by you</Badge>}
          </div>
          <p className="mt-0.5 text-sm font-medium text-primary">{job.organization}</p>
        </div>
        <button
          type="button"
          onClick={onSave}
          aria-label={saved ? 'Remove bookmark' : 'Save job'}
          aria-pressed={saved}
          className={`shrink-0 rounded-xl border p-2.5 transition-all ${
            saved
              ? 'border-gold bg-gold-soft text-gold-dark'
              : 'border-card-border text-body/50 hover:border-gold hover:text-gold-dark'
          }`}
        >
          <Bookmark className={`h-[18px] w-[18px] ${saved ? 'fill-current' : ''}`} />
        </button>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-body">
        <span className="inline-flex items-center gap-1.5">
          <MapPin className="h-4 w-4 text-body/50" />
          {job.location}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <IndianRupee className="h-4 w-4 text-body/50" />
          {job.salary}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Users className="h-4 w-4 text-body/50" />
          {job.applicants} applicants
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Clock className="h-4 w-4 text-body/50" />
          {job.postedDaysAgo === 0 ? 'Posted today' : `${job.postedDaysAgo}d ago`}
        </span>
      </div>

      <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-body">{job.description}</p>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {job.type.map((tag) => (
          <Badge key={tag} variant={TAG_VARIANTS[tag]}>
            {tag}
          </Badge>
        ))}
        {job.skills.slice(0, 4).map((skill) => (
          <span
            key={skill}
            className="rounded-full bg-ivory px-2.5 py-1 text-[11px] font-medium text-body"
          >
            {skill}
          </span>
        ))}
      </div>

      <div className="mt-4 flex items-center gap-2 border-t border-card-border pt-4">
        {applied ? (
          <span className="inline-flex items-center gap-1.5 rounded-xl bg-primary-50 px-4 py-2.5 text-sm font-semibold text-primary">
            <CheckCircle2 className="h-4 w-4" />
            Applied
          </span>
        ) : (
          <Button variant="primary" size="sm" onClick={onApply}>
            <Send className="h-4 w-4" />
            Apply Now
          </Button>
        )}
        <span className="ml-auto text-xs font-medium text-body/60">{job.category}</span>
      </div>
    </motion.article>
  );
}

function ApplyModal({
  job,
  defaultName,
  onClose,
  onApplied,
}: {
  job: PostedJob | null;
  defaultName: string;
  onClose: () => void;
  onApplied: (job: PostedJob) => void;
}) {
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [resumeName, setResumeName] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [lastJobId, setLastJobId] = useState<string | null>(null);

  // Reset form when a new job is selected (render-time sync)
  if (job && job.id !== lastJobId) {
    setLastJobId(job.id);
    setName(defaultName);
    setEmail('');
    setResumeName('');
    setErrors({});
    setSubmitting(false);
  }

  const handleSubmit = () => {
    if (!job) return;
    const e: Record<string, string> = {};
    if (name.trim().length < 3) e.name = 'Please enter your full name';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) e.email = 'Please enter a valid email';
    setErrors(e);
    if (Object.keys(e).length > 0) return;
    setSubmitting(true);
    setTimeout(() => onApplied(job), 800);
  };

  return (
    <Modal open={!!job} onClose={onClose} maxWidth="max-w-md" label="Apply for job">
      {job && (
        <div className="p-6">
          <h2 className="text-lg font-bold text-heading">Apply for {job.title}</h2>
          <p className="mt-0.5 text-sm text-body">
            {job.organization} · {job.location}
          </p>

          <div className="mt-5 space-y-4">
            <Input
              label="Full Name"
              required
              placeholder="Your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={errors.name}
            />
            <Input
              label="Email"
              required
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email}
            />
            <div>
              <label className="mb-1.5 block text-sm font-medium text-heading">Resume (optional)</label>
              <label className="flex min-h-[48px] cursor-pointer items-center gap-2 rounded-xl border border-dashed border-card-border bg-ivory px-4 py-3 text-sm text-body transition-colors hover:border-primary hover:text-primary">
                <Upload className="h-4 w-4" />
                <span className="truncate">{resumeName || 'Upload resume (PDF / DOC)'}</span>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) {
                      setResumeName(f.name);
                      toast(`Resume "${f.name}" attached`, 'success');
                    }
                  }}
                />
              </label>
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <Button variant="ghost" className="flex-1" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="primary" className="flex-1" loading={submitting} onClick={handleSubmit}>
              <Send className="h-4 w-4" />
              Submit
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
}

export default function BrowseJobsPage() {
  const { toast } = useToast();
  const { user } = useAuth();
  const { items: jobs, setItems: setJobs, hydrated } = usePostedJobs();
  const { setItems: setApplications } = useJobApplications();
  const { items: savedIds, setItems: setSavedIds, hydrated: savedHydrated } = useSavedJobs();

  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState<Filters>(EMPTY_FILTERS);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [applyJob, setApplyJob] = useState<PostedJob | null>(null);
  const [appliedIds, setAppliedIds] = useState<string[]>([]);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(t);
  }, []);

  const activeJobs = useMemo(() => jobs.filter((j) => j.status === 'Active'), [jobs]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return activeJobs.filter((job) => {
      if (q) {
        const hay = `${job.title} ${job.organization} ${job.location} ${job.skills.join(' ')}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      if (filters.category && job.category !== filters.category) return false;
      if (filters.type && !job.type.includes(filters.type as JobTag)) return false;
      if (filters.location && !job.location.toLowerCase().includes(filters.location.trim().toLowerCase()))
        return false;
      if (filters.tags.length > 0 && !filters.tags.every((t) => job.type.includes(t))) return false;
      return true;
    });
  }, [activeJobs, query, filters]);

  const activeFilterCount =
    (filters.category ? 1 : 0) + (filters.type ? 1 : 0) + (filters.location ? 1 : 0) + filters.tags.length;

  const toggleSave = (jobId: string) => {
    const isSaved = savedIds.includes(jobId);
    setSavedIds((ids) => (isSaved ? ids.filter((id) => id !== jobId) : [...ids, jobId]));
    toast(isSaved ? 'Job removed from saved' : 'Job saved to bookmarks', isSaved ? 'info' : 'success');
  };

  const handleApplied = (job: PostedJob) => {
    setJobs((all) => all.map((j) => (j.id === job.id ? { ...j, applicants: j.applicants + 1 } : j)));
    setApplications((apps) => [
      {
        id: uid('app'),
        jobId: job.id,
        jobTitle: job.title,
        organization: job.organization,
        status: 'Applied' as const,
        appliedDate: new Date().toISOString().slice(0, 10),
      },
      ...apps,
    ]);
    setAppliedIds((ids) => [...ids, job.id]);
    setApplyJob(null);
    toast(`Application submitted for ${job.title}!`, 'success');
  };

  return (
    <DashboardShell>
      <PageHeader
        eyebrow="MCEN · Job Board"
        title="Browse Jobs"
        subtitle="Opportunities from the community — updated daily"
        backHref="/employment-network"
        backLabel="Employment Network"
        actions={
          <Link href="/employment/post-job">
            <Button variant="gold" size="sm">
              <Briefcase className="h-4 w-4" />
              Post a Job
            </Button>
          </Link>
        }
      />

      {/* Search bar */}
      <div className="mt-6 flex gap-2">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-body/50" />
          <input
            placeholder="Search by title, company, skill or city…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="min-h-[48px] w-full rounded-xl border border-card-border bg-white py-3 pl-11 pr-4 text-sm text-heading shadow-card transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
        {/* Mobile filter trigger */}
        <button
          type="button"
          onClick={() => setDrawerOpen(true)}
          className="relative flex min-h-[48px] items-center gap-2 rounded-xl border border-card-border bg-white px-4 text-sm font-medium text-heading shadow-card transition-colors hover:border-primary lg:hidden"
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filters
          {activeFilterCount > 0 && (
            <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-gold text-[10px] font-bold text-white">
              {activeFilterCount}
            </span>
          )}
        </button>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[280px_1fr]">
        {/* Desktop sidebar */}
        <aside className="hidden lg:block">
          <div className="sticky top-28 rounded-2xl border border-card-border bg-white p-5 shadow-card">
            <FilterPanel filters={filters} setFilters={setFilters} activeCount={activeFilterCount} />
          </div>
        </aside>

        {/* Results */}
        <div>
          {!loading && (hydrated ? (
            <p className="mb-4 text-sm font-medium text-body">
              Showing <span className="font-bold text-primary">{filtered.length}</span>{' '}
              {filtered.length === 1 ? 'job' : 'jobs'}
              {activeFilterCount > 0 || query ? ' matching your search' : ''}
            </p>
          ) : null)}

          {loading || !hydrated || !savedHydrated ? (
            <div className="space-y-4">
              {[0, 1, 2].map((i) => (
                <JobCardSkeleton key={i} />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <EmptyState
              icon={<Briefcase className="h-10 w-10" />}
              title="No jobs found"
              description="Try adjusting your search or clearing some filters."
              action={
                <Button
                  variant="secondary"
                  onClick={() => {
                    setQuery('');
                    setFilters(EMPTY_FILTERS);
                  }}
                >
                  Clear All Filters
                </Button>
              }
            />
          ) : (
            <motion.div layout className="space-y-4">
              <AnimatePresence mode="popLayout">
                {filtered.map((job, i) => (
                  <JobCard
                    key={job.id}
                    job={job}
                    index={i}
                    saved={savedIds.includes(job.id)}
                    applied={appliedIds.includes(job.id)}
                    onSave={() => toggleSave(job.id)}
                    onApply={() => setApplyJob(job)}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </div>

      {/* Mobile slide-up filter drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDrawerOpen(false)}
              className="fixed inset-0 z-[60] bg-black/50 lg:hidden"
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 32 }}
              className="fixed inset-x-0 bottom-0 z-[61] max-h-[85vh] overflow-y-auto rounded-t-3xl bg-white p-5 pb-8 shadow-2xl lg:hidden"
              role="dialog"
              aria-label="Job filters"
            >
              <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-gray-200" />
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-bold text-heading">Filters</h2>
                <button
                  type="button"
                  onClick={() => setDrawerOpen(false)}
                  aria-label="Close filters"
                  className="rounded-full p-2 text-body/60 transition-colors hover:bg-gray-100"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <FilterPanel filters={filters} setFilters={setFilters} activeCount={activeFilterCount} />
              <Button variant="primary" className="mt-5 w-full" onClick={() => setDrawerOpen(false)}>
                Show {filtered.length} {filtered.length === 1 ? 'Job' : 'Jobs'}
              </Button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Apply modal */}
      <ApplyModal
        job={applyJob}
        defaultName={user?.fullName ?? ''}
        onClose={() => setApplyJob(null)}
        onApplied={handleApplied}
      />
    </DashboardShell>
  );
}
