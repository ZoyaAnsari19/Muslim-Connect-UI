'use client';

// ─── Muslim Connect — Client Data Store (Part 2) ──────────────────────────────
// localStorage-backed CRUD stores with cross-component sync via custom events.
// All authenticated modules (institutions, events, campaigns, services, jobs)
// persist here so refreshes never lose data.

import { useCallback, useEffect, useState } from 'react';
import type {
  OwnedProfile,
  ManagedEvent,
  DonationCampaign,
  UserService,
  PostedJob,
  JobApplication,
  ReceivedReview,
  User,
} from './types';
import {
  RELIGIOUS_ROLES,
  SEED_OWNED_PROFILES,
  SEED_EVENTS,
  SEED_CAMPAIGNS,
  DEFAULT_USER_SERVICES,
  DEFAULT_APPLICATIONS,
  RECEIVED_REVIEWS,
  JOBS,
} from './mock-data';

// ─── Role helper ──────────────────────────────────────────────────────────────

/** True if the user holds any religious profession (Imam, Muazzin, Trustee…). */
export function checkReligiousRole(user: User | null): boolean {
  if (!user?.professions?.length) return false;
  return user.professions.some((p) => RELIGIOUS_ROLES.includes(p));
}

// ─── Generic persisted-list hook ──────────────────────────────────────────────

export function uid(prefix: string): string {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

const SYNC_EVENT = 'mc-store-sync';

function readList<T>(key: string, seed: T[]): T[] {
  try {
    const raw = localStorage.getItem(key);
    if (raw) return JSON.parse(raw) as T[];
  } catch {
    localStorage.removeItem(key);
  }
  // First visit: persist the seed so the demo feels alive
  localStorage.setItem(key, JSON.stringify(seed));
  return seed;
}

/**
 * localStorage-persisted list with hydration flag and cross-component sync.
 * Every mutation writes through to localStorage and notifies sibling hooks.
 */
export function usePersistedList<T>(key: string, seed: T[] = []) {
  const [items, setItemsState] = useState<T[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setItemsState(readList(key, seed));
    setHydrated(true);

    const onSync = (e: Event) => {
      if ((e as CustomEvent).detail === key) {
        setItemsState(readList(key, seed));
      }
    };
    window.addEventListener(SYNC_EVENT, onSync);
    return () => window.removeEventListener(SYNC_EVENT, onSync);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  const setItems = useCallback(
    (updater: T[] | ((prev: T[]) => T[])) => {
      setItemsState((prev) => {
        const next = typeof updater === 'function' ? (updater as (p: T[]) => T[])(prev) : updater;
        localStorage.setItem(key, JSON.stringify(next));
        window.dispatchEvent(new CustomEvent(SYNC_EVENT, { detail: key }));
        return next;
      });
    },
    [key]
  );

  return { items, setItems, hydrated };
}

// ─── Domain stores ────────────────────────────────────────────────────────────

const K = {
  profiles: 'muslim-connect-profiles',
  events: 'muslim-connect-events',
  campaigns: 'muslim-connect-campaigns',
  services: 'muslim-connect-services',
  postedJobs: 'muslim-connect-posted-jobs',
  applications: 'muslim-connect-applications',
  savedJobs: 'muslim-connect-saved-jobs',
  reviews: 'muslim-connect-received-reviews',
  feedLikes: 'muslim-connect-feed-likes',
  jobApplicantBumps: 'muslim-connect-job-applicant-bumps',
} as const;

/** User-owned Masjid / Dargah / Madrasa profiles */
export function useOwnedProfiles() {
  return usePersistedList<OwnedProfile>(K.profiles, SEED_OWNED_PROFILES);
}

/** Events attached to owned profiles */
export function useManagedEvents() {
  return usePersistedList<ManagedEvent>(K.events, SEED_EVENTS);
}

/** Donation campaigns attached to owned profiles */
export function useDonationCampaigns() {
  return usePersistedList<DonationCampaign>(K.campaigns, SEED_CAMPAIGNS);
}

/** The logged-in user's offered services */
export function useUserServices() {
  return usePersistedList<UserService>(K.services, DEFAULT_USER_SERVICES);
}

/** Reviews received by the user (replies persisted) */
export function useReceivedReviews() {
  return usePersistedList<ReceivedReview>(K.reviews, RECEIVED_REVIEWS);
}

/** Seed Part-1 JOBS into the shared employment store (as already-active posts). */
const SEED_POSTED_JOBS: PostedJob[] = JOBS.map((job, i) => ({
  ...job,
  category:
    job.type.includes('Religious')
      ? ('Religious' as const)
      : /developer|designer/i.test(job.title)
        ? ('IT' as const)
        : /teacher|principal|school/i.test(job.title)
          ? ('Education' as const)
          : /finance|manager|advisor/i.test(job.title)
            ? ('Business' as const)
            : ('Other' as const),
  status: 'Active' as const,
  postedByUser: i < 2, // first two belong to the demo employer account
}));

/** Shared jobs store — public browse page + employer dashboard both read this */
export function usePostedJobs() {
  return usePersistedList<PostedJob>(K.postedJobs, SEED_POSTED_JOBS);
}

/** Job-seeker's applications */
export function useJobApplications() {
  return usePersistedList<JobApplication>(K.applications, DEFAULT_APPLICATIONS);
}

/** Bookmarked job ids */
export function useSavedJobs() {
  return usePersistedList<string>(K.savedJobs, []);
}

/** Liked feed post ids */
export function useFeedLikes() {
  return usePersistedList<string>(K.feedLikes, []);
}

// ─── Formatting helpers ───────────────────────────────────────────────────────

export function formatINR(value: number): string {
  return `\u20b9${value.toLocaleString('en-IN')}`;
}

export function daysLeft(deadline: string): number {
  const diff = new Date(deadline).getTime() - Date.now();
  return Math.max(0, Math.ceil(diff / 86_400_000));
}
