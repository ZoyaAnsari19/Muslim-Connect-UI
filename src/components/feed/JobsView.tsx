'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Building2,
  MapPin,
  IndianRupee,
  Clock,
  Users,
} from 'lucide-react';
import { JOBS } from '@/lib/mock-data';
import type { Job, JobTag } from '@/lib/types';
import Badge from '@/components/ui/Badge';
import { useToast } from '@/context/ToastContext';

const TAG_VARIANTS: Record<JobTag, 'red' | 'emerald' | 'blue' | 'neutral'> = {
  Urgent: 'red',
  Religious: 'emerald',
  Remote: 'blue',
  'Full-time': 'neutral',
  'Part-time': 'neutral',
  'On-site': 'neutral',
};

export default function JobsView() {
  return (
    <div className="min-h-screen bg-ivory">
      <header className="sticky top-0 z-30 border-b border-card-border bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-2.5 sm:px-6 lg:px-8">
          <Link
            href="/feed"
            className="inline-flex min-h-[40px] shrink-0 items-center gap-1.5 rounded-full border border-card-border bg-white px-4 text-sm font-medium text-heading transition-colors hover:border-primary hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Back to Feed
          </Link>
          <div className="min-w-0 flex-1 text-center">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-primary">
              Employment Network
            </p>
            <h1 className="font-heading text-lg font-bold text-heading sm:text-xl">Active Jobs</h1>
          </div>
          <span className="shrink-0 rounded-full bg-primary-50 px-3 py-1 text-sm font-bold text-primary">
            {JOBS.length}
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <p className="mb-6 max-w-2xl text-sm leading-relaxed text-body">
          Halal career opportunities across religious institutions, tech, education, and more.
        </p>

        <motion.ul
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {JOBS.map((job) => (
            <motion.li
              key={job.id}
              variants={{
                hidden: { opacity: 0, y: 24 },
                show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
              }}
            >
              <JobCard job={job} />
            </motion.li>
          ))}
        </motion.ul>
      </main>
    </div>
  );
}

function JobCard({ job }: { job: Job }) {
  const { toast } = useToast();

  return (
    <article className="flex h-full flex-col rounded-2xl border border-card-border bg-white p-6 shadow-card transition-shadow hover:shadow-card-hover">
      <h3 className="font-heading text-lg font-bold leading-snug text-heading">{job.title}</h3>
      <p className="mt-1 flex items-center gap-1.5 text-sm font-medium text-primary">
        <Building2 className="h-3.5 w-3.5" aria-hidden />
        {job.organization}
      </p>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {job.type.map((tag) => (
          <Badge key={tag} variant={TAG_VARIANTS[tag]}>
            {tag}
          </Badge>
        ))}
      </div>

      <p className="mt-3 flex-1 text-sm leading-relaxed text-body">{job.description}</p>

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
          onClick={() => toast('Create your job seeker profile to apply, inshaAllah!', 'info')}
          className="min-h-[40px] rounded-full bg-primary px-5 text-xs font-semibold text-white transition-all hover:scale-[1.03] hover:bg-primary-hover"
        >
          Apply Now
        </button>
      </div>
    </article>
  );
}
