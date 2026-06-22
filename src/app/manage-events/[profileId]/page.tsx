'use client';

// ─── /manage-events/[profileId] — events CRUD for an owned profile (Part 2) ──

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import {
  CalendarDays,
  Clock,
  MapPin,
  Users,
  Pencil,
  Trash2,
  Plus,
  SearchX,
} from 'lucide-react';
import ProtectedRoute from '@/components/ProtectedRoute';
import { DashboardShell, PageHeader } from '@/components/dashboard/DashboardShell';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import EmptyState from '@/components/ui/EmptyState';
import ConfirmDialog from '@/components/ui/ConfirmDialog';
import { Skeleton } from '@/components/ui/Skeleton';
import EventForm, { eventToForm, type EventFormData } from '@/components/institutions/EventForm';
import { useToast } from '@/context/ToastContext';
import { useOwnedProfiles, useManagedEvents, uid } from '@/lib/store';
import type { ManagedEvent } from '@/lib/types';
import { staggerContainer, fadeInUp } from '@/components/PageTransition';

function formatEventDate(date: string): string {
  return new Date(`${date}T00:00:00`).toLocaleDateString('en-IN', {
    weekday: 'short',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

function formatEventTime(time: string): string {
  const [h, m] = time.split(':').map(Number);
  const suffix = h >= 12 ? 'PM' : 'AM';
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${hour12}:${String(m).padStart(2, '0')} ${suffix}`;
}

function ManageEventsContent() {
  const { profileId } = useParams<{ profileId: string }>();
  const { items: profiles, hydrated: profilesHydrated } = useOwnedProfiles();
  const { items: allEvents, setItems: setEvents, hydrated: eventsHydrated } = useManagedEvents();
  const { toast } = useToast();

  const [createOpen, setCreateOpen] = useState(false);
  const [deleting, setDeleting] = useState<ManagedEvent | null>(null);

  const hydrated = profilesHydrated && eventsHydrated;
  const profile = profiles.find((p) => p.id === profileId);
  const events = allEvents.filter((e) => e.profileId === profileId);

  if (!hydrated) {
    return (
      <DashboardShell width="max-w-4xl">
        <Skeleton className="mb-8 h-10 w-72" />
        <div className="space-y-4">
          {Array.from({ length: 2 }).map((_, i) => (
            <Skeleton key={i} className="h-44 w-full" />
          ))}
        </div>
      </DashboardShell>
    );
  }

  if (!profile) {
    return (
      <DashboardShell width="max-w-4xl">
        <PageHeader
          title="Profile Not Found"
          backHref="/manage-profiles"
          backLabel="Manage Profiles"
          eyebrow="Events"
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
    );
  }

  const handleCreate = (data: EventFormData) => {
    const newEvent: ManagedEvent = {
      id: uid('event'),
      profileId: profile.id,
      title: data.title.trim(),
      date: data.date,
      time: data.time,
      venue: data.venue.trim(),
      description: data.description.trim(),
      banner: data.banner.trim() || undefined,
      active: true,
      attendees: 0,
      createdAt: new Date().toISOString(),
    };
    setEvents((prev) => [...prev, newEvent]);
    toast(`Event "${newEvent.title}" created`, 'success');
    setCreateOpen(false);
  };

  const toggleActive = (event: ManagedEvent) => {
    setEvents((prev) =>
      prev.map((e) => (e.id === event.id ? { ...e, active: !e.active } : e))
    );
    toast(
      event.active ? `"${event.title}" set to inactive` : `"${event.title}" is now active`,
      'info'
    );
  };

  const confirmDelete = () => {
    if (!deleting) return;
    setEvents((prev) => prev.filter((e) => e.id !== deleting.id));
    toast(`Event "${deleting.title}" deleted`, 'success');
    setDeleting(null);
  };

  return (
    <DashboardShell width="max-w-4xl">
      <PageHeader
        title={`Events — ${profile.name}`}
        subtitle={`${profile.area}, ${profile.city} · Manage gatherings, halaqas and community programs`}
        backHref="/manage-profiles"
        backLabel="Manage Profiles"
        eyebrow="Events Management"
        actions={
          <div className="flex flex-wrap gap-2">
            <Link href={`/edit-${profile.type}-profile/${profile.id}`}>
              <Button size="sm" variant="ghost">
                <Pencil className="h-4 w-4" aria-hidden />
                Edit Profile
              </Button>
            </Link>
            <Button size="sm" onClick={() => setCreateOpen(true)}>
              <Plus className="h-4 w-4" aria-hidden />
              Create Event
            </Button>
          </div>
        }
      />

      {events.length === 0 ? (
        <EmptyState
          icon={<CalendarDays className="h-8 w-8" aria-hidden />}
          title="No Events Yet"
          description={`Create the first event for ${profile.name} — halaqas, iftar programs, Eid gatherings and more.`}
          action={
            <Button onClick={() => setCreateOpen(true)}>
              <Plus className="h-4 w-4" aria-hidden />
              Create Your First Event
            </Button>
          }
        />
      ) : (
        <motion.ul variants={staggerContainer} initial="hidden" animate="show" className="space-y-4">
          <AnimatePresence mode="popLayout">
            {events.map((event) => (
              <motion.li
                key={event.id}
                layout
                variants={fadeInUp}
                exit={{ opacity: 0, scale: 0.96 }}
                className="rounded-2xl border border-card-border bg-white p-5 shadow-card transition-shadow duration-300 hover:shadow-card-hover sm:p-6"
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-heading text-base font-bold text-heading sm:text-lg">
                        {event.title}
                      </h3>
                      <Badge variant={event.active ? 'success' : 'neutral'}>
                        {event.active ? 'Active' : 'Inactive'}
                      </Badge>
                    </div>
                    <div className="mt-2.5 flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-body">
                      <span className="flex items-center gap-1.5">
                        <CalendarDays className="h-4 w-4 text-gold-dark" aria-hidden />
                        {formatEventDate(event.date)}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="h-4 w-4 text-gold-dark" aria-hidden />
                        {formatEventTime(event.time)}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin className="h-4 w-4 text-gold-dark" aria-hidden />
                        {event.venue}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Users className="h-4 w-4 text-gold-dark" aria-hidden />
                        {event.attendees} attendees
                      </span>
                    </div>
                    <p className="mt-2.5 text-sm leading-relaxed text-body">{event.description}</p>
                  </div>

                  <div className="flex shrink-0 items-center gap-2">
                    {/* Active toggle */}
                    <button
                      role="switch"
                      aria-checked={event.active}
                      aria-label={`${event.active ? 'Deactivate' : 'Activate'} ${event.title}`}
                      onClick={() => toggleActive(event)}
                      className={`relative h-7 w-12 rounded-full transition-colors ${
                        event.active ? 'bg-primary' : 'bg-card-border'
                      }`}
                    >
                      <motion.span
                        layout
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                        className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow ${
                          event.active ? 'left-6' : 'left-1'
                        }`}
                      />
                    </button>
                    <Link href={`/edit-event/${event.id}`}>
                      <Button size="sm" variant="ghost" aria-label={`Edit ${event.title}`}>
                        <Pencil className="h-4 w-4" aria-hidden />
                        Edit
                      </Button>
                    </Link>
                    <button
                      onClick={() => setDeleting(event)}
                      aria-label={`Delete ${event.title}`}
                      className="flex h-11 w-11 items-center justify-center rounded-full text-danger transition-colors hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" aria-hidden />
                    </button>
                  </div>
                </div>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      )}

      {/* Create event modal */}
      <Modal open={createOpen} onClose={() => setCreateOpen(false)} maxWidth="max-w-lg" label="Create event">
        <div className="p-6 sm:p-8">
          <h2 className="font-heading text-xl font-bold text-heading">Create Event</h2>
          <p className="mt-1 text-sm text-body">New event for {profile.name}</p>
          <div className="mt-5">
            <EventForm
              initial={eventToForm(null)}
              submitLabel="Create Event"
              onSubmit={handleCreate}
              onCancel={() => setCreateOpen(false)}
            />
          </div>
        </div>
      </Modal>

      <ConfirmDialog
        open={!!deleting}
        title={`Delete "${deleting?.title}"?`}
        message="This event will be permanently removed. Attendees will no longer see it."
        onConfirm={confirmDelete}
        onCancel={() => setDeleting(null)}
      />
    </DashboardShell>
  );
}

export default function ManageEventsPage() {
  return (
    <ProtectedRoute>
      <ManageEventsContent />
    </ProtectedRoute>
  );
}
