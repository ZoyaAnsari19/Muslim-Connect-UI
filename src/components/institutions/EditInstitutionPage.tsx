'use client';

// ─── Shared edit-page wrapper: loads profile from store, prefills form ───────

import Link from 'next/link';
import { SearchX } from 'lucide-react';
import ProtectedRoute from '@/components/ProtectedRoute';
import { DashboardShell, PageHeader } from '@/components/dashboard/DashboardShell';
import EmptyState from '@/components/ui/EmptyState';
import Button from '@/components/ui/Button';
import { Skeleton } from '@/components/ui/Skeleton';
import InstitutionForm from './InstitutionForm';
import { useOwnedProfiles } from '@/lib/store';
import type { InstitutionType } from '@/lib/types';

export default function EditInstitutionPage({
  type,
  profileId,
  flushTop = false,
}: {
  type: InstitutionType;
  profileId: string;
  flushTop?: boolean;
}) {
  const { items: profiles, hydrated } = useOwnedProfiles();
  const profile = profiles.find((p) => p.id === profileId && p.type === type);

  if (!hydrated) {
    return (
      <ProtectedRoute>
        <DashboardShell width="max-w-3xl" flushTop={flushTop}>
          <Skeleton className="mb-8 h-10 w-64" />
          <div className="space-y-6">
            <Skeleton className="h-72 w-full" />
            <Skeleton className="h-56 w-full" />
          </div>
        </DashboardShell>
      </ProtectedRoute>
    );
  }

  if (!profile) {
    return (
      <ProtectedRoute>
        <DashboardShell width="max-w-3xl" flushTop={flushTop}>
          <PageHeader
            title="Profile Not Found"
            backHref="/manage-profiles"
            backLabel="Manage Profiles"
            eyebrow="Institution Management"
          />
          <EmptyState
            icon={<SearchX className="h-8 w-8" aria-hidden />}
            title="We couldn't find this profile"
            description="It may have been deleted, or the link is incorrect."
            action={
              <Link href="/manage-profiles">
                <Button>Back to Manage Profiles</Button>
              </Link>
            }
          />
        </DashboardShell>
      </ProtectedRoute>
    );
  }

  return <InstitutionForm type={type} existing={profile} flushTop={flushTop} />;
}
