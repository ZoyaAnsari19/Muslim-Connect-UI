'use client';

import { useState } from 'react';
import { Link2, Instagram, Facebook, Globe } from 'lucide-react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import type { OnboardingData } from './types';

interface StepSocialProps {
  data: OnboardingData;
  update: (partial: Partial<OnboardingData>) => void;
  onNext: () => void;
  onBack: () => void;
}

type Errors = Partial<Record<'instagram' | 'facebook' | 'website', string>>;

const URL_RE = /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/\S*)?$/i;

export default function StepSocial({ data, update, onNext, onBack }: StepSocialProps) {
  const [errors, setErrors] = useState<Errors>({});

  const validate = (): boolean => {
    const e: Errors = {};
    if (data.instagram && !URL_RE.test(data.instagram))
      e.instagram = 'Enter a valid URL (e.g. instagram.com/yourname)';
    if (data.facebook && !URL_RE.test(data.facebook))
      e.facebook = 'Enter a valid URL (e.g. facebook.com/yourname)';
    if (data.website && !URL_RE.test(data.website))
      e.website = 'Enter a valid URL (e.g. yoursite.com)';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = () => {
    if (validate()) onNext();
  };

  const skip = () => {
    setErrors({});
    update({ instagram: '', facebook: '', website: '' });
    onNext();
  };

  return (
    <div>
      <div className="mb-7 text-center">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-50 text-primary">
          <Link2 className="h-7 w-7" aria-hidden />
        </span>
        <h2 className="mt-4 font-heading text-2xl font-bold text-heading">Social Links</h2>
        <p className="mt-1.5 text-sm text-body">
          All optional — help the community find and connect with you.
        </p>
      </div>

      <div className="space-y-5">
        <div className="relative">
          <Instagram className="pointer-events-none absolute left-4 top-[42px] h-4 w-4 text-body/50" aria-hidden />
          <Input
            id="instagram"
            label="Instagram"
            placeholder="instagram.com/yourname"
            value={data.instagram}
            onChange={(e) => update({ instagram: e.target.value })}
            error={errors.instagram}
            className="pl-11"
          />
        </div>
        <div className="relative">
          <Facebook className="pointer-events-none absolute left-4 top-[42px] h-4 w-4 text-body/50" aria-hidden />
          <Input
            id="facebook"
            label="Facebook"
            placeholder="facebook.com/yourname"
            value={data.facebook}
            onChange={(e) => update({ facebook: e.target.value })}
            error={errors.facebook}
            className="pl-11"
          />
        </div>
        <div className="relative">
          <Globe className="pointer-events-none absolute left-4 top-[42px] h-4 w-4 text-body/50" aria-hidden />
          <Input
            id="website"
            label="Website"
            placeholder="yourwebsite.com"
            value={data.website}
            onChange={(e) => update({ website: e.target.value })}
            error={errors.website}
            className="pl-11"
          />
        </div>
      </div>

      <div className="mt-8 flex gap-3">
        <Button variant="ghost" onClick={onBack} className="flex-1">
          Back
        </Button>
        <Button onClick={submit} className="flex-[2]" size="lg">
          Continue
        </Button>
      </div>

      <div className="mt-4 text-center">
        <button
          onClick={skip}
          className="text-sm font-medium text-body transition-colors hover:text-primary hover:underline"
        >
          Skip for now
        </button>
      </div>
    </div>
  );
}
