'use client';

// ─── Shared event form fields (create modal + edit page) ─────────────────────

import { useState, type FormEvent } from 'react';
import Button from '@/components/ui/Button';
import Input, { Textarea } from '@/components/ui/Input';
import type { ManagedEvent } from '@/lib/types';

export interface EventFormData {
  title: string;
  date: string;
  time: string;
  venue: string;
  description: string;
  banner: string;
}

export function eventToForm(event?: ManagedEvent | null): EventFormData {
  return {
    title: event?.title ?? '',
    date: event?.date ?? '',
    time: event?.time ?? '',
    venue: event?.venue ?? '',
    description: event?.description ?? '',
    banner: event?.banner ?? '',
  };
}

export default function EventForm({
  initial,
  submitLabel,
  onSubmit,
  onCancel,
}: {
  initial: EventFormData;
  submitLabel: string;
  onSubmit: (data: EventFormData) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (form.title.trim().length < 3) errs.title = 'Title must be at least 3 characters';
    if (!form.date) errs.date = 'Date is required';
    if (!form.time) errs.time = 'Time is required';
    if (!form.venue.trim()) errs.venue = 'Venue is required';
    if (form.description.trim().length < 10)
      errs.description = 'Please describe the event (10+ characters)';
    setErrors(errs);
    if (Object.keys(errs).length) return;
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <Input
        id="event-title"
        label="Event Title"
        required
        placeholder="e.g. Weekly Tafseer Halaqa"
        value={form.title}
        error={errors.title}
        onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          id="event-date"
          label="Date"
          type="date"
          required
          value={form.date}
          error={errors.date}
          onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
        />
        <Input
          id="event-time"
          label="Time"
          type="time"
          required
          value={form.time}
          error={errors.time}
          onChange={(e) => setForm((f) => ({ ...f, time: e.target.value }))}
        />
      </div>
      <Input
        id="event-venue"
        label="Venue"
        required
        placeholder="e.g. Main Prayer Hall"
        value={form.venue}
        error={errors.venue}
        onChange={(e) => setForm((f) => ({ ...f, venue: e.target.value }))}
      />
      <Textarea
        id="event-desc"
        label="Description"
        required
        placeholder="What is this event about? Who can attend?"
        value={form.description}
        error={errors.description}
        onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
      />
      <Input
        id="event-banner"
        label="Banner Image URL"
        type="url"
        placeholder="https://… (optional)"
        value={form.banner}
        hint="Paste an image URL for the event banner (optional)"
        onChange={(e) => setForm((f) => ({ ...f, banner: e.target.value }))}
      />
      <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row">
        <Button type="button" variant="ghost" className="flex-1" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" className="flex-1">
          {submitLabel}
        </Button>
      </div>
    </form>
  );
}
