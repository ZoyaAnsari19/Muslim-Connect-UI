'use client';

// ─── Shared multi-section form for Masjid / Dargah / Madrasa (Part 2) ────────
// Used by all create-* and edit-* institution pages.

import { useRef, useState, type FormEvent, type ReactNode } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Landmark,
  Sparkles,
  GraduationCap,
  MapPin,
  Clock,
  ImagePlus,
  ShieldCheck,
  X,
  Info,
  type LucideIcon,
} from 'lucide-react';
import ProtectedRoute from '@/components/ProtectedRoute';
import { DashboardShell, PageHeader } from '@/components/dashboard/DashboardShell';
import Button from '@/components/ui/Button';
import Input, { Textarea } from '@/components/ui/Input';
import { useToast } from '@/context/ToastContext';
import { useOwnedProfiles, uid } from '@/lib/store';
import {
  MASJID_KINDS,
  IMAM_FIQH_OPTIONS,
  SECT_OPTIONS,
  MADRASA_COURSE_OPTIONS,
  INSTITUTION_FALLBACK_IMAGES,
} from '@/lib/mock-data';
import type {
  InstitutionType,
  OwnedProfile,
  MasjidKind,
  ImamFiqh,
  MasjidSect,
  VerificationRole,
  PrayerTimes,
} from '@/lib/types';

// ─── Local field primitives (match Input styling) ────────────────────────────

function SelectField({
  id,
  label,
  required,
  value,
  options,
  onChange,
  error,
}: {
  id: string;
  label: string;
  required?: boolean;
  value: string;
  options: readonly string[];
  onChange: (v: string) => void;
  error?: string;
}) {
  return (
    <div className="w-full">
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-heading">
        {label}
        {required && <span className="ml-0.5 text-danger">*</span>}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={!!error}
        className={`min-h-[44px] w-full rounded-xl border bg-white px-4 py-2.5 text-sm text-heading transition-colors focus:outline-none focus:ring-2 ${
          error
            ? 'border-danger focus:ring-danger/30'
            : 'border-card-border focus:border-primary focus:ring-primary/20'
        }`}
      >
        <option value="">Select…</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      {error && (
        <p className="mt-1.5 text-xs font-medium text-danger" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

function FormSection({
  icon: Icon,
  title,
  children,
  delay = 0,
}: {
  icon: LucideIcon;
  title: string;
  children: ReactNode;
  delay?: number;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, ease: 'easeOut', delay }}
      className="rounded-2xl border border-card-border bg-white p-5 shadow-card sm:p-7"
    >
      <h2 className="flex items-center gap-2.5 font-heading text-base font-bold text-heading sm:text-lg">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-50 text-primary">
          <Icon className="h-[18px] w-[18px]" aria-hidden />
        </span>
        {title}
      </h2>
      <div className="mt-5">{children}</div>
    </motion.section>
  );
}

// ─── Image drop zone ──────────────────────────────────────────────────────────

function ImageDropZone({
  preview,
  onSelect,
  onClear,
}: {
  preview: string | null;
  onSelect: (dataUrl: string) => void;
  onClear: () => void;
}) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [dragging, setDragging] = useState(false);

  const readFile = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = () => typeof reader.result === 'string' && onSelect(reader.result);
    reader.readAsDataURL(file);
  };

  return (
    <div>
      {preview ? (
        <div className="relative h-48 w-full overflow-hidden rounded-xl sm:h-56">
          {/* data-URL previews can't go through next/image optimizer */}
          {preview.startsWith('data:') ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={preview} alt="Institution preview" className="h-full w-full object-cover" />
          ) : (
            <Image src={preview} alt="Institution preview" fill sizes="640px" className="object-cover" />
          )}
          <button
            type="button"
            onClick={onClear}
            aria-label="Remove image"
            className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-heading shadow-card transition-colors hover:bg-white"
          >
            <X className="h-4 w-4" aria-hidden />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragging(false);
            const file = e.dataTransfer.files?.[0];
            if (file) readFile(file);
          }}
          className={`flex min-h-[160px] w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed p-6 text-center transition-colors ${
            dragging
              ? 'border-primary bg-primary-50'
              : 'border-card-border bg-ivory/50 hover:border-primary/50 hover:bg-primary-50/40'
          }`}
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary">
            <ImagePlus className="h-6 w-6" aria-hidden />
          </span>
          <span className="text-sm font-semibold text-heading">
            Drag &amp; drop an image, or click to browse
          </span>
          <span className="text-xs text-body">JPG / PNG — a beautiful photo helps your profile stand out</span>
        </button>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        aria-label="Upload institution image"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) readFile(file);
          e.target.value = '';
        }}
      />
    </div>
  );
}

// ─── Main form ────────────────────────────────────────────────────────────────

const TYPE_META: Record<InstitutionType, { label: string; icon: LucideIcon }> = {
  masjid: { label: 'Masjid', icon: Landmark },
  dargah: { label: 'Dargah', icon: Sparkles },
  madrasa: { label: 'Madrasa', icon: GraduationCap },
};

interface FormState {
  name: string;
  country: string;
  state: string;
  city: string;
  area: string;
  pincode: string;
  description: string;
  image: string | null;
  // masjid
  masjidKind: string;
  imamFiqh: string;
  sect: string;
  prayerTimes: PrayerTimes;
  verificationRole: string;
  // dargah
  ursDate: string;
  caretaker: string;
  // madrasa
  courses: string[];
  studentCapacity: string;
  hostelAvailable: boolean;
}

function buildInitialState(existing?: OwnedProfile): FormState {
  return {
    name: existing?.name ?? '',
    country: existing?.country ?? 'India',
    state: existing?.state ?? '',
    city: existing?.city ?? '',
    area: existing?.area ?? '',
    pincode: existing?.pincode ?? '',
    description: existing?.description ?? '',
    image: existing?.image ?? null,
    masjidKind: existing?.masjidKind ?? '',
    imamFiqh: existing?.imamFiqh ?? '',
    sect: existing?.sect ?? '',
    prayerTimes:
      existing?.prayerTimes ?? { fajr: '', dhuhr: '', asr: '', maghrib: '', isha: '' },
    verificationRole: existing?.verificationRole ?? '',
    ursDate: existing?.ursDate ?? '',
    caretaker: existing?.caretaker ?? '',
    courses: existing?.courses ?? [],
    studentCapacity: existing?.studentCapacity ? String(existing.studentCapacity) : '',
    hostelAvailable: existing?.hostelAvailable ?? false,
  };
}

const PRAYER_LABELS: { key: keyof PrayerTimes; label: string }[] = [
  { key: 'fajr', label: 'Fajr' },
  { key: 'dhuhr', label: 'Dhuhr' },
  { key: 'asr', label: 'Asr' },
  { key: 'maghrib', label: 'Maghrib' },
  { key: 'isha', label: 'Isha' },
];

export default function InstitutionForm({
  type,
  existing,
  flushTop = false,
}: {
  type: InstitutionType;
  existing?: OwnedProfile;
  flushTop?: boolean;
}) {
  const router = useRouter();
  const { toast } = useToast();
  const { setItems: setProfiles } = useOwnedProfiles();
  const [form, setForm] = useState<FormState>(() => buildInitialState(existing));
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const meta = TYPE_META[type];
  const isEdit = !!existing;
  const exitHref = isEdit ? '/manage-profiles' : '/feed';
  const exitLabel = isEdit ? 'Manage Profiles' : 'Back to Feed';

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (form.name.trim().length < 3) errs.name = 'Name must be at least 3 characters';
    if (!form.country.trim()) errs.country = 'Country is required';
    if (!form.state.trim()) errs.state = 'State is required';
    if (!form.city.trim()) errs.city = 'City is required';
    if (!form.area.trim()) errs.area = 'Area is required';
    if (!/^\d{6}$/.test(form.pincode)) errs.pincode = 'Enter a valid 6-digit pincode';

    if (type === 'masjid') {
      if (!form.masjidKind) errs.masjidKind = 'Select the masjid type';
      if (!form.imamFiqh) errs.imamFiqh = 'Select the Imam fiqh';
      if (!form.sect) errs.sect = 'Select the sect';
      if (!form.verificationRole) errs.verificationRole = 'Select your community role';
      const missing = PRAYER_LABELS.filter((p) => !form.prayerTimes[p.key]);
      if (missing.length) errs.prayerTimes = `Set all five prayer times (${missing.map((m) => m.label).join(', ')} missing)`;
    }
    if (type === 'dargah') {
      if (form.description.trim().length < 20)
        errs.description = 'Please write a short history / description (20+ characters)';
      if (!form.caretaker.trim()) errs.caretaker = 'Caretaker (Sajjada Nashin) is required';
    }
    if (type === 'madrasa') {
      if (form.courses.length === 0) errs.courses = 'Select at least one course';
      if (!form.studentCapacity || Number(form.studentCapacity) <= 0)
        errs.studentCapacity = 'Enter the student capacity';
    }

    setErrors(errs);
    if (Object.keys(errs).length) {
      toast('Please fix the highlighted fields', 'error');
      return false;
    }
    return true;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);

    const profile: OwnedProfile = {
      id: existing?.id ?? uid(type),
      type,
      name: form.name.trim(),
      country: form.country.trim(),
      state: form.state.trim(),
      city: form.city.trim(),
      area: form.area.trim(),
      pincode: form.pincode,
      image: form.image ?? INSTITUTION_FALLBACK_IMAGES[type],
      verified: existing?.verified ?? false,
      createdAt: existing?.createdAt ?? new Date().toISOString(),
      description: form.description.trim() || undefined,
      ...(type === 'masjid' && {
        masjidKind: form.masjidKind as MasjidKind,
        imamFiqh: form.imamFiqh as ImamFiqh,
        sect: form.sect as MasjidSect,
        prayerTimes: form.prayerTimes,
        verificationRole: form.verificationRole as VerificationRole,
      }),
      ...(type === 'dargah' && {
        ursDate: form.ursDate || undefined,
        caretaker: form.caretaker.trim(),
      }),
      ...(type === 'madrasa' && {
        courses: form.courses,
        studentCapacity: Number(form.studentCapacity),
        hostelAvailable: form.hostelAvailable,
      }),
    };

    // Simulated network latency for a realistic feel
    setTimeout(() => {
      setProfiles((prev) =>
        isEdit ? prev.map((p) => (p.id === profile.id ? profile : p)) : [...prev, profile]
      );
      toast(
        isEdit
          ? `${meta.label} profile updated successfully`
          : `${form.name.trim()} registered! Pending community verification.`,
        'success'
      );
      router.push('/manage-profiles');
    }, 900);
  };

  const toggleCourse = (course: string) =>
    set(
      'courses',
      form.courses.includes(course)
        ? form.courses.filter((c) => c !== course)
        : [...form.courses, course]
    );

  return (
    <ProtectedRoute>
      <DashboardShell width="max-w-3xl" flushTop={flushTop}>
        <PageHeader
          title={isEdit ? `Edit ${meta.label} Profile` : `Register a New ${meta.label}`}
          subtitle={
            isEdit
              ? `Update the details of ${existing?.name}`
              : `Add a ${meta.label.toLowerCase()} to the Muslim Connect directory`
          }
          backHref={exitHref}
          backLabel={exitLabel}
          eyebrow="Institution Management"
        />

        <form onSubmit={handleSubmit} noValidate className="space-y-6">
          {/* ── Basic details ── */}
          <FormSection icon={meta.icon} title="Basic Details">
            <div className="space-y-4">
              <Input
                id="inst-name"
                label={`${meta.label} Name`}
                required
                placeholder={`e.g. ${type === 'masjid' ? 'Jama Masjid Noorani' : type === 'dargah' ? 'Dargah Hazrat Shah Wali' : 'Darul Uloom Al-Falah'}`}
                value={form.name}
                error={errors.name}
                onChange={(e) => set('name', e.target.value)}
              />

              {type === 'masjid' && (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <SelectField
                    id="inst-kind"
                    label="Type"
                    required
                    value={form.masjidKind}
                    options={MASJID_KINDS}
                    onChange={(v) => set('masjidKind', v)}
                    error={errors.masjidKind}
                  />
                  <SelectField
                    id="inst-fiqh"
                    label="Imam Fiqh"
                    required
                    value={form.imamFiqh}
                    options={IMAM_FIQH_OPTIONS}
                    onChange={(v) => set('imamFiqh', v)}
                    error={errors.imamFiqh}
                  />
                  <SelectField
                    id="inst-sect"
                    label="Sect"
                    required
                    value={form.sect}
                    options={SECT_OPTIONS}
                    onChange={(v) => set('sect', v)}
                    error={errors.sect}
                  />
                </div>
              )}

              {type === 'masjid' && form.sect === 'Ahmadiyya' && (
                <p className="flex items-start gap-2 rounded-xl bg-gold-soft/60 p-3 text-xs leading-relaxed text-gold-dark" role="note">
                  <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                  Listings under this sect require admin approval before appearing publicly.
                </p>
              )}

              {type === 'dargah' && (
                <>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Input
                      id="inst-urs"
                      label="Urs Date"
                      type="date"
                      value={form.ursDate}
                      onChange={(e) => set('ursDate', e.target.value)}
                      hint="Annual Urs commemoration date (optional)"
                    />
                    <Input
                      id="inst-caretaker"
                      label="Caretaker (Sajjada Nashin)"
                      required
                      placeholder="e.g. Syed Mohammed Ashraf"
                      value={form.caretaker}
                      error={errors.caretaker}
                      onChange={(e) => set('caretaker', e.target.value)}
                    />
                  </div>
                  <Textarea
                    id="inst-desc"
                    label="History & Description"
                    required
                    placeholder="Brief history of the dargah, the saint, and its significance…"
                    value={form.description}
                    error={errors.description}
                    onChange={(e) => set('description', e.target.value)}
                  />
                </>
              )}

              {type === 'madrasa' && (
                <>
                  <div>
                    <p className="mb-1.5 text-sm font-medium text-heading">
                      Courses Offered <span className="text-danger">*</span>
                    </p>
                    <div className="flex flex-wrap gap-2" role="group" aria-label="Courses offered">
                      {MADRASA_COURSE_OPTIONS.map((course) => {
                        const selected = form.courses.includes(course);
                        return (
                          <motion.button
                            key={course}
                            type="button"
                            whileTap={{ scale: 0.95 }}
                            onClick={() => toggleCourse(course)}
                            aria-pressed={selected}
                            className={`min-h-[44px] rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                              selected
                                ? 'border-primary bg-primary text-white'
                                : 'border-card-border bg-white text-heading hover:border-primary/40 hover:bg-primary-50'
                            }`}
                          >
                            {course}
                          </motion.button>
                        );
                      })}
                    </div>
                    {errors.courses && (
                      <p className="mt-1.5 text-xs font-medium text-danger" role="alert">
                        {errors.courses}
                      </p>
                    )}
                  </div>
                  <div className="grid grid-cols-1 items-end gap-4 sm:grid-cols-2">
                    <Input
                      id="inst-capacity"
                      label="Student Capacity"
                      required
                      type="number"
                      min={1}
                      placeholder="e.g. 250"
                      value={form.studentCapacity}
                      error={errors.studentCapacity}
                      onChange={(e) => set('studentCapacity', e.target.value)}
                    />
                    <div className="flex min-h-[44px] items-center justify-between rounded-xl border border-card-border bg-ivory/50 px-4 py-2.5">
                      <span className="text-sm font-medium text-heading">Hostel Available</span>
                      <button
                        type="button"
                        role="switch"
                        aria-checked={form.hostelAvailable}
                        aria-label="Toggle hostel availability"
                        onClick={() => set('hostelAvailable', !form.hostelAvailable)}
                        className={`relative h-7 w-12 rounded-full transition-colors ${
                          form.hostelAvailable ? 'bg-primary' : 'bg-card-border'
                        }`}
                      >
                        <motion.span
                          layout
                          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                          className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow ${
                            form.hostelAvailable ? 'left-6' : 'left-1'
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                  <Textarea
                    id="inst-desc-madrasa"
                    label="About the Madrasa"
                    placeholder="Teaching philosophy, facilities, notable alumni… (optional)"
                    value={form.description}
                    onChange={(e) => set('description', e.target.value)}
                  />
                </>
              )}

              {type === 'masjid' && (
                <Textarea
                  id="inst-desc-masjid"
                  label="About the Masjid"
                  placeholder="Community programs, history, facilities… (optional)"
                  value={form.description}
                  onChange={(e) => set('description', e.target.value)}
                />
              )}
            </div>
          </FormSection>

          {/* ── Address ── */}
          <FormSection icon={MapPin} title="Address" delay={0.05}>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Input
                id="inst-country"
                label="Country"
                required
                value={form.country}
                error={errors.country}
                onChange={(e) => set('country', e.target.value)}
              />
              <Input
                id="inst-state"
                label="State"
                required
                placeholder="e.g. Maharashtra"
                value={form.state}
                error={errors.state}
                onChange={(e) => set('state', e.target.value)}
              />
              <Input
                id="inst-city"
                label="City"
                required
                placeholder="e.g. Mumbai"
                value={form.city}
                error={errors.city}
                onChange={(e) => set('city', e.target.value)}
              />
              <Input
                id="inst-area"
                label="Area / Locality"
                required
                placeholder="e.g. Kurla West"
                value={form.area}
                error={errors.area}
                onChange={(e) => set('area', e.target.value)}
              />
              <Input
                id="inst-pincode"
                label="Pincode"
                required
                inputMode="numeric"
                maxLength={6}
                placeholder="6-digit pincode"
                value={form.pincode}
                error={errors.pincode}
                onChange={(e) => set('pincode', e.target.value.replace(/\D/g, ''))}
              />
            </div>
          </FormSection>

          {/* ── Prayer times (masjid only) ── */}
          {type === 'masjid' && (
            <FormSection icon={Clock} title="Prayer Times" delay={0.1}>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
                {PRAYER_LABELS.map((p) => (
                  <Input
                    key={p.key}
                    id={`prayer-${p.key}`}
                    label={p.label}
                    type="time"
                    required
                    value={form.prayerTimes[p.key]}
                    onChange={(e) =>
                      set('prayerTimes', { ...form.prayerTimes, [p.key]: e.target.value })
                    }
                  />
                ))}
              </div>
              {errors.prayerTimes && (
                <p className="mt-2 text-xs font-medium text-danger" role="alert">
                  {errors.prayerTimes}
                </p>
              )}
            </FormSection>
          )}

          {/* ── Image ── */}
          <FormSection icon={ImagePlus} title={`${meta.label} Photo`} delay={0.15}>
            <ImageDropZone
              preview={form.image}
              onSelect={(dataUrl) => set('image', dataUrl)}
              onClear={() => set('image', null)}
            />
          </FormSection>

          {/* ── Verification (masjid only) ── */}
          {type === 'masjid' && (
            <FormSection icon={ShieldCheck} title="Community Verification" delay={0.2}>
              <SelectField
                id="inst-role"
                label="Your Role at this Masjid"
                required
                value={form.verificationRole}
                options={['Trustee', 'Community Member']}
                onChange={(v) => set('verificationRole', v)}
                error={errors.verificationRole}
              />
              <p className="mt-3 flex items-start gap-2 rounded-xl bg-primary-50/70 p-3 text-xs leading-relaxed text-primary" role="note">
                <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                Trustee submissions are fast-tracked. Community member submissions are verified
                with the masjid committee before the profile goes live.
              </p>
            </FormSection>
          )}

          {/* ── Submit ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end"
          >
            <Button
              type="button"
              variant="ghost"
              onClick={() => router.push(exitHref)}
            >
              Cancel
            </Button>
            <Button type="submit" loading={submitting} size="lg" className="sm:min-w-[220px]">
              {isEdit ? `Update ${meta.label} Profile` : `Register ${meta.label}`}
            </Button>
          </motion.div>
        </form>
      </DashboardShell>
    </ProtectedRoute>
  );
}
