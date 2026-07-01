'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Briefcase,
  MapPin,
  Building2,
  Clock,
  Users,
  ArrowRight,
  UserSearch,
  IndianRupee,
  Search,
  SearchX,
} from 'lucide-react';
import { JOBS, MCEN_STATS } from '@/lib/mock-data';
import type { Job, JobTag } from '@/lib/types';
import StatCounter from '@/components/ui/StatCounter';
import SectionHeading from '@/components/ui/SectionHeading';
import Badge from '@/components/ui/Badge';
import EmptyState from '@/components/ui/EmptyState';
import { JobCardSkeleton } from '@/components/ui/Skeleton';
import PageTransition from '@/components/PageTransition';
import BackToFeed from '@/components/BackToFeed';
import LocationScopeTabs from '@/components/feed/LocationScopeTabs';
import { useToast } from '@/context/ToastContext';
import { useAuth } from '@/context/AuthContext';
import {
  matchesLocationScope,
  countByLocationScope,
  parseJobLocation,
  type LocationScope,
} from '@/lib/location-scope';

const TYPE_OPTIONS: JobTag[] = ['Full-time', 'Part-time', 'Remote', 'On-site'];
const TAG_OPTIONS: JobTag[] = ['Urgent', 'Religious', 'Remote'];

interface JobFilters {
  type: string;
  location: string;
  tags: JobTag[];
}

const EMPTY_FILTERS: JobFilters = { type: '', location: '', tags: [] };

const TAG_VARIANTS: Record<JobTag, 'red' | 'emerald' | 'blue' | 'neutral'> = {
  Urgent: 'red',
  Religious: 'emerald',
  Remote: 'blue',
  'Full-time': 'neutral',
  'Part-time': 'neutral',
  'On-site': 'neutral',
};

export default function EmploymentNetworkPage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState<JobFilters>(EMPTY_FILTERS);
  const [locationScope, setLocationScope] = useState<LocationScope>('nearby');

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  const userArea = user?.area ?? '';
  const userCity = user?.city ?? '';
  const userState = user?.state ?? '';

  const jobsBeforeScope = useMemo(() => {
    const q = query.trim().toLowerCase();
    return JOBS.filter((job) => {
      if (q) {
        const hay = `${job.title} ${job.organization} ${job.location} ${job.skills.join(' ')}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      if (filters.type && !job.type.includes(filters.type as JobTag)) return false;
      if (
        filters.location &&
        !job.location.toLowerCase().includes(filters.location.trim().toLowerCase())
      )
        return false;
      if (filters.tags.length > 0 && !filters.tags.every((t) => job.type.includes(t))) return false;
      return true;
    });
  }, [query, filters]);

  const scopeCounts = useMemo(
    () =>
      countByLocationScope(
        jobsBeforeScope,
        (job) => parseJobLocation(job.location),
        userArea,
        userCity,
        userState
      ),
    [jobsBeforeScope, userArea, userCity, userState]
  );

  const filtered = useMemo(() => {
    return jobsBeforeScope.filter((job) => {
      const loc = parseJobLocation(job.location);
      return matchesLocationScope(loc, locationScope, userArea, userCity, userState);
    });
  }, [jobsBeforeScope, locationScope, userArea, userCity, userState]);

  const activeFilterCount =
    (filters.type ? 1 : 0) + (filters.location ? 1 : 0) + filters.tags.length;

  const toggleTag = (tag: JobTag) =>
    setFilters((f) => ({
      ...f,
      tags: f.tags.includes(tag) ? f.tags.filter((t) => t !== tag) : [...f.tags, tag],
    }));

  return (
    <PageTransition>
      <BackToFeed />
      {/* Hero with stats */}
      <section className="pattern-overlay-light relative overflow-hidden bg-emerald-gradient px-4 pb-16 pt-14 sm:pb-20 sm:pt-16">
        <div className="absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-gold/15 blur-3xl" aria-hidden />
        <div className="relative mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-gold-light">
              <Briefcase className="h-3.5 w-3.5" aria-hidden />
              MCEN
            </span>
            <h1 className="mt-5 text-balance font-heading text-4xl font-bold leading-tight text-white sm:text-5xl">
              Muslim Connect <span className="text-gold-light">Employment Network</span>
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/75">
              Halal careers for every talent — from Imams and teachers to engineers and
              entrepreneurs. Your rizq is written; we help you find it.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mx-auto mt-12 grid max-w-3xl grid-cols-2 gap-x-4 gap-y-8 border-t border-white/10 pt-10 sm:grid-cols-4"
          >
            {MCEN_STATS.map((stat) => (
              <StatCounter key={stat.label} value={stat.value} label={stat.label} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA cards */}
      <section className="bg-ivory py-16 sm:py-20" aria-label="Employer and job seeker paths">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 px-4 sm:grid-cols-2 sm:px-6">
          <CtaCard
            href="/employment/employer-dashboard"
            icon={Building2}
            title="I'm an Employer"
            description="Post jobs and discover talented professionals from the Muslim community — masjids, madrasas, and halal businesses welcome."
            cta="Post a Job"
            gold
          />
          <CtaCard
            href="/employment/job-seeker-dashboard"
            icon={UserSearch}
            title="I'm a Job Seeker"
            description="Build your profile, get discovered by Islamic organizations, and apply to opportunities aligned with your values."
            cta="Find Work"
          />
        </div>
      </section>

      {/* Job listings */}
      <section className="bg-white py-16 sm:py-20" aria-label="Open positions">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="Open Positions"
            title="Latest Opportunities"
            subtitle={`${JOBS.length} active openings across religious institutions, tech, education, and more.`}
          />

          <LocationScopeTabs
            scope={locationScope}
            onChange={setLocationScope}
            counts={scopeCounts}
            className="mt-8"
          />

          {/* Search bar */}
          <div className="mt-6">
            <div className="relative">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-body/50" />
              <input
                placeholder="Search by title, company, skill or city…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="min-h-[48px] w-full rounded-xl border border-card-border bg-white py-3 pl-11 pr-4 text-sm text-heading shadow-card transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-[260px_1fr]">
            {/* Filters sidebar */}
            <aside>
              <div className="rounded-2xl border border-card-border bg-ivory/50 p-5 shadow-card lg:sticky lg:top-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold uppercase tracking-wide text-heading">Filters</h3>
                  {activeFilterCount > 0 && (
                    <button
                      type="button"
                      onClick={() => setFilters(EMPTY_FILTERS)}
                      className="text-xs font-semibold text-primary transition-colors hover:text-primary-hover"
                    >
                      Clear all ({activeFilterCount})
                    </button>
                  )}
                </div>

                <div className="mt-5">
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

                <div className="mt-5">
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

                <div className="mt-5">
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
                              ? 'border-primary bg-primary text-white'
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
            </aside>

            {/* Results */}
            <div>
              {!loading && (
                <p className="mb-4 text-sm font-medium text-body">
                  Showing <span className="font-bold text-primary">{filtered.length}</span>{' '}
                  {filtered.length === 1 ? 'job' : 'jobs'}
                  {activeFilterCount > 0 || query ? ' matching your search' : ''}
                </p>
              )}

              {loading ? (
                <div className="grid grid-cols-1 gap-5">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <JobCardSkeleton key={i} />
                  ))}
                </div>
              ) : filtered.length === 0 ? (
                <EmptyState
                  icon={<SearchX className="h-8 w-8" aria-hidden />}
                  title="No jobs found"
                  description="Try adjusting your search or clearing some filters."
                />
              ) : (
                <motion.ul
                  layout
                  className="grid grid-cols-1 gap-5"
                >
                  {filtered.map((job) => (
                    <motion.li
                      key={job.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                    >
                      <JobCard job={job} />
                    </motion.li>
                  ))}
                </motion.ul>
              )}

              <div className="mt-10 text-center">
                <Link
                  href="/employment/jobs"
                  className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white shadow-card transition-all hover:bg-primary-hover hover:shadow-card-hover"
                >
                  Browse All Jobs with Filters
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}

// ─── CTA Card ─────────────────────────────────────────────────────────────────

function CtaCard({
  href,
  icon: Icon,
  title,
  description,
  cta,
  gold = false,
}: {
  href: string;
  icon: typeof Building2;
  title: string;
  description: string;
  cta: string;
  gold?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6 }}
    >
      <Link href={href} className="block h-full" aria-label={title}>
        <motion.div
          whileHover={{ y: -5, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: 'spring', stiffness: 300, damping: 24 }}
          className={`group flex h-full flex-col rounded-3xl border p-8 shadow-card transition-shadow hover:shadow-card-hover ${
            gold
              ? 'border-gold/30 bg-gradient-to-br from-gold-soft via-white to-white'
              : 'border-card-border bg-white'
          }`}
        >
          <span
            className={`flex h-14 w-14 items-center justify-center rounded-2xl ${
              gold ? 'bg-gold text-dark-emerald' : 'bg-primary text-white'
            }`}
          >
            <Icon className="h-7 w-7" aria-hidden />
          </span>
          <h2 className="mt-5 font-heading text-2xl font-bold text-heading">{title}</h2>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-body">{description}</p>
          <span
            className={`mt-6 inline-flex items-center gap-2 text-sm font-semibold ${
              gold ? 'text-gold-dark' : 'text-primary'
            }`}
          >
            {cta}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
          </span>
        </motion.div>
      </Link>
    </motion.div>
  );
}

// ─── Job Card ─────────────────────────────────────────────────────────────────

function JobCard({ job }: { job: Job }) {
  const { toast } = useToast();

  return (
    <motion.article
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      className="flex h-full flex-col rounded-2xl border border-card-border bg-white p-6 shadow-card transition-shadow hover:shadow-card-hover"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-heading text-lg font-bold leading-snug text-heading">{job.title}</h3>
          <p className="mt-1 flex items-center gap-1.5 text-sm font-medium text-primary">
            <Building2 className="h-3.5 w-3.5" aria-hidden />
            {job.organization}
          </p>
        </div>
      </div>

      {/* Tags */}
      <div className="mt-3 flex flex-wrap gap-1.5">
        {job.type.map((tag) => (
          <Badge key={tag} variant={TAG_VARIANTS[tag]}>
            {tag}
          </Badge>
        ))}
      </div>

      <p className="mt-3 text-sm leading-relaxed text-body">{job.description}</p>

      {/* Skills */}
      <div className="mt-3 flex flex-wrap gap-1.5">
        {job.skills.map((skill) => (
          <span
            key={skill}
            className="rounded-md bg-ivory px-2 py-1 text-[11px] font-medium text-body"
          >
            {skill}
          </span>
        ))}
      </div>

      {/* Meta */}
      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-body">
        <span className="flex items-center gap-1">
          <MapPin className="h-3.5 w-3.5 text-gold-dark" aria-hidden />
          {job.location}
        </span>
        <span className="flex items-center gap-1">
          <IndianRupee className="h-3.5 w-3.5 text-gold-dark" aria-hidden />
          {job.salary}
        </span>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-card-border pt-4">
        <span className="flex items-center gap-3 text-xs text-body">
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" aria-hidden />
            {job.postedDaysAgo}d ago
          </span>
          <span className="flex items-center gap-1">
            <Users className="h-3.5 w-3.5" aria-hidden />
            {job.applicants} applied
          </span>
        </span>
        <button
          onClick={() =>
            toast('Create your job seeker profile in Part 2 to apply, inshaAllah!', 'info')
          }
          className="min-h-[40px] rounded-full bg-primary px-5 text-xs font-semibold text-white transition-all hover:scale-[1.03] hover:bg-primary-hover"
        >
          Apply Now
        </button>
      </div>
    </motion.article>
  );
}
