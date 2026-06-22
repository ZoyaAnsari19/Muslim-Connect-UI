'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { UserRound, User } from 'lucide-react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import type { OnboardingData } from './types';

interface StepPersonalProps {
  data: OnboardingData;
  update: (partial: Partial<OnboardingData>) => void;
  onNext: () => void;
  onBack: () => void;
}

type Errors = Partial<Record<'fullName' | 'gender' | 'dob' | 'area' | 'city' | 'state' | 'pincode', string>>;

export default function StepPersonal({ data, update, onNext, onBack }: StepPersonalProps) {
  const [errors, setErrors] = useState<Errors>({});

  const validate = (): boolean => {
    const e: Errors = {};
    if (data.fullName.trim().length < 3) e.fullName = 'Please enter your full name (min 3 characters)';
    if (!data.gender) e.gender = 'Please select your gender';
    if (!data.dob) e.dob = 'Please select your date of birth';
    else if (new Date(data.dob) > new Date()) e.dob = 'Date of birth cannot be in the future';
    if (!data.area.trim()) e.area = 'Area is required';
    if (!data.city.trim()) e.city = 'City is required';
    if (!data.state.trim()) e.state = 'State is required';
    if (!/^\d{5,6}$/.test(data.pincode)) e.pincode = 'Enter a valid 5–6 digit pincode';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = () => {
    if (validate()) onNext();
  };

  return (
    <div>
      <div className="mb-7 text-center">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-50 text-primary">
          <UserRound className="h-7 w-7" aria-hidden />
        </span>
        <h2 className="mt-4 font-heading text-2xl font-bold text-heading">Personal Details</h2>
        <p className="mt-1.5 text-sm text-body">Tell us a little about yourself.</p>
      </div>

      <div className="space-y-5">
        <Input
          id="full-name"
          label="Full Name"
          required
          placeholder="e.g. Mohammed Abdul Rahman"
          value={data.fullName}
          onChange={(e) => update({ fullName: e.target.value })}
          error={errors.fullName}
        />

        {/* Gender radio cards */}
        <fieldset>
          <legend className="mb-1.5 block text-sm font-medium text-heading">
            Gender <span className="text-danger">*</span>
          </legend>
          <div className="grid grid-cols-2 gap-3">
            {(['male', 'female'] as const).map((g) => {
              const active = data.gender === g;
              return (
                <motion.button
                  key={g}
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => update({ gender: g })}
                  aria-pressed={active}
                  className={`flex min-h-[56px] items-center justify-center gap-2.5 rounded-xl border-2 text-sm font-medium capitalize transition-colors ${
                    active
                      ? 'border-primary bg-primary-50 text-primary'
                      : 'border-card-border bg-white text-body hover:border-primary/40'
                  }`}
                >
                  <User className="h-4.5 w-4.5" width={18} height={18} aria-hidden />
                  {g}
                </motion.button>
              );
            })}
          </div>
          {errors.gender && (
            <p className="mt-1.5 text-xs font-medium text-danger" role="alert">
              {errors.gender}
            </p>
          )}
        </fieldset>

        <Input
          id="dob"
          label="Date of Birth"
          required
          type="date"
          max={new Date().toISOString().split('T')[0]}
          value={data.dob}
          onChange={(e) => update({ dob: e.target.value })}
          error={errors.dob}
        />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Input
            id="area"
            label="Area / Locality"
            required
            placeholder="e.g. Mohammed Ali Road"
            value={data.area}
            onChange={(e) => update({ area: e.target.value })}
            error={errors.area}
          />
          <Input
            id="city"
            label="City"
            required
            placeholder="e.g. Mumbai"
            value={data.city}
            onChange={(e) => update({ city: e.target.value })}
            error={errors.city}
          />
          <Input
            id="state"
            label="State"
            required
            placeholder="e.g. Maharashtra"
            value={data.state}
            onChange={(e) => update({ state: e.target.value })}
            error={errors.state}
          />
          <Input
            id="pincode"
            label="Pincode"
            required
            inputMode="numeric"
            placeholder="e.g. 400003"
            value={data.pincode}
            onChange={(e) => update({ pincode: e.target.value.replace(/\D/g, '').slice(0, 6) })}
            error={errors.pincode}
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
    </div>
  );
}
