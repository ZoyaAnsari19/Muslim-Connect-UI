'use client';

// ─── Confirm dialog for destructive actions (Part 2) ─────────────────────────

import { AlertTriangle } from 'lucide-react';
import Modal from './Modal';
import Button from './Button';

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  /** 'danger' (default) for deletes, 'primary' for non-destructive confirms */
  tone?: 'danger' | 'primary';
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = 'Delete',
  tone = 'danger',
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  return (
    <Modal open={open} onClose={onCancel} maxWidth="max-w-md" showClose={false} label={title}>
      <div className="p-6 sm:p-8">
        <div
          className={`mx-auto flex h-14 w-14 items-center justify-center rounded-2xl ${
            tone === 'danger' ? 'bg-red-50 text-danger' : 'bg-primary-50 text-primary'
          }`}
        >
          <AlertTriangle className="h-7 w-7" aria-hidden />
        </div>
        <h2 className="mt-4 text-center font-heading text-xl font-bold text-heading">{title}</h2>
        <p className="mt-2 text-center text-sm leading-relaxed text-body">{message}</p>
        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row">
          <Button variant="ghost" className="flex-1" onClick={onCancel}>
            Cancel
          </Button>
          <Button
            variant={tone === 'danger' ? 'danger' : 'primary'}
            className="flex-1"
            onClick={onConfirm}
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
