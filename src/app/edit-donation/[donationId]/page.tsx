'use client';

// ─── /edit-donation/[donationId] — prefilled campaign edit page (Part 2) ─────

import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { HandCoins, SearchX } from 'lucide-react';
import ProtectedRoute from '@/components/ProtectedRoute';
import { DashboardShell, PageHeader } from '@/components/dashboard/DashboardShell';
import EmptyState from '@/components/ui/EmptyState';
import Button from '@/components/ui/Button';
import { Skeleton } from '@/components/ui/Skeleton';
import CampaignForm, { campaignToForm, type CampaignFormData } from '@/components/institutions/CampaignForm';
import { useToast } from '@/context/ToastContext';
import { useDonationCampaigns, useOwnedProfiles } from '@/lib/store';

function EditDonationContent() {
  const { donationId } = useParams<{ donationId: string }>();
  const router = useRouter();
  const { toast } = useToast();
  const { items: campaigns, setItems: setCampaigns, hydrated } = useDonationCampaigns();
  const { items: profiles } = useOwnedProfiles();

  const campaign = campaigns.find((c) => c.id === donationId);
  const profile = campaign ? profiles.find((p) => p.id === campaign.profileId) : undefined;

  if (!hydrated) {
    return (
      <DashboardShell width="max-w-2xl">
        <Skeleton className="mb-8 h-10 w-64" />
        <Skeleton className="h-96 w-full" />
      </DashboardShell>
    );
  }

  if (!campaign) {
    return (
      <DashboardShell width="max-w-2xl">
        <PageHeader
          title="Campaign Not Found"
          backHref="/manage-profiles"
          backLabel="Manage Profiles"
          eyebrow="Donations Management"
        />
        <EmptyState
          icon={<SearchX className="h-8 w-8" aria-hidden />}
          title="We couldn't find this campaign"
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

  const handleUpdate = (data: CampaignFormData) => {
    setCampaigns((prev) =>
      prev.map((c) =>
        c.id === campaign.id
          ? {
              ...c,
              title: data.title.trim(),
              target: Number(data.target),
              deadline: data.deadline,
              description: data.description.trim(),
              image: data.image.trim() || undefined,
            }
          : c
      )
    );
    toast(`Campaign "${data.title.trim()}" updated`, 'success');
    router.push(`/manage-donations/${campaign.profileId}`);
  };

  return (
    <DashboardShell width="max-w-2xl">
      <PageHeader
        title="Edit Campaign"
        subtitle={profile ? `${campaign.title} · ${profile.name}` : campaign.title}
        backHref={`/manage-donations/${campaign.profileId}`}
        backLabel="Back to Donations"
        eyebrow="Donations Management"
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="rounded-2xl border border-card-border bg-white p-5 shadow-card sm:p-7"
      >
        <h2 className="flex items-center gap-2.5 font-heading text-base font-bold text-heading">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gold-soft text-gold-dark">
            <HandCoins className="h-[18px] w-[18px]" aria-hidden />
          </span>
          Campaign Details
        </h2>
        <div className="mt-5">
          <CampaignForm
            initial={campaignToForm(campaign)}
            submitLabel="Update Campaign"
            onSubmit={handleUpdate}
            onCancel={() => router.push(`/manage-donations/${campaign.profileId}`)}
          />
        </div>
      </motion.div>
    </DashboardShell>
  );
}

export default function EditDonationPage() {
  return (
    <ProtectedRoute>
      <EditDonationContent />
    </ProtectedRoute>
  );
}
