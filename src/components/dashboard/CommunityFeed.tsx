'use client';

// ─── Dashboard community feed — like / comment / share / open detail modal ───

import { useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Heart,
  MessageCircle,
  Share2,
  Megaphone,
  CalendarDays,
  UserRound,
  ExternalLink,
  Send,
} from 'lucide-react';
import Badge from '@/components/ui/Badge';
import DetailModal from '@/components/home/DetailModal';
import { useToast } from '@/context/ToastContext';
import { useFeedLikes } from '@/lib/store';
import { FEED_POSTS, FEATURED_ITEMS } from '@/lib/mock-data';
import type { FeedPost, FeedComment, FeaturedItem } from '@/lib/types';
import { staggerContainer, fadeInUp } from '@/components/PageTransition';

const TYPE_META: Record<FeedPost['type'], { label: string; icon: typeof Megaphone; variant: 'emerald' | 'gold' | 'blue' }> = {
  announcement: { label: 'Announcement', icon: Megaphone, variant: 'emerald' },
  professional: { label: 'Professional', icon: UserRound, variant: 'gold' },
  event: { label: 'Event', icon: CalendarDays, variant: 'blue' },
};

export function FeedCard({ post }: { post: FeedPost }) {
  const { toast } = useToast();
  const { items: likedIds, setItems: setLikedIds } = useFeedLikes();
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [draft, setDraft] = useState('');
  const [localComments, setLocalComments] = useState<FeedComment[]>(post.comments);
  const [detailItem, setDetailItem] = useState<FeaturedItem | null>(null);

  const liked = likedIds.includes(post.id);
  const likeCount = post.likes + (liked ? 1 : 0);
  const meta = TYPE_META[post.type];

  const linked = post.linkedListingId
    ? FEATURED_ITEMS.find((f) => f.id === post.linkedListingId) ?? null
    : null;

  const toggleLike = () => {
    setLikedIds((prev) => (liked ? prev.filter((id) => id !== post.id) : [...prev, post.id]));
  };

  const addComment = () => {
    const text = draft.trim();
    if (!text) return;
    setLocalComments((prev) => [
      ...prev,
      { id: `local-${Date.now()}`, author: 'You', text, timeAgo: 'Just now' },
    ]);
    setDraft('');
    toast('Comment posted', 'success');
  };

  return (
    <motion.article
      variants={fadeInUp}
      className="overflow-hidden rounded-2xl border border-card-border bg-white shadow-card transition-shadow duration-300 hover:shadow-card-hover"
    >
      {/* Header */}
      <header className="flex items-start justify-between gap-3 p-5 pb-0">
        <button
          onClick={() => linked && setDetailItem(linked)}
          disabled={!linked}
          className={`flex min-w-0 items-center gap-3 text-left ${linked ? 'group' : 'cursor-default'}`}
          aria-label={linked ? `View profile of ${post.authorName}` : undefined}
        >
          {post.avatar ? (
            <Image
              src={post.avatar}
              alt={`Avatar of ${post.authorName}`}
              width={44}
              height={44}
              className="h-11 w-11 shrink-0 rounded-full object-cover"
            />
          ) : (
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-gradient font-heading text-base font-bold text-white">
              {post.authorName.charAt(0)}
            </span>
          )}
          <span className="min-w-0">
            <span className="flex items-center gap-1.5 truncate text-sm font-semibold text-heading group-hover:text-primary">
              {post.authorName}
              {linked && <ExternalLink className="h-3.5 w-3.5 shrink-0 opacity-0 transition-opacity group-hover:opacity-100" aria-hidden />}
            </span>
            <span className="block truncate text-xs text-body">{post.authorMeta} · {post.timeAgo}</span>
          </span>
        </button>
        <Badge variant={meta.variant} className="shrink-0">
          <meta.icon className="h-3 w-3" aria-hidden />
          {meta.label}
        </Badge>
      </header>

      {/* Content */}
      <p className="px-5 pt-4 text-sm leading-relaxed text-body">{post.content}</p>

      {post.image && (
        <div className="relative mx-5 mt-4 h-52 overflow-hidden rounded-xl sm:h-60">
          <Image
            src={post.image}
            alt={`Post by ${post.authorName}`}
            fill
            sizes="(max-width: 768px) 100vw, 640px"
            className="object-cover"
          />
        </div>
      )}

      {/* Actions */}
      <div className="mt-4 flex items-center gap-1 border-t border-card-border px-3 py-2">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={toggleLike}
          aria-pressed={liked}
          aria-label={liked ? 'Unlike post' : 'Like post'}
          className={`flex min-h-[44px] items-center gap-2 rounded-full px-4 text-sm font-medium transition-colors ${
            liked ? 'text-danger' : 'text-body hover:bg-red-50 hover:text-danger'
          }`}
        >
          <motion.span
            key={liked ? 'liked' : 'unliked'}
            initial={{ scale: 0.6 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 500, damping: 18 }}
          >
            <Heart className={`h-4.5 w-4.5 h-[18px] w-[18px] ${liked ? 'fill-danger' : ''}`} aria-hidden />
          </motion.span>
          {likeCount}
        </motion.button>
        <button
          onClick={() => setCommentsOpen((v) => !v)}
          aria-expanded={commentsOpen}
          className="flex min-h-[44px] items-center gap-2 rounded-full px-4 text-sm font-medium text-body transition-colors hover:bg-primary-50 hover:text-primary"
        >
          <MessageCircle className="h-[18px] w-[18px]" aria-hidden />
          {localComments.length}
        </button>
        <button
          onClick={() => {
            navigator.clipboard?.writeText(`${window.location.origin}/#feed-${post.id}`).catch(() => {});
            toast('Post link copied to clipboard', 'success');
          }}
          className="flex min-h-[44px] items-center gap-2 rounded-full px-4 text-sm font-medium text-body transition-colors hover:bg-primary-50 hover:text-primary"
        >
          <Share2 className="h-[18px] w-[18px]" aria-hidden />
          Share
        </button>
      </div>

      {/* Comments */}
      <AnimatePresence initial={false}>
        {commentsOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="overflow-hidden border-t border-card-border bg-ivory/50"
          >
            <div className="space-y-3 p-5">
              {localComments.length === 0 && (
                <p className="text-xs text-body">No comments yet — be the first to comment.</p>
              )}
              {localComments.map((c) => (
                <div key={c.id} className="flex gap-2.5">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-50 text-xs font-bold text-primary">
                    {c.author.charAt(0)}
                  </span>
                  <div className="min-w-0 rounded-xl bg-white px-3.5 py-2.5 shadow-sm">
                    <p className="text-xs font-semibold text-heading">
                      {c.author} <span className="ml-1 font-normal text-body/60">{c.timeAgo}</span>
                    </p>
                    <p className="mt-0.5 text-sm text-body">{c.text}</p>
                  </div>
                </div>
              ))}
              <div className="flex gap-2 pt-1">
                <input
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addComment()}
                  placeholder="Write a comment…"
                  aria-label="Write a comment"
                  className="min-h-[44px] w-full rounded-full border border-card-border bg-white px-4 text-sm text-heading placeholder:text-body/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
                <motion.button
                  whileTap={{ scale: 0.92 }}
                  onClick={addComment}
                  aria-label="Post comment"
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-white transition-colors hover:bg-primary-hover"
                >
                  <Send className="h-4 w-4" aria-hidden />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <DetailModal item={detailItem} onClose={() => setDetailItem(null)} />
    </motion.article>
  );
}

export default function CommunityFeed() {
  return (
    <section aria-labelledby="feed-heading">
      <h2 id="feed-heading" className="font-heading text-lg font-bold text-heading sm:text-xl">
        Community Feed
      </h2>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-40px' }}
        className="mt-4 space-y-5"
      >
        {FEED_POSTS.map((post) => (
          <FeedCard key={post.id} post={post} />
        ))}
      </motion.div>
    </section>
  );
}
