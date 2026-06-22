'use client';

// ─── /my-profile/manage-reviews — received reviews with replies (Part 2) ─────

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Star, Flag, Reply, Send, MessageSquareText } from 'lucide-react';
import ProtectedRoute from '@/components/ProtectedRoute';
import { DashboardShell, PageHeader } from '@/components/dashboard/DashboardShell';
import StarRating from '@/components/ui/StarRating';
import Button from '@/components/ui/Button';
import EmptyState from '@/components/ui/EmptyState';
import { Skeleton } from '@/components/ui/Skeleton';
import { useToast } from '@/context/ToastContext';
import { useReceivedReviews } from '@/lib/store';
import type { ReceivedReview } from '@/lib/types';
import { staggerContainer, fadeInUp } from '@/components/PageTransition';

function ReviewCard({
  review,
  onReply,
  onReport,
}: {
  review: ReceivedReview;
  onReply: (id: string, text: string) => void;
  onReport: (review: ReceivedReview) => void;
}) {
  const [replyOpen, setReplyOpen] = useState(false);
  const [draft, setDraft] = useState('');

  const submitReply = () => {
    const text = draft.trim();
    if (!text) return;
    onReply(review.id, text);
    setDraft('');
    setReplyOpen(false);
  };

  return (
    <motion.li
      variants={fadeInUp}
      className="rounded-2xl border border-card-border bg-white p-5 shadow-card transition-shadow duration-300 hover:shadow-card-hover sm:p-6"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-50 font-heading text-base font-bold text-primary">
            {review.author.charAt(0)}
          </span>
          <div>
            <p className="text-sm font-semibold text-heading">{review.author}</p>
            <div className="mt-0.5 flex items-center gap-2">
              <StarRating rating={review.rating} showValue={false} />
              <time className="text-xs text-body/70" dateTime={review.date}>
                {new Date(review.date).toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </time>
            </div>
          </div>
        </div>
        <button
          onClick={() => onReport(review)}
          className="flex min-h-[44px] items-center gap-1.5 rounded-full px-3 text-xs font-medium text-body transition-colors hover:bg-red-50 hover:text-danger"
          aria-label={`Report review by ${review.author}`}
        >
          <Flag className="h-3.5 w-3.5" aria-hidden />
          Report
        </button>
      </div>

      <p className="mt-3.5 text-sm leading-relaxed text-body">{review.comment}</p>

      {/* Existing reply */}
      {review.reply && (
        <div className="mt-4 rounded-xl border-l-4 border-primary bg-primary-50/60 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">Your Reply</p>
          <p className="mt-1 text-sm leading-relaxed text-body">{review.reply}</p>
        </div>
      )}

      {/* Reply toggle + textarea */}
      {!review.reply && (
        <>
          <button
            onClick={() => setReplyOpen((v) => !v)}
            aria-expanded={replyOpen}
            className="mt-3.5 flex min-h-[44px] items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-primary-hover"
          >
            <Reply className="h-4 w-4" aria-hidden />
            {replyOpen ? 'Cancel Reply' : 'Reply to Review'}
          </button>
          <AnimatePresence initial={false}>
            {replyOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.28, ease: 'easeOut' }}
                className="overflow-hidden"
              >
                <div className="flex gap-2 pt-3">
                  <textarea
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    placeholder="Write a thoughtful reply…"
                    aria-label={`Reply to ${review.author}`}
                    rows={2}
                    className="min-h-[64px] w-full resize-y rounded-xl border border-card-border bg-white px-4 py-2.5 text-sm text-heading placeholder:text-body/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                  <Button
                    size="sm"
                    onClick={submitReply}
                    disabled={!draft.trim()}
                    aria-label="Send reply"
                    className="self-end"
                  >
                    <Send className="h-4 w-4" aria-hidden />
                    Send
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </motion.li>
  );
}

function ManageReviewsContent() {
  const { items: reviews, setItems: setReviews, hydrated } = useReceivedReviews();
  const { toast } = useToast();

  const average =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0;

  const handleReply = (id: string, text: string) => {
    setReviews((prev) => prev.map((r) => (r.id === id ? { ...r, reply: text } : r)));
    toast('Reply posted — the reviewer will be notified', 'success');
  };

  const handleReport = (review: ReceivedReview) => {
    toast(`Review by ${review.author} reported to moderators (demo)`, 'info');
  };

  return (
    <DashboardShell width="max-w-4xl">
      <PageHeader
        title="Manage Reviews"
        subtitle="Reviews community members have left on your profile"
        backHref="/my-profile"
        backLabel="Back to My Profile"
        eyebrow="My Profile"
        actions={
          hydrated && reviews.length > 0 ? (
            <div className="flex items-center gap-2 rounded-2xl border border-card-border bg-white px-4 py-2.5 shadow-card">
              <Star className="h-5 w-5 fill-gold text-gold" aria-hidden />
              <span className="font-heading text-lg font-bold text-heading">
                {average.toFixed(1)}
              </span>
              <span className="text-xs text-body">({reviews.length} reviews)</span>
            </div>
          ) : undefined
        }
      />

      {!hydrated ? (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-40 w-full" />
          ))}
        </div>
      ) : reviews.length === 0 ? (
        <EmptyState
          icon={<MessageSquareText className="h-8 w-8" aria-hidden />}
          title="No Reviews Yet"
          description="When community members review your services, they'll appear here for you to read and reply to."
        />
      ) : (
        <motion.ul variants={staggerContainer} initial="hidden" animate="show" className="space-y-4">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} onReply={handleReply} onReport={handleReport} />
          ))}
        </motion.ul>
      )}
    </DashboardShell>
  );
}

export default function ManageReviewsPage() {
  return (
    <ProtectedRoute>
      <ManageReviewsContent />
    </ProtectedRoute>
  );
}
