'use client';

import { type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { SearchX } from 'lucide-react';

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
}

export default function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-card-border bg-white/60 px-6 py-16 text-center"
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-50 text-primary">
        {icon ?? <SearchX className="h-8 w-8" aria-hidden />}
      </div>
      <div>
        <h3 className="font-heading text-lg font-semibold text-heading">{title}</h3>
        {description && <p className="mt-1 max-w-sm text-sm text-body">{description}</p>}
      </div>
      {action}
    </motion.div>
  );
}
