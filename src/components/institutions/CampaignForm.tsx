'use client';

// ─── Shared donation-campaign form (create modal + edit page) ─────────────────

import { useState, type FormEvent } from 'react';
import Button from '@/components/ui/Button';
import Input, { Textarea } from '@/components/ui/Input';
import type { DonationCampaign } from '@/lib/types';

export interface CampaignFormData {
  title: string;
  target: string;
  deadline: string;
  description: string;
  image: string;
}

export function campaignToForm(campaign?: DonationCampaign | null): CampaignFormData {
  return {
    title: campaign?.title ?? '',
    target: campaign?.target ? String(campaign.target) : '',
    deadline: campaign?.deadline ?? '',
    description: campaign?.description ?? '',
    image: campaign?.image ?? '',
  };
}

export default function CampaignForm({
  initial,
  submitLabel,
  onSubmit,
  onCancel,
}: {
  initial: CampaignFormData;
  submitLabel: string;
  onSubmit: (data: CampaignFormData) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (form.title.trim().length < 3) errs.title = 'Title must be at least 3 characters';
    const target = Number(form.target);
    if (!form.target || Number.isNaN(target) || target < 1000)
      errs.target = 'Target must be at least ₹1,000';
    if (!form.deadline) errs.deadline = 'Deadline is required';
    else if (new Date(form.deadline) < new Date(new Date().toDateString()))
      errs.deadline = 'Deadline must be in the future';
    if (form.description.trim().length < 10)
      errs.description = 'Please describe the campaign (10+ characters)';
    setErrors(errs);
    if (Object.keys(errs).length) return;
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <Input
        id="camp-title"
        label="Campaign Title"
        required
        placeholder="e.g. Masjid Roof Repair"
        value={form.title}
        error={errors.title}
        onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          id="camp-target"
          label="Target Amount (₹)"
          required
          type="number"
          min={1000}
          step={500}
          placeholder="e.g. 250000"
          value={form.target}
          error={errors.target}
          onChange={(e) => setForm((f) => ({ ...f, target: e.target.value }))}
        />
        <Input
          id="camp-deadline"
          label="Deadline"
          required
          type="date"
          value={form.deadline}
          error={errors.deadline}
          onChange={(e) => setForm((f) => ({ ...f, deadline: e.target.value }))}
        />
      </div>
      <Textarea
        id="camp-desc"
        label="Description"
        required
        placeholder="What will the funds be used for? Why does it matter?"
        value={form.description}
        error={errors.description}
        onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
      />
      <Input
        id="camp-image"
        label="Campaign Image URL"
        type="url"
        placeholder="https://… (optional)"
        value={form.image}
        hint="Paste an image URL to make the campaign stand out (optional)"
        onChange={(e) => setForm((f) => ({ ...f, image: e.target.value }))}
      />
      <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row">
        <Button type="button" variant="ghost" className="flex-1" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" variant="gold" className="flex-1">
          {submitLabel}
        </Button>
      </div>
    </form>
  );
}
