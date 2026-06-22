'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { PartyPopper, Sparkles } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import Modal from '@/components/ui/Modal';
import StepIndicator from '@/components/onboarding/StepIndicator';
import StepMobile from '@/components/onboarding/StepMobile';
import StepPersonal from '@/components/onboarding/StepPersonal';
import StepProfessional from '@/components/onboarding/StepProfessional';
import StepSocial from '@/components/onboarding/StepSocial';
import StepReview from '@/components/onboarding/StepReview';
import { INITIAL_DATA, type OnboardingData } from '@/components/onboarding/types';
import type { User } from '@/lib/types';

const CONFETTI_COLORS = ['#0B6E4F', '#C9A227', '#E5C75D', '#4DA783', '#FAF8F3'];

export default function OnboardingPage() {
  const router = useRouter();
  const { login } = useAuth();
  const { toast } = useToast();

  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [data, setData] = useState<OnboardingData>(INITIAL_DATA);
  const [submitting, setSubmitting] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);

  const update = (partial: Partial<OnboardingData>) =>
    setData((prev) => ({ ...prev, ...partial }));

  const goTo = (next: number) => {
    setDirection(next > step ? 1 : -1);
    setStep(next);
  };
  const onNext = () => goTo(step + 1);
  const onBack = () => goTo(step - 1);

  const onSubmit = () => {
    setSubmitting(true);
    // Simulate API call — 1.5s
    setTimeout(() => {
      const user: User = {
        id: `user-${Date.now()}`,
        mobile: data.mobile,
        countryCode: data.countryCode,
        fullName: data.fullName.trim(),
        gender: data.gender as 'male' | 'female',
        dob: data.dob,
        area: data.area.trim(),
        city: data.city.trim(),
        state: data.state.trim(),
        pincode: data.pincode,
        professions: data.professions, // religious roles preserved for Part 2
        socialLinks: {
          instagram: data.instagram || undefined,
          facebook: data.facebook || undefined,
          website: data.website || undefined,
        },
        createdAt: new Date().toISOString(),
      };
      login(user);
      setSubmitting(false);
      setSuccessOpen(true);
    }, 1500);
  };

  const goToDashboard = () => {
    setSuccessOpen(false);
    toast('Welcome to Muslim Connect!');
    router.push('/feed');
  };

  const steps = [
    <StepMobile key="s1" data={data} update={update} onNext={onNext} />,
    <StepPersonal key="s2" data={data} update={update} onNext={onNext} onBack={onBack} />,
    <StepProfessional key="s3" data={data} update={update} onNext={onNext} onBack={onBack} />,
    <StepSocial key="s4" data={data} update={update} onNext={onNext} onBack={onBack} />,
    <StepReview
      key="s5"
      data={data}
      onSubmit={onSubmit}
      onBack={onBack}
      goToStep={goTo}
      submitting={submitting}
    />,
  ];

  return (
    <div className="pattern-overlay relative min-h-screen bg-ivory px-4 pb-20 pt-28 sm:pt-32">
      <div className="relative mx-auto max-w-2xl">
        <header className="mb-10 text-center">
          <h1 className="font-heading text-3xl font-bold text-heading sm:text-4xl">
            Join <span className="text-primary">Muslim Connect</span>
          </h1>
          <p className="mt-2 text-sm text-body">
            Five quick steps to become part of the global Ummah network.
          </p>
        </header>

        <StepIndicator current={step} />

        {/* Step card */}
        <div className="relative mt-10 overflow-hidden rounded-3xl border border-card-border bg-white p-6 shadow-card sm:p-10">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={step}
              custom={direction}
              initial={{ opacity: 0, x: direction * 72 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -72 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            >
              {steps[step]}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Success modal */}
      <Modal
        open={successOpen}
        onClose={goToDashboard}
        maxWidth="max-w-md"
        showClose={false}
        label="Registration successful"
      >
        <div className="relative overflow-hidden p-8 text-center sm:p-10">
          {/* Confetti burst */}
          <div className="pointer-events-none absolute inset-0" aria-hidden>
            {Array.from({ length: 24 }).map((_, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 1, x: '50%', y: '40%', scale: 0 }}
                animate={{
                  opacity: [1, 1, 0],
                  x: `${50 + (Math.random() - 0.5) * 110}%`,
                  y: `${40 + (Math.random() - 0.7) * 110}%`,
                  scale: [0, 1, 0.6],
                  rotate: Math.random() * 360,
                }}
                transition={{ duration: 1.6 + Math.random(), delay: 0.15 + Math.random() * 0.3, ease: 'easeOut' }}
                className="absolute left-0 top-0 h-2.5 w-2.5 rounded-sm"
                style={{ backgroundColor: CONFETTI_COLORS[i % CONFETTI_COLORS.length] }}
              />
            ))}
          </div>

          <motion.div
            initial={{ scale: 0, rotate: -16 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 16, delay: 0.1 }}
            className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-gradient shadow-card-hover"
          >
            <PartyPopper className="h-9 w-9 text-gold-light" aria-hidden />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="relative"
          >
            <h2 className="mt-6 font-heading text-2xl font-bold text-heading">
              Ahlan wa Sahlan, {data.fullName.split(' ')[0]}! 🎉
            </h2>
            <p className="mt-2.5 text-sm leading-relaxed text-body">
              Your profile has been created. Welcome to the global Muslim Connect community — may
              this connection bring barakah to your life.
            </p>
            <button
              onClick={goToDashboard}
              className="mt-7 inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full bg-primary px-7 text-sm font-semibold text-white shadow-card transition-all hover:scale-[1.02] hover:bg-primary-hover"
            >
              <Sparkles className="h-4 w-4" aria-hidden />
              Go to My Feed
            </button>
          </motion.div>
        </div>
      </Modal>
    </div>
  );
}
