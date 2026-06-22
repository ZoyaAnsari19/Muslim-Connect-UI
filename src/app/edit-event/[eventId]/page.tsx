'use client';

// ─── /edit-event/[eventId] — prefilled event edit page (Part 2) ──────────────

import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { CalendarDays, SearchX } from 'lucide-react';
import ProtectedRoute from '@/components/ProtectedRoute';
import { DashboardShell, PageHeader } from '@/components/dashboard/DashboardShell';
import EmptyState from '@/components/ui/EmptyState';
import Button from '@/components/ui/Button';
import { Skeleton } from '@/components/ui/Skeleton';
import EventForm, { eventToForm, type EventFormData } from '@/components/institutions/EventForm';
import { useToast } from '@/context/ToastContext';
import { useManagedEvents, useOwnedProfiles } from '@/lib/store';

function EditEventContent() {
  const { eventId } = useParams<{ eventId: string }>();
  const router = useRouter();
  const { toast } = useToast();
  const { items: events, setItems: setEvents, hydrated } = useManagedEvents();
  const { items: profiles } = useOwnedProfiles();

  const event = events.find((e) => e.id === eventId);
  const profile = event ? profiles.find((p) => p.id === event.profileId) : undefined;

  if (!hydrated) {
    return (
      <DashboardShell width="max-w-2xl">
        <Skeleton className="mb-8 h-10 w-64" />
        <Skeleton className="h-96 w-full" />
      </DashboardShell>
    );
  }

  if (!event) {
    return (
      <DashboardShell width="max-w-2xl">
        <PageHeader
          title="Event Not Found"
          backHref="/manage-profiles"
          backLabel="Manage Profiles"
          eyebrow="Events Management"
        />
        <EmptyState
          icon={<SearchX className="h-8 w-8" aria-hidden />}
          title="We couldn't find this event"
          description="It may have been deleted, or the link is incorrect."
          action={
            <Link href="/manage-profiles">
              <Button>Back to Manage Profiles</Button>
            </Link>
          }
        />
      </DashboardShell>
    );
  }

  const handleUpdate = (data: EventFormData) => {
    setEvents((prev) =>
      prev.map((e) =>
        e.id === event.id
          ? {
              ...e,
              title: data.title.trim(),
              date: data.date,
              time: data.time,
              venue: data.venue.trim(),
              description: data.description.trim(),
              banner: data.banner.trim() || undefined,
            }
          : e
      )
    );
    toast(`Event "${data.title.trim()}" updated`, 'success');
    router.push(`/manage-events/${event.profileId}`);
  };

  return (
    <DashboardShell width="max-w-2xl">
      <PageHeader
        title="Edit Event"
        subtitle={profile ? `${event.title} · ${profile.name}` : event.title}
        backHref={`/manage-events/${event.profileId}`}
        backLabel="Back to Events"
        eyebrow="Events Management"
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="rounded-2xl border border-card-border bg-white p-5 shadow-card sm:p-7"
      >
        <h2 className="flex items-center gap-2.5 font-heading text-base font-bold text-heading">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-50 text-primary">
            <CalendarDays className="h-[18px] w-[18px]" aria-hidden />
          </span>
          Event Details
        </h2>
        <div className="mt-5">
          <EventForm
            initial={eventToForm(event)}
            submitLabel="Update Event"
            onSubmit={handleUpdate}
            onCancel={() => router.push(`/manage-events/${event.profileId}`)}
          />
        </div>
      </motion.div>
    </DashboardShell>
  );
}

export default function EditEventPage() {
  return (
    <ProtectedRoute>
      <EditEventContent />
    </ProtectedRoute>
  );
}
