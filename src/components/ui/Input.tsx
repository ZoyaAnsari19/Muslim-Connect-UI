'use client';

import { forwardRef, type InputHTMLAttributes, type TextareaHTMLAttributes } from 'react';
import { AlertCircle } from 'lucide-react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

const baseClasses =
  'w-full min-h-[44px] rounded-xl border bg-white px-4 py-2.5 text-sm text-heading placeholder:text-body/50 transition-colors focus:outline-none focus:ring-2';

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, id, className = '', ...props }, ref) => (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-heading">
          {label}
          {props.required && <span className="ml-0.5 text-danger">*</span>}
        </label>
      )}
      <input
        ref={ref}
        id={id}
        aria-invalid={!!error}
        className={`${baseClasses} ${
          error
            ? 'border-danger focus:ring-danger/30'
            : 'border-card-border focus:border-primary focus:ring-primary/20'
        } ${className}`}
        {...props}
      />
      {error ? (
        <p className="mt-1.5 flex items-center gap-1 text-xs font-medium text-danger" role="alert">
          <AlertCircle className="h-3.5 w-3.5" aria-hidden /> {error}
        </p>
      ) : hint ? (
        <p className="mt-1.5 text-xs text-body">{hint}</p>
      ) : null}
    </div>
  )
);
Input.displayName = 'Input';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, id, className = '', ...props }, ref) => (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-heading">
          {label}
          {props.required && <span className="ml-0.5 text-danger">*</span>}
        </label>
      )}
      <textarea
        ref={ref}
        id={id}
        aria-invalid={!!error}
        className={`${baseClasses} min-h-[120px] resize-y ${
          error
            ? 'border-danger focus:ring-danger/30'
            : 'border-card-border focus:border-primary focus:ring-primary/20'
        } ${className}`}
        {...props}
      />
      {error && (
        <p className="mt-1.5 flex items-center gap-1 text-xs font-medium text-danger" role="alert">
          <AlertCircle className="h-3.5 w-3.5" aria-hidden /> {error}
        </p>
      )}
    </div>
  )
);
Textarea.displayName = 'Textarea';

export default Input;
