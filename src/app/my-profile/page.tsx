'use client';

// ─── /my-profile — user profile hub (Part 2) ─────────────────────────────────

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  BadgeCheck,
  MapPin,
  Pencil,
  Wrench,
  Star,
  LayoutDashboard,
  Landmark,
  Users,
  Activity,
  CalendarCheck,
} from 'lucide-react';
import ProtectedRoute from '@/components/ProtectedRoute';
import { DashboardShell, PageHeader } from '@/components/dashboard/DashboardShell';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Input from '@/components/ui/Input';
import CountUp from '@/components/ui/CountUp';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { staggerContainer, fadeInUp } from '@/components/PageTransition';

const PROFILE_STATS = [
  { label: 'Followed Masjids', value: 4, icon: Landmark },
  { label: 'Community Connections', value: 27, icon: Users },
  { label: 'Interactions', value: 156, icon: Activity },
  { label: 'Events Attended', value: 9, icon: CalendarCheck },
];

function EditProfileModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { user, updateUser } = useAuth();
  const { toast } = useToast();
  const [form, setForm] = useState({
    fullName: user?.fullName ?? '',
    area: user?.area ?? '',
    city: user?.city ?? '',
    state: user?.state ?? '',
    pincode: user?.pincode ?? '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (form.fullName.trim().length < 3) errs.fullName = 'Name must be at least 3 characters';
    if (!form.area.trim()) errs.area = 'Area is required';
    if (!form.city.trim()) errs.city = 'City is required';
    if (!form.state.trim()) errs.state = 'State is required';
    if (!/^\d{6}$/.test(form.pincode)) errs.pincode = 'Enter a valid 6-digit pincode';
    setErrors(errs);
    if (Object.keys(errs).length) return;

    updateUser({
      fullName: form.fullName.trim(),
      area: form.area.trim(),
      city: form.city.trim(),
      state: form.state.trim(),
      pincode: form.pincode,
    });
    toast('Profile updated successfully', 'success');
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} maxWidth="max-w-lg" label="Edit profile">
      <form onSubmit={handleSubmit} className="p-6 sm:p-8" noValidate>
        <h2 className="font-heading text-xl font-bold text-heading">Edit Profile</h2>
        <p className="mt-1 text-sm text-body">Update your personal details</p>
        <div className="mt-5 space-y-4">
          <Input
            id="edit-name"
            label="Full Name"
            required
            value={form.fullName}
            error={errors.fullName}
            onChange={(e) => setForm((f) => ({ ...f, fullName: e.target.value }))}
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Input
              id="edit-area"
              label="Area"
              required
              value={form.area}
              error={errors.area}
              onChange={(e) => setForm((f) => ({ ...f, area: e.target.value }))}
            />
            <Input
              id="edit-city"
              label="City"
              required
              value={form.city}
              error={errors.city}
              onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
            />
            <Input
              id="edit-state"
              label="State"
              required
              value={form.state}
              error={errors.state}
              onChange={(e) => setForm((f) => ({ ...f, state: e.target.value }))}
            />
            <Input
              id="edit-pincode"
              label="Pincode"
              required
              inputMode="numeric"
              maxLength={6}
              value={form.pincode}
              error={errors.pincode}
              onChange={(e) => setForm((f) => ({ ...f, pincode: e.target.value.replace(/\D/g, '') }))}
            />
          </div>
        </div>
        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row">
          <Button type="button" variant="ghost" className="flex-1" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" className="flex-1">
            Save Changes
          </Button>
        </div>
      </form>
    </Modal>
  );
}

function MyProfileContent() {
  const { user } = useAuth();
  const [editOpen, setEditOpen] = useState(false);

  if (!user) return null;

  return (
    <DashboardShell width="max-w-5xl">
      <PageHeader
        title="My Profile"
        backHref="/dashboard"
        backLabel="Back to Dashboard"
        eyebrow="Account"
      />

      {/* Profile card */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="overflow-hidden rounded-2xl border border-card-border bg-white shadow-card"
        aria-label="Profile summary"
      >
        <div className="pattern-overlay-light relative h-28 bg-emerald-gradient sm:h-32" aria-hidden />
        <div className="px-5 pb-6 sm:px-8">
          <div className="flex items-start justify-between gap-4">
            <span className="-mt-12 relative z-10 flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl border-4 border-white bg-gold-gradient font-heading text-4xl font-bold text-dark-emerald shadow-card">
              {user.fullName.charAt(0).toUpperCase()}
            </span>
            <Button size="sm" variant="secondary" className="mt-4" onClick={() => setEditOpen(true)}>
              <Pencil className="h-4 w-4" aria-hidden />
              Edit Profile
            </Button>
          </div>

          <div className="mt-4">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="font-heading text-xl font-bold text-heading sm:text-2xl">
                {user.fullName}
              </h2>
              <Badge variant="gold">
                <BadgeCheck className="h-3 w-3" aria-hidden />
                Verified User
              </Badge>
            </div>
            <p className="mt-1 flex items-center gap-1.5 text-sm text-body">
              <MapPin className="h-4 w-4 text-gold-dark" aria-hidden />
              {user.area}, {user.city}, {user.state} — {user.pincode}
            </p>
          </div>

          {/* Profession chips */}
          {user.professions.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-2" aria-label="Professions">
              {user.professions.map((p) => (
                <Badge key={p} variant="emerald">
                  {p}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </motion.section>

      {/* Stats */}
      <motion.ul
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4"
        aria-label="Profile statistics"
      >
        {PROFILE_STATS.map((stat) => (
          <motion.li
            key={stat.label}
            variants={fadeInUp}
            className="rounded-2xl border border-card-border bg-white p-4 shadow-card transition-shadow duration-300 hover:shadow-card-hover sm:p-5"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-50 text-primary">
              <stat.icon className="h-[18px] w-[18px]" aria-hidden />
            </span>
            <p className="mt-3 font-heading text-2xl font-bold text-heading">
              <CountUp value={stat.value} />
            </p>
            <p className="mt-0.5 text-xs font-medium text-body">{stat.label}</p>
          </motion.li>
        ))}
      </motion.ul>

      {/* Action cards */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4"
      >
        {[
          {
            href: '/my-profile/manage-services',
            title: 'Manage Services',
            desc: 'Add, edit or pause the services you offer to the community.',
            icon: Wrench,
          },
          {
            href: '/my-profile/manage-reviews',
            title: 'Manage Reviews',
            desc: 'Read and reply to reviews you have received.',
            icon: Star,
          },
          {
            href: '/dashboard',
            title: 'Back to Dashboard',
            desc: 'Return to your community hub and feed.',
            icon: LayoutDashboard,
          },
        ].map((card) => (
          <motion.div key={card.href + card.title} variants={fadeInUp}>
            <Link
              href={card.href}
              className="group flex h-full flex-col rounded-2xl border border-card-border bg-white p-5 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                <card.icon className="h-5 w-5" aria-hidden />
              </span>
              <h3 className="mt-3.5 text-sm font-bold text-heading">{card.title}</h3>
              <p className="mt-1 text-xs leading-relaxed text-body">{card.desc}</p>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      <EditProfileModal open={editOpen} onClose={() => setEditOpen(false)} />
    </DashboardShell>
  );
}

export default function MyProfilePage() {
  return (
    <ProtectedRoute>
      <MyProfileContent />
    </ProtectedRoute>
  );
}
