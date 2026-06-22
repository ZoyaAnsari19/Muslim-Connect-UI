import { type ReactNode } from 'react';

type BadgeVariant =
  | 'gold'
  | 'emerald'
  | 'red'
  | 'blue'
  | 'neutral'
  | 'success'
  | 'outline';

const VARIANTS: Record<BadgeVariant, string> = {
  gold: 'bg-gold-soft text-gold-dark border border-gold/30',
  emerald: 'bg-primary-50 text-primary border border-primary/20',
  red: 'bg-red-50 text-danger border border-danger/20',
  blue: 'bg-blue-50 text-info border border-info/20',
  neutral: 'bg-ivory text-body border border-card-border',
  success: 'bg-green-50 text-success border border-success/20',
  outline: 'bg-transparent text-body border border-card-border',
};

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

export default function Badge({ children, variant = 'neutral', className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-medium ${VARIANTS[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
