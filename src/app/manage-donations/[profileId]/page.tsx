'use client';

// ─── /manage-donations/[profileId] — campaign CRUD for a profile (Part 2) ────

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import {
  HandCoins,
  Users,
  CalendarClock,
  Pencil,
  Trash2,
  Plus,
  Pause,
  Play,
  XCircle,
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
import CampaignForm, { campaignToForm, type CampaignFormData } from '@/components/institutions/CampaignForm';
import { useToast } from '@/context/ToastContext';
import { useOwnedProfiles, useDonationCampaigns, uid, formatINR, daysLeft } from '@/lib/store';
import type { DonationCampaign, CampaignStatus } from '@/lib/types';
import { staggerContainer, fadeInUp } from '@/components/PageTransition';

const STATUS_VARIANT: Record<CampaignStatus, 'success' | 'neutral' | 'red'> = {
  Active: 'success',
  Paused: 'neutral',
  Closed: 'red',
};

function ManageDonationsContent() {
  const { profileId } = useParams<{ profileId: string }>();
  const { items: profiles, hydrated: profilesHydrated } = useOwnedProfiles();
  const {
    items: allCampaigns,
    setItems: setCampaigns,
    hydrated: campaignsHydrated,
  } = useDonationCampaigns();
  const { toast } = useToast();

  const [createOpen, setCreateOpen] = useState(false);
  const [closing, setClosing] = useState<DonationCampaign | null>(null);
  const [deleting, setDeleting] = useState<DonationCampaign | null>(null);

  const hydrated = profilesHydrated && campaignsHydrated;
  const profile = profiles.find((p) => p.id === profileId);
  const campaigns = allCampaigns.filter((c) => c.profileId === profileId);

  if (!hydrated) {
    return (
      <DashboardShell width="max-w-4xl">
        <Skeleton className="mb-8 h-10 w-72" />
        <div className="space-y-4">
          {Array.from({ length: 2 }).map((_, i) => (
            <Skeleton key={i} className="h-48 w-full" />
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
          eyebrow="Donations"
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

  const handleCreate = (data: CampaignFormData) => {
    const campaign: DonationCampaign = {
      id: uid('camp'),
      profileId: profile.id,
      title: data.title.trim(),
      target: Number(data.target),
      raised: 0,
      donors: 0,
      deadline: data.deadline,
      description: data.description.trim(),
      image: data.image.trim() || undefined,
      status: 'Active',
      createdAt: new Date().toISOString(),
    };
    setCampaigns((prev) => [...prev, campaign]);
    toast(`Campaign "${campaign.title}" started — may Allah accept it`, 'success');
    setCreateOpen(false);
  };

  const togglePause = (campaign: DonationCampaign) => {
    const next: CampaignStatus = campaign.status === 'Active' ? 'Paused' : 'Active';
    setCampaigns((prev) =>
      prev.map((c) => (c.id === campaign.id ? { ...c, status: next } : c))
    );
    toast(
      next === 'Paused' ? `"${campaign.title}" paused` : `"${campaign.title}" resumed`,
      'info'
    );
  };

  const confirmClose = () => {
    if (!closing) return;
    setCampaigns((prev) =>
      prev.map((c) => (c.id === closing.id ? { ...c, status: 'Closed' as const } : c))
    );
    toast(`Campaign "${closing.title}" closed`, 'success');
    setClosing(null);
  };

  const confirmDelete = () => {
    if (!deleting) return;
    setCampaigns((prev) => prev.filter((c) => c.id !== deleting.id));
    toast(`Campaign "${deleting.title}" deleted`, 'success');
    setDeleting(null);
  };

  return (
    <DashboardShell width="max-w-4xl">
      <PageHeader
        title={`Donations — ${profile.name}`}
        subtitle={`${profile.area}, ${profile.city} · Run fundraising campaigns for your community`}
        backHref="/manage-profiles"
        backLabel="Manage Profiles"
        eyebrow="Donations Management"
        actions={
          <Button size="sm" variant="gold" onClick={() => setCreateOpen(true)}>
            <Plus className="h-4 w-4" aria-hidden />
            Start Campaign
          </Button>
        }
      />

      {campaigns.length === 0 ? (
        <EmptyState
          icon={<HandCoins className="h-8 w-8" aria-hidden />}
          title="No Campaigns Yet"
          description={`Start the first fundraising campaign for ${profile.name} — repairs, utilities, education funds and more.`}
          action={
            <Button variant="gold" onClick={() => setCreateOpen(true)}>
              <Plus className="h-4 w-4" aria-hidden />
              Start Your First Campaign
            </Button>
          }
        />
      ) : (
        <motion.ul variants={staggerContainer} initial="hidden" animate="show" className="space-y-4">
          <AnimatePresence mode="popLayout">
            {campaigns.map((campaign) => {
              const pct = Math.min(100, Math.round((campaign.raised / campaign.target) * 100));
              const remaining = daysLeft(campaign.deadline);
              return (
                <motion.li
                  key={campaign.id}
                  layout
                  variants={fadeInUp}
                  exit={{ opacity: 0, scale: 0.96 }}
                  className="rounded-2xl border border-card-border bg-white p-5 shadow-card transition-shadow duration-300 hover:shadow-card-hover sm:p-6"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-heading text-base font-bold text-heading sm:text-lg">
                      {campaign.title}
                    </h3>
                    <Badge variant={STATUS_VARIANT[campaign.status]}>{campaign.status}</Badge>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-body">{campaign.description}</p>

                  {/* Progress */}
                  <div className="mt-4">
                    <div className="flex items-baseline justify-between gap-2">
                      <p className="text-sm font-semibold text-heading">
                        {formatINR(campaign.raised)}
                        <span className="ml-1 font-normal text-body">
                          raised of {formatINR(campaign.target)}
                        </span>
                      </p>
                      <span className="text-sm font-bold text-primary">{pct}%</span>
                    </div>
                    <div
                      className="mt-2 h-2.5 overflow-hidden rounded-full bg-ivory"
                      role="progressbar"
                      aria-valuenow={pct}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-label={`${campaign.title} funding progress`}
                    >
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${pct}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: 'easeOut', delay: 0.15 }}
                        className={`h-full rounded-full ${
                          campaign.status === 'Closed' ? 'bg-card-border' : 'bg-gold-gradient'
                        }`}
                      />
                    </div>
                    <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-xs text-body">
                      <span className="flex items-center gap-1.5">
                        <Users className="h-3.5 w-3.5 text-gold-dark" aria-hidden />
                        {campaign.donors} donors
                      </span>
                      <span className="flex items-center gap-1.5">
                        <CalendarClock className="h-3.5 w-3.5 text-gold-dark" aria-hidden />
                        {campaign.status === 'Closed'
                          ? 'Campaign ended'
                          : remaining === 0
                            ? 'Ends today'
                            : `${remaining} days left`}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-card-border pt-4">
                    <Link href={`/edit-donation/${campaign.id}`}>
                      <Button size="sm" variant="ghost" aria-label={`Edit ${campaign.title}`}>
                        <Pencil className="h-4 w-4" aria-hidden />
                        Edit
                      </Button>
                    </Link>
                    {campaign.status !== 'Closed' && (
                      <>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => togglePause(campaign)}
                          aria-label={`${campaign.status === 'Active' ? 'Pause' : 'Resume'} ${campaign.title}`}
                        >
                          {campaign.status === 'Active' ? (
                            <>
                              <Pause className="h-4 w-4" aria-hidden /> Pause
                            </>
                          ) : (
                            <>
                              <Play className="h-4 w-4" aria-hidden /> Resume
                            </>
                          )}
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-gold-dark"
                          onClick={() => setClosing(campaign)}
                          aria-label={`Close ${campaign.title}`}
                        >
                          <XCircle className="h-4 w-4" aria-hidden />
                          Close Campaign
                        </Button>
                      </>
                    )}
                    <button
                      onClick={() => setDeleting(campaign)}
                      aria-label={`Delete ${campaign.title}`}
                      className="ml-auto flex h-11 w-11 items-center justify-center rounded-full text-danger transition-colors hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" aria-hidden />
                    </button>
                  </div>
                </motion.li>
              );
            })}
          </AnimatePresence>
        </motion.ul>
      )}

      {/* Start campaign modal */}
      <Modal open={createOpen} onClose={() => setCreateOpen(false)} maxWidth="max-w-lg" label="Start campaign">
        <div className="p-6 sm:p-8">
          <h2 className="font-heading text-xl font-bold text-heading">Start a Campaign</h2>
          <p className="mt-1 text-sm text-body">New fundraising campaign for {profile.name}</p>
          <div className="mt-5">
            <CampaignForm
              initial={campaignToForm(null)}
              submitLabel="Start Campaign"
              onSubmit={handleCreate}
              onCancel={() => setCreateOpen(false)}
            />
          </div>
        </div>
      </Modal>

      <ConfirmDialog
        open={!!closing}
        title={`Close "${closing?.title}"?`}
        message="The campaign will stop accepting donations. Funds raised so far remain recorded. This cannot be reopened."
        confirmLabel="Close Campaign"
        tone="primary"
        onConfirm={confirmClose}
        onCancel={() => setClosing(null)}
      />

      <ConfirmDialog
        open={!!deleting}
        title={`Delete "${deleting?.title}"?`}
        message="This campaign and its donation records will be permanently removed. This action cannot be undone."
        onConfirm={confirmDelete}
        onCancel={() => setDeleting(null)}
      />
    </DashboardShell>
  );
}

export default function ManageDonationsPage() {
  return (
    <ProtectedRoute>
      <ManageDonationsContent />
    </ProtectedRoute>
  );
}
