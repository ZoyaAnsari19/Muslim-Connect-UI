'use client';

// ─── /feed — full community app shell (left nav + feed + right rail) ─────────

import { useMemo, useState, type ComponentType } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Newspaper,
  Landmark,
  BookOpen,
  Users,
  Briefcase,
  HandCoins,
  Clock,
  MessageSquare,
  Bookmark,
  Search,
  UserCircle2,
  Settings,
  LogOut,
  PenLine,
  Image as ImageIcon,
  BarChart3,
  HelpCircle,
  MapPin,
  Compass,
  Calculator,
  BadgeCheck,
  Sparkles,
  GraduationCap,
  FolderKanban,
  ChevronRight,
  X,
  Send,
  Menu,
} from 'lucide-react';
import Logo from '@/components/Logo';
import ProtectedRoute from '@/components/ProtectedRoute';
import { FeedCard } from '@/components/dashboard/CommunityFeed';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { FEED_POSTS, PRAYER_TIMES_TODAY } from '@/lib/mock-data';
import { staggerContainer } from '@/components/PageTransition';
import type { FeedPost } from '@/lib/types';

type Tab = 'foryou' | 'following' | 'trending';

interface NavItem {
  label: string;
  icon: ComponentType<{ className?: string }>;
  href?: string;
  soon?: boolean;
}

function FeedShell() {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const router = useRouter();

  const [posts, setPosts] = useState<FeedPost[]>(FEED_POSTS);
  const [tab, setTab] = useState<Tab>('foryou');
  const [draft, setDraft] = useState('');
  const [bannerOpen, setBannerOpen] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const initial = (user?.fullName?.charAt(0) ?? 'M').toUpperCase();
  const firstName = user?.fullName?.split(' ')[0] ?? 'Friend';
  const locationLabel = [user?.area, user?.city].filter(Boolean).join(', ') || 'Location not set';
  const roleLabel = user?.professions?.length ? user.professions.join(' · ') : 'Community Member';

  const soon = (label: string) => toast(`${label} — coming soon, InshaAllah`, 'info');

  const handleLogout = () => {
    logout();
    toast('You have been logged out. See you soon, InshaAllah!', 'success');
    router.push('/');
  };

  const post = () => {
    const text = draft.trim();
    if (!text) return;
    const newPost: FeedPost = {
      id: `local-${Date.now()}`,
      type: 'announcement',
      authorName: user?.fullName || 'You',
      authorMeta: locationLabel === 'Location not set' ? 'You' : locationLabel,
      content: text,
      likes: 0,
      comments: [],
      timeAgo: 'Just now',
    };
    setPosts((p) => [newPost, ...p]);
    setDraft('');
    toast('Posted to the community', 'success');
  };

  const visiblePosts = useMemo(() => {
    if (tab === 'following') return posts.filter((p) => p.linkedListingId);
    if (tab === 'trending') return [...posts].sort((a, b) => b.likes - a.likes);
    return posts;
  }, [posts, tab]);

  const NAV_PRIMARY: NavItem[] = [
    { label: 'Feed', icon: Newspaper, href: '/feed' },
    { label: 'Masjids & More', icon: Landmark, href: '/dashboard' },
    { label: 'Knowledge', icon: BookOpen, href: '/daily-dua' },
    { label: 'Professionals', icon: Users, href: '/employment-network' },
    { label: 'Jobs (MCEN)', icon: Briefcase, href: '/employment' },
    { label: 'Donations', icon: HandCoins, href: '/donate' },
    { label: 'Prayer Times', icon: Clock, soon: true },
    { label: 'Messages', icon: MessageSquare, soon: true },
    { label: 'Saved', icon: Bookmark, soon: true },
    { label: 'Search', icon: Search, soon: true },
    { label: 'Profile', icon: UserCircle2, href: '/my-profile' },
    { label: 'Settings', icon: Settings, soon: true },
  ];

  const QUICK_ACTIONS: NavItem[] = [
    { label: 'Nearby Masjid', icon: MapPin, soon: true },
    { label: 'Prayer Times', icon: Clock, soon: true },
    { label: 'Qibla', icon: Compass, soon: true },
    { label: 'Zakat Calc', icon: Calculator, soon: true },
    { label: 'Donate', icon: HandCoins, href: '/donate' },
    { label: 'Ask a Mufti', icon: HelpCircle, soon: true },
  ];

  const INSTITUTION_LINKS = [
    { label: 'Register Masjid', icon: Landmark, href: '/create-masjid-profile' },
    { label: 'Register Madrasa', icon: GraduationCap, href: '/create-madrasa-profile' },
    { label: 'Manage Profiles', icon: FolderKanban, href: '/manage-profiles' },
  ];

  const navActive = (item: NavItem) => item.href === '/feed';

  const renderSidebarBody = (onNavigate?: () => void) => (
    <>
      <div className="flex items-center justify-between px-5 py-5">
        <Logo />
        {onNavigate && (
          <button
            onClick={onNavigate}
            aria-label="Close menu"
            className="flex h-9 w-9 items-center justify-center rounded-full text-body transition-colors hover:bg-ivory lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>
      <div className="px-4">
        <button
          onClick={() => {
            onNavigate?.();
            document.getElementById('feed-composer')?.focus();
          }}
          className="flex w-full flex-col items-center gap-0.5 rounded-2xl bg-emerald-gradient px-4 py-3 text-center text-white shadow-card transition-transform hover:scale-[1.02]"
        >
          <span className="flex items-center gap-2 text-sm font-semibold">
            <PenLine className="h-4 w-4" aria-hidden />
            Share with the Ummah
          </span>
          <span className="text-[11px] text-white/80">Apni baat share karein</span>
        </button>
      </div>
      <nav className="mt-4 flex-1 space-y-1 overflow-y-auto px-3 pb-4">
        {NAV_PRIMARY.map((item) => {
          const active = navActive(item);
          const className = `flex min-h-[44px] items-center gap-3 rounded-xl px-3 text-sm font-medium transition-colors ${
            active ? 'bg-primary-50 text-primary' : 'text-heading hover:bg-ivory'
          }`;
          return item.href ? (
            <Link key={item.label} href={item.href} className={className} onClick={onNavigate}>
              <item.icon className="h-5 w-5 text-primary" />
              {item.label}
            </Link>
          ) : (
            <button
              key={item.label}
              onClick={() => {
                onNavigate?.();
                soon(item.label);
              }}
              className={`w-full ${className}`}
            >
              <item.icon className="h-5 w-5 text-primary" />
              {item.label}
            </button>
          );
        })}
      </nav>
      <div className="border-t border-card-border p-3">
        <button
          onClick={() => {
            onNavigate?.();
            handleLogout();
          }}
          className="flex min-h-[44px] w-full items-center gap-3 rounded-xl px-3 text-sm font-medium text-danger transition-colors hover:bg-red-50"
        >
          <LogOut className="h-5 w-5" />
          Logout
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-ivory">
      {/* ── Desktop sidebar — fixed to the left edge (margin 0) ── */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-card-border bg-white lg:flex">
        {renderSidebarBody()}
      </aside>

      {/* ── Mobile drawer ── */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 z-40 bg-dark-emerald/40 backdrop-blur-sm lg:hidden"
              aria-hidden
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 32 }}
              className="fixed inset-y-0 left-0 z-50 flex w-64 max-w-[80vw] flex-col border-r border-card-border bg-white lg:hidden"
            >
              {renderSidebarBody(() => setSidebarOpen(false))}
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* ── Main column — offset by the fixed sidebars (left lg+, right xl+) ── */}
      <div className="flex min-h-screen flex-col lg:ml-64 xl:mr-80">
        {/* Top quick-action bar */}
        <div className="sticky top-0 z-20 border-b border-card-border bg-white/85 backdrop-blur-xl">
          <div className="flex items-center gap-3 px-4 py-3 sm:px-6">
            <button
              onClick={() => setSidebarOpen(true)}
              aria-label="Open menu"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-heading transition-colors hover:bg-ivory lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div className="lg:hidden">
              <Logo />
            </div>
            <div className="scrollbar-none flex flex-1 items-center gap-2 overflow-x-auto">
                {QUICK_ACTIONS.map((action) => {
                  const className =
                    'flex shrink-0 items-center gap-1.5 rounded-full border border-card-border bg-white px-3.5 py-2 text-xs font-medium text-heading shadow-sm transition-colors hover:border-primary hover:text-primary';
                  return action.href ? (
                    <Link key={action.label} href={action.href} className={className}>
                      <action.icon className="h-4 w-4 text-primary" />
                      {action.label}
                    </Link>
                  ) : (
                    <button key={action.label} onClick={() => soon(action.label)} className={className}>
                      <action.icon className="h-4 w-4 text-primary" />
                      {action.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Inner content: center feed (right rail is fixed to the edge) */}
          <div className="mx-auto w-full max-w-2xl px-4 py-6 sm:px-6">
            {/* Center feed */}
            <main className="min-w-0">
              {/* Tabs */}
              <div className="flex items-center gap-6 border-b border-card-border">
                {([
                  { id: 'foryou', label: 'For You' },
                  { id: 'following', label: 'Following' },
                  { id: 'trending', label: 'Trending' },
                ] as { id: Tab; label: string }[]).map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTab(t.id)}
                    className={`relative -mb-px min-h-[44px] border-b-2 px-1 text-sm font-semibold transition-colors ${
                      tab === t.id
                        ? 'border-primary text-primary'
                        : 'border-transparent text-body hover:text-heading'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              {/* Composer */}
              <div className="mt-5 rounded-2xl border border-card-border bg-white p-4 shadow-card">
                <div className="flex items-start gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-gradient text-sm font-bold text-white">
                    {initial}
                  </span>
                  <input
                    id="feed-composer"
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && post()}
                    placeholder="Share something with the community… Ummah ke saath kuch share karein"
                    aria-label="Share something with the community"
                    className="min-h-[44px] w-full rounded-xl border border-card-border bg-ivory/60 px-4 text-sm text-heading placeholder:text-body/50 focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div className="mt-3 flex items-center gap-1 border-t border-card-border pt-3">
                  <button
                    onClick={post}
                    className="flex min-h-[40px] items-center gap-2 rounded-full px-3 text-sm font-medium text-body transition-colors hover:bg-primary-50 hover:text-primary"
                  >
                    <ImageIcon className="h-4 w-4 text-primary" />
                    Post
                  </button>
                  <button
                    onClick={() => soon('Poll')}
                    className="flex min-h-[40px] items-center gap-2 rounded-full px-3 text-sm font-medium text-body transition-colors hover:bg-primary-50 hover:text-primary"
                  >
                    <BarChart3 className="h-4 w-4 text-primary" />
                    Poll
                  </button>
                  <button
                    onClick={() => soon('Ask a Question')}
                    className="flex min-h-[40px] items-center gap-2 rounded-full px-3 text-sm font-medium text-body transition-colors hover:bg-primary-50 hover:text-primary"
                  >
                    <HelpCircle className="h-4 w-4 text-primary" />
                    Ask a Question
                  </button>
                  <button
                    onClick={post}
                    disabled={!draft.trim()}
                    className="ml-auto flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white transition-colors hover:bg-primary-hover disabled:opacity-50"
                    aria-label="Share post"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Next prayer banner */}
              <AnimatePresence>
                {bannerOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, height: 0, marginTop: 0 }}
                    className="mt-5 flex items-center gap-4 overflow-hidden rounded-2xl border border-gold/30 bg-gradient-to-r from-gold-soft/70 to-white p-4"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-gradient text-white">
                      <Clock className="h-5 w-5" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-[11px] font-semibold uppercase tracking-wide text-gold-dark">
                        Next Prayer
                      </p>
                      <p className="font-heading text-lg font-bold text-heading">
                        {PRAYER_TIMES_TODAY[0].name} · {PRAYER_TIMES_TODAY[0].time}
                      </p>
                      <p className="text-xs text-body">in 5h 59m (tomorrow)</p>
                    </div>
                    <button
                      onClick={() => setBannerOpen(false)}
                      aria-label="Dismiss next prayer reminder"
                      className="flex h-8 w-8 items-center justify-center rounded-full text-body transition-colors hover:bg-black/5"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Posts */}
              <motion.div
                key={tab}
                variants={staggerContainer}
                initial="hidden"
                animate="show"
                className="mt-5 space-y-5"
              >
                {visiblePosts.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-card-border bg-white/60 p-10 text-center">
                    <p className="text-sm text-body">No posts to show in this tab yet.</p>
                  </div>
                ) : (
                  visiblePosts.map((p) => <FeedCard key={p.id} post={p} />)
                )}
              </motion.div>
            </main>

            {/* ── Right rail — fixed to the right edge (margin 0) ── */}
            <aside className="fixed inset-y-0 right-0 z-30 hidden w-80 flex-col overflow-y-auto border-l border-card-border bg-ivory xl:flex">
              <div className="space-y-5 px-4 py-6">
                {/* Profile card */}
                <section className="overflow-hidden rounded-2xl border border-card-border bg-white shadow-card">
                  <div className="h-16 bg-emerald-gradient" aria-hidden />
                  <div className="px-5 pb-5">
                    <span className="relative z-10 -mt-8 flex h-16 w-16 items-center justify-center rounded-2xl border-4 border-white bg-gold-gradient font-heading text-2xl font-bold text-dark-emerald shadow-card">
                      {initial}
                    </span>
                    <div className="mt-3 flex items-center gap-1.5">
                      <h3 className="font-heading text-lg font-bold text-heading">
                        {user?.fullName ?? 'Member'}
                      </h3>
                      <BadgeCheck className="h-4 w-4 text-gold-dark" aria-hidden />
                    </div>
                    <p className="mt-0.5 flex items-center gap-1 text-xs text-body">
                      <MapPin className="h-3.5 w-3.5 text-gold-dark" aria-hidden />
                      {locationLabel}
                    </p>
                    <span className="mt-2.5 inline-flex rounded-full bg-gold-soft px-3 py-1 text-[11px] font-semibold text-gold-dark">
                      {roleLabel}
                    </span>

                    <div className="mt-4 grid grid-cols-3 gap-2 border-t border-card-border pt-4 text-center">
                      {[
                        { label: 'Posts', value: posts.filter((p) => p.id.startsWith('local-')).length },
                        { label: 'Following', value: 0 },
                        { label: 'Masjids', value: 0 },
                      ].map((s) => (
                        <div key={s.label} className="rounded-xl bg-ivory/70 py-2">
                          <p className="font-heading text-base font-bold text-heading">{s.value}</p>
                          <p className="text-[10px] font-medium uppercase tracking-wide text-body">
                            {s.label}
                          </p>
                        </div>
                      ))}
                    </div>

                    <Link
                      href="/my-profile"
                      className="mt-4 flex min-h-[40px] items-center justify-center gap-2 rounded-full border border-card-border text-sm font-medium text-heading transition-colors hover:border-primary hover:text-primary"
                    >
                      <PenLine className="h-4 w-4" />
                      Edit Profile
                    </Link>
                  </div>
                </section>

                {/* Manage institutions */}
                <section className="rounded-2xl border border-card-border bg-white p-5 shadow-card">
                  <h3 className="flex items-center gap-2 font-heading text-sm font-bold text-heading">
                    <Sparkles className="h-4 w-4 text-gold-dark" />
                    Manage your Institutions
                  </h3>
                  <p className="mt-1 text-xs text-body">
                    Register &amp; manage your community institutions.
                  </p>
                  <div className="mt-3 space-y-1.5">
                    {INSTITUTION_LINKS.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        className="group flex min-h-[44px] items-center gap-3 rounded-xl px-3 text-sm font-medium text-heading transition-colors hover:bg-primary-50"
                      >
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-50 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                          <item.icon className="h-4 w-4" />
                        </span>
                        {item.label}
                        <ChevronRight className="ml-auto h-4 w-4 text-body transition-transform group-hover:translate-x-0.5" />
                      </Link>
                    ))}
                  </div>
                </section>

                {/* Prayer times */}
                <section className="rounded-2xl border border-card-border bg-white p-5 shadow-card">
                  <div className="flex items-center justify-between">
                    <h3 className="flex items-center gap-2 font-heading text-sm font-bold text-heading">
                      <Clock className="h-4 w-4 text-primary" />
                      Today&apos;s Prayers
                    </h3>
                    <button
                      onClick={() => soon('Full timetable')}
                      className="text-xs font-medium text-primary hover:underline"
                    >
                      Full timetable
                    </button>
                  </div>
                  <p className="mt-0.5 text-xs text-body">{user?.city || 'Your city'}</p>
                  <ul className="mt-3 space-y-1.5">
                    {PRAYER_TIMES_TODAY.map((p, i) => (
                      <li
                        key={p.name}
                        className={`flex items-center justify-between rounded-xl px-3 py-2 text-sm ${
                          i === 0 ? 'bg-primary text-white' : 'text-heading'
                        }`}
                      >
                        <span className="font-medium">
                          {p.name}
                          {i === 0 && (
                            <span className="ml-2 text-[10px] font-bold uppercase tracking-wide text-gold-light">
                              Next
                            </span>
                          )}
                        </span>
                        <span className={i === 0 ? 'text-gold-light' : 'text-body'}>{p.time}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                <p className="px-2 text-center text-[11px] text-body/70">
                  Assalamu Alaikum, {firstName} — may your day be blessed.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </div>
  );
}

export default function FeedPage() {
  return (
    <ProtectedRoute>
      <FeedShell />
    </ProtectedRoute>
  );
}
