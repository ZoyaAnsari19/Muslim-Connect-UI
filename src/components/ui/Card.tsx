'use client';

import { type ReactNode } from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';

interface CardProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: ReactNode;
  hoverable?: boolean;
  padded?: boolean;
}

export default function Card({
  children,
  hoverable = true,
  padded = false,
  className = '',
  ...props
}: CardProps) {
  return (
    <motion.div
      whileHover={hoverable ? { scale: 1.02, y: -4 } : undefined}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      className={`overflow-hidden rounded-2xl border border-card-border bg-white shadow-card transition-shadow duration-300 ${
        hoverable ? 'hover:shadow-card-hover' : ''
      } ${padded ? 'p-6' : ''} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}
