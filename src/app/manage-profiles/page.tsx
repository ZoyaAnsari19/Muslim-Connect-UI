'use client';

// ─── /manage-profiles — user's registered institutions grid (Part 2) ─────────

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Landmark,
  Sparkles,
  GraduationCap,
  MapPin,
  BadgeCheck,
  Clock3,
  Pencil,
  CalendarDays,
  HandCoins,
  Trash2,
  Plus,
  FolderKanban,
} from 'lucide-react';
import ProtectedRoute from '@/components/ProtectedRoute';
import { DashboardShell, PageHeader } from '@/components/dashboard/DashboardShell';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import EmptyState from '@/components/ui/EmptyState';
import ConfirmDialog from '@/components/ui/ConfirmDialog';
import { CardSkeleton } from '@/components/ui/Skeleton';
import { useToast } from '@/context/ToastContext';
import { useOwnedProfiles, useManagedEvents, useDonationCampaigns } from '@/lib/store';
import type { OwnedProfile, InstitutionType } from '@/lib/types';
import { staggerContainer, fadeInUp } from '@/components/PageTransition';

const TYPE_META: Record<InstitutionType, { label: string; icon: typeof Landmark; variant: 'emerald' | 'gold' | 'blue' }> = {
  masjid: { label: 'Masjid', icon: Landmark, variant: 'emerald' },
  dargah: { label: 'Dargah', icon: Sparkles, variant: 'gold' },
  madrasa: { label: 'Madrasa', icon: GraduationCap, variant: 'blue' },
};

const CREATE_BUTTONS = [
  { href: '/create-masjid-profile', label: 'Create Masjid Profile', icon: Landmark },
  { href: '/create-dargah-profile', label: 'Create Dargah Profile', icon: Sparkles },
  { href: '/create-madrasa-profile', label: 'Create Madrasa Profile', icon: GraduationCap },
];

function ProfileCard({
  profile,
  onDelete,
}: {
  profile: OwnedProfile;
  onDelete: (p: OwnedProfile) => void;
}) {
  const meta = TYPE_META[profile.type];
  const isDataUrl = profile.image.startsWith('data:');

  return (
    <motion.li
      layout
      variants={fadeInUp}
      exit={{ opacity: 0, scale: 0.95 }}
      className="overflow-hidden rounded-2xl border border-card-border bg-white shadow-card transition-shadow duration-300 hover:shadow-card-hover"
    >
      {/* Image */}
      <div className="relative h-40 w-full">
        {isDataUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={profile.image} alt={profile.name} className="h-full w-full object-cover" />
        ) : (
          <Image
            src={profile.image}
            alt={profile.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-dark-emerald/70 to-transparent" aria-hidden />
        <div className="absolute left-3 top-3">
          <Badge variant={meta.variant}>
            <meta.icon className="h-3 w-3" aria-hidden />
            {meta.label}
          </Badge>
        </div>
        <div className="absolute bottom-3 left-3 right-3">
          <h3 className="truncate font-heading text-lg font-bold text-white">{profile.name}</h3>
          <p className="mt-0.5 flex items-center gap-1 truncate text-xs text-white/85">
            <MapPin className="h-3 w-3 shrink-0" aria-hidden />
            {profile.area}, {profile.city}, {profile.state}
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="p-4">
        <div className="flex items-center justify-between gap-2">
          {profile.verified ? (
            <Badge variant="success">
              <BadgeCheck className="h-3 w-3" aria-hidden />
              Verified
            </Badge>
          ) : (
            <Badge variant="neutral">
              <Clock3 className="h-3 w-3" aria-hidden />
              Pending Verification
            </Badge>
          )}
          <span className="text-[11px] text-body/70">
            Added {new Date(profile.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
          </span>
        </div>

        {/* Actions */}
        <div className="mt-4 grid grid-cols-2 gap-2">
          <Link
            href={`/edit-${profile.type}-profile/${profile.id}`}
            className="flex min-h-[44px] items-center justify-center gap-1.5 rounded-xl bg-primary-50 px-3 text-xs font-semibold text-primary transition-colors hover:bg-primary hover:text-white"
          >
            <Pencil className="h-3.5 w-3.5" aria-hidden />
            Edit
          </Link>
          <Link
            href={`/manage-events/${profile.id}`}
            className="flex min-h-[44px] items-center justify-center gap-1.5 rounded-xl bg-primary-50 px-3 text-xs font-semibold text-primary transition-colors hover:bg-primary hover:text-white"
          >
            <CalendarDays className="h-3.5 w-3.5" aria-hidden />
            Events
          </Link>
          <Link
            href={`/manage-donations/${profile.id}`}
            className="flex min-h-[44px] items-center justify-center gap-1.5 rounded-xl bg-gold-soft px-3 text-xs font-semibold text-gold-dark transition-colors hover:bg-gold hover:text-white"
          >
            <HandCoins className="h-3.5 w-3.5" aria-hidden />
            Donations
          </Link>
          <button
            onClick={() => onDelete(profile)}
            className="flex min-h-[44px] items-center justify-center gap-1.5 rounded-xl bg-red-50 px-3 text-xs font-semibold text-danger transition-colors hover:bg-danger hover:text-white"
            aria-label={`Delete ${profile.name}`}
          >
            <Trash2 className="h-3.5 w-3.5" aria-hidden />
            Delete
          </button>
        </div>
      </div>
    </motion.li>
  );
}

function ManageProfilesContent() {
  const { items: profiles, setItems: setProfiles, hydrated } = useOwnedProfiles();
  const { setItems: setEvents } = useManagedEvents();
  const { setItems: setCampaigns } = useDonationCampaigns();
  const { toast } = useToast();
  const [deleting, setDeleting] = useState<OwnedProfile | null>(null);

  const confirmDelete = () => {
    if (!deleting) return;
    const { id, name } = deleting;
    setProfiles((prev) => prev.filter((p) => p.id !== id));
    // Cascade: remove attached events & campaigns
    setEvents((prev) => prev.filter((e) => e.profileId !== id));
    setCampaigns((prev) => prev.filter((c) => c.profileId !== id));
    toast(`"${name}" and its events & campaigns were deleted`, 'success');
    setDeleting(null);
  };

  return (
    <DashboardShell flushTop>
      <PageHeader
        title="Manage Profiles"
        subtitle="Masjids, dargahs and madrasas you have registered"
        backHref="/dashboard"
        backLabel="Back to Dashboard"
        eyebrow="Institution Management"
        actions={
          hydrated && profiles.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {CREATE_BUTTONS.map((btn) => (
                <Link
                  key={btn.href}
                  href={btn.href}
                  className="flex min-h-[44px] items-center gap-1.5 rounded-full border border-card-border bg-white px-4 text-xs font-semibold text-heading shadow-card transition-all hover:border-primary/40 hover:text-primary hover:shadow-card-hover"
                >
                  <Plus className="h-3.5 w-3.5" aria-hidden />
                  {btn.label.replace('Create ', '').replace(' Profile', '')}
                </Link>
              ))}
            </div>
          ) : undefined
        }
      />

      {!hydrated ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      ) : profiles.length === 0 ? (
        <EmptyState
          icon={<FolderKanban className="h-8 w-8" aria-hidden />}
          title="No Profiles Yet"
          description="Register your first masjid, dargah or madrasa to start managing events and donation campaigns."
          action={
            <div className="flex flex-col gap-2 sm:flex-row">
              {CREATE_BUTTONS.map((btn) => (
                <Link key={btn.href} href={btn.href}>
                  <Button size="sm" variant="secondary">
                    <btn.icon className="h-4 w-4" aria-hidden />
                    {btn.label}
                  </Button>
                </Link>
              ))}
            </div>
          }
        />
      ) : (
        <motion.ul
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {profiles.map((profile) => (
              <ProfileCard key={profile.id} profile={profile} onDelete={setDeleting} />
            ))}
          </AnimatePresence>
        </motion.ul>
      )}

      <ConfirmDialog
        open={!!deleting}
        title={`Delete ${deleting?.name}?`}
        message="This will permanently remove the profile along with all its events and donation campaigns. This action cannot be undone."
        onConfirm={confirmDelete}
        onCancel={() => setDeleting(null)}
      />
    </DashboardShell>
  );
}

export default function ManageProfilesPage() {
  return (
    <ProtectedRoute>
      <ManageProfilesContent />
    </ProtectedRoute>
  );
}
