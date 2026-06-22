'use client';

import { useState } from 'react';
import { Copy, Check, Share2 } from 'lucide-react';
import { useToast } from '@/context/ToastContext';

interface ShareActionsProps {
  /** Full text to copy/share */
  text: string;
  /** Title used for native share */
  title: string;
}

export default function ShareActions({ text, title }: ShareActionsProps) {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast('Copied to clipboard');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast('Could not copy — please try again', 'error');
    }
  };

  const share = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, text });
      } catch {
        /* user cancelled */
      }
    } else {
      await copy();
      toast('Sharing not supported — copied instead', 'info');
    }
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={copy}
        aria-label={`Copy ${title}`}
        className="flex h-11 w-11 items-center justify-center rounded-full border border-card-border bg-white text-body transition-all hover:scale-105 hover:border-primary hover:text-primary"
      >
        {copied ? <Check className="h-4 w-4 text-success" aria-hidden /> : <Copy className="h-4 w-4" aria-hidden />}
      </button>
      <button
        onClick={share}
        aria-label={`Share ${title}`}
        className="flex h-11 w-11 items-center justify-center rounded-full border border-card-border bg-white text-body transition-all hover:scale-105 hover:border-primary hover:text-primary"
      >
        <Share2 className="h-4 w-4" aria-hidden />
      </button>
    </div>
  );
}
