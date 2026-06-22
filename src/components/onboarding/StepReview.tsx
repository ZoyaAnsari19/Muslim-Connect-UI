'use client';

import { ClipboardCheck, Smartphone, UserRound, Briefcase, Link2, Pencil } from 'lucide-react';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import type { OnboardingData } from './types';

interface StepReviewProps {
  data: OnboardingData;
  onSubmit: () => void;
  onBack: () => void;
  goToStep: (step: number) => void;
  submitting: boolean;
}

function ReviewSection({
  icon: Icon,
  title,
  onEdit,
  children,
}: {
  icon: typeof Smartphone;
  title: string;
  onEdit: () => void;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-xl border border-card-border bg-ivory/50 p-4">
      <div className="flex items-center justify-between">
        <h3 className="flex items-center gap-2 text-sm font-semibold text-heading">
          <Icon className="h-4 w-4 text-primary" aria-hidden />
          {title}
        </h3>
        <button
          onClick={onEdit}
          className="flex items-center gap-1 text-xs font-medium text-primary hover:underline"
          aria-label={`Edit ${title}`}
        >
          <Pencil className="h-3 w-3" aria-hidden />
          Edit
        </button>
      </div>
      <div className="mt-2.5 text-sm text-body">{children}</div>
    </section>
  );
}

export default function StepReview({ data, onSubmit, onBack, goToStep, submitting }: StepReviewProps) {
  return (
    <div>
      <div className="mb-7 text-center">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-50 text-primary">
          <ClipboardCheck className="h-7 w-7" aria-hidden />
        </span>
        <h2 className="mt-4 font-heading text-2xl font-bold text-heading">Review &amp; Submit</h2>
        <p className="mt-1.5 text-sm text-body">Almost there! Double-check your details below.</p>
      </div>

      <div className="space-y-3.5">
        <ReviewSection icon={Smartphone} title="Mobile" onEdit={() => goToStep(0)}>
          <p className="font-medium text-heading">
            {data.countryCode} {data.mobile}{' '}
            <Badge variant="success" className="ml-1">Verified</Badge>
          </p>
        </ReviewSection>

        <ReviewSection icon={UserRound} title="Personal Details" onEdit={() => goToStep(1)}>
          <dl className="grid grid-cols-1 gap-x-6 gap-y-1.5 sm:grid-cols-2">
            <div>
              <dt className="text-xs text-body/60">Full Name</dt>
              <dd className="font-medium text-heading">{data.fullName}</dd>
            </div>
            <div>
              <dt className="text-xs text-body/60">Gender</dt>
              <dd className="font-medium capitalize text-heading">{data.gender}</dd>
            </div>
            <div>
              <dt className="text-xs text-body/60">Date of Birth</dt>
              <dd className="font-medium text-heading">
                {data.dob &&
                  new Date(data.dob).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
              </dd>
            </div>
            <div>
              <dt className="text-xs text-body/60">Location</dt>
              <dd className="font-medium text-heading">
                {data.area}, {data.city}, {data.state} — {data.pincode}
              </dd>
            </div>
          </dl>
        </ReviewSection>

        <ReviewSection icon={Briefcase} title="Professions" onEdit={() => goToStep(2)}>
          <div className="flex flex-wrap gap-1.5">
            {data.professions.map((p) => (
              <Badge key={p} variant="emerald">
                {p}
              </Badge>
            ))}
          </div>
        </ReviewSection>

        <ReviewSection icon={Link2} title="Social Links" onEdit={() => goToStep(3)}>
          {data.instagram || data.facebook || data.website ? (
            <ul className="space-y-1 break-all">
              {data.instagram && <li>Instagram: {data.instagram}</li>}
              {data.facebook && <li>Facebook: {data.facebook}</li>}
              {data.website && <li>Website: {data.website}</li>}
            </ul>
          ) : (
            <p className="italic text-body/60">None provided (optional)</p>
          )}
        </ReviewSection>
      </div>

      <div className="mt-8 flex gap-3">
        <Button variant="ghost" onClick={onBack} className="flex-1" disabled={submitting}>
          Back
        </Button>
        <Button onClick={onSubmit} className="flex-[2]" size="lg" loading={submitting}>
          {submitting ? 'Creating your profile…' : 'Submit & Join'}
        </Button>
      </div>
    </div>
  );
}
