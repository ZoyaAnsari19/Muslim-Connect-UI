'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Plus, Check, X } from 'lucide-react';
import { PROFESSION_GROUPS } from '@/lib/mock-data';
import Button from '@/components/ui/Button';
import { useToast } from '@/context/ToastContext';
import type { OnboardingData } from './types';

interface StepProfessionalProps {
  data: OnboardingData;
  update: (partial: Partial<OnboardingData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function StepProfessional({ data, update, onNext, onBack }: StepProfessionalProps) {
  const { toast } = useToast();
  const [custom, setCustom] = useState('');
  const [error, setError] = useState('');

  const allPredefined = PROFESSION_GROUPS.flatMap((g) => g.professions);
  const customSelections = data.professions.filter((p) => !allPredefined.includes(p));

  const toggle = (profession: string) => {
    const selected = data.professions.includes(profession);
    update({
      professions: selected
        ? data.professions.filter((p) => p !== profession)
        : [...data.professions, profession],
    });
    setError('');
  };

  const addCustom = () => {
    const value = custom.trim();
    if (value.length < 2) return;
    if (data.professions.some((p) => p.toLowerCase() === value.toLowerCase())) {
      toast('That profession is already selected', 'warning');
      return;
    }
    update({ professions: [...data.professions, value] });
    setCustom('');
    setError('');
    toast(`Added "${value}"`);
  };

  const submit = () => {
    if (data.professions.length === 0) {
      setError('Please select at least one profession');
      return;
    }
    onNext();
  };

  return (
    <div>
      <div className="mb-7 text-center">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-50 text-primary">
          <Briefcase className="h-7 w-7" aria-hidden />
        </span>
        <h2 className="mt-4 font-heading text-2xl font-bold text-heading">Professional Details</h2>
        <p className="mt-1.5 text-sm text-body">
          Select all that apply — religious roles help us connect you with masjids.
        </p>
        <motion.span
          key={data.professions.length}
          initial={{ scale: 1.25 }}
          animate={{ scale: 1 }}
          className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-gold-soft px-4 py-1 text-xs font-semibold text-gold-dark"
        >
          {data.professions.length} selected
        </motion.span>
      </div>

      <div className="max-h-[44vh] space-y-6 overflow-y-auto pr-1">
        {PROFESSION_GROUPS.map((group) => (
          <fieldset key={group.category}>
            <legend className="mb-2.5 flex items-center gap-2 text-sm font-semibold text-heading">
              {group.category}
              {group.category === 'Religious' && (
                <span className="rounded-full bg-primary-50 px-2 py-0.5 text-[10px] font-medium text-primary">
                  Important for masjid roles
                </span>
              )}
            </legend>
            <div className="flex flex-wrap gap-2">
              {group.professions.map((p) => {
                const selected = data.professions.includes(p);
                return (
                  <motion.button
                    key={p}
                    type="button"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => toggle(p)}
                    aria-pressed={selected}
                    className={`flex min-h-[44px] items-center gap-1.5 rounded-full border px-4 text-sm font-medium transition-colors ${
                      selected
                        ? 'border-primary bg-primary text-white shadow-card'
                        : 'border-card-border bg-white text-body hover:border-primary/50 hover:text-primary'
                    }`}
                  >
                    {selected && <Check className="h-3.5 w-3.5" aria-hidden />}
                    {p}
                  </motion.button>
                );
              })}
            </div>
          </fieldset>
        ))}

        {/* Custom selections */}
        {customSelections.length > 0 && (
          <fieldset>
            <legend className="mb-2.5 text-sm font-semibold text-heading">Your Custom Professions</legend>
            <div className="flex flex-wrap gap-2">
              {customSelections.map((p) => (
                <span
                  key={p}
                  className="flex min-h-[44px] items-center gap-2 rounded-full border border-gold bg-gold-soft px-4 text-sm font-medium text-gold-dark"
                >
                  {p}
                  <button onClick={() => toggle(p)} aria-label={`Remove ${p}`}>
                    <X className="h-3.5 w-3.5" aria-hidden />
                  </button>
                </span>
              ))}
            </div>
          </fieldset>
        )}
      </div>

      {/* Add custom */}
      <div className="mt-5 flex gap-2">
        <label htmlFor="custom-profession" className="sr-only">
          Add custom profession
        </label>
        <input
          id="custom-profession"
          type="text"
          value={custom}
          onChange={(e) => setCustom(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addCustom())}
          placeholder="Add custom profession…"
          className="min-h-[44px] w-full rounded-xl border border-card-border bg-white px-4 text-sm text-heading placeholder:text-body/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
        <Button variant="secondary" onClick={addCustom} disabled={custom.trim().length < 2} aria-label="Add profession">
          <Plus className="h-4 w-4" aria-hidden />
          Add
        </Button>
      </div>

      {error && (
        <p className="mt-2 text-xs font-medium text-danger" role="alert">
          {error}
        </p>
      )}

      <div className="mt-7 flex gap-3">
        <Button variant="ghost" onClick={onBack} className="flex-1">
          Back
        </Button>
        <Button onClick={submit} className="flex-[2]" size="lg">
          Continue
        </Button>
      </div>
    </div>
  );
}
