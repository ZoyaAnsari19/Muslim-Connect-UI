'use client';

// ─── Shared shell + header for authenticated pages (Part 2) ──────────────────

import Link from 'next/link';
import { type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

interface DashboardShellProps {
  children: ReactNode;
  /** Max-width utility, defaults to max-w-7xl */
  width?: string;
}

export function DashboardShell({ children, width = 'max-w-7xl' }: DashboardShellProps) {
  return (
    <div className="min-h-screen bg-ivory pb-20 pt-24 sm:pt-28">
      <div className={`mx-auto w-full ${width} px-4 sm:px-6 lg:px-8`}>{children}</div>
    </div>
  );
}

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  backHref?: string;
  backLabel?: string;
  actions?: ReactNode;
  eyebrow?: string;
}

export function PageHeader({
  title,
  subtitle,
  backHref,
  backLabel = 'Back',
  actions,
  eyebrow,
}: PageHeaderProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="mb-8"
    >
      {backHref && (
        <Link
          href={backHref}
          className="mb-3 inline-flex min-h-[44px] items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-primary-hover"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          {backLabel}
        </Link>
      )}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          {eyebrow && (
            <span className="mb-1 block text-xs font-semibold uppercase tracking-[0.18em] text-gold-dark">
              {eyebrow}
            </span>
          )}
          <h1 className="font-heading text-2xl font-bold text-heading sm:text-3xl">{title}</h1>
          {subtitle && <p className="mt-1.5 max-w-2xl text-sm text-body">{subtitle}</p>}
        </div>
        {actions && <div className="flex flex-wrap items-center gap-3">{actions}</div>}
      </div>
    </motion.header>
  );
}
