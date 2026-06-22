'use client';

// ─── /my-profile/manage-services — user services CRUD (Part 2) ───────────────

import { useState, type FormEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus, Pencil, Trash2, Wrench, IndianRupee } from 'lucide-react';
import ProtectedRoute from '@/components/ProtectedRoute';
import { DashboardShell, PageHeader } from '@/components/dashboard/DashboardShell';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Input, { Textarea } from '@/components/ui/Input';
import EmptyState from '@/components/ui/EmptyState';
import ConfirmDialog from '@/components/ui/ConfirmDialog';
import { Skeleton } from '@/components/ui/Skeleton';
import { useToast } from '@/context/ToastContext';
import { useUserServices, uid } from '@/lib/store';
import type { UserService } from '@/lib/types';
import { staggerContainer, fadeInUp } from '@/components/PageTransition';

const EMPTY_FORM = { title: '', description: '', priceRange: '' };

function ServiceFormModal({
  open,
  initial,
  onClose,
  onSave,
}: {
  open: boolean;
  initial: UserService | null;
  onClose: () => void;
  onSave: (data: typeof EMPTY_FORM) => void;
}) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [lastInitialId, setLastInitialId] = useState<string | null>('__unset__');

  // Sync form when the target service changes (modal re-open)
  const currentId = initial?.id ?? null;
  if (open && currentId !== lastInitialId) {
    setLastInitialId(currentId);
    setForm(
      initial
        ? { title: initial.title, description: initial.description, priceRange: initial.priceRange }
        : EMPTY_FORM
    );
    setErrors({});
  }
  if (!open && lastInitialId !== '__unset__') {
    setLastInitialId('__unset__');
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (form.title.trim().length < 3) errs.title = 'Title must be at least 3 characters';
    if (form.description.trim().length < 10) errs.description = 'Please describe the service (10+ characters)';
    if (!form.priceRange.trim()) errs.priceRange = 'Price range is required';
    setErrors(errs);
    if (Object.keys(errs).length) return;
    onSave(form);
  };

  return (
    <Modal open={open} onClose={onClose} maxWidth="max-w-lg" label={initial ? 'Edit service' : 'Add service'}>
      <form onSubmit={handleSubmit} className="p-6 sm:p-8" noValidate>
        <h2 className="font-heading text-xl font-bold text-heading">
          {initial ? 'Edit Service' : 'Add a New Service'}
        </h2>
        <p className="mt-1 text-sm text-body">
          Services appear on your public professional profile
        </p>
        <div className="mt-5 space-y-4">
          <Input
            id="svc-title"
            label="Service Title"
            required
            placeholder="e.g. Quran Recitation Classes"
            value={form.title}
            error={errors.title}
            onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
          />
          <Textarea
            id="svc-desc"
            label="Description"
            required
            placeholder="What does this service include?"
            value={form.description}
            error={errors.description}
            onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
          />
          <Input
            id="svc-price"
            label="Price Range"
            required
            placeholder="e.g. ₹500 – ₹1,500 / month"
            value={form.priceRange}
            error={errors.priceRange}
            onChange={(e) => setForm((f) => ({ ...f, priceRange: e.target.value }))}
          />
        </div>
        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row">
          <Button type="button" variant="ghost" className="flex-1" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" className="flex-1">
            {initial ? 'Update Service' : 'Add Service'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}

function ManageServicesContent() {
  const { items: services, setItems: setServices, hydrated } = useUserServices();
  const { toast } = useToast();
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<UserService | null>(null);
  const [deleting, setDeleting] = useState<UserService | null>(null);

  const openAdd = () => {
    setEditing(null);
    setFormOpen(true);
  };
  const openEdit = (svc: UserService) => {
    setEditing(svc);
    setFormOpen(true);
  };

  const handleSave = (data: typeof EMPTY_FORM) => {
    if (editing) {
      setServices((prev) =>
        prev.map((s) => (s.id === editing.id ? { ...s, ...data } : s))
      );
      toast('Service updated', 'success');
    } else {
      setServices((prev) => [
        ...prev,
        { id: uid('svc'), ...data, active: true },
      ]);
      toast('Service added to your profile', 'success');
    }
    setFormOpen(false);
    setEditing(null);
  };

  const toggleActive = (svc: UserService) => {
    setServices((prev) =>
      prev.map((s) => (s.id === svc.id ? { ...s, active: !s.active } : s))
    );
    toast(svc.active ? `"${svc.title}" paused` : `"${svc.title}" is now active`, 'info');
  };

  const confirmDelete = () => {
    if (!deleting) return;
    setServices((prev) => prev.filter((s) => s.id !== deleting.id));
    toast(`"${deleting.title}" deleted`, 'success');
    setDeleting(null);
  };

  return (
    <DashboardShell width="max-w-4xl">
      <PageHeader
        title="Manage Services"
        subtitle="Services you offer to the community through your profile"
        backHref="/my-profile"
        backLabel="Back to My Profile"
        eyebrow="My Profile"
        actions={
          <Button size="sm" onClick={openAdd}>
            <Plus className="h-4 w-4" aria-hidden />
            Add Service
          </Button>
        }
      />

      {!hydrated ? (
        <div className="space-y-4">
          {Array.from({ length: 2 }).map((_, i) => (
            <Skeleton key={i} className="h-36 w-full" />
          ))}
        </div>
      ) : services.length === 0 ? (
        <EmptyState
          icon={<Wrench className="h-8 w-8" aria-hidden />}
          title="No Services Yet"
          description="Add the services you offer — Quran classes, nikah khutbah, counselling and more — so community members can find you."
          action={
            <Button onClick={openAdd}>
              <Plus className="h-4 w-4" aria-hidden />
              Add Your First Service
            </Button>
          }
        />
      ) : (
        <motion.ul
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="space-y-4"
        >
          <AnimatePresence mode="popLayout">
            {services.map((svc) => (
              <motion.li
                key={svc.id}
                layout
                variants={fadeInUp}
                exit={{ opacity: 0, scale: 0.96 }}
                className="rounded-2xl border border-card-border bg-white p-5 shadow-card transition-shadow duration-300 hover:shadow-card-hover sm:p-6"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-heading text-base font-bold text-heading">{svc.title}</h3>
                      <Badge variant={svc.active ? 'success' : 'neutral'}>
                        {svc.active ? 'Active' : 'Paused'}
                      </Badge>
                    </div>
                    <p className="mt-1.5 text-sm leading-relaxed text-body">{svc.description}</p>
                    <p className="mt-2 flex items-center gap-1 text-sm font-semibold text-gold-dark">
                      <IndianRupee className="h-3.5 w-3.5" aria-hidden />
                      {svc.priceRange.replace(/^₹\s?/, '')}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    {/* Active toggle */}
                    <button
                      role="switch"
                      aria-checked={svc.active}
                      aria-label={`${svc.active ? 'Pause' : 'Activate'} ${svc.title}`}
                      onClick={() => toggleActive(svc)}
                      className={`relative h-7 w-12 rounded-full transition-colors ${
                        svc.active ? 'bg-primary' : 'bg-card-border'
                      }`}
                    >
                      <motion.span
                        layout
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                        className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow ${
                          svc.active ? 'left-6' : 'left-1'
                        }`}
                      />
                    </button>
                    <Button size="sm" variant="ghost" onClick={() => openEdit(svc)} aria-label={`Edit ${svc.title}`}>
                      <Pencil className="h-4 w-4" aria-hidden />
                      Edit
                    </Button>
                    <button
                      onClick={() => setDeleting(svc)}
                      aria-label={`Delete ${svc.title}`}
                      className="flex h-11 w-11 items-center justify-center rounded-full text-danger transition-colors hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" aria-hidden />
                    </button>
                  </div>
                </div>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      )}

      <ServiceFormModal
        open={formOpen}
        initial={editing}
        onClose={() => {
          setFormOpen(false);
          setEditing(null);
        }}
        onSave={handleSave}
      />

      <ConfirmDialog
        open={!!deleting}
        title="Delete this service?"
        message={`"${deleting?.title}" will be permanently removed from your profile. This cannot be undone.`}
        onConfirm={confirmDelete}
        onCancel={() => setDeleting(null)}
      />
    </DashboardShell>
  );
}

export default function ManageServicesPage() {
  return (
    <ProtectedRoute>
      <ManageServicesContent />
    </ProtectedRoute>
  );
}
