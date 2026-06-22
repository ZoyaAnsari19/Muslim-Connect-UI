'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { STEP_LABELS } from './types';

interface StepIndicatorProps {
  current: number; // 0-based
}

export default function StepIndicator({ current }: StepIndicatorProps) {
  return (
    <nav aria-label="Onboarding progress" className="mx-auto w-full max-w-3xl">
      <ol className="flex items-center">
        {STEP_LABELS.map((label, i) => {
          const done = i < current;
          const active = i === current;
          return (
            <li key={label} className={`flex items-center ${i < STEP_LABELS.length - 1 ? 'flex-1' : ''}`}>
              <div className="flex flex-col items-center gap-1.5">
                <motion.span
                  animate={{
                    scale: active ? 1.1 : 1,
                    backgroundColor: done || active ? '#0B6E4F' : '#FFFFFF',
                    borderColor: done || active ? '#0B6E4F' : '#E8E4DA',
                  }}
                  transition={{ type: 'spring', stiffness: 320, damping: 24 }}
                  className="flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-semibold"
                  aria-current={active ? 'step' : undefined}
                >
                  {done ? (
                    <motion.span
                      initial={{ scale: 0, rotate: -90 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 18 }}
                    >
                      <Check className="h-5 w-5 text-white" aria-hidden />
                    </motion.span>
                  ) : (
                    <span className={active ? 'text-white' : 'text-body'}>{i + 1}</span>
                  )}
                </motion.span>
                <span
                  className={`hidden whitespace-nowrap text-[11px] font-medium sm:block ${
                    active ? 'text-primary' : done ? 'text-heading' : 'text-body/60'
                  }`}
                >
                  {label}
                </span>
              </div>
              {i < STEP_LABELS.length - 1 && (
                <div className="relative mx-2 h-0.5 flex-1 overflow-hidden rounded-full bg-card-border sm:-mt-5">
                  <motion.div
                    animate={{ width: done ? '100%' : '0%' }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className="absolute inset-y-0 left-0 bg-primary"
                  />
                </div>
              )}
            </li>
          );
        })}
      </ol>
      <p className="mt-3 text-center text-xs font-medium text-body sm:hidden">
        Step {current + 1} of {STEP_LABELS.length}: {STEP_LABELS[current]}
      </p>
    </nav>
  );
}
