'use client';

// ─── /feed — community feed landing after account creation ───────────────────

import Link from 'next/link';
import { LayoutDashboard } from 'lucide-react';
import ProtectedRoute from '@/components/ProtectedRoute';
import { DashboardShell, PageHeader } from '@/components/dashboard/DashboardShell';
import CommunityFeed from '@/components/dashboard/CommunityFeed';
import { useAuth } from '@/context/AuthContext';

function FeedContent() {
  const { user } = useAuth();
  const firstName = user?.fullName.split(' ')[0] ?? 'Friend';

  return (
    <DashboardShell width="max-w-3xl">
      <PageHeader
        eyebrow="Community"
        title={`Welcome, ${firstName} 👋`}
        subtitle="Stay connected with announcements, events and updates from across the Ummah."
        actions={
          <Link
            href="/dashboard"
            className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-primary px-6 text-sm font-medium text-white shadow-card transition-all hover:bg-primary-hover hover:shadow-card-hover"
          >
            <LayoutDashboard className="h-4 w-4" aria-hidden />
            Dashboard
          </Link>
        }
      />
      <CommunityFeed />
    </DashboardShell>
  );
}

export default function FeedPage() {
  return (
    <ProtectedRoute>
      <FeedContent />
    </ProtectedRoute>
  );
}
