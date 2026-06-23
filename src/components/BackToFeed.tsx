'use client';

// ─── Floating "Back to Feed" shortcut — shown to logged-in users only ────────
// Feed is a protected route, so we only surface this when a session exists.

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function BackToFeed() {
  const { isLoggedIn, isHydrated } = useAuth();

  if (!isHydrated || !isLoggedIn) return null;

  return (
    <Link
      href="/feed"
      className="fixed left-3 top-[76px] z-40 inline-flex min-h-[40px] items-center gap-1.5 rounded-full border border-card-border bg-white/90 px-4 text-sm font-medium text-heading shadow-card backdrop-blur transition-colors hover:border-primary hover:text-primary sm:left-5 sm:top-[88px]"
    >
      <ArrowLeft className="h-4 w-4" aria-hidden />
      Back to Feed
    </Link>
  );
}
