'use client';

// ─── MCEN: Post a Job (protected) ─────────────────────────────────────────────

import { useState, type KeyboardEvent, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Briefcase, MapPin, IndianRupee, Tag, X, Zap, Plus } from 'lucide-react';
import ProtectedRoute from '@/components/ProtectedRoute';
import { DashboardShell, PageHeader } from '@/components/dashboard/DashboardShell';
import Button from '@/components/ui/Button';
import { Input, Textarea } from '@/components/ui/Input';
import { useToast } from '@/context/ToastContext';
import { usePostedJobs, uid } from '@/lib/store';
import type { JobCategory, JobTag, PostedJob } from '@/lib/types';

const CATEGORIES: JobCategory[] = ['Religious', 'IT', 'Education', 'Healthcare', 'Business', 'Other'];
const JOB_TYPES = ['Full-time', 'Part-time', 'Remote', 'Contract'] as const;

interface FormState {
  title: string;
  organization: string;
  category: string;
  jobType: string;
  location: string;
  salary: string;
  description: string;
  urgent: boolean;
}

const EMPTY: FormState = {
  title: '',
  organization: '',
  category: '',
  jobType: '',
  location: '',
  salary: '',
  description: '',
  urgent: false,
};

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
      {error && <p className="mt-1 text-xs text-danger">{error}</p>}
    </div>
  );
}

function FormSection({ title, icon, children }: { title: string; icon: ReactNode; children: ReactNode }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4 }}
      className="rounded-2xl border border-card-border bg-white p-5 shadow-card sm:p-6"
    >
      <h2 className="mb-4 flex items-center gap-2 text-base font-semibold text-heading">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-50 text-primary">{icon}</span>
        {title}
      </h2>
      {children}
    </motion.section>
  );
}

function PostJobInner() {
  const router = useRouter();
  const { toast } = useToast();
  const { setItems: setJobs } = usePostedJobs();

  const [form, setForm] = useState<FormState>(EMPTY);
  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const set = (field: keyof FormState, value: string | boolean) => {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => {
      if (!e[field]) return e;
      const next = { ...e };
      delete next[field];
      return next;
    });
  };

  const addSkill = () => {
    const v = skillInput.trim();
    if (!v) return;
    if (skills.some((s) => s.toLowerCase() === v.toLowerCase())) {
      toast('Skill already added', 'info');
      return;
    }
    setSkills((s) => [...s, v]);
    setSkillInput('');
  };

  const onSkillKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addSkill();
    }
  };

  const validate = (): boolean => {
    const e: Record<string, string> = {};
    if (form.title.trim().length < 3) e.title = 'Job title must be at least 3 characters';
    if (form.organization.trim().length < 2) e.organization = 'Company / organization is required';
    if (!form.category) e.category = 'Please select a category';
    if (!form.jobType) e.jobType = 'Please select a job type';
    if (!form.location.trim()) e.location = 'Location is required';
    if (!form.salary.trim()) e.salary = 'Salary range is required (e.g. ₹25,000 – ₹40,000)';
    if (form.description.trim().length < 20) e.description = 'Description must be at least 20 characters';
    setErrors(e);
    if (Object.keys(e).length > 0) {
      toast('Please fix the highlighted fields', 'error');
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    setSubmitting(true);

    const tags: JobTag[] = [];
    if (form.urgent) tags.push('Urgent');
    if (form.category === 'Religious') tags.push('Religious');
    if (form.jobType === 'Remote') tags.push('Remote');
    if (form.jobType === 'Full-time') tags.push('Full-time');
    if (form.jobType === 'Part-time') tags.push('Part-time');
    if (form.jobType === 'Contract' && !tags.includes('Remote')) tags.push('On-site');

    const newJob: PostedJob = {
      id: uid('job'),
      title: form.title.trim(),
      organization: form.organization.trim(),
      location: form.location.trim(),
      salary: form.salary.trim(),
      type: tags.length > 0 ? tags : ['Full-time'],
      skills,
      description: form.description.trim(),
      postedDaysAgo: 0,
      applicants: 0,
      category: form.category as JobCategory,
      status: 'Active',
      postedByUser: true,
    };

    setTimeout(() => {
      setJobs((jobs) => [newJob, ...jobs]);
      toast('Job posted successfully! It is now live on the job board.', 'success');
      router.push('/employment/employer-dashboard');
    }, 800);
  };

  return (
    <DashboardShell width="max-w-3xl">
      <PageHeader
        eyebrow="MCEN · Employer"
        title="Post a Job"
        subtitle="Reach thousands of qualified candidates in the community"
        backHref="/employment/employer-dashboard"
        backLabel="Employer Dashboard"
      />

      <div className="mt-6 space-y-5">
        <FormSection title="Job Details" icon={<Briefcase className="h-4 w-4" />}>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <Input
                label="Job Title"
                required
                placeholder="e.g. Hafiz-e-Quran Teacher"
                value={form.title}
                onChange={(e) => set('title', e.target.value)}
                error={errors.title}
              />
            </div>
            <div className="sm:col-span-2">
              <Input
                label="Company / Organization"
                required
                placeholder="e.g. Darul Uloom Academy"
                value={form.organization}
                onChange={(e) => set('organization', e.target.value)}
                error={errors.organization}
              />
            </div>
            <SelectField
              id="job-category"
              label="Category"
              required
              value={form.category}
              options={CATEGORIES}
              onChange={(v) => set('category', v)}
              error={errors.category}
            />
            <SelectField
              id="job-type"
              label="Job Type"
              required
              value={form.jobType}
              options={JOB_TYPES}
              onChange={(v) => set('jobType', v)}
              error={errors.jobType}
            />
          </div>
        </FormSection>

        <FormSection title="Location & Compensation" icon={<MapPin className="h-4 w-4" />}>
          <div className="grid gap-4 sm:grid-cols-2">
            <Input
              label="Location"
              required
              placeholder="e.g. Hyderabad, Telangana"
              value={form.location}
              onChange={(e) => set('location', e.target.value)}
              error={errors.location}
            />
            <div>
              <label className="mb-1.5 block text-sm font-medium text-heading">
                Salary Range<span className="ml-0.5 text-danger">*</span>
              </label>
              <div className="relative">
                <IndianRupee className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-body/50" />
                <input
                  placeholder="₹25,000 – ₹40,000 / month"
                  value={form.salary}
                  onChange={(e) => set('salary', e.target.value)}
                  aria-invalid={!!errors.salary}
                  className={`min-h-[44px] w-full rounded-xl border bg-white py-2.5 pl-10 pr-4 text-sm text-heading transition-colors focus:outline-none focus:ring-2 ${
                    errors.salary
                      ? 'border-danger focus:ring-danger/30'
                      : 'border-card-border focus:border-primary focus:ring-primary/20'
                  }`}
                />
              </div>
              {errors.salary && <p className="mt-1 text-xs text-danger">{errors.salary}</p>}
            </div>
          </div>
        </FormSection>

        <FormSection title="Skills Required" icon={<Tag className="h-4 w-4" />}>
          <div className="flex gap-2">
            <input
              placeholder="Type a skill and press Enter (e.g. Tajweed)"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={onSkillKey}
              className="min-h-[44px] w-full rounded-xl border border-card-border bg-white px-4 py-2.5 text-sm text-heading transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <Button type="button" variant="secondary" onClick={addSkill} className="shrink-0">
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Add</span>
            </Button>
          </div>
          {skills.length > 0 ? (
            <div className="mt-3 flex flex-wrap gap-2">
              {skills.map((skill) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="inline-flex items-center gap-1.5 rounded-full bg-primary-50 px-3 py-1.5 text-xs font-medium text-primary"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => setSkills((s) => s.filter((x) => x !== skill))}
                    aria-label={`Remove ${skill}`}
                    className="rounded-full p-0.5 transition-colors hover:bg-primary/10"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </motion.span>
              ))}
            </div>
          ) : (
            <p className="mt-3 text-xs text-body/60">No skills added yet — skills help candidates find your job.</p>
          )}
        </FormSection>

        <FormSection title="Description" icon={<Briefcase className="h-4 w-4" />}>
          <Textarea
            label="Job Description"
            required
            rows={5}
            placeholder="Describe responsibilities, requirements, working hours, and benefits…"
            value={form.description}
            onChange={(e) => set('description', e.target.value)}
            error={errors.description}
          />

          {/* Urgent toggle */}
          <div className="mt-5 flex items-center justify-between rounded-xl border border-card-border bg-ivory p-4">
            <div className="flex items-center gap-3">
              <span
                className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors ${
                  form.urgent ? 'bg-danger/10 text-danger' : 'bg-gray-100 text-body/50'
                }`}
              >
                <Zap className="h-4 w-4" />
              </span>
              <div>
                <p className="text-sm font-semibold text-heading">Mark as Urgent</p>
                <p className="text-xs text-body/70">Urgent jobs get a red badge and higher visibility</p>
              </div>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={form.urgent}
              onClick={() => set('urgent', !form.urgent)}
              className={`relative flex h-7 w-12 shrink-0 items-center rounded-full px-1 transition-colors ${
                form.urgent ? 'justify-end bg-danger' : 'justify-start bg-gray-300'
              }`}
            >
              <motion.span
                layout
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                className="h-5 w-5 rounded-full bg-white shadow"
              />
            </button>
          </div>
        </FormSection>

        <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
          <Button variant="ghost" onClick={() => router.push('/employment/employer-dashboard')}>
            Cancel
          </Button>
          <Button variant="primary" loading={submitting} onClick={handleSubmit}>
            <Briefcase className="h-4 w-4" />
            Post Job
          </Button>
        </div>
      </div>
    </DashboardShell>
  );
}

export default function PostJobPage() {
  return (
    <ProtectedRoute>
      <PostJobInner />
    </ProtectedRoute>
  );
}
