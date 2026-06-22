'use client';

// ─── Route guard for authenticated pages (Part 2) ────────────────────────────
// Redirects to /onboarding with a toast when no user session exists.

import { useEffect, useRef, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { Skeleton } from '@/components/ui/Skeleton';

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isLoggedIn, isHydrated } = useAuth();
  const { toast } = useToast();
  const router = useRouter();
  const redirected = useRef(false);

  useEffect(() => {
    if (isHydrated && !isLoggedIn && !redirected.current) {
      redirected.current = true;
      toast('Please login first', 'warning');
      router.replace('/onboarding');
    }
  }, [isHydrated, isLoggedIn, router, toast]);

  // While hydrating (or redirecting) render a calm skeleton shell — no flicker
  if (!isHydrated || !isLoggedIn) {
    return (
      <div className="min-h-screen bg-ivory px-4 pb-16 pt-28 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mx-auto max-w-7xl space-y-6"
        >
          <Skeleton className="h-10 w-72" />
          <Skeleton className="h-5 w-48" />
          <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-28 w-full" />
            ))}
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-40 w-full" />
            ))}
          </div>
        </motion.div>
      </div>
    );
  }

  return <>{children}</>;
}
