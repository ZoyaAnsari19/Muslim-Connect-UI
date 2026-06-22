'use client';

import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type ClipboardEvent,
} from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Smartphone, ShieldCheck, RotateCcw, Pencil } from 'lucide-react';
import { COUNTRY_CODES } from '@/lib/mock-data';
import Button from '@/components/ui/Button';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import type { User } from '@/lib/types';

const DEMO_OTP = '123456';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const { toast } = useToast();

  const [countryCode, setCountryCode] = useState('+91');
  const [mobile, setMobile] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState<string[]>(Array(6).fill(''));
  const [countdown, setCountdown] = useState(0);
  const [error, setError] = useState('');
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const autofillTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (countdown <= 0) return;
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown]);

  useEffect(
    () => () => {
      if (autofillTimer.current) clearTimeout(autofillTimer.current);
    },
    []
  );

  const sendOtp = () => {
    if (!/^\d{7,12}$/.test(mobile)) {
      setError('Please enter a valid mobile number (7–12 digits)');
      return;
    }
    setError('');
    setOtpSent(true);
    setCountdown(30);
    setOtp(Array(6).fill(''));
    toast(`OTP sent to ${countryCode} ${mobile}`, 'info');
    autofillTimer.current = setTimeout(() => {
      setOtp(DEMO_OTP.split(''));
      toast('Demo OTP auto-filled', 'success');
    }, 2000);
  };

  const editNumber = () => {
    setOtpSent(false);
    setOtp(Array(6).fill(''));
    setCountdown(0);
    setError('');
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
    if (otp.join('') !== DEMO_OTP) {
      setError('Incorrect OTP. Hint: the demo OTP is 123456');
      return;
    }
    const user: User = {
      id: `user-${Date.now()}`,
      mobile,
      countryCode,
      fullName: 'Muslim Connect Member',
      gender: 'male',
      dob: '',
      area: '',
      city: '',
      state: '',
      pincode: '',
      professions: [],
      socialLinks: {},
      createdAt: new Date().toISOString(),
    };
    login(user);
    toast('Welcome back to Muslim Connect!');
    router.push('/feed');
  };

  return (
    <div className="pattern-overlay relative min-h-screen bg-ivory px-4 pb-20 pt-28 sm:pt-32">
      <div className="relative mx-auto max-w-md">
        <header className="mb-10 text-center">
          <h1 className="font-heading text-3xl font-bold text-heading sm:text-4xl">
            Login to <span className="text-primary">Muslim Connect</span>
          </h1>
          <p className="mt-2 text-sm text-body">
            Enter your mobile number to receive a one-time password.
          </p>
        </header>

        <div className="relative overflow-hidden rounded-3xl border border-card-border bg-white p-6 shadow-card sm:p-10">
          <div className="mb-7 text-center">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-50 text-primary">
              <Smartphone className="h-7 w-7" aria-hidden />
            </span>
            <h2 className="mt-4 font-heading text-2xl font-bold text-heading">
              {otpSent ? 'Verify OTP' : 'Login with Mobile'}
            </h2>
            <p className="mt-1.5 text-sm text-body">
              {otpSent
                ? `Enter the 6-digit code sent to ${countryCode} ${mobile}`
                : 'We\u2019ll send a one-time password to confirm it\u2019s you.'}
            </p>
          </div>

          {/* Phone input */}
          <div className="flex gap-2">
            <label htmlFor="country-code" className="sr-only">
              Country code
            </label>
            <select
              id="country-code"
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
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
                value={mobile}
                disabled={otpSent}
                onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 12))}
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
              <div className="mb-3 flex items-center justify-center gap-2 text-sm font-medium text-heading">
                <span>Enter the 6-digit OTP</span>
                <button
                  onClick={editNumber}
                  className="flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                >
                  <Pencil className="h-3 w-3" aria-hidden />
                  Edit
                </button>
              </div>
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
                    Resend OTP in{' '}
                    <span className="font-semibold text-primary tabular-nums">{countdown}s</span>
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
                Verify &amp; Login
              </Button>
            </motion.div>
          )}

          <p className="mt-6 text-center text-sm text-body">
            New to Muslim Connect?{' '}
            <Link href="/onboarding" className="font-medium text-primary hover:underline">
              Get Started
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
