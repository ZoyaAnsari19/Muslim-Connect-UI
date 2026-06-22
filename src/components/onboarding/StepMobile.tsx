'use client';

import { useEffect, useRef, useState, type KeyboardEvent, type ClipboardEvent } from 'react';
import { motion } from 'framer-motion';
import { Smartphone, ShieldCheck, RotateCcw } from 'lucide-react';
import { COUNTRY_CODES } from '@/lib/mock-data';
import Button from '@/components/ui/Button';
import { useToast } from '@/context/ToastContext';
import type { OnboardingData } from './types';

const DEMO_OTP = '123456';

interface StepMobileProps {
  data: OnboardingData;
  update: (partial: Partial<OnboardingData>) => void;
  onNext: () => void;
}

export default function StepMobile({ data, update, onNext }: StepMobileProps) {
  const { toast } = useToast();
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState<string[]>(Array(6).fill(''));
  const [countdown, setCountdown] = useState(0);
  const [error, setError] = useState('');
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const autofillTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Resend countdown
  useEffect(() => {
    if (countdown <= 0) return;
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown]);

  useEffect(() => () => {
    if (autofillTimer.current) clearTimeout(autofillTimer.current);
  }, []);

  const sendOtp = () => {
    if (!/^\d{7,12}$/.test(data.mobile)) {
      setError('Please enter a valid mobile number (7–12 digits)');
      return;
    }
    setError('');
    setOtpSent(true);
    setCountdown(30);
    setOtp(Array(6).fill(''));
    toast(`OTP sent to ${data.countryCode} ${data.mobile}`, 'info');
    // Demo: auto-fill OTP after 2s
    autofillTimer.current = setTimeout(() => {
      setOtp(DEMO_OTP.split(''));
      toast('Demo OTP auto-filled', 'success');
    }, 2000);
  };

  const handleOtpChange = (i: number, value: string) => {
    if (!/^\d?$/.test(value)) return;
    const next = [...otp];
    next[i] = value;
    setOtp(next);
    if (value && i < 5) inputsRef.current[i + 1]?.focus();
  };

  const handleOtpKeyDown = (i: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[i] && i > 0) inputsRef.current[i - 1]?.focus();
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    const text = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (text.length === 6) {
      e.preventDefault();
      setOtp(text.split(''));
    }
  };

  const verify = () => {
    if (otp.join('') === DEMO_OTP) {
      update({ otpVerified: true });
      toast('Mobile verified successfully!');
      onNext();
    } else {
      setError('Incorrect OTP. Hint: the demo OTP is 123456');
    }
  };

  return (
    <div>
      <div className="mb-7 text-center">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-50 text-primary">
          <Smartphone className="h-7 w-7" aria-hidden />
        </span>
        <h2 className="mt-4 font-heading text-2xl font-bold text-heading">Verify Your Mobile</h2>
        <p className="mt-1.5 text-sm text-body">
          We&rsquo;ll send a one-time password to confirm it&rsquo;s you.
        </p>
      </div>

      {/* Phone input */}
      <div className="flex gap-2">
        <label htmlFor="country-code" className="sr-only">
          Country code
        </label>
        <select
          id="country-code"
          value={data.countryCode}
          onChange={(e) => update({ countryCode: e.target.value })}
          disabled={otpSent}
          className="min-h-[44px] w-28 shrink-0 rounded-xl border border-card-border bg-white px-2 text-sm text-heading focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-60"
        >
          {COUNTRY_CODES.map((c) => (
            <option key={c.code} value={c.code}>
              {c.flag} {c.code}
            </option>
          ))}
        </select>
        <div className="flex-1">
          <label htmlFor="mobile-number" className="sr-only">
            Mobile number
          </label>
          <input
            id="mobile-number"
            type="tel"
            inputMode="numeric"
            placeholder="98XXXXXXXX"
            value={data.mobile}
            disabled={otpSent}
            onChange={(e) => update({ mobile: e.target.value.replace(/\D/g, '').slice(0, 12) })}
            className="min-h-[44px] w-full rounded-xl border border-card-border bg-white px-4 text-sm text-heading placeholder:text-body/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-60"
          />
        </div>
      </div>

      {error && (
        <p className="mt-2 text-xs font-medium text-danger" role="alert">
          {error}
        </p>
      )}

      {!otpSent ? (
        <Button onClick={sendOtp} className="mt-6 w-full" size="lg">
          Send OTP
        </Button>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mt-7"
        >
          <p className="mb-3 text-center text-sm font-medium text-heading">
            Enter the 6-digit OTP
          </p>
          <div className="flex justify-center gap-2 sm:gap-3" role="group" aria-label="OTP input">
            {otp.map((digit, i) => (
              <input
                key={i}
                ref={(el) => {
                  inputsRef.current[i] = el;
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                aria-label={`OTP digit ${i + 1}`}
                onChange={(e) => handleOtpChange(i, e.target.value)}
                onKeyDown={(e) => handleOtpKeyDown(i, e)}
                onPaste={i === 0 ? handlePaste : undefined}
                className="h-12 w-10 rounded-xl border border-card-border bg-white text-center font-heading text-lg font-bold text-heading focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 sm:h-14 sm:w-12"
              />
            ))}
          </div>

          <div className="mt-4 flex items-center justify-center gap-1.5 text-xs text-body">
            {countdown > 0 ? (
              <span>
                Resend OTP in <span className="font-semibold text-primary tabular-nums">{countdown}s</span>
              </span>
            ) : (
              <button
                onClick={sendOtp}
                className="flex items-center gap-1 font-medium text-primary hover:underline"
              >
                <RotateCcw className="h-3.5 w-3.5" aria-hidden />
                Resend OTP
              </button>
            )}
          </div>

          <Button
            onClick={verify}
            disabled={otp.some((d) => !d)}
            className="mt-6 w-full"
            size="lg"
          >
            <ShieldCheck className="h-5 w-5" aria-hidden />
            Verify &amp; Continue
          </Button>
        </motion.div>
      )}
    </div>
  );
}
